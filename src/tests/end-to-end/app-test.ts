import test = require('tape');
import app from '../../lib/app';

test('the app successfully handles one rover', assert => {
  const input = `2 2
2 2 W
F`;
  const result = app(input);
  assert.equals(result, '1 2 W', 'should return correct position for rover');
  assert.end();
});

test('the app successfully handles three rovers, including one that falls and leaves a scent', assert => {
  const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;
  const result = app(input);
  assert.equals(
    result,
    `1 1 E
3 3 N LOST
2 3 S`,
    'should return correct positions for all rovers'
  );
  assert.end();
});

test('the app successfully handles a case using the max grid and command length', assert => {
  const input = `50 50
0 0 N
FFFFFFFFFFFFFFFFFFFFFFFFFRFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFRFFFFFFFFFFFFFFFFFFFFFFFF
50 0 N
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
50 0 N
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFRFFFFFFFFRFFFFFFFFFL`;
  const result = app(input);
  assert.equals(
    result,
    `49 1 S
50 50 N LOST
50 41 E`,
    'should return correct positions for all rovers'
  );
  assert.end();
});

test('the app successfully handles a case with multiple rover scents', assert => {
  const input = `5 5
5 3 E
F
5 3 E
FRFLF
5 3 E
FRFLFRFL`;
  const result = app(input);
  assert.equals(
    result,
    `5 3 E LOST
5 2 E LOST
5 1 E`,
    'should return correct positions for all rovers'
  );
  assert.end();
});
