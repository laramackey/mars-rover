import test = require('tape');
import Rover from '../../lib/rover';

const testGrid = {
  sizeX: 10,
  sizeY: 10,
};

test('it stays in the same position if passed an empty string', (assert) => {
  const testRover = new Rover(0, 0, 'N', testGrid);
  const endPosition = testRover.command('');
  assert.equal(
    endPosition,
    '0 0 N',
    'end position should be the same as the starting position'
  );
  assert.end();
});

[
  {direction: 'N', endPos: [5, 8]},
  {direction: 'E', endPos: [8, 5]},
  {direction: 'S', endPos: [5, 2]},
  {direction: 'W', endPos: [2, 5]},
].forEach((testCase) => {
  test(`${testCase.direction} facing rover moves forward in one direction`, (assert) => {
    const testRover = new Rover(5, 5, testCase.direction, testGrid);
    const endPosition = testRover.command('FFF');
    assert.equal(
      endPosition,
      `${testCase.endPos[0]} ${testCase.endPos[1]} ${testCase.direction}`,
      `end position should be ${testCase.endPos}`
    );
    assert.end();
  });
});

[
  {oldDirection: 'N', newDirection: 'E'},
  {oldDirection: 'E', newDirection: 'S'},
  {oldDirection: 'S', newDirection: 'W'},
  {oldDirection: 'W', newDirection: 'N'},
].forEach((testCase) => {
  test(`it turns right from ${testCase.oldDirection} to ${testCase.newDirection}`, (assert) => {
    const testRover = new Rover(4, 5, testCase.oldDirection, testGrid);
    const endPosition = testRover.command('R');
    assert.equal(
      endPosition,
      `4 5 ${testCase.newDirection}`,
      `end direction should be ${testCase.newDirection}`
    );
    assert.end();
  });
});

[
  {oldDirection: 'N', newDirection: 'W'},
  {oldDirection: 'E', newDirection: 'N'},
  {oldDirection: 'S', newDirection: 'E'},
  {oldDirection: 'W', newDirection: 'S'},
].forEach((testCase) => {
  test(`it turns left from ${testCase.oldDirection} to ${testCase.newDirection}`, (assert) => {
    const testRover = new Rover(4, 5, testCase.oldDirection, testGrid);
    const endPosition = testRover.command('L');
    assert.equal(
      endPosition,
      `4 5 ${testCase.newDirection}`,
      `end direction should be ${testCase.newDirection}`
    );
    assert.end();
  });
});

test('it takes multiple commands with moving and turning', (assert) => {
  const testRover = new Rover(5, 5, 'N', testGrid);
  const endPosition = testRover.command('FFRFLLFF');
  assert.equal(
    endPosition,
    '4 7 W',
    'it should have changed direction and grid position to 4 7 W'
  );
  assert.end();
});

test('it falls off the grid', (assert) => {
  const testRover = new Rover(4, 9, 'E', testGrid);
  const endPosition = testRover.command('LFF');
  assert.equal(
    endPosition,
    '4 10 N LOST',
    'it should have noted the final grid position and that the rover has been lost'
  );
  assert.end();
});

test('it should stop moving after the rover has been lost', (assert) => {
  const testRover = new Rover(4, 9, 'W', testGrid);
  const endPosition = testRover.command('FFFFFFFFFFFFFFFFFFFF');
  assert.equal(
    endPosition,
    '0 9 W LOST',
    'it should have noted the final grid position and that the rover has been lost'
  );
  assert.end();
});
