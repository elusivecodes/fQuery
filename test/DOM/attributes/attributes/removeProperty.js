import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#removeProperty', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="checkbox" id="test1">' +
                '<input type="checkbox" id="test2">';
            document.getElementById('test1').test = 'Test 1';
            document.getElementById('test2').test = 'Test 2';
        });
    });

    it('removes a property for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeProperty('input', 'test');
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test,
                ];
            }),
            [
                null,
                null,
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const element = document.getElementById('test1');
                $.removeProperty(
                    element,
                    'test',
                );
                return [
                    element.test,
                    document.getElementById('test2').test,
                ];
            }),
            [
                null,
                'Test 2',
            ],
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeProperty(
                    document.querySelectorAll('input'),
                    'test',
                );
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test,
                ];
            }),
            [
                null,
                null,
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeProperty(
                    document.body.children,
                    'test',
                );
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test,
                ];
            }),
            [
                null,
                null,
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.removeProperty([
                    element1,
                    element2,
                ], 'test');
                return [
                    element1.test,
                    element2.test,
                ];
            }),
            [
                null,
                null,
            ],
        );
    });
});
