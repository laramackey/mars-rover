import app from './lib/app';
import * as readline from 'readline';

const input = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt();

rl.on('line', (inputLine) => {
  if (inputLine === 'done') {
    const output = app(input.join('\n'));
    // tslint:disable-next-line: no-console
    console.log(output);
    process.exit(0);
  } else {
    input.push(inputLine);
  }
});
