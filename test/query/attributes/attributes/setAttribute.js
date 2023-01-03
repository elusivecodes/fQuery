import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #setAttribute', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="number" id="test1">' +
                '<input type="number" id="test2">';
        });
    });

    it('sets an attributes object for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('input')
                    .setAttribute({
                        min: '1',
                        max: '10',
                    });
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" min="1" max="10">' +
            '<input type="number" id="test2" min="1" max="10">',
        );
    });

    it('sets an attribute for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('input')
                    .setAttribute('placeholder', '123');
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2" placeholder="123">',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('input');
                return query === query.setAttribute('placeholder', '123');
            }),
            true,
        );
    });
});
