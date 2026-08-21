import { expect, test } from '@playwright/test';
import register from '../../../src/index.js';

test('imports without browser globals', () => {
    expect(globalThis.window).toBeUndefined();
    expect(globalThis.document).toBeUndefined();
    expect(register).toBeInstanceOf(Function);
});
