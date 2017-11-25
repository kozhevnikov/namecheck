#!/usr/bin/env node
const { createInterface } = require('readline');
const verisign = require('./lib/verisign');
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

  try {
    await verisign(name);
    await github(name);
    await google(name);
    await facebook(name);
    await gmail(name);
  }
  catch (error) {
    console.log(error);
  }

  console.log();
  readline.prompt();
});

readline.on('close', () => console.log());
