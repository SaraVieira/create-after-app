#!/usr/bin/env node
'use strict';

const importJsx = require('import-jsx');
const {h, render} = require('ink');
const meow = require('meow');

const Ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ create-after-app [input]

	Options
	  --yarn  Use yarn

	Examples
	  $ create-after-app src
	  Creates a after app in the src folder
`);

const folder = cli.input[0]

render(h(Ui, cli.flags, folder));
