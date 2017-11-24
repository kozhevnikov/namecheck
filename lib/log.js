require('colors');

const check = '\u2714'.green;
const cross = '\u2718'.red;

function prompt(message) {
  process.stdout.write(`  ${message}: `);
}

function success(message = '') {
  console.log(`${check} ${message}`);
}

function failure(message = '') {
  console.log(`${cross} ${message}`);
}

function result(successful, message = '') {
  if (successful) {
    success(message);
  } else {
    failure(message);
  }
}

module.exports = {
  prompt,
  success,
  failure,
  result
};
