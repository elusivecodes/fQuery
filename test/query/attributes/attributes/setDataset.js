import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #setDataset', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a dataset object for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .setDataset({
                        testA: 'Test 1',
                        testB: 'Test 2',
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-test-a="Test 1" data-test-b="Test 2"></div>' +
            '<div id="test2" data-test-a="Test 1" data-test-b="Test 2"></div>',
        );
    });

    it('sets a dataset value for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .setDataset({
                        'text': 'Test',
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-text="Test"></div>' +
            '<div id="test2" data-text="Test"></div>',
        );
    });

    it('formats boolean true values', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('#test1')
                    .setDataset({
                        'true': true,
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-true="true"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('formats boolean false values', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('#test1')
                    .setDataset({
                        'false': false,
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-false="false"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('formats boolean null values', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('#test1')
                    .setDataset({
                        'null': null,
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-null="null"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('formats array values', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('#test1')
                    .setDataset({
                        'array': [1, 2, 3],
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-array="[1,2,3]"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('formats object values', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('#test1')
                    .setDataset({
                        'object': { a: 1 },
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" data-object="{&quot;a&quot;:1}"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('input');
                return query === query.setDataset('text', 'Test');
            }),
            true,
        );
    });
});
