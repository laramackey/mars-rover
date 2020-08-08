import test = require('tape');
import Rover from '../../lib/rover';

test('it stays in the same position if passed an empty string', (assert) => {
  const testRover = new Rover(0, 0, 'N');
  const endPosition = testRover.command('');
  assert.equal(
    endPosition,
    '0 0 N',
    'end position should be the same as the starting position'
  );
  assert.end();
});

test('it moves forward in one direction when passed only FFF in command', (assert) => {
  const northRover = new Rover(0, 0, 'N');
  const northRoverPosition = northRover.command('FFF');
  assert.equal(
    northRoverPosition,
    '0 3 N',
    'y value should increase by 3 for North rover'
  );

  const eastRover = new Rover(3, 7, 'E');
  const eastRoverPosition = eastRover.command('FFF');
  assert.equal(
    eastRoverPosition,
    '6 7 E',
    'x value should increase by 3 for East rover'
  );

  const southRover = new Rover(2, 5, 'S');
  const southRoverPosition = southRover.command('FFF');
  assert.equal(
    southRoverPosition,
    '2 2 S',
    'y value should decrease by 3 for South rover'
  );

  const westRover = new Rover(3, 5, 'W');
  const westRoverPosition = westRover.command('FFF');
  assert.equal(
    westRoverPosition,
    '0 5 W',
    'x value decrease increase by 3 for West rover'
  );
  assert.end();
});

test('it turns right', (assert) => {
  const testRover = new Rover(0, 0, 'W');
  const endPosition = testRover.command('R');
  assert.equal(endPosition, '0 0 N', 'end direction should be North');
  assert.end();
});

test('it turns left', (assert) => {
  const testRover = new Rover(0, 0, 'N');
  const endPosition = testRover.command('L');
  assert.equal(endPosition, '0 0 W', 'end direction should be West');
  assert.end();
});
