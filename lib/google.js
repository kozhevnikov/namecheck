const fetch = require('node-fetch');
const log = require('./log');

module.exports = async (name) => {
  log.prompt('Google');

  const response = await fetch(`https://www.google.com/search?q="${name}"&hl=en&gws_rd=cr`);
  const html = await response.text();

  if (html.includes('did not match any documents')) {
    log.success('0 results');
    return;
  }

  const match = html.match(/([\d,]+) results?/);
  const count = parseInt(match[1].replace(/,/g, ''), 10);
  log.result(count < 10000, match[0] || response.statusText);
};
