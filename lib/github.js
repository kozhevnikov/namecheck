const fetch = require('node-fetch');
const log = require('./log');

module.exports = async (name) => {
  log.prompt('GitHub');

  const response = await fetch(`https://github.com/${name}`);
  const notfound = response.status === 404;
  const message = `${response.status} ${response.statusText}`;

  log.result(notfound, message);
};
