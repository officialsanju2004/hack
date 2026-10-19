import test from 'node:test';
import assert from 'node:assert/strict';
import { run as linear } from '../src/services/algorithms/searching/linear.js';
import { run as binary } from '../src/services/algorithms/searching/binary.js';
test('linear finds', () => { const { steps } = linear({ array: [4,2,9], target: 9 }); assert.deepEqual(steps[steps.length-1].highlights.found, [2]); });
test('binary finds', () => { const { steps } = binary({ array: [1,3,5,7,9], target: 7 }); assert.deepEqual(steps[steps.length-1].highlights.found, [3]); });
test('binary not found', () => { const { steps } = binary({ array: [1,2,3], target: 99 }); assert.ok(steps[steps.length-1].highlights.notFound); });
