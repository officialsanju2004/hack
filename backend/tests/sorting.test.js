import test from 'node:test';
import assert from 'node:assert/strict';
import { run as bubble } from '../src/services/algorithms/sorting/bubble.js';
import { run as selection } from '../src/services/algorithms/sorting/selection.js';
import { run as insertion } from '../src/services/algorithms/sorting/insertion.js';
import { run as merge } from '../src/services/algorithms/sorting/merge.js';
import { run as quick } from '../src/services/algorithms/sorting/quick.js';
const cases = [[5,3,8,1,9,2],[1,2,3,4,5],[5,4,3,2,1],[7],[2,2,1,1]];
for (const [name, fn] of Object.entries({ bubble, selection, insertion, merge, quick })) {
test(${name}: sorts & emits steps, () => {
for (const input of cases) {
const { steps } = fn({ array: input });
assert.deepEqual(steps[steps.length - 1].array, [...input].sort((a, b) => a - b));
assert.ok(steps.length > 0);
}
});
}
