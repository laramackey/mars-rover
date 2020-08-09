import test = require('tape');
import {Scent, Grid} from '../../lib/grid';

test('the grid succesfully adds multiple scents', (assert) => {
  const testGrid = new Grid(10, 10);
  const scent1: Scent = [0, 5];
  const scent2: Scent = [10, 7];
  assert.deepEqual(testGrid.scents, [], 'should initialise with no scents');
  testGrid.addScent(scent1);
  assert.deepEqual(testGrid.scents, [scent1], 'should have one scent');
  testGrid.addScent(scent2);
  assert.deepEqual(testGrid.scents, [scent1, scent2], 'should have two scents');
  assert.end();
});
