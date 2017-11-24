const fetch = require('node-fetch');
const log = require('./log');

module.exports = async (name) => {
  log.prompt('GMail');

  const response = await fetch('https://accounts.google.com/InputValidator?resource=SignUp&service=mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input01: {
        Input: 'GmailAddress',
        GmailAddress: name,
        FirstName: '',
        LastName: ''
      },
      Locale: 'en'
    })
  });

  const json = await response.json();
  const input = json.input01;

  if (input.Valid === 'true') {
    log.pass();
  } else {
    log.fail(input.ErrorMessage);
  }
};
