const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setStyle', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a styles object for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    'div',
                    {
                        display: 'block',
                        width: '100%',
                        height: '100',
                        opacity: 0.5
                    }
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>' +
            '<div id="test2" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>'
        );
    });

    it('sets a style value for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    'div',
                    'display',
                    'block'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>'
        );
    });

    it('converts numbers to pixels arguments', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    'div',
                    'width',
                    '100'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100px;"></div>' +
            '<div id="test2" style="width: 100px;"></div>'
        );
    });

    it('does not convert numbers with units to pixels arguments', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    'div',
                    'width',
                    '100%'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100%;"></div>' +
            '<div id="test2" style="width: 100%;"></div>'
        );
    });

    it('sets a style value for all nodes with important', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    'div',
                    'display',
                    'block',
                    true
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block !important;"></div>' +
            '<div id="test2" style="display: block !important;"></div>'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    document.getElementById('test1'),
                    'display',
                    'block'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    document.querySelectorAll('div'),
                    'display',
                    'block'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    document.body.children,
                    'display',
                    'block'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setStyle(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
                    'display',
                    'block'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>'
        );
    });

});