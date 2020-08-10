import app from './lib/app';
import * as readline from 'readline';
import * as clear from 'clear';
import * as chalk from 'chalk';
import * as figlet from 'figlet';

const input = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

clear();

// tslint:disable: no-console
console.log(
  chalk.green(
    figlet.textSync('Mars Rover', { horizontalLayout: 'full' })
  )
);
console.log(
`Specify your commands in the following format, each seperated on a new line:
- The ` + chalk.yellow('upper right x and y coordinate') + ` for the grid, seperated by spaces
- The rover starting position with the ` + chalk.yellow('x coordinate, y coordinate and direction') + ` seperated by spaces
- The rovers instruction is a string of the letters ` + chalk.yellow('“L”, “R”, and “F”') +`, not seperated by spaces
- Repeat the last two steps for each rover
Type ` + chalk.yellow('"done"') + ` and press enter once you have finished the input
eg
` + chalk.green(`
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
done
`));
rl.prompt();

rl.on('line', (inputLine) => {
  if (inputLine === 'done') {
    const output = app(input.join('\n'));
    console.log(
        chalk.red(output)
    );
    process.exit(0);
  } else {
    input.push(inputLine);
  }
});
