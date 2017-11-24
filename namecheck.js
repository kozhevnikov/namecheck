#!/usr/bin/env node
const { createInterface } = require('readline');
const github = require('./lib/github');
const google = require('./lib/google');
const gmail = require('./lib/gmail');
const facebook = require('./lib/facebook');

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

  await github(name);
  await google(name);
  await gmail(name);
  await facebook(name);

  console.log();
  readline.prompt();
});
