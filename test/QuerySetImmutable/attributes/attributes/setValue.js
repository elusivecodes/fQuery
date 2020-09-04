const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #setValue', function() {

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
                dom.query('input')
                    .setValue('Test');
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
                dom.query('textarea')
                    .setValue('Test');
                return document.getElementById('test3').value;
            }),
            'Test'
        );
    });

    it('works with select input nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('select')
                    .setValue(2);
                return document.getElementById('test4').value;
            }),
            '2'
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('input');
                return query === query.setValue('Test');
            }),
            true
        );
    });

});