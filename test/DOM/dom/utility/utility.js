const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Selection', function() {

    describe('#execute', function() {

    });

    describe('#forceShow', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<style>' +
                    '.test { display: none; }' +
                    '</style>' +
                    '<div id="div1"></div>' +
                    '<div id="div2" class="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" class="test"></div>';
            });
        });

        it('temporarily forces the first node to be visible', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.forceShow(
                        '.test',
                        _ => {
                            return document.body.innerHTML;
                        }
                    );
                }),
                '<style>' +
                '.test { display: none; }' +
                '</style>' +
                '<div id="div1"></div>' +
                '<div id="div2" class="test" style="display: initial !important;"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" class="test"></div>'
            );
        });

    });

    describe('#index', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2" class="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" class="test"></div>';
            });
        });

        it('returns the index of the first node relative to the parent', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.index(
                        '.test'
                    );
                }),
                1
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.index(
                        document.getElementById('div2')
                    );
                }),
                1
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.index(
                        document.body.children
                    );
                }),
                0
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.index(
                        document.querySelectorAll('.test')
                    );
                }),
                1
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.index(
                        [
                            document.getElementById('div2'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                1
            );
        });

    });

    describe('#indexOf', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2" class="test"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4" class="test"></div>';
            });
        });

        it('returns the index of the first node matching a filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        'div',
                        '.test'
                    );
                }),
                1
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        document.getElementById('div2'),
                        '.test'
                    );
                }),
                0
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        document.body.children,
                        '.test'
                    );
                }),
                1
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        document.querySelectorAll('div'),
                        '.test'
                    );
                }),
                1
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('div3'),
                            document.getElementById('div4')
                        ],
                        '.test'
                    );
                }),
                1
            );
        });

        it('works with function filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        'div',
                        node => node.id === 'div2'
                    );
                }),
                1
            );
        });

        it('works with HTMLElement filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        'div',
                        document.getElementById('div2')
                    );
                }),
                1
            );
        });

        it('works with HTMLCollection filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        'div',
                        document.body.children
                    );
                }),
                0
            );
        });

        it('works with NodeList filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        'div',
                        document.querySelectorAll('.test')
                    );
                }),
                1
            );
        });

        it('works with array filter', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.indexOf(
                        'div',
                        [
                            document.getElementById('div2'),
                            document.getElementById('div4')
                        ]
                    );
                }),
                1
            );
        });

    });

    describe('#normalize', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1" class="test">' +
                    '<div id="child1"></div>' +
                    '</div>' +
                    '<div id="parent2" class="test">' +
                    '<div id="child2"></div>' +
                    '</div>';
                const child1 = document.getElementById('child1');
                const child2 = document.getElementById('child2');
                const text1 = document.createTextNode('Test 1');
                const text2 = document.createTextNode('Test 2');
                const text3 = document.createTextNode('Test 3');
                const text4 = document.createTextNode('Test 4');
                const text5 = document.createTextNode('Test 5');
                const text6 = document.createTextNode('Test 6');
                const text7 = document.createTextNode('Test 7');
                const text8 = document.createTextNode('Test 8');
                const span1 = document.createElement('span');
                const span2 = document.createElement('span');

                child1.appendChild(text1);
                child1.appendChild(text2);
                child1.appendChild(span1);
                child1.appendChild(text3);
                child1.appendChild(text4);

                child2.appendChild(text5);
                child2.appendChild(text6);
                child2.appendChild(span2);
                child2.appendChild(text7);
                child2.appendChild(text8);
            });
        });

        it('normalizes all text nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.normalize(
                        '.test'
                    );
                    return [
                        document.getElementById('child1').childNodes.length,
                        document.getElementById('child2').childNodes.length
                    ]
                }),
                [
                    3,
                    3
                ]
            );
        });

        it('retains HTML contents', async function() {
            assert.equal(
                await exec(_ => {
                    dom.normalize(
                        '.test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="parent1" class="test">' +
                '<div id="child1">' +
                'Test 1Test 2<span></span>Test 3Test 4' +
                '</div>' +
                '</div>' +
                '<div id="parent2" class="test">' +
                '<div id="child2">' +
                'Test 5Test 6<span></span>Test 7Test 8' +
                '</div>' +
                '</div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.normalize(
                        document.getElementById('parent1')
                    );
                    return [
                        document.getElementById('child1').childNodes.length,
                        document.getElementById('child2').childNodes.length
                    ]
                }),
                [
                    3,
                    5
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.normalize(
                        document.querySelectorAll('.test')
                    );
                    return [
                        document.getElementById('child1').childNodes.length,
                        document.getElementById('child2').childNodes.length
                    ]
                }),
                [
                    3,
                    3
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.normalize(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ]
                    );
                    return [
                        document.getElementById('child1').childNodes.length,
                        document.getElementById('child2').childNodes.length
                    ]
                }),
                [
                    3,
                    3
                ]
            );
        });

    });

    describe('#sanitize', function() {

    });

    describe('#serialize', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<form id="form">' +
                    '<div>' +
                    '<input name="test1" type="text" id="test1" value="Test 1">' +
                    '</div>' +
                    '<div>' +
                    '<input name="test2" type="number" id="test2" value="2">' +
                    '</div>' +
                    '<div>' +
                    '<textarea name="test3" id="test3">Test 3</textarea>' +
                    '</div>' +
                    '<div>' +
                    '<select name="test4" id="test4"><option value="41">1</option><option value="42" selected>2</option></select>' +
                    '</div>' +
                    '<div>' +
                    '<select name="test5[]" id="test5" multiple="true"><option value="51" selected>1</option><option value="52" selected>2</option></select>' +
                    '</div>' +
                    '<div>' +
                    '<input name="test6" type="checkbox" id="test6" value="Test 6" checked>' +
                    '</div>' +
                    '<div>' +
                    '<input name="test7" type="checkbox" id="test7" value="Test 7">' +
                    '</div>' +
                    '<div>' +
                    '<input name="test8" type="radio" id="test8a" value="Test 8a">' +
                    '<input name="test8" type="radio" id="test8b" value="Test 8b" checked>' +
                    '</div>' +
                    '<div>' +
                    '<input name="test9[]" type="text" id="test9a" value="Test 9a">' +
                    '<input name="test9[]" type="text" id="test9b" value="Test 9b">' +
                    '</div>' +
                    '</form>';
            });
        });

        it('returns a serialized string of all form elements', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.serialize(
                        'form'
                    );
                }),
                'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.serialize(
                        document.getElementById('form')
                    );
                }),
                'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.serialize(
                        document.body.children
                    );
                }),
                'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.serialize(
                        document.querySelectorAll('input, textarea, select')
                    );
                }),
                'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.serialize(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4'),
                            document.getElementById('test5'),
                            document.getElementById('test6'),
                            document.getElementById('test7'),
                            document.getElementById('test8a'),
                            document.getElementById('test8b'),
                            document.getElementById('test9a'),
                            document.getElementById('test9b')
                        ]
                    );
                }),
                'test1=Test%201&test2=2&test3=Test%203&test4=42&test5%5B%5D=51&test5%5B%5D=52&test6=Test%206&test8=Test%208b&test9%5B%5D=Test%209a&test9%5B%5D=Test%209b'
            );
        });

    });

    describe('#serializeArray', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<form id="form">' +
                    '<div>' +
                    '<input name="test1" type="text" id="test1" value="Test 1">' +
                    '</div>' +
                    '<div>' +
                    '<input name="test2" type="number" id="test2" value="2">' +
                    '</div>' +
                    '<div>' +
                    '<textarea name="test3" id="test3">Test 3</textarea>' +
                    '</div>' +
                    '<div>' +
                    '<select name="test4" id="test4"><option value="41">1</option><option value="42" selected>2</option></select>' +
                    '</div>' +
                    '<div>' +
                    '<select name="test5[]" id="test5" multiple="true"><option value="51" selected>1</option><option value="52" selected>2</option></select>' +
                    '</div>' +
                    '<div>' +
                    '<input name="test6" type="checkbox" id="test6" value="Test 6" checked>' +
                    '</div>' +
                    '<div>' +
                    '<input name="test7" type="checkbox" id="test7" value="Test 7">' +
                    '</div>' +
                    '<div>' +
                    '<input name="test8" type="radio" id="test8a" value="Test 8a">' +
                    '<input name="test8" type="radio" id="test8b" value="Test 8b" checked>' +
                    '</div>' +
                    '<div>' +
                    '<input name="test9[]" type="text" id="test9a" value="Test 9a">' +
                    '<input name="test9[]" type="text" id="test9b" value="Test 9b">' +
                    '</div>' +
                    '</form>';
            });
        });

        it('returns a serialized string of all form elements', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.serializeArray(
                        'form'
                    );
                }),
                [
                    {
                        name: 'test1',
                        value: 'Test 1'
                    },
                    {
                        name: 'test2',
                        value: '2'
                    },
                    {
                        name: 'test3',
                        value: 'Test 3'
                    },
                    {
                        name: 'test4',
                        value: '42'
                    },
                    {
                        name: 'test5[]',
                        value: '51'
                    },
                    {
                        name: 'test5[]',
                        value: '52'
                    },
                    {
                        name: 'test6',
                        value: 'Test 6'
                    },
                    {
                        name: 'test8',
                        value: 'Test 8b'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9a'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9b'
                    }
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.serializeArray(
                        document.getElementById('form')
                    );
                }),
                [
                    {
                        name: 'test1',
                        value: 'Test 1'
                    },
                    {
                        name: 'test2',
                        value: '2'
                    },
                    {
                        name: 'test3',
                        value: 'Test 3'
                    },
                    {
                        name: 'test4',
                        value: '42'
                    },
                    {
                        name: 'test5[]',
                        value: '51'
                    },
                    {
                        name: 'test5[]',
                        value: '52'
                    },
                    {
                        name: 'test6',
                        value: 'Test 6'
                    },
                    {
                        name: 'test8',
                        value: 'Test 8b'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9a'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9b'
                    }
                ]
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.serializeArray(
                        document.body.children
                    );
                }),
                [
                    {
                        name: 'test1',
                        value: 'Test 1'
                    },
                    {
                        name: 'test2',
                        value: '2'
                    },
                    {
                        name: 'test3',
                        value: 'Test 3'
                    },
                    {
                        name: 'test4',
                        value: '42'
                    },
                    {
                        name: 'test5[]',
                        value: '51'
                    },
                    {
                        name: 'test5[]',
                        value: '52'
                    },
                    {
                        name: 'test6',
                        value: 'Test 6'
                    },
                    {
                        name: 'test8',
                        value: 'Test 8b'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9a'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9b'
                    }
                ]
            );
        });

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.serializeArray(
                        document.querySelectorAll('input, textarea, select')
                    );
                }),
                [
                    {
                        name: 'test1',
                        value: 'Test 1'
                    },
                    {
                        name: 'test2',
                        value: '2'
                    },
                    {
                        name: 'test3',
                        value: 'Test 3'
                    },
                    {
                        name: 'test4',
                        value: '42'
                    },
                    {
                        name: 'test5[]',
                        value: '51'
                    },
                    {
                        name: 'test5[]',
                        value: '52'
                    },
                    {
                        name: 'test6',
                        value: 'Test 6'
                    },
                    {
                        name: 'test8',
                        value: 'Test 8b'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9a'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9b'
                    }
                ]
            );
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.serializeArray(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2'),
                            document.getElementById('test3'),
                            document.getElementById('test4'),
                            document.getElementById('test5'),
                            document.getElementById('test6'),
                            document.getElementById('test7'),
                            document.getElementById('test8a'),
                            document.getElementById('test8b'),
                            document.getElementById('test9a'),
                            document.getElementById('test9b')
                        ]
                    );
                }),
                [
                    {
                        name: 'test1',
                        value: 'Test 1'
                    },
                    {
                        name: 'test2',
                        value: '2'
                    },
                    {
                        name: 'test3',
                        value: 'Test 3'
                    },
                    {
                        name: 'test4',
                        value: '42'
                    },
                    {
                        name: 'test5[]',
                        value: '51'
                    },
                    {
                        name: 'test5[]',
                        value: '52'
                    },
                    {
                        name: 'test6',
                        value: 'Test 6'
                    },
                    {
                        name: 'test8',
                        value: 'Test 8b'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9a'
                    },
                    {
                        name: 'test9[]',
                        value: 'Test 9b'
                    }
                ]
            );
        });

    });

    describe('#sort', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3"></div>' +
                    '<div id="div4"></div>';
            });
        });

        it('returns nodes sorted by the order they appear in the DOM', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.sort(
                        'div'
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2',
                    'div3',
                    'div4'
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.sort(
                        document.getElementById('div2')
                    ).map(node => node.id);
                }),
                [
                    'div2'
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.sort(
                        document.body.children
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2',
                    'div3',
                    'div4'
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.sort(
                        document.querySelectorAll('div')
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2',
                    'div3',
                    'div4'
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.sort(
                        [
                            document.getElementById('div3'),
                            document.getElementById('div4'),
                            document.getElementById('div2'),
                            document.getElementById('div1')
                        ]
                    ).map(node => node.id);
                }),
                [
                    'div1',
                    'div2',
                    'div3',
                    'div4'
                ]
            );
        });

    });

    describe('#tagName', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>';
            });
        });

        it('returns the tag name of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.tagName(
                        'div'
                    );
                }),
                'DIV'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.tagName(
                        document.getElementById('span1')
                    );
                }),
                'SPAN'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.tagName(
                        document.body.children
                    );
                }),
                'DIV'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.tagName(
                        document.querySelectorAll('div')
                    );
                }),
                'DIV'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.tagName(
                        [
                            document.getElementById('div1'),
                            document.getElementById('div2'),
                            document.getElementById('span1'),
                            document.getElementById('span2')
                        ]
                    );
                }),
                'DIV'
            );
        });

    });

});