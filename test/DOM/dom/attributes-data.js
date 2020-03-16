const assert = require('assert').strict;
const exec = require('../../setup');

describe('DOM Attributes (Data)', function() {

    describe('#cloneData', function() {

        it('clones data from all nodes to all other nodes');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#getData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1"></div>' +
                    '<div id="test2"></div>';
                DOM._data.set(
                    document.getElementById('test1'),
                    {
                        test: 'Test 1'
                    }
                );
            });
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
            )
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
            )
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        document.getElementById('test1'),
                        'test'
                    );
                }),
                'Test 1'
            )
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        document.body.children,
                        'test'
                    );
                }),
                'Test 1'
            )
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getData(
                        document.querySelectorAll('div'),
                        'test'
                    );
                }),
                'Test 1'
            )
        });

        it('works with array', async function() {
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
            )
        });

    });

    describe('#removeData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1"></div>' +
                    '<div id="test2"></div>';
                DOM._data.set(
                    document.getElementById('test1'),
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
                DOM._data.set(
                    document.getElementById('test2'),
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
            });
        });

        it('removes data for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        'div',
                        'testA'
                    );
                    return [
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

        it('removes all data for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        'div'
                    );
                    return [
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
                    ];
                }),
                [
                    null,
                    null
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        document.getElementById('test1'),
                        'testA'
                    );
                    return DOM._data.get(
                        document.getElementById('test1')
                    );
                }),
                {
                    testB: 'Test 2'
                }
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        document.body.children,
                        'testA'
                    );
                    return [
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.removeData(
                        document.querySelectorAll('div'),
                        'testA'
                    );
                    return [
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

        it('works with array', async function() {
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
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

    });

    describe('#setData', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1"></div>' +
                    '<div id="test2"></div>';
            });
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
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document.getElementById('test1'),
                        'test',
                        'Test 1'
                    );
                    return DOM._data.get(
                        document.getElementById('test1')
                    );
                }),
                {
                    test: 'Test 1'
                }
            );
        });

        it('works with HTMLCollection', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document.body.children,
                        'test',
                        'Test 1'
                    );
                    return [
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

        it('works with NodeList', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setData(
                        document.querySelectorAll('div'),
                        'test',
                        'Test 1'
                    );
                    return [
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

        it('works with array', async function() {
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
                        DOM._data.get(
                            document.getElementById('test1')
                        ),
                        DOM._data.get(
                            document.getElementById('test2')
                        )
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

    });

});