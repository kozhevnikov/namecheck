/* eslint-disable no-await-in-loop,no-loop-func,prefer-destructuring */
const fetch = require('node-fetch');
const https = require('https');
const log = require('./log');

let session = null;

module.exports = async (name) => {
  log.prompt(`${name}.com`);

  try {
    const response = await fetch(`http://${name}.com`, {
      method: 'HEAD',
      redirect: 'manual'
    });
    log.failure(`${response.status} ${response.statusText}`);
    return;
  } catch (error) {
    // ignore
  }

  let message = null;
  let sleep = 5000;

  while (!message || message === 'Error') {
    if (!session) {
      const response = await fetch('https://registrar.verisign-grs.com/webwhois-ui/index.jsp', {
        agent: new https.Agent({ rejectUnauthorized: false })
      });
      session = response.headers.get('set-cookie').split(';')[0];
    }

    const response = await fetch(`http://registrar.verisign-grs.com/webwhois-ui/rest/whois?q=${name}&tld=com&type=domain`, {
      headers: { cookies: session }
    });
    const json = await response.json();

    if (json.responseType === 'captchaNeeded') {
      sleep *= 2;
      session = null;
      process.stdout.write('.');
      await new Promise((resolve) => { setTimeout(resolve, sleep); });
    }

    message = json.message;
  }

  if (message.startsWith('No match for domain')) {
    log.success('No whois');
    return;
  }

  const match = message.match(/Creation Date: .*/);
  if (!match) {
    log.failure('Error');
    console.error(message);
    return;
  }

  log.failure(match[0]);
};
