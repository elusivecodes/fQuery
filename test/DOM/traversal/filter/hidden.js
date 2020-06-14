const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#hidden', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<style>' +
                '.test { display: none; }' +
                '</style>' +
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3"></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span id="span4"></span>' +
                '</div>';
        });
    });

    it('returns hidden nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.hidden(
                    'div'
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('returns descendents of hidden nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.hidden(
                    'span'
                ).map(node => node.id);
            }),
            [
                'span2',
                'span4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.hidden(
                    document.getElementById('div2')
                ).map(node => node.id);
            }),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.hidden(
                    document.querySelectorAll('div')
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.hidden(
                    document.body.children
                ).map(node => node.id).filter(id => id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const myDoc = new Document();
                myDoc.id = 'document';
                return dom.hidden(
                    myDoc
                ).map(node => node.id);
            }),
            [
                'document'
            ]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const myWindow = {
                    document: {},
                    id: 'window'
                };
                myWindow.document.defaultView = myWindow;
                return dom.hidden(
                    myWindow
                ).map(node => node.id);
            }),
            [
                'window'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.hidden(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ]
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

});