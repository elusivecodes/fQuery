const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySet #clone', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div class="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div class="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>';
        });
    });

    it('clones all nodes', async function() {
        assert.equal(
            await exec(_ => {
                const clones = dom.queryMutable('div')
                    .clone()
                    .get();
                for (const clone of clones) {
                    document.body.appendChild(clone);
                }
                return document.body.innerHTML;
            }),
            '<div class="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div class="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div class="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div class="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('shallow clones all nodes', async function() {
        assert.equal(
            await exec(_ => {
                const clones = dom.queryMutable('div')
                    .clone({
                        deep: false
                    })
                    .get();
                for (const clone of clones) {
                    document.body.appendChild(clone);
                }
                return document.body.innerHTML;
            }),
            '<div class="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div class="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div class="parent1"></div>' +
            '<div class="parent2"></div>'
        );
    });

    it('clones all nodes with events', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                const clones = dom.queryMutable('div')
                    .clone({
                        events: true
                    })
                    .get();
                for (const clone of clones) {
                    document.body.appendChild(clone);
                }
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            8
        );
    });

    it('clones all nodes with data', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData('a', 'test', 'Test');
                const clones = dom.queryMutable('div')
                    .clone({
                        data: true
                    })
                    .get();
                for (const clone of clones) {
                    document.body.appendChild(clone);
                }
                return [...document.querySelectorAll('a')].map(node =>
                    dom.getData(node, 'test')
                );
            }),
            [
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test'
            ]
        );
    });

    it('clones all nodes with animations', async function() {
        await exec(_ => {
            dom.animate(
                'a',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
            const clones = dom.queryMutable('a')
                .clone({
                    animations: true
                })
                .get();
            for (const clone of clones) {
                document.body.appendChild(clone);
            }
        }).then(waitFor(50)).then(async _ => {
            await testAnimation('.parent1 > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('.parent1 > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('.parent2 > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('.parent2 > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(4)', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('.parent1 > a:nth-of-type(1)');
            await testNoAnimation('.parent1 > a:nth-of-type(2)');
            await testNoAnimation('.parent2 > a:nth-of-type(1)');
            await testNoAnimation('.parent2 > a:nth-of-type(2)');
            await testNoAnimation('body > a:nth-of-type(1)');
            await testNoAnimation('body > a:nth-of-type(2)');
            await testNoAnimation('body > a:nth-of-type(3)');
            await testNoAnimation('body > a:nth-of-type(4)');
        });
    });

    it('returns a new QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.queryMutable('div');
                const query2 = query1.clone();
                return query2 instanceof QuerySet && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                const clones = dom.queryMutable(fragment)
                    .clone()
                    .get();
                document.body.appendChild(fragment);
                for (const clone of clones) {
                    document.body.appendChild(clone);
                }
                return document.body.innerHTML;
            }),
            '<div class="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div class="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div><span></span></div>' +
            '<div><span></span></div>'
        );
    });

});