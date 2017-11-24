require('colors');

const check = '\u2714'.green;
const cross = '\u2718'.red;

exports.prompt = (message) => {
  process.stdout.write(`${message}: `);
};

exports.pass = (message = '') => {
  console.log(`${check} ${message}`);
};

exports.fail = (message = '') => {
  console.log(`${cross} ${message}`);
};
