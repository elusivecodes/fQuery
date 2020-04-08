const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Events', function() {

    describe('#blur', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1">' +
                    '<input type="text" id="test2">';
            });
        });

        it('triggers a blur event on the first node', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('blur', _ => {
                        result = true;
                    });
                    element.focus();
                    dom.blur(
                        'input'
                    );
                    return result;
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('blur', _ => {
                        result = true;
                    });
                    element.focus();
                    dom.blur(
                        document.getElementById('test1')
                    );
                    return result;
                }),
                true
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('blur', _ => {
                        result = true;
                    });
                    element.focus();
                    dom.blur(
                        document.body.children
                    );
                    return result;
                }),
                true
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('blur', _ => {
                        result = true;
                    });
                    element.focus();
                    dom.blur(
                        document.querySelectorAll('input')
                    );
                    return result;
                }),
                true
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('blur', _ => {
                        result = true;
                    });
                    element.focus();
                    dom.blur(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                    return result;
                }),
                true
            );
        });

    });

    describe('#click', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>';
            });
        });

        it('triggers a click event on the first node', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('click', _ => {
                        result = true;
                    });
                    dom.click(
                        'a'
                    );
                    return result;
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('click', _ => {
                        result = true;
                    });
                    dom.click(
                        document.getElementById('test1')
                    );
                    return result;
                }),
                true
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('click', _ => {
                        result = true;
                    });
                    dom.click(
                        document.body.children
                    );
                    return result;
                }),
                true
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('click', _ => {
                        result = true;
                    });
                    dom.click(
                        document.querySelectorAll('a')
                    );
                    return result;
                }),
                true
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('click', _ => {
                        result = true;
                    });
                    dom.click(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                    return result;
                }),
                true
            );
        });

    });

    describe('#focus', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1">' +
                    '<input type="text" id="test2">';
            });
        });

        it('triggers a focus event on the first node', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('focus', _ => {
                        result = true;
                    });
                    dom.focus('input');
                    return result;
                }),
                true
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('focus', _ => {
                        result = true;
                    });
                    dom.focus(
                        document.getElementById('test1')
                    );
                    return result;
                }),
                true
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('focus', _ => {
                        result = true;
                    });
                    dom.focus(
                        document.body.children
                    );
                    return result;
                }),
                true
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('focus', _ => {
                        result = true;
                    });
                    dom.focus(
                        document.querySelectorAll('input')
                    );
                    return result;
                }),
                true
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    const element = document.getElementById('test1');
                    element.addEventListener('focus', _ => {
                        result = true;
                    });
                    dom.focus(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                    return result;
                }),
                true
            );
        });

    });

    describe('#ready', function() {

        it('executes a callback when ready', async function() {
            assert.equal(
                await exec(_ => {
                    let result;
                    dom.ready(_ => {
                        result = true;
                    });
                    return result;
                }),
                true
            );
        });

    });

});