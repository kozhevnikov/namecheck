const fetch = require('node-fetch');
const https = require('https');
const log = require('./log');

let session = null;

module.exports = async (name) => {
  log.prompt(`${name}.com`);

  if (!session) {
    const index = await fetch('https://registrar.verisign-grs.com/webwhois-ui/index.jsp', {
      agent: new https.Agent({ rejectUnauthorized: false })
    });
    session = index.headers.get('set-cookie').split(';'[0]);
  }

  const whois = await fetch(`http://registrar.verisign-grs.com/webwhois-ui/rest/whois?q=${name}&tld=com&type=domain`, {
    headers: { cookies: session }
  });
  const json = await whois.json();

  if (json.message.startsWith('No match for domain')) {
    log.success();
    return;
  }

  const match = json.message.match(/Creation Date: .*/);
  if (!match) {
    log.failure('Error');
    console.error(json);
    return;
  }

  log.failure(match[0]);
};
