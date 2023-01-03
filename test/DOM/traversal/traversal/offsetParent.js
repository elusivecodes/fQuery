import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#offsetParent', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1" style="position: relative;">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child2" style="position: relative;">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('returns the offset parent of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.offsetParent('a').id,
            ),
            'child1',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.offsetParent('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.offsetParent(
                    document.getElementById('a1'),
                ).id,
            ),
            'child1',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.offsetParent(
                    document.querySelectorAll('a'),
                ).id,
            ),
            'child1',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.offsetParent(
                    document.getElementById('span1').children,
                ).id,
            ),
            'child1',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.offsetParent([
                    document.getElementById('a1'),
                    document.getElementById('a2'),
                ]).id,
            ),
            'child1',
        );
    });
});
