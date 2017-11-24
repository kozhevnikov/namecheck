#!/usr/bin/env node
const { createInterface } = require('readline');
const gmail = require('./lib/gmail');

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Name: '
});

readline.prompt();

readline.on('line', async (name) => {
  if (!name) {
    readline.close();
    return;
  }

  await gmail(name);

  readline.prompt();
});
