import test = require('tape');
import Rover from '../../lib/rover';
import * as iSpy from 'i-spy';

function createTestGrid(scents = []) {
  return {
    sizeX: 10,
    sizeY: 10,
    scents,
    addScent: iSpy.createSpy(),
  };
}

test('the rover stays in the same position if passed an empty string', (assert) => {
  const testRover = new Rover([0, 0], 'N', createTestGrid());
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
    const testRover = new Rover([5, 5], testCase.direction, createTestGrid());
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
  test(`the rover turns right from ${testCase.oldDirection} to ${testCase.newDirection}`, (assert) => {
    const testRover = new Rover([4, 5], testCase.oldDirection, createTestGrid());
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
  test(`the rover turns left from ${testCase.oldDirection} to ${testCase.newDirection}`, (assert) => {
    const testRover = new Rover([4, 5], testCase.oldDirection, createTestGrid());
    const endPosition = testRover.command('L');
    assert.equal(
      endPosition,
      `4 5 ${testCase.newDirection}`,
      `end direction should be ${testCase.newDirection}`
    );
    assert.end();
  });
});

test('the rover takes multiple commands with moving and turning', (assert) => {
  const testRover = new Rover([5, 5], 'N', createTestGrid());
  const endPosition = testRover.command('FFRFLLFF');
  assert.equal(
    endPosition,
    '4 7 W',
    'it should have changed direction and grid position to 4 7 W'
  );
  assert.end();
});

test('the rover falls off the grid and leaves a scent', (assert) => {
  const grid = createTestGrid();
  const testRover = new Rover([4, 10], 'E', grid);
  const endPosition = testRover.command('LFF');
  const expectedEndCoords = [4, 10];
  assert.equal(
    endPosition,
    `${expectedEndCoords[0]} ${expectedEndCoords[1]} N LOST`,
    'it should have returned the final grid position and that the rover has been lost'
  );
  assert.true(grid.addScent.wasCalled(), 'should have called addScent');
  assert.deepEqual(
    grid.addScent.calls[0][0],
    expectedEndCoords,
    'Adds the correct end coordinates to scents'
  );
  assert.end();
});

test('the rover stops moving after the rover has been lost and leaves a scent', (assert) => {
  const grid = createTestGrid();
  const testRover = new Rover([4, 9], 'W', grid);
  const endPosition = testRover.command('FFFFFFFFFFFFFFFFFFFF');
  const expectedEndCoords = [0, 9];
  assert.equal(
    endPosition,
    `${expectedEndCoords[0]} ${expectedEndCoords[1]} W LOST`,
    'it should have returned the final grid position and that the rover has been lost'
  );
  assert.true(grid.addScent.wasCalled(), 'should have called addScent');
  assert.deepEqual(
    grid.addScent.calls[0][0],
    expectedEndCoords,
    'Adds the correct end coordinates to scents'
  );
  assert.end();
});

test('the rover ignores command to move off the world', (assert) => {
  const testRover = new Rover([10, 9], 'N', createTestGrid([10, 10]));
  const endPosition = testRover.command('FF');
  assert.equal(
    endPosition,
    '10 10 N',
    'should not have lost rover that lands on scent'
  );
  assert.end();
});

test('the rover ignores command to move off the world and continues with the rest of the commands', (assert) => {
  const testRover = new Rover([2, 5], 'N', createTestGrid([0, 5]));
  const endPosition = testRover.command('LFFFLF');
  assert.equal(
    endPosition,
    '0 4 S',
    'should not have lost rover that lands on scent, and continues with commands'
  );
  assert.end();
});
