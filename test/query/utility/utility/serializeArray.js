import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #serializeArray', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<form id="form">' +
                '<div>' +
                '<input name="test1" type="text" id="test1" value="Test 1">' +
                '</div>' +
                '<div>' +
                '<input name="test2" type="number" id="test2" value="2">' +
                '</div>' +
                '<div>' +
                '<textarea name="test3" id="test3">Test 3</textarea>' +
                '</div>' +
                '<div>' +
                '<select name="test4" id="test4"><option value="41">1</option><option value="42" selected>2</option></select>' +
                '</div>' +
                '<div>' +
                '<select name="test5[]" id="test5" multiple="true"><option value="51" selected>1</option><option value="52" selected>2</option></select>' +
                '</div>' +
                '<div>' +
                '<input name="test6" type="checkbox" id="test6" value="Test 6" checked>' +
                '</div>' +
                '<div>' +
                '<input name="test7" type="checkbox" id="test7" value="Test 7">' +
                '</div>' +
                '<div>' +
                '<input name="test8" type="radio" id="test8a" value="Test 8a">' +
                '<input name="test8" type="radio" id="test8b" value="Test 8b" checked>' +
                '</div>' +
                '<div>' +
                '<input name="test9[]" type="text" id="test9a" value="Test 9a">' +
                '<input name="test9[]" type="text" id="test9b" value="Test 9b">' +
                '</div>' +
                '</form>';
        });
    });

    it('returns a serialized string of all form elements', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('form')
                    .serializeArray(),
            ),
            [
                {
                    name: 'test1',
                    value: 'Test 1',
                },
                {
                    name: 'test2',
                    value: '2',
                },
                {
                    name: 'test3',
                    value: 'Test 3',
                },
                {
                    name: 'test4',
                    value: '42',
                },
                {
                    name: 'test5[]',
                    value: '51',
                },
                {
                    name: 'test5[]',
                    value: '52',
                },
                {
                    name: 'test6',
                    value: 'Test 6',
                },
                {
                    name: 'test8',
                    value: 'Test 8b',
                },
                {
                    name: 'test9[]',
                    value: 'Test 9a',
                },
                {
                    name: 'test9[]',
                    value: 'Test 9b',
                },
            ],
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    document.body.innerHTML,
                );
                return $(fragment)
                    .serializeArray();
            }),
            [
                {
                    name: 'test1',
                    value: 'Test 1',
                },
                {
                    name: 'test2',
                    value: '2',
                },
                {
                    name: 'test3',
                    value: 'Test 3',
                },
                {
                    name: 'test4',
                    value: '42',
                },
                {
                    name: 'test5[]',
                    value: '51',
                },
                {
                    name: 'test5[]',
                    value: '52',
                },
                {
                    name: 'test6',
                    value: 'Test 6',
                },
                {
                    name: 'test8',
                    value: 'Test 8b',
                },
                {
                    name: 'test9[]',
                    value: 'Test 9a',
                },
                {
                    name: 'test9[]',
                    value: 'Test 9b',
                },
            ],
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    document.body.innerHTML,
                );
                shadow.appendChild(fragment);
                return $(shadow)
                    .serializeArray();
            }),
            [
                {
                    name: 'test1',
                    value: 'Test 1',
                },
                {
                    name: 'test2',
                    value: '2',
                },
                {
                    name: 'test3',
                    value: 'Test 3',
                },
                {
                    name: 'test4',
                    value: '42',
                },
                {
                    name: 'test5[]',
                    value: '51',
                },
                {
                    name: 'test5[]',
                    value: '52',
                },
                {
                    name: 'test6',
                    value: 'Test 6',
                },
                {
                    name: 'test8',
                    value: 'Test 8b',
                },
                {
                    name: 'test9[]',
                    value: 'Test 9a',
                },
                {
                    name: 'test9[]',
                    value: 'Test 9b',
                },
            ],
        );
    });
});
