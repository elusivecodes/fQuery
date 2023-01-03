import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #constrain', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="fromParent">' +
                '<div id="test1" data-toggle="from" style="display: block; width: 600px; height: 600px;"></div>' +
                '<div id="test2" data-toggle="from" style="display: block; width: 600px; height: 600px;"></div>' +
                '</div>' +
                '<div id="toParent">' +
                '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
                '<div data-togle="to"></div>' +
                '</div>';
        });
    });

    it('constrains each node inside another node', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('[data-toggle="from"]')
                    .constrain('[data-toggle="to"]');
                return document.body.innerHTML;
            }),
            '<div id="fromParent">' +
            '<div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div>' +
            '<div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div>' +
            '</div>' +
            '<div id="toParent">' +
            '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
            '<div data-togle="to"></div>' +
            '</div>',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('[data-toggle="from"]');
                return query === query.constrain('[data-toggle="to"]');
            }),
            true,
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('[data-toggle="from"]')
                    .constrain(
                        document.getElementById('test3'),
                    );
                return document.body.innerHTML;
            }),
            '<div id="fromParent">' +
            '<div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div>' +
            '<div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div>' +
            '</div>' +
            '<div id="toParent">' +
            '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
            '<div data-togle="to"></div>' +
            '</div>',
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('[data-toggle="from"]')
                    .constrain(
                        document.querySelectorAll('[data-toggle="to"]'),
                    );
                return document.body.innerHTML;
            }),
            '<div id="fromParent">' +
            '<div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div>' +
            '<div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div>' +
            '</div>' +
            '<div id="toParent">' +
            '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
            '<div data-togle="to"></div>' +
            '</div>',
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('[data-toggle="from"]')
                    .constrain(
                        document.getElementById('toParent').children,
                    );
                return document.body.innerHTML;
            }),
            '<div id="fromParent">' +
            '<div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div>' +
            '<div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div>' +
            '</div>' +
            '<div id="toParent">' +
            '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
            '<div data-togle="to"></div>' +
            '</div>',
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('[data-toggle="from"]')
                    .constrain([
                        document.getElementById('test3'),
                        document.getElementById('test4'),
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="fromParent">' +
            '<div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div>' +
            '<div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div>' +
            '</div>' +
            '<div id="toParent">' +
            '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
            '<div data-togle="to"></div>' +
            '</div>',
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('[data-toggle="to"]');
                $('[data-toggle="from"]')
                    .constrain(query);
                return document.body.innerHTML;
            }),
            '<div id="fromParent">' +
            '<div id="test1" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: 292px; position: relative;"></div>' +
            '<div id="test2" data-toggle="from" style="display: block; width: 500px; height: 500px; left: 292px; top: -308px; position: relative;"></div>' +
            '</div>' +
            '<div id="toParent">' +
            '<div id="test3" data-toggle="to" style="position: absolute; top: 300px; left: 300px; width: 500px; height: 500px;"></div>' +
            '<div data-togle="to"></div>' +
            '</div>',
        );
    });
});
