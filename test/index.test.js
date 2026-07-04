import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import deps from '../index.js';

describe('Paths', () => {
	it('exports an object', () => {
		assert.strictEqual(typeof deps, 'object');
	});

	it('exports "bin" string', () => {
		assert.strictEqual(typeof deps.bin, 'string');
	});

	it('exports "include" string', () => {
		assert.strictEqual(typeof deps.include, 'string');
	});
});
