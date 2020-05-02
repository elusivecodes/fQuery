const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Find', function() {

    describe('#find', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1" class="span1 group1">' +
                    '<a id="a1" class="group1">' +
                    '<strong id="strong1" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a2" class="group1">' +
                    '<strong id="strong2" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a3" class="group1" data-toggle="test">' +
                    '<strong id="strong3" class="group1"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span2" class="span1 group1">' +
                    '<a id="a4" class="group1">' +
                    '<strong id="strong4" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a5" class="group1">' +
                    '<strong id="strong5" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a6" class="group1" data-toggle="test">' +
                    '<strong id="strong6" class="group1"></strong>' +
                    '</a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="span3" class="span1 group1">' +
                    '<a id="a7" class="group1">' +
                    '<strong id="strong7" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a8" class="group1">' +
                    '<strong id="strong8" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a9" class="group1" data-toggle="test">' +
                    '<strong id="strong9" class="group1"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span4" class="span1 group1"></span>' +
                    '</div>' +
                    '<div id="child3">' +
                    '<span id="span5" class="span1 group1"></span>' +
                    '<span id="span6" class="span1 group1"></span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child4">' +
                    '<span id="span7" class="span2 group2">' +
                    '<a id="a10" class="group2">' +
                    '<strong id="strong10" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a11" class="group2">' +
                    '<strong id="strong11" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a12" class="group2" data-toggle="test">' +
                    '<strong id="strong12" class="group2"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span8" class="span2 group2">' +
                    '<a id="a13" class="group2">' +
                    '<strong id="strong13" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a14" class="group2">' +
                    '<strong id="strong14" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a15" class="group2" data-toggle="test">' +
                    '<strong id="strong15" class="group2"></strong>' +
                    '</a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="child5">' +
                    '<span id="span9" class="span2 group2">' +
                    '<a id="a16" class="group2">' +
                    '<strong id="strong16" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a17" class="group2">' +
                    '<strong id="strong17" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a18" class="group2" data-toggle="test">' +
                    '<strong id="strong18" class="group2"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span10" class="span2 group2"></span>' +
                    '</div>' +
                    '<div id="child6">' +
                    '<span id="span11" class="span2 group2"></span>' +
                    '<span id="span12" class="span2 group2"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by query selector', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        '#parent1 > #child1 > span, #parent1 > #child2 > span'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4'
                ]
            );
        });

        it('finds elements by custom child selector', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        '> .group1 > .group1, > .group2 > .group2',
                        '#child1, #child4'
                    ).map(node => node.id);
                }),
                [
                    'a1',
                    'a2',
                    'a3',
                    'a4',
                    'a5',
                    'a6',
                    'a10',
                    'a11',
                    'a12',
                    'a13',
                    'a14',
                    'a15'
                ]
            );
        });

        it('finds elements by ID', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        '#parent1'
                    ).map(node => node.id);
                }),
                [
                    'parent1'
                ]
            );
        });

        it('finds elements by class name', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        '.span1'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4',
                    'span5',
                    'span6'
                ]
            );
        });

        it('finds elements by tag name', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4',
                    'span5',
                    'span6',
                    'span7',
                    'span8',
                    'span9',
                    'span10',
                    'span11',
                    'span12'
                ]
            );
        });

        it('returns an empty array for non-matching selector', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        '#invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('returns an empty array for empty nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span',
                        '#invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('works with query selector nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span',
                        '#parent1 > #child1'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2'
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span',
                        document.getElementById('child1')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2'
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span',
                        document.getElementById('parent1').children
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4',
                    'span5',
                    'span6'
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span',
                        document.querySelectorAll('#parent1 > div')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4',
                    'span5',
                    'span6'
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.find(
                        'span',
                        [
                            document.getElementById('child1'),
                            document.getElementById('child2'),
                            document.getElementById('child3')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4',
                    'span5',
                    'span6'
                ]
            );
        });

    });

    describe('#findByClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1" class="test"></span>' +
                    '<span id="span2"></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="span3" class="test"></span>' +
                    '<span id="span4"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child3">' +
                    '<span id="span5" class="test"></span>' +
                    '<span id="span6"></span>' +
                    '</div>' +
                    '<div id="child3">' +
                    '<span id="span7" class="test"></span>' +
                    '<span id="span8"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by class name', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span3',
                    'span5',
                    'span7'
                ]
            );
        });

        it('works with query selector', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test',
                        '#parent1'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test',
                        document.getElementById('parent1')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test',
                        document.getElementById('parent1').children
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test',
                        document.querySelectorAll('#parent1')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test',
                        [
                            document.getElementById('child1'),
                            document.getElementById('child2')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('returns an empty array for non-matching class', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('returns an empty array for empty nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByClass(
                        'test',
                        '#invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

    });

    describe('#findById', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="test" data-id="span1"></span>' +
                    '<span data-id="span2"></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="test" data-id="span3"></span>' +
                    '<span data-id="span4"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child3">' +
                    '<span id="test" data-id="span5"></span>' +
                    '<span data-id="span6"></span>' +
                    '</div>' +
                    '<div id="child4">' +
                    '<span id="test" data-id="span7"></span>' +
                    '<span data-id="span8"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by ID', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span1',
                    'span3',
                    'span5',
                    'span7'
                ]
            );
        });

        it('returns an empty array for non-matching id', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('returns an empty array for empty nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test',
                        '#invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('works with query selector nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test',
                        '#parent1'
                    ).map(node => node.dataset.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test',
                        document.getElementById('parent1')
                    ).map(node => node.dataset.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test',
                        document.getElementById('parent1').children
                    ).map(node => node.dataset.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test',
                        document.querySelectorAll('#parent1')
                    ).map(node => node.dataset.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findById(
                        'test',
                        [
                            document.getElementById('child1'),
                            document.getElementById('child2')
                        ]
                    ).map(node => node.dataset.id);
                }),
                [
                    'span1',
                    'span3'
                ]
            );
        });

    });

    describe('#findByTag', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="span3"></span>' +
                    '<span id="span4"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child3">' +
                    '<span id="span5"></span>' +
                    '<span id="span6"></span>' +
                    '</div>' +
                    '<div id="child4">' +
                    '<span id="span7"></span>' +
                    '<span id="span8"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by tag name', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'span'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4',
                    'span5',
                    'span6',
                    'span7',
                    'span8'
                ]
            );
        });

        it('returns an empty array for non-matching tag', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('returns an empty array for empty nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'test',
                        '#invalid'
                    ).map(node => node.id);
                }),
                []
            );
        });

        it('works with query selector nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'span',
                        '#parent1'
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4'
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'span',
                        document.getElementById('parent1')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4'
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'span',
                        document.getElementById('parent1').children
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4'
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'span',
                        document.querySelectorAll('#parent1')
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4'
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.findByTag(
                        'span',
                        [
                            document.getElementById('child1'),
                            document.getElementById('child2')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'span1',
                    'span2',
                    'span3',
                    'span4'
                ]
            );
        });

    });

    describe('#findOne', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1" class="span1 group1">' +
                    '<a id="a1" class="group1">' +
                    '<strong id="strong1" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a2" class="group1">' +
                    '<strong id="strong2" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a3" class="group1" data-toggle="test">' +
                    '<strong id="strong3" class="group1"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span2" class="span1 group1">' +
                    '<a id="a4" class="group1">' +
                    '<strong id="strong4" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a5" class="group1">' +
                    '<strong id="strong5" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a6" class="group1" data-toggle="test">' +
                    '<strong id="strong6" class="group1"></strong>' +
                    '</a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="span3" class="span1 group1">' +
                    '<a id="a7" class="group1">' +
                    '<strong id="strong7" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a8" class="group1">' +
                    '<strong id="strong8" class="group1"></strong>' +
                    '</a>' +
                    '<a id="a9" class="group1" data-toggle="test">' +
                    '<strong id="strong9" class="group1"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span4" class="span1 group1"></span>' +
                    '</div>' +
                    '<div id="child3">' +
                    '<span id="span5" class="span1 group1"></span>' +
                    '<span id="span6" class="span1 group1"></span>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child4">' +
                    '<span id="span7" class="span2 group2">' +
                    '<a id="a10" class="group2">' +
                    '<strong id="strong10" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a11" class="group2">' +
                    '<strong id="strong11" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a12" class="group2" data-toggle="test">' +
                    '<strong id="strong12" class="group2"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span8" class="span2 group2">' +
                    '<a id="a13" class="group2">' +
                    '<strong id="strong13" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a14" class="group2">' +
                    '<strong id="strong14" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a15" class="group2" data-toggle="test">' +
                    '<strong id="strong15" class="group2"></strong>' +
                    '</a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="child5">' +
                    '<span id="span9" class="span2 group2">' +
                    '<a id="a16" class="group2">' +
                    '<strong id="strong16" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a17" class="group2">' +
                    '<strong id="strong17" class="group2"></strong>' +
                    '</a>' +
                    '<a id="a18" class="group2" data-toggle="test">' +
                    '<strong id="strong18" class="group2"></strong>' +
                    '</a>' +
                    '</span>' +
                    '<span id="span10" class="span2 group2"></span>' +
                    '</div>' +
                    '<div id="child6">' +
                    '<span id="span11" class="span2 group2"></span>' +
                    '<span id="span12" class="span2 group2"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by query selector', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        '#parent1 > #child1 > span, #parent1 > #child2 > span'
                    ).id;
                }),
                'span1'
            );
        });

        it('finds elements by custom child selector', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        '> .group1 > .group1, > .group2 > .group2',
                        '#child1, #child4'
                    ).id;
                }),
                'a1'
            );
        });

        it('finds elements by ID', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        '#parent1'
                    ).id;
                }),
                'parent1'
            );
        });

        it('finds elements by class name', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        '.span1'
                    ).id;
                }),
                'span1'
            );
        });

        it('finds elements by tag name', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span'
                    ).id;
                }),
                'span1'
            );
        });

        it('returns null for non-matching selector', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        '#invalid'
                    );
                }),
                null
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span',
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with query selector nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span',
                        '#parent1 > #child2'
                    ).id;
                }),
                'span3'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span',
                        document.getElementById('child2')
                    ).id;
                }),
                'span3'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span',
                        document.getElementById('parent2').children
                    ).id;
                }),
                'span7'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span',
                        document.querySelectorAll('#parent2 > div')
                    ).id;
                }),
                'span7'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOne(
                        'span',
                        [
                            document.getElementById('child4'),
                            document.getElementById('child5'),
                            document.getElementById('child6')
                        ]
                    ).id;
                }),
                'span7'
            );
        });

    });

    describe('#findOneByClass', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1" class="test"></span>' +
                    '<span id="span2"></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="span3" class="test"></span>' +
                    '<span id="span4"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child3">' +
                    '<span id="span5" class="test"></span>' +
                    '<span id="span6"></span>' +
                    '</div>' +
                    '<div id="child4">' +
                    '<span id="span7" class="test"></span>' +
                    '<span id="span8"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by class name', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test'
                    ).id;
                }),
                'span1'
            );
        });

        it('returns null for non-matching class', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'invalid'
                    );
                }),
                null
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test',
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with query selector nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test',
                        '#parent2'
                    ).id;
                }),
                'span5'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test',
                        document.getElementById('parent2')
                    ).id;
                }),
                'span5'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test',
                        document.getElementById('parent2').children
                    ).id;
                }),
                'span5'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test',
                        document.querySelectorAll('#parent2')
                    ).id;
                }),
                'span5'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByClass(
                        'test',
                        [
                            document.getElementById('child3'),
                            document.getElementById('child4')
                        ]
                    ).id;
                }),
                'span5'
            );
        });

    });

    describe('#findOneById', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="test" data-id="span1"></span>' +
                    '<span data-id="span2"></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="test" data-id="span3"></span>' +
                    '<span data-id="span4"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child3">' +
                    '<span id="test" data-id="span5"></span>' +
                    '<span data-id="span6"></span>' +
                    '</div>' +
                    '<div id="child4">' +
                    '<span id="test" data-id="span7"></span>' +
                    '<span data-id="span8"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by ID', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test'
                    ).dataset.id;
                }),
                'span1'
            );
        });

        it('returns null for non-matching id', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'invalid'
                    );
                }),
                null
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test',
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with query selector nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test',
                        '#parent2'
                    ).dataset.id;
                }),
                'span5'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test',
                        document.getElementById('parent2')
                    ).dataset.id;
                }),
                'span5'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test',
                        document.getElementById('parent2').children
                    ).dataset.id;
                }),
                'span5'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test',
                        document.querySelectorAll('#parent2')
                    ).dataset.id;
                }),
                'span5'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneById(
                        'test',
                        [
                            document.getElementById('child3'),
                            document.getElementById('child4')
                        ]
                    ).dataset.id;
                }),
                'span5'
            );
        });

    });

    describe('#findOneByTag', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<div id="child1">' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>' +
                    '</div>' +
                    '<div id="child2">' +
                    '<span id="span3"></span>' +
                    '<span id="span4"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<div id="child3">' +
                    '<span id="span5"></span>' +
                    '<span id="span6"></span>' +
                    '</div>' +
                    '<div id="child4">' +
                    '<span id="span7"></span>' +
                    '<span id="span8"></span>' +
                    '</div>' +
                    '</div>';
            });
        });

        it('finds elements by tag name', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span'
                    ).id;
                }),
                'span1'
            );
        });

        it('returns null for non-matching tag', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'invalid'
                    );
                }),
                null
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span',
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with query selector nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span',
                        '#parent2'
                    ).id;
                }),
                'span5'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span',
                        document.getElementById('parent2')
                    ).id;
                }),
                'span5'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span',
                        document.getElementById('parent2').children
                    ).id;
                }),
                'span5'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span',
                        document.querySelectorAll('#parent2')
                    ).id;
                }),
                'span5'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.findOneByTag(
                        'span',
                        [
                            document.getElementById('child3'),
                            document.getElementById('child4')
                        ]
                    ).id;
                }),
                'span5'
            );
        });

    });

});