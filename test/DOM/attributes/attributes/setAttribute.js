import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#setAttribute', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="number" id="test1">' +
                '<input type="number" id="test2">';
        });
    });

    it('sets an attributes object for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setAttribute('input', {
                    min: '1',
                    max: '10',
                });
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" min="1" max="10">' +
            '<input type="number" id="test2" min="1" max="10">',
        );
    });

    it('sets an attribute for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setAttribute('input', 'placeholder', '123');
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2" placeholder="123">',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setAttribute(
                    document.getElementById('test1'),
                    'placeholder',
                    '123',
                );
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2">',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setAttribute(
                    document.querySelectorAll('input'),
                    'placeholder',
                    '123',
                );
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2" placeholder="123">',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setAttribute(
                    document.body.children,
                    'placeholder',
                    '123',
                );
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2" placeholder="123">',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setAttribute([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'placeholder', '123');
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2" placeholder="123">',
        );
    });
});
