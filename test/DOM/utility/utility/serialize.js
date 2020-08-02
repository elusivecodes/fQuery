const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#serialize', function() {

    beforeEach(async function() {
        await exec(_ => {
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
        assert.equal(
            await exec(_ => {
                return dom.serialize(
                    'form'
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.serialize(
                    document.getElementById('form')
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.serialize(
                    document.querySelectorAll('input, textarea, select')
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.serialize(
                    document.body.children
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    document.body.innerHTML
                );
                return dom.serialize(
                    fragment
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    document.body.innerHTML
                );
                shadow.appendChild(fragment);
                return dom.serialize(
                    shadow
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.serialize(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4'),
                        document.getElementById('test5'),
                        document.getElementById('test6'),
                        document.getElementById('test7'),
                        document.getElementById('test8a'),
                        document.getElementById('test8b'),
                        document.getElementById('test9a'),
                        document.getElementById('test9b')
                    ]
                );
            }),
            'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
        );
    });

});