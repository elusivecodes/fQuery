import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#focus', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="text" id="test2">';
        });
    });

    it('triggers a focus event on the first node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('focus', (_) => {
                    result = true;
                });
                $.focus('input');
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
                element.addEventListener('focus', (_) => {
                    result = true;
                });
                $.focus(
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
                element.addEventListener('focus', (_) => {
                    result = true;
                });
                $.focus(
                    document.querySelectorAll('input'),
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
                element.addEventListener('focus', (_) => {
                    result = true;
                });
                $.focus(
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
                element.addEventListener('focus', (_) => {
                    result = true;
                });
                $.focus([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]);
                return result;
            }),
            true,
        );
    });
});
