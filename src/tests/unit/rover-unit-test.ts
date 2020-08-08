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
