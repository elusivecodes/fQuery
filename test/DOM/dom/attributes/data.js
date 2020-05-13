const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Data)', function() {

    describe('#cloneData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="dataParent">' +
                    '<div id="test1" data-toggle="data"></div>' +
                    '<div id="test2" data-toggle="data"></div>' +
                    '</div>' +
                    '<div id="noDataParent">' +
                    '<div id="test3" data-toggle="noData"></div>' +
                    '<div id="test4" data-toggle="noData"></div>' +
                    '</div>';
                dom.setData(
                    '#test1',
                    'test1',
                    'Test 1'
                );
                dom.setData(
                    '#test2',
                    'test2',
                    'Test 2'
                );
            });
        });

        it('clones data from all nodes to all other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        document.getElementById('test1'),
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1'
                    },
                    {
                        test1: 'Test 1'
                    }
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        document.getElementById('dataParent').children,
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        document.querySelectorAll('[data-toggle="data"]'),
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    dom.setData(
                        fragment,
                        'test',
                        'Test 1'
                    );
                    dom.cloneData(
                        fragment,
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    dom.setData(
                        shadow,
                        'test',
                        'Test 1'
                    );
                    dom.cloneData(
                        shadow,
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with Document nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document,
                        'test',
                        'Test 1'
                    );
                    dom.cloneData(
                        document,
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with Window nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        window,
                        'test',
                        'Test 1'
                    );
                    dom.cloneData(
                        window,
                        '[data-toggle="noData"]'
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        document.getElementById('test3')
                    );
                    return dom.getData('#test3');
                }),
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        document.getElementById('noDataParent').children
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        document.querySelectorAll('[data-toggle="noData"]')
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with array other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        [
                            document.getElementById('test3'),
                            document.getElementById('test4')
                        ]
                    );
                    return [
                        dom.getData('#test3'),
                        dom.getData('#test4')
                    ];
                }),
                [
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    },
                    {
                        test1: 'Test 1',
                        test2: 'Test 2'
                    }
                ]
            );
        });

        it('works with DocumentFragment other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    dom.cloneData(
                        '[data-toggle="data"]',
                        fragment
                    );
                    return dom.getData(fragment);
                }),
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            );
        });

        it('works with ShadowRoot other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    dom.cloneData(
                        '[data-toggle="data"]',
                        shadow
                    );
                    return dom.getData(shadow);
                }),
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            );
        });

        it('works with Document other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        document
                    );
                    return dom.getData(document);
                }),
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            );
        });

        it('works with Window other nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.cloneData(
                        '[data-toggle="data"]',
                        window
                    );
                    return dom.getData(window);
                }),
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            );
        });

    });

    describe('#getData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
                dom.setData(
                    '#test1',
                    'test',
                    'Test 1'
                );
            });
        });

        it('returns an object with all data for the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getData(
                        'div'
                    );
                }),
                {
                    test: 'Test 1'
                }
            );
        });

        it('returns data for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        'div',
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('returns undefined for an undefined key', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        'div',
                        'invalid'
                    );
                }),
                undefined
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        '#invalid',
                        'test'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        document.getElementById('test1'),
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        document.body.children,
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        document.querySelectorAll('div'),
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    dom.setData(
                        fragment,
                        'test',
                        'Test 2'
                    );
                    return dom.getData(
                        fragment,
                        'test'
                    );
                }),
                'Test 2'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    dom.setData(
                        shadow,
                        'test',
                        'Test 2'
                    );
                    return dom.getData(
                        shadow,
                        'test'
                    );
                }),
                'Test 2'
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setData(
                        document,
                        'test',
                        'Test 2'
                    );
                    return dom.getData(
                        document,
                        'test'
                    );
                }),
                'Test 2'
            );
        });

        it('works with Window nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setData(
                        window,
                        'test',
                        'Test 2'
                    );
                    return dom.getData(
                        window,
                        'test'
                    );
                }),
                'Test 2'
            );
        });

    });

    describe('#removeData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
                dom.setData(
                    'div',
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
            });
        });

        it('removes all data for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        'div'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    null,
                    null
                ]
            );
        });

        it('removes data for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        'div',
                        'testA'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        testB: 'Test 2'
                    },
                    {
                        testB: 'Test 2'
                    }
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        document.getElementById('test1'),
                        'testA'
                    );
                    return dom.getData('#test1');
                }),
                {
                    testB: 'Test 2'
                }
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        document.body.children,
                        'testA'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        testB: 'Test 2'
                    },
                    {
                        testB: 'Test 2'
                    }
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        document.querySelectorAll('div'),
                        'testA'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        testB: 'Test 2'
                    },
                    {
                        testB: 'Test 2'
                    }
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'testA'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        testB: 'Test 2'
                    },
                    {
                        testB: 'Test 2'
                    }
                ]
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    dom.setData(
                        fragment,
                        {
                            testA: 'Test 1',
                            testB: 'Test 2'
                        }
                    );
                    dom.removeData(
                        fragment,
                        'testA'
                    );
                    return dom.getData(fragment);
                }),
                {
                    testB: 'Test 2'
                }
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    dom.setData(
                        shadow,
                        {
                            testA: 'Test 1',
                            testB: 'Test 2'
                        }
                    );
                    dom.removeData(
                        shadow,
                        'testA'
                    );
                    return dom.getData(shadow);
                }),
                {
                    testB: 'Test 2'
                }
            );
        });

        it('works with Document nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document,
                        {
                            testA: 'Test 1',
                            testB: 'Test 2'
                        }
                    );
                    dom.removeData(
                        document,
                        'testA'
                    );
                    return dom.getData(document);
                }),
                {
                    testB: 'Test 2'
                }
            );
        });

        it('works with Window nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        window,
                        {
                            testA: 'Test 1',
                            testB: 'Test 2'
                        }
                    );
                    dom.removeData(
                        window,
                        'testA'
                    );
                    return dom.getData(window);
                }),
                {
                    testB: 'Test 2'
                }
            );
        });

    });

    describe('#setData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('sets a data object for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        'div',
                        {
                            testA: 'Test 1',
                            testB: 'Test 2'
                        }
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    },
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                ]
            );
        });

        it('sets data for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        'div',
                        'test',
                        'Test 1'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document.getElementById('test1'),
                        'test',
                        'Test 1'
                    );
                    return dom.getData('#test1');
                }),
                {
                    test: 'Test 1'
                }
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document.body.children,
                        'test',
                        'Test 1'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document.querySelectorAll('div'),
                        'test',
                        'Test 1'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'test',
                        'Test 1'
                    );
                    return [
                        dom.getData('#test1'),
                        dom.getData('#test2')
                    ];
                }),
                [
                    {
                        test: 'Test 1'
                    },
                    {
                        test: 'Test 1'
                    }
                ]
            );
        });

        it('works with DocumentFragment nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const fragment = document.createDocumentFragment();
                    dom.setData(
                        fragment,
                        'test',
                        'Test 1'
                    );
                    return dom.getData(fragment);
                }),
                {
                    test: 'Test 1'
                }
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    dom.setData(
                        shadow,
                        'test',
                        'Test 1'
                    );
                    return dom.getData(shadow);
                }),
                {
                    test: 'Test 1'
                }
            );
        });

        it('works with Document nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document,
                        'test',
                        'Test 1'
                    );
                    return dom.getData(document);
                }),
                {
                    test: 'Test 1'
                }
            );
        });

        it('works with Window nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        window,
                        'test',
                        'Test 1'
                    );
                    return dom.getData(window);
                }),
                {
                    test: 'Test 1'
                }
            );
        });

    });

});