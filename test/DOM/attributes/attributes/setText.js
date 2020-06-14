const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setText', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1">' +
                '<div><span id="inner">Test 1</span></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets the text contents for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    'div',
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

    it('escapes HTML strings', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.getElementById('test1'),
                    '<span>Test 2</span>'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">&lt;span&gt;Test 2&lt;/span&gt;</div>' +
            '<div id="test2"></div>'
        );
    });

    it('removes data for all previous descendents', async function() {
        assert.equal(
            await exec(_ => {
                const element = document.getElementById('inner');
                dom.setData(
                    element,
                    'test',
                    'Test 1'
                );
                dom.setText(
                    'div',
                    'Test 2'
                );
                return dom.getData(
                    element,
                    'test'
                );
            }),
            undefined
        );
    });

    it('removes events for all previous descendents', async function() {
        assert.equal(
            await exec(_ => {
                const event = new Event('click');
                const element = document.getElementById('inner');
                let result = 0;
                dom.addEvent(
                    element,
                    'click',
                    _ => { result++; }
                );
                dom.setText(
                    'div',
                    'Test 2'
                );
                document.body.appendChild(element);
                element.dispatchEvent(event);
                return result;
            }),
            0
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.getElementById('test1'),
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.querySelectorAll('div'),
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.body.children,
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

});