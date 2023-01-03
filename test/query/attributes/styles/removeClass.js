import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #removeClass', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" class="test1 test2"></div>' +
                '<div id="test2" class="test1 test2"></div>';
        });
    });

    it('removes a class from all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .removeClass('test1');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test2"></div>',
        );
    });

    it('parses classes from string', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .removeClass('test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class=""></div>',
        );
    });

    it('parses classes from array', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .removeClass([
                        'test1',
                        'test2',
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class=""></div>',
        );
    });

    it('parses classes from multiple arguments', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .removeClass(
                        'test1',
                        ['test2'],
                    );
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class=""></div>',
        );
    });

    it('works with empty strings', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .removeClass('');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.removeClass('test1');
            }),
            true,
        );
    });
});
