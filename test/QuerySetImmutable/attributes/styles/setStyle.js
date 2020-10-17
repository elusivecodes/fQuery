const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #setStyle', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a styles object for all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle({
                        display: 'block',
                        width: '100%',
                        height: '100px',
                        opacity: 0.5
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>' +
            '<div id="test2" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>'
        );
    });

    it('sets a style value for all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle('display', 'block');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>'
        );
    });

    it('converts number values to pixels', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle('width', '100');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100px;"></div>' +
            '<div id="test2" style="width: 100px;"></div>'
        );
    });

    it('converts style object number values to pixels', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle({
                        width: 100,
                        height: 100
                    });
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100px; height: 100px;"></div>' +
            '<div id="test2" style="width: 100px; height: 100px;"></div>'
        );
    });

    it('does not convert number values with units to pixels', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle('width', '100%');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100%;"></div>' +
            '<div id="test2" style="width: 100%;"></div>'
        );
    });

    it('does not convert number values for CSS number properties', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle('font-weight', '500');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="font-weight: 500;"></div>' +
            '<div id="test2" style="font-weight: 500;"></div>'
        );
    });

    it('sets a style object for all nodes with important', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle({
                        display: 'block',
                        width: '100%'
                    }, null, true);
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block !important; width: 100% !important;"></div>' +
            '<div id="test2" style="display: block !important; width: 100% !important;"></div>'
        );
    });

    it('sets a style value for all nodes with important', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('div')
                    .setStyle('display', 'block', true);
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block !important;"></div>' +
            '<div id="test2" style="display: block !important;"></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('div');
                return query === query.setStyle('display', 'block');
            }),
            true
        );
    });

});