import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #addClass', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('adds a class to all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .addClass('test');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2" class="test"></div>',
        );
    });

    it('parses classes from string', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .addClass('test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>',
        );
    });

    it('parses classes from array', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .addClass([
                        'test1',
                        'test2',
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>',
        );
    });

    it('parses classes from multiple arguments', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .addClass('test1', ['test2']);
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>',
        );
    });

    it('works with empty strings', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .addClass('');
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.addClass('test');
            }),
            true,
        );
    });
});
