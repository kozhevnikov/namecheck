const fetch = require('node-fetch');
const log = require('./log');

module.exports = async (name) => {
  log.prompt('Twitter');

  const response = await fetch(`https://twitter.com/${name}`);
  const notfound = response.status === 404;
  const message = `${response.status} ${response.statusText}`;

  log.result(notfound, message);
};
