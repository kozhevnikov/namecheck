#!/usr/bin/env node
const { createInterface } = require('readline');

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

readline.prompt();

readline.on('line', (name) => {
  if (!name) {
    readline.close();
    return;
  }

  console.log(`< ${name}`);

  readline.prompt();
});
