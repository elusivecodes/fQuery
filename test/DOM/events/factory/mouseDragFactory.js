const assert = require('assert');
const { exec } = require('../../../setup');

describe('#mouseDragFactory', function() {

    it('creates a mouse drag event', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(_ => {
                        result++;
                    })
                );
                document.body.dispatchEvent(downEvent);
                return result;
            }),
            1
        );
    });

    it('creates a mouse drag event with move event', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                const moveEvent = new Event('mousemove', {
                    bubbles: true
                });
                const upEvent = new Event('mouseup', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(
                        null,
                        _ => {
                            result++;
                        },
                        null,
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(upEvent);
                return result;
            }),
            2
        );
    });

    it('creates a mouse drag event with up event', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                const moveEvent = new Event('mousemove', {
                    bubbles: true
                });
                const upEvent = new Event('mouseup', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(
                        null,
                        null,
                        _ => {
                            result++;
                        },
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(upEvent);
                return result;
            }),
            1
        );
    });

    it('does not run callbacks if down callback returns false', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                const moveEvent = new Event('mousemove', {
                    bubbles: true
                });
                const upEvent = new Event('mouseup', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(
                        _ => false,
                        _ => {
                            result++;
                        },
                        _ => {
                            result++;
                        },
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(upEvent);
                return result;
            }),
            0
        );
    });

    it('removes move event on mouseup', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                const moveEvent = new Event('mousemove', {
                    bubbles: true
                });
                const upEvent = new Event('mouseup', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(
                        null,
                        _ => {
                            result++;
                        },
                        null,
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(upEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(moveEvent);
                return result;
            }),
            0
        );
    });

    it('does not remove callbacks if up callback returns false', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                const moveEvent = new Event('mousemove', {
                    bubbles: true
                });
                const upEvent = new Event('mouseup', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(
                        _ => { },
                        _ => {
                            result++;
                        },
                        _ => {
                            return result > 1;
                        },
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(upEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(upEvent);
                return result;
            }),
            3
        );
    });

    it('removes up event on mouseup', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('mousedown');
                const upEvent = new Event('mouseup', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'mousedown',
                    dom.mouseDragFactory(
                        null,
                        null,
                        _ => {
                            result++;
                        },
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(upEvent);
                document.body.dispatchEvent(upEvent);
                return result;
            }),
            1
        );
    });

    it('works with touch events', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const downEvent = new Event('touchstart');
                const moveEvent = new Event('touchmove', {
                    bubbles: true
                });
                const upEvent = new Event('touchend', {
                    bubbles: true
                });
                dom.addEvent(
                    document.body,
                    'touchstart',
                    dom.mouseDragFactory(
                        _ => {
                            result++;
                        },
                        _ => {
                            result++;
                        },
                        _ => {
                            result++;
                        },
                        { debounce: false }
                    )
                );
                document.body.dispatchEvent(downEvent);
                document.body.dispatchEvent(moveEvent);
                document.body.dispatchEvent(upEvent);
                return result;
            }),
            3
        );
    });

});