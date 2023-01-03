import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #setProperty', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="number" id="test2">';
        });
    });

    it('sets a properties object for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('input')
                    .setProperty({
                        test1: 'Test 1',
                        test2: 'Test 2',
                    });
                return [
                    element1.test1,
                    element1.test2,
                    element2.test1,
                    element2.test2,
                ];
            }),
            [
                'Test 1',
                'Test 2',
                'Test 1',
                'Test 2',
            ],
        );
    });

    it('sets a property for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('input')
                    .setProperty('test', 'Test');
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test,
                ];
            }),
            [
                'Test',
                'Test',
            ],
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('input');
                return query === query.setProperty('test', 'Test');
            }),
            true,
        );
    });
});
