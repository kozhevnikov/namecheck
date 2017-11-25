#!/usr/bin/env node
const { createInterface } = require('readline');
const facebook = require('./lib/facebook');
const github = require('./lib/github');
const gmail = require('./lib/gmail');
const google = require('./lib/google');
const twitter = require('./lib/twitter');
const verisign = require('./lib/verisign');

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
    await twitter(name);
    await facebook(name);
    await gmail(name);
  } catch (error) {
    console.log(error);
  }

  console.log();
  readline.prompt();
});

readline.on('close', () => console.log());
