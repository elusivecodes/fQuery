const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setHTML', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1">' +
                '<div><span id="inner">Test 1</span></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets the HTML contents for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setHTML(
                    'div',
                    '<span>Test 2</span>'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>'
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
                dom.setHTML(
                    'div',
                    '<span>Test 2</span>'
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
                dom.setHTML(
                    'div',
                    '<span>Test 2</span>'
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
                dom.setHTML(
                    document.getElementById('test1'),
                    '<span>Test 2</span>'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setHTML(
                    document.querySelectorAll('div'),
                    '<span>Test 2</span>'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setHTML(
                    document.body.children,
                    '<span>Test 2</span>'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setHTML(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
                    '<span>Test 2</span>'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>'
        );
    });

});