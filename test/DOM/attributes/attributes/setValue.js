const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setValue', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="text" id="test2">' +
                '<textarea id="test3"></textarea>' +
                '<select id="test4"><option value="1">1</option><option value="2">2</option></select>';
        });
    });

    it('sets the input value for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setValue('input', 'Test');
                return [
                    document.getElementById('test1').value,
                    document.getElementById('test2').value
                ]
            }),
            [
                'Test',
                'Test'
            ]
        );
    });

    it('works with textarea input nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setValue('textarea', 'Test');
                return document.getElementById('test3').value;
            }),
            'Test'
        );
    });

    it('works with select input nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setValue('select', 2);
                return document.getElementById('test4').value;
            }),
            '2'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element = document.getElementById('test1');
                dom.setValue(element, 'Test');
                return [
                    element.value,
                    document.getElementById('test2').value
                ]
            }),
            [
                'Test',
                ''
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setValue(
                    document.querySelectorAll('input'),
                    'Test'
                );
                return [
                    document.getElementById('test1').value,
                    document.getElementById('test2').value
                ]
            }),
            [
                'Test',
                'Test'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setValue(
                    document.body.children,
                    'Test'
                );
                return [
                    document.getElementById('test1').value,
                    document.getElementById('test2').value
                ]
            }),
            [
                'Test',
                'Test'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setValue([
                    element1,
                    element2
                ], 'Test');
                return [
                    element1.value,
                    element2.value
                ]
            }),
            [
                'Test',
                'Test'
            ]
        );
    });

});