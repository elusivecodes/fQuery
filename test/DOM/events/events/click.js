import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#click', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('triggers a click event on the first node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', (_) => {
                    result = true;
                });
                $.click('a');
                return result;
            }),
            true,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', (_) => {
                    result = true;
                });
                $.click(
                    document.getElementById('test1'),
                );
                return result;
            }),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', (_) => {
                    result = true;
                });
                $.click(
                    document.querySelectorAll('a'),
                );
                return result;
            }),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', (_) => {
                    result = true;
                });
                $.click(
                    document.body.children,
                );
                return result;
            }),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', (_) => {
                    result = true;
                });
                $.click([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]);
                return result;
            }),
            true,
        );
    });
});
