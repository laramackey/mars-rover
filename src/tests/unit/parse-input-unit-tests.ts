import test = require('tape');
import parseInput from '../../lib/parse-input';

test('an input string which is valid is succesfully parsed', (assert) => {
  const validInput = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;
  const expectedOutput = {
    gridInputs: {sizeX: 5, sizeY: 3},
    roversInputs: [
      {startX: 1, startY: 1, direction: 'E', command: 'RFRFRFRF'},
      {startX: 3, startY: 2, direction: 'N', command: 'FRRFLLFFRRFLL'},
      {startX: 0, startY: 3, direction: 'W', command: 'LLFFFLFLFL'},
    ],
  };
  const parsedInput = parseInput(validInput);
  assert.deepEquals(
    parsedInput,
    expectedOutput,
    'should parse the multiline string without error'
  );
  assert.end();
});

test('an input string with an invalid grid size throws', (assert) => {
  const invalidInput = '100000 3';
  assert.throws(
    () => parseInput(invalidInput),
    /Maximum value for grid coordinates is 50/
  );
  assert.end();
});

test('an input string with an invalid number of grid size arguments throws', (assert) => {
  const invalidInput = '100000 3 1 1 1 2';
  assert.throws(
    () => parseInput(invalidInput),
    /Must have two arguments for the grid coordinate size/
  );
  assert.end();
});

test('an input string without valid numbers for grid coordinates throws', (assert) => {
  const invalidInput = 'A B';
  assert.throws(
    () => parseInput(invalidInput),
    /Grid coordinates must be numbers/
  );
  assert.end();
});

test('an input string without an even number of input lines for rover instructions throws', (assert) => {
  const invalidInput = `5 3
1 1 Q`;
  assert.throws(
    () => parseInput(invalidInput),
    /Must have an even number of lines for Robot Instructions/
  );
  assert.end();
});

test('an input string with an invalid number of rover position arguments throws', (assert) => {
  const invalidInput = `5 3
1 1 E S W
FFF`;
  assert.throws(
    () => parseInput(invalidInput),
    /Must have three arguments for the rover starting position/
  );
  assert.end();
});

test('an input string with a rover command of more than 100 characters throws', (assert) => {
  const invalidInput = `5 3
1 1 E
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`;
  assert.throws(
    () => parseInput(invalidInput),
    /Maximum command length is 100/
  );
  assert.end();
});

test('an input string without valid numbers for rover coordinates throws', (assert) => {
  const invalidInput = `5 3
X Y E
FFF`;
  assert.throws(
    () => parseInput(invalidInput),
    /Rover start coordinates must be numbers/
  );
  assert.end();
});

test('an input string without valid direction for rover coordinates throws', (assert) => {
  const invalidInput = `5 3
0 0 Q
FFF`;
  assert.throws(
    () => parseInput(invalidInput),
    /Q is not a valid rover starting direction/
  );
  assert.end();
});
