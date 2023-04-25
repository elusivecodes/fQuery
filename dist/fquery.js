(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fQuery = factory());
})(this, (function () { 'use strict';

    /**
     * Testing methods
     */

    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    const COMMENT_NODE = 8;
    const DOCUMENT_NODE = 9;
    const DOCUMENT_FRAGMENT_NODE = 11;

    /**
     * Returns true if the value is an array.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
     */
    const isArray = Array.isArray;

    /**
     * Returns true if the value is array-like.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is array-like, otherwise FALSE.
     */
    const isArrayLike = (value) =>
        isArray(value) ||
        (
            isObject(value) &&
            !isFunction(value) &&
            !isWindow(value) &&
            !isElement(value) &&
            (
                (
                    Symbol.iterator in value &&
                    isFunction(value[Symbol.iterator])
                ) ||
                (
                    'length' in value &&
                    isNumeric(value.length) &&
                    (
                        !value.length ||
                        value.length - 1 in value
                    )
                )
            )
        );

    /**
     * Returns true if the value is a Boolean.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is boolean, otherwise FALSE.
     */
    const isBoolean = (value) =>
        value === !!value;

    /**
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    const isDocument = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_NODE;

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    const isElement = (value) =>
        !!value &&
        value.nodeType === ELEMENT_NODE;

    /**
     * Returns true if the value is a DocumentFragment.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
     */
    const isFragment = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !value.host;

    /**
     * Returns true if the value is a function.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a function, otherwise FALSE.
     */
    const isFunction = (value) =>
        typeof value === 'function';

    /**
     * Returns true if the value is NaN.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
     */
    const isNaN = Number.isNaN;

    /**
     * Returns true if the value is a Node.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a Node, otherwise FALSE.
     */
    const isNode = (value) =>
        !!value &&
        (
            value.nodeType === ELEMENT_NODE ||
            value.nodeType === TEXT_NODE ||
            value.nodeType === COMMENT_NODE
        );

    /**
     * Returns true if the value is null.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is null, otherwise FALSE.
     */
    const isNull = (value) =>
        value === null;

    /**
     * Returns true if the value is numeric.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is numeric, otherwise FALSE.
     */
    const isNumeric = (value) =>
        !isNaN(parseFloat(value)) &&
        isFinite(value);

    /**
     * Returns true if the value is an object.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is an object, otherwise FALSE.
     */
    const isObject = (value) =>
        !!value &&
        value === Object(value);

    /**
     * Returns true if the value is a plain object.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a plain object, otherwise FALSE.
     */
    const isPlainObject = (value) =>
        !!value &&
        value.constructor === Object;

    /**
     * Returns true if the value is a ShadowRoot.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
     */
    const isShadow = (value) =>
        !!value &&
        value.nodeType === DOCUMENT_FRAGMENT_NODE &&
        !!value.host;

    /**
     * Returns true if the value is a string.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE is the value is a string, otherwise FALSE.
     */
    const isString = (value) =>
        value === `${value}`;

    /**
     * Returns true if the value is a text Node.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is a text Node, otherwise FALSE.
     */
    const isText = (value) =>
        !!value &&
        value.nodeType === TEXT_NODE;

    /**
     * Returns true if the value is undefined.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE if the value is undefined, otherwise FALSE.
     */
    const isUndefined = (value) =>
        value === undefined;

    /**
     * Returns true if the value is a Window.
     * @param {*} value The value to test.
     * @return {Boolean} TRUE is the value is a Window, otherwise FALSE.
     */
    const isWindow = (value) =>
        !!value &&
        !!value.document &&
        value.document.defaultView === value;

    /**
     * Math methods
     */

    /**
     * Clamp a value between a min and max.
     * @param {number} value The value to clamp.
     * @param {number} [min=0] The minimum value of the clamped range.
     * @param {number} [max=1] The maximum value of the clamped range.
     * @return {number} The clamped value.
     */
    const clamp = (value, min = 0, max = 1) =>
        Math.max(
            min,
            Math.min(
                max,
                value,
            ),
        );

    /**
     * Clamp a value between 0 and 100.
     * @param {number} value The value to clamp.
     * @return {number} The clamped value.
     */
    const clampPercent = (value) =>
        clamp(value, 0, 100);

    /**
     * Get the distance between two vectors.
     * @param {number} x1 The first vector X co-ordinate.
     * @param {number} y1 The first vector Y co-ordinate.
     * @param {number} x2 The second vector X co-ordinate.
     * @param {number} y2 The second vector Y co-ordinate.
     * @return {number} The distance between the vectors.
     */
    const dist = (x1, y1, x2, y2) =>
        len(
            x1 - x2,
            y1 - y2,
        );

    /**
     * Inverse linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} value The value to inverse interpolate.
     * @return {number} The interpolated amount.
     */
    const inverseLerp = (v1, v2, value) =>
        (value - v1) / (v2 - v1);

    /**
     * Get the length of an X,Y vector.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @returns {number} The length of the vector.
     */
    const len = Math.hypot;

    /**
     * Linear interpolation from one value to another.
     * @param {number} v1 The starting value.
     * @param {number} v2 The ending value.
     * @param {number} amount The amount to interpolate.
     * @return {number} The interpolated value.
     */
    const lerp = (v1, v2, amount) =>
        v1 *
        (1 - amount) +
        v2 *
        amount;

    /**
     * Map a value from one range to another.
     * @param {number} value The value to map.
     * @param {number} fromMin The minimum value of the current range.
     * @param {number} fromMax The maximum value of the current range.
     * @param {number} toMin The minimum value of the target range.
     * @param {number} toMax The maximum value of the target range.
     * @return {number} The mapped value.
     */
    const map = (value, fromMin, fromMax, toMin, toMax) =>
        (value - fromMin) *
        (toMax - toMin) /
        (fromMax - fromMin) +
        toMin;

    /**
     * Return a random floating-point number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @return {number} A random number.
     */
    const random = (a = 1, b = null) =>
        isNull(b) ?
            Math.random() * a :
            map(
                Math.random(),
                0,
                1,
                a,
                b,
            );

    /**
     * Return a random number.
     * @param {number} [a=1] The minimum value (inclusive).
     * @param {number} [b] The maximum value (exclusive).
     * @return {number} A random number.
     */
    const randomInt = (a = 1, b = null) =>
        random(a, b) | 0;

    /**
     * Constrain a number to a specified step-size.
     * @param {number} value The value to constrain.
     * @param {number} step The minimum step-size.
     * @return {number} The constrained value.
     */
    const toStep = (value, step = 0.01) =>
        parseFloat(
            (
                Math.round(value / step) *
                step
            ).toFixed(
                `${step}`.replace(/\d*\.?/, '').length,
            ),
        );

    /**
     * Array methods
     */

    /**
     * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
     * @param {array} array The input array.
     * @param {...array} arrays The arrays to compare against.
     * @return {array} The output array.
     */
    const diff = (array, ...arrays) => {
        arrays = arrays.map(unique);
        return array.filter(
            (value) => !arrays
                .some((other) => other.includes(value)),
        );
    };

    /**
     * Create a new array containing the unique values that exist in all of the passed arrays.
     * @param {...array} arrays The input arrays.
     * @return {array} The output array.
     */
    const intersect = (...arrays) =>
        unique(
            arrays
                .reduce(
                    (acc, array, index) => {
                        array = unique(array);
                        return merge(
                            acc,
                            array.filter(
                                (value) =>
                                    arrays.every(
                                        (other, otherIndex) =>
                                            index == otherIndex ||
                                            other.includes(value),
                                    ),
                            ),
                        );
                    },
                    [],
                ),
        );

    /**
     * Merge the values from one or more arrays or array-like objects onto an array.
     * @param {array} array The input array.
     * @param {...array|object} arrays The arrays or array-like objects to merge.
     * @return {array} The output array.
     */
    const merge = (array = [], ...arrays) =>
        arrays.reduce(
            (acc, other) => {
                Array.prototype.push.apply(acc, other);
                return array;
            },
            array,
        );

    /**
     * Return a random value from an array.
     * @param {array} array The input array.
     * @return {*} A random value from the array, or null if it is empty.
     */
    const randomValue = (array) =>
        array.length ?
            array[randomInt(array.length)] :
            null;

    /**
     * Return an array containing a range of values.
     * @param {number} start The first value of the sequence.
     * @param {number} end The value to end the sequence on.
     * @param {number} [step=1] The increment between values in the sequence.
     * @return {number[]} The array of values from start to end.
     */
    const range = (start, end, step = 1) => {
        const sign = Math.sign(end - start);
        return new Array(
            (
                (
                    Math.abs(end - start) /
                    step
                ) +
                1
            ) | 0,
        )
            .fill()
            .map(
                (_, i) =>
                    start + toStep(
                        (i * step * sign),
                        step,
                    ),
            );
    };

    /**
     * Remove duplicate elements in an array.
     * @param {array} array The input array.
     * @return {array} The filtered array.
     */
    const unique = (array) =>
        Array.from(
            new Set(array),
        );

    /**
     * Create an array from any value.
     * @param {*} value The input value.
     * @return {array} The wrapped array.
     */
    const wrap$2 = (value) =>
        isUndefined(value) ?
            [] :
            (
                isArray(value) ?
                    value :
                    (
                        isArrayLike(value) ?
                            merge([], value) :
                            [value]
                    )
            );

    /**
     * Function methods
     */

    const isBrowser = typeof window !== 'undefined' && 'requestAnimationFrame' in window;

    /**
     * Execute a callback on the next animation frame
     * @param {function} callback Callback function to execute.
     * @return {number} The request ID.
     */
    const _requestAnimationFrame = isBrowser ?
        (...args) => window.requestAnimationFrame(...args) :
        (callback) => setTimeout(callback, 1000 / 60);

    /**
     * Create a wrapped version of a function that executes at most once per animation frame
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {Boolean} [leading] Whether to execute on the leading edge of the animation frame.
     * @return {function} The wrapped function.
     */
    const animation = (callback, leading) => {
        let animationReference;
        let newArgs;
        let running;

        const animation = (...args) => {
            newArgs = args;

            if (running) {
                return;
            }

            if (leading) {
                callback(...newArgs);
            }

            running = true;
            animationReference = _requestAnimationFrame((_) => {
                if (!leading) {
                    callback(...newArgs);
                }

                running = false;
                animationReference = null;
            });
        };

        animation.cancel = (_) => {
            if (!animationReference) {
                return;
            }

            if (isBrowser) {
                global.cancelAnimationFrame(animationReference);
            } else {
                clearTimeout(animationReference);
            }

            running = false;
            animationReference = null;
        };

        return animation;
    };

    /**
     * Create a wrapped function that will execute each callback in reverse order,
     * passing the result from each function to the previous.
     * @param {...function} callbacks Callback functions to execute.
     * @return {function} The wrapped function.
     */
    const compose = (...callbacks) =>
        (arg) =>
            callbacks.reduceRight(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Create a wrapped version of a function, that will return new functions
     * until the number of total arguments passed reaches the arguments length
     * of the original function (at which point the function will execute).
     * @param {function} callback Callback function to execute.
     * @return {function} The wrapped function.
     */
    const curry = (callback) => {
        const curried = (...args) =>
            args.length >= callback.length ?
                callback(...args) :
                (...newArgs) =>
                    curried(
                        ...args.concat(newArgs),
                    );

        return curried;
    };

    /**
     * Create a wrapped version of a function that executes once per wait period
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {Boolean} [leading=false] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
     * @return {function} The wrapped function.
     */
    const debounce$1 = (callback, wait = 0, leading = false, trailing = true) => {
        let debounceReference;
        let lastRan;
        let newArgs;

        const debounced = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                now - lastRan :
                null;

            if (leading && (delta === null || delta >= wait)) {
                lastRan = now;
                callback(...args);
                return;
            }

            newArgs = args;
            if (!trailing) {
                return;
            }

            if (debounceReference) {
                clearTimeout(debounceReference);
            }

            debounceReference = setTimeout(
                (_) => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    debounceReference = null;
                },
                wait,
            );
        };

        debounced.cancel = (_) => {
            if (!debounceReference) {
                return;
            }

            clearTimeout(debounceReference);

            debounceReference = null;
        };

        return debounced;
    };

    /**
     * Evaluate a value from a function or value.
     * @param {*} value The value to evaluate.
     * @return {*} The evaluated value.
     */
    const evaluate = (value) =>
        isFunction(value) ?
            value() :
            value;

    /**
     * Create a wrapped version of a function that will only ever execute once.
     * Subsequent calls to the wrapped function will return the result of the initial call.
     * @param {function} callback Callback function to execute.
     * @return {function} The wrapped function.
     */
    const once = (callback) => {
        let ran;
        let result;

        return (...args) => {
            if (ran) {
                return result;
            }

            ran = true;
            result = callback(...args);
            return result;
        };
    };

    /**
     * Create a wrapped version of a function with predefined arguments.
     * @param {function} callback Callback function to execute.
     * @param {...*} [defaultArgs] Default arguments to pass to the function.
     * @return {function} The wrapped function.
     */
    const partial = (callback, ...defaultArgs) =>
        (...args) =>
            callback(
                ...(defaultArgs
                    .slice()
                    .map((v) =>
                        isUndefined(v) ?
                            args.shift() :
                            v,
                    ).concat(args)
                ),
            );

    /**
     * Create a wrapped function that will execute each callback in order,
     * passing the result from each function to the next.
     * @param {...function} callbacks Callback functions to execute.
     * @return {function} The wrapped function.
     */
    const pipe = (...callbacks) =>
        (arg) =>
            callbacks.reduce(
                (acc, callback) =>
                    callback(acc),
                arg,
            );

    /**
     * Create a wrapped version of a function that executes at most once per wait period.
     * (using the most recent arguments passed to it).
     * @param {function} callback Callback function to execute.
     * @param {number} [wait=0] The number of milliseconds to wait until next execution.
     * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
     * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
     * @return {function} The wrapped function.
     */
    const throttle = (callback, wait = 0, leading = true, trailing = true) => {
        let throttleReference;
        let lastRan;
        let newArgs;
        let running;

        const throttled = (...args) => {
            const now = Date.now();
            const delta = lastRan ?
                now - lastRan :
                null;

            if (leading && (delta === null || delta >= wait)) {
                lastRan = now;
                callback(...args);
                return;
            }

            newArgs = args;
            if (running || !trailing) {
                return;
            }

            running = true;
            throttleReference = setTimeout(
                (_) => {
                    lastRan = Date.now();
                    callback(...newArgs);

                    running = false;
                    throttleReference = null;
                },
                delta === null ?
                    wait :
                    wait - delta,
            );
        };

        throttled.cancel = (_) => {
            if (!throttleReference) {
                return;
            }

            clearTimeout(throttleReference);

            running = false;
            throttleReference = null;
        };

        return throttled;
    };

    /**
     * Execute a function a specified number of times.
     * @param {function} callback Callback function to execute.
     * @param {number} amount The amount of times to execute the callback.
     */
    const times = (callback, amount) => {
        while (amount--) {
            if (callback() === false) {
                break;
            }
        }
    };

    /**
     * Object methods
     */

    /**
     * Merge the values from one or more objects onto an object (recursively).
     * @param {object} object The input object.
     * @param {...object} objects The objects to merge.
     * @return {object} The output objects.
     */
    const extend = (object, ...objects) =>
        objects.reduce(
            (acc, val) => {
                for (const k in val) {
                    if (isArray(val[k])) {
                        acc[k] = extend(
                            isArray(acc[k]) ?
                                acc[k] :
                                [],
                            val[k],
                        );
                    } else if (isPlainObject(val[k])) {
                        acc[k] = extend(
                            isPlainObject(acc[k]) ?
                                acc[k] :
                                {},
                            val[k],
                        );
                    } else {
                        acc[k] = val[k];
                    }
                }
                return acc;
            },
            object,
        );

    /**
     * Remove a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to remove from the object.
     */
    const forgetDot = (object, key) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
                !(key in object)
            ) {
                break;
            }

            if (keys.length) {
                object = object[key];
            } else {
                delete object[key];
            }
        }
    };

    /**
     * Retrieve the value of a specified key from an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to retrieve from the object.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @return {*} The value retrieved from the object.
     */
    const getDot = (object, key, defaultValue) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
                !(key in object)
            ) {
                return defaultValue;
            }

            object = object[key];
        }

        return object;
    };

    /**
     * Returns true if a specified key exists in an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to test for in the object.
     * @return {Boolean} TRUE if the key exists, otherwise FALSE.
     */
    const hasDot = (object, key) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (
                !isObject(object) ||
                !(key in object)
            ) {
                return false;
            }

            object = object[key];
        }

        return true;
    };

    /**
     * Retrieve values of a specified key from an array of objects using dot notation.
     * @param {object[]} objects The input objects.
     * @param {string} key The key to retrieve from the objects.
     * @param {*} [defaultValue] The default value if key does not exist.
     * @return {array} An array of values retrieved from the objects.
     */
    const pluckDot = (objects, key, defaultValue) =>
        objects
            .map((pointer) =>
                getDot(pointer, key, defaultValue),
            );

    /**
     * Set a specified value of a key for an object using dot notation.
     * @param {object} object The input object.
     * @param {string} key The key to set in the object.
     * @param {*} value The value to set.
     * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
     */
    const setDot = (object, key, value, overwrite = true) => {
        const keys = key.split('.');
        while ((key = keys.shift())) {
            if (key === '*') {
                for (const k in object) {
                    if (!{}.hasOwnProperty.call(object, k)) {
                        continue;
                    }

                    setDot(
                        object,
                        [k].concat(keys).join('.'),
                        value,
                        overwrite,
                    );
                }
                return;
            }

            if (keys.length) {
                if (
                    !isObject(object[key]) ||
                    !(key in object)
                ) {
                    object[key] = {};
                }

                object = object[key];
            } else if (
                overwrite ||
                !(key in object)
            ) {
                object[key] = value;
            }
        }
    };

    // HTML escape characters
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
    };

    const unescapeChars = {
        amp: '&',
        lt: '<',
        gt: '>',
        quot: '"',
        apos: '\'',
    };

    /**
     * String methods
     */

    /**
     * Split a string into individual words.
     * @param {string} string The input string.
     * @return {string[]} The split parts of the string.
     */
    const _splitString = (string) =>
        `${string}`
            .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
            .reduce(
                (acc, word) => {
                    word = word.replace(/[^\w]/, '').toLowerCase();
                    if (word) {
                        acc.push(word);
                    }
                    return acc;
                },
                [],
            );

    /**
     * Convert a string to camelCase.
     * @param {string} string The input string.
     * @return {string} The camelCased string.
     */
    const camelCase = (string) =>
        _splitString(string)
            .map(
                (word, index) =>
                    index ?
                        capitalize(word) :
                        word,
            )
            .join('');

    /**
     * Convert the first character of string to upper case and the remaining to lower case.
     * @param {string} string The input string.
     * @return {string} The capitalized string.
     */
    const capitalize = (string) =>
        string.charAt(0).toUpperCase() +
        string.substring(1).toLowerCase();

    /**
     * Convert HTML special characters in a string to their corresponding HTML entities.
     * @param {string} string The input string.
     * @return {string} The escaped string.
     */
    const escape = (string) =>
        string.replace(
            /[&<>"']/g,
            (match) =>
                escapeChars[match],
        );

    /**
     * Escape RegExp special characters in a string.
     * @param {string} string The input string.
     * @return {string} The escaped string.
     */
    const escapeRegExp = (string) =>
        string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    /**
     * Convert a string to a humanized form.
     * @param {string} string The input string.
     * @return {string} The humanized string.
     */
    const humanize = (string) =>
        capitalize(
            _splitString(string)
                .join(' '),
        );

    /**
     * Convert a string to kebab-case.
     * @param {string} string The input string.
     * @return {string} The kebab-cased string.
     */
    const kebabCase = (string) =>
        _splitString(string)
            .join('-')
            .toLowerCase();

    /**
     * Convert a string to PascalCase.
     * @param {string} string The input string.
     * @return {string} The camelCased string.
     */
    const pascalCase = (string) =>
        _splitString(string)
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.substring(1),
            )
            .join('');

    /**
     * Return a random string.
     * @param {number} [length=16] The length of the output string.
     * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
     * @return {string} The random string.
     */
    const randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
        new Array(length)
            .fill()
            .map(
                (_) =>
                    chars[random(chars.length) | 0],
            )
            .join('');

    /**
     * Convert a string to snake_case.
     * @param {string} string The input string.
     * @return {string} The snake_cased string.
     */
    const snakeCase = (string) =>
        _splitString(string)
            .join('_')
            .toLowerCase();

    /**
     * Convert HTML entities in a string to their corresponding characters.
     * @param {string} string The input string.
     * @return {string} The unescaped string.
     */
    const unescape = (string) =>
        string.replace(
            /&(amp|lt|gt|quot|apos);/g,
            (_, code) =>
                unescapeChars[code],
        );

    var _ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        animation: animation,
        camelCase: camelCase,
        capitalize: capitalize,
        clamp: clamp,
        clampPercent: clampPercent,
        compose: compose,
        curry: curry,
        debounce: debounce$1,
        diff: diff,
        dist: dist,
        escape: escape,
        escapeRegExp: escapeRegExp,
        evaluate: evaluate,
        extend: extend,
        forgetDot: forgetDot,
        getDot: getDot,
        hasDot: hasDot,
        humanize: humanize,
        intersect: intersect,
        inverseLerp: inverseLerp,
        isArray: isArray,
        isArrayLike: isArrayLike,
        isBoolean: isBoolean,
        isDocument: isDocument,
        isElement: isElement,
        isFragment: isFragment,
        isFunction: isFunction,
        isNaN: isNaN,
        isNode: isNode,
        isNull: isNull,
        isNumeric: isNumeric,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isShadow: isShadow,
        isString: isString,
        isText: isText,
        isUndefined: isUndefined,
        isWindow: isWindow,
        kebabCase: kebabCase,
        len: len,
        lerp: lerp,
        map: map,
        merge: merge,
        once: once,
        partial: partial,
        pascalCase: pascalCase,
        pipe: pipe,
        pluckDot: pluckDot,
        random: random,
        randomInt: randomInt,
        randomString: randomString,
        randomValue: randomValue,
        range: range,
        setDot: setDot,
        snakeCase: snakeCase,
        throttle: throttle,
        times: times,
        toStep: toStep,
        unescape: unescape,
        unique: unique,
        wrap: wrap$2
    });

    /**
     * DOM Config
     */

    const ajaxDefaults = {
        afterSend: null,
        beforeSend: null,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        data: null,
        headers: {},
        isLocal: null,
        method: 'GET',
        onProgress: null,
        onUploadProgress: null,
        processData: true,
        rejectOnCancel: true,
        responseType: null,
        url: null,
        xhr: (_) => new XMLHttpRequest,
    };

    const animationDefaults = {
        duration: 1000,
        type: 'ease-in-out',
        infinite: false,
        debug: false,
    };

    const config = {
        ajaxDefaults,
        animationDefaults,
        context: null,
        useTimeout: false,
        window: null,
    };

    /**
     * Get the AJAX defaults.
     * @return {object} The AJAX defaults.
     */
    function getAjaxDefaults() {
        return ajaxDefaults;
    }
    /**
     * Get the animation defaults.
     * @return {object} The animation defaults.
     */
    function getAnimationDefaults() {
        return animationDefaults;
    }
    /**
     * Get the document context.
     * @return {Document} The document context.
     */
    function getContext() {
        return config.context;
    }
    /**
     * Get the window.
     * @return {Window} The window.
     */
    function getWindow() {
        return config.window;
    }
    /**
     * Set the AJAX defaults.
     * @param {object} options The ajax default options.
     */
    function setAjaxDefaults(options) {
        extend(ajaxDefaults, options);
    }
    /**
     * Set the animation defaults.
     * @param {object} options The animation default options.
     */
    function setAnimationDefaults(options) {
        extend(animationDefaults, options);
    }
    /**
     * Set the document context.
     * @param {Document} context The document context.
     */
    function setContext(context) {
        if (!isDocument(context)) {
            throw new Error('FrostDOM requires a valid Document.');
        }

        config.context = context;
    }
    /**
     * Set the window.
     * @param {Window} window The window.
     */
    function setWindow(window) {
        if (!isWindow(window)) {
            throw new Error('FrostDOM requires a valid Window.');
        }

        config.window = window;
    }
    /**
     * Set whether animations should use setTimeout.
     * @param {Boolean} [enable=true] Whether animations should use setTimeout.
     */
    function useTimeout(enable = true) {
        config.useTimeout = enable;
    }

    /**
     * DOM Helpers
     */

    /**
     * Create a wrapped version of a function that executes once per tick.
     * @param {function} callback Callback function to debounce.
     * @return {function} The wrapped function.
     */
    function debounce(callback) {
        let running;

        return (...args) => {
            if (running) {
                return;
            }

            running = true;

            Promise.resolve().then((_) => {
                callback(...args);
                running = false;
            });
        };
    }
    /**
     * Return a RegExp for testing a namespaced event.
     * @param {string} event The namespaced event.
     * @return {RegExp} The namespaced event RegExp.
     */
    function eventNamespacedRegExp(event) {
        return new RegExp(`^${escapeRegExp(event)}(?:\\.|$)`, 'i');
    }
    /**
     * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
     * @param {array} classList The classes to parse.
     * @return {string[]} The parsed classes.
     */
    function parseClasses(classList) {
        return classList
            .flat()
            .flatMap((val) => val.split(' '))
            .filter((val) => !!val);
    }
    /**
     * Return a data object from a key and value, or a data object.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     * @param {object} [options] The options for parsing data.
     * @param {Boolean} [options.json=false] Whether to JSON encode the values.
     * @return {object} The data object.
     */
    function parseData(key, value, { json = false } = {}) {
        const result = isString(key) ?
            { [key]: value } :
            key;

        if (!json) {
            return result;
        }

        return Object.fromEntries(
            Object.entries(result)
                .map(([key, value]) => [key, isObject(value) || isArray(value) ? JSON.stringify(value) : value]),
        );
    }
    /**
     * Return a JS primitive from a dataset string.
     * @param {string} value The input value.
     * @return {*} The parsed value.
     */
    function parseDataset(value) {
        if (isUndefined(value)) {
            return value;
        }

        const lower = value.toLowerCase().trim();

        if (['true', 'on'].includes(lower)) {
            return true;
        }

        if (['false', 'off'].includes(lower)) {
            return false;
        }

        if (lower === 'null') {
            return null;
        }

        if (isNumeric(lower)) {
            return parseFloat(lower);
        }

        if (['{', '['].includes(lower.charAt(0))) {
            try {
                const result = JSON.parse(value);
                return result;
            } catch (e) { }
        }

        return value;
    }
    /**
     * Return a "real" event from a namespaced event.
     * @param {string} event The namespaced event.
     * @return {string} The real event.
     */
    function parseEvent(event) {
        return event.split('.')
            .shift();
    }
    /**
     * Return an array of events from a space-separated string.
     * @param {string} events The events.
     * @return {array} The parsed events.
     */
    function parseEvents(events) {
        return events.split(' ');
    }

    /**
     * DOM Variables
     */

    const CONTENT_BOX = 0;
    const PADDING_BOX = 1;
    const BORDER_BOX = 2;
    const MARGIN_BOX = 3;
    const SCROLL_BOX = 4;

    const allowedTags = {
        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
        'a': ['target', 'href', 'title', 'rel'],
        'area': [],
        'b': [],
        'br': [],
        'col': [],
        'code': [],
        'div': [],
        'em': [],
        'hr': [],
        'h1': [],
        'h2': [],
        'h3': [],
        'h4': [],
        'h5': [],
        'h6': [],
        'i': [],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        'li': [],
        'ol': [],
        'p': [],
        'pre': [],
        's': [],
        'small': [],
        'span': [],
        'sub': [],
        'sup': [],
        'strong': [],
        'u': [],
        'ul': [],
    };

    const cssNumberProperties = [
        'font-weight',
        'line-height',
        'opacity',
        'orphans',
        'scale',
        'widows',
        'z-index',
    ];

    const animations = new Map();

    const data = new WeakMap();

    const events = new WeakMap();

    const queues = new WeakMap();

    const styles = new WeakMap();

    /**
     * Ajax Helpers
     */

    /**
     * Append a query string to a URL.
     * @param {string} url The input URL.
     * @param {string} key The query string key.
     * @param {string} value The query string value.
     * @return {string} The new URL.
     */
    function appendQueryString(url, key, value) {
        const searchParams = getSearchParams(url);

        searchParams.append(key, value);

        return setSearchParams(url, searchParams);
    }
    /**
     * Get the URLSearchParams from a URL string.
     * @param {string} url The URL.
     * @return {URLSearchParams} The URLSearchParams.
     */
    function getSearchParams(url) {
        return getURL(url).searchParams;
    }
    /**
     * Get the URL from a URL string.
     * @param {string} url The URL.
     * @return {URL} The URL.
     */
    function getURL(url) {
        const window = getWindow();
        const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');

        return new URL(url, baseHref);
    }
    /**
     * Return a FormData object from an array or object.
     * @param {array|object} data The input data.
     * @return {FormData} The FormData object.
     */
    function parseFormData(data) {
        const values = parseValues(data);

        const formData = new FormData;

        for (const [key, value] of values) {
            if (key.substring(key.length - 2) === '[]') {
                formData.append(key, value);
            } else {
                formData.set(key, value);
            }
        }

        return formData;
    }
    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @return {string} The URI-encoded attribute string.
     */
    function parseParams(data) {
        const values = parseValues(data);

        const paramString = values
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        return encodeURI(paramString);
    }
    /**
     * Return an attributes array, or a flat array of attributes from a key and value.
     * @param {string} key The input key.
     * @param {array|object|string} [value] The input value.
     * @return {array} The parsed attributes.
     */
    function parseValue(key, value) {
        if (value === null || isUndefined(value)) {
            return [];
        }

        if (isArray(value)) {
            if (key.substring(key.length - 2) !== '[]') {
                key += '[]';
            }

            return value.flatMap((val) => parseValue(key, val));
        }

        if (isObject(value)) {
            return Object.entries(value)
                .flatMap(([subKey, val]) => parseValue(`${key}[${subKey}]`, val));
        }

        return [[key, value]];
    }
    /**
     * Return an attributes array from a data array or data object.
     * @param {array|object} data The input data.
     * @return {array} The parsed attributes.
     */
    function parseValues(data) {
        if (isArray(data)) {
            return data.flatMap((value) => parseValue(value.name, value.value));
        }

        if (isObject(data)) {
            return Object.entries(data)
                .flatMap(([key, value]) => parseValue(key, value));
        }

        return data;
    }
    /**
     * Set the URLSearchParams for a URL string.
     * @param {string} url The URL.
     * @param {URLSearchParams} searchParams The URLSearchParams.
     * @return {string} The new URL string.
     */
    function setSearchParams(url, searchParams) {
        const urlData = getURL(url);

        urlData.search = searchParams.toString();

        const newUrl = urlData.toString();

        const pos = newUrl.indexOf(url);
        return newUrl.substring(pos);
    }

    /**
     * AjaxRequest Class
     * @class
     */
    class AjaxRequest {
        #options;
        #promise;
        #resolve;
        #reject;

        #isResolved = false;
        #isRejected = false;
        #isCancelled = false;

        /**
         * New AjaxRequest constructor.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object|FormData} [options.data=null] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {string} [options.mimeType] The MIME type to use.
         * @param {string} [options.username] The username to authenticate with.
         * @param {string} [options.password] The password to authenticate with.
         * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
         * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         */
        constructor(options) {
            this.#options = extend(
                {},
                getAjaxDefaults(),
                options,
            );

            if (!this.#options.url) {
                this.#options.url = getWindow().location.href;
            }

            if (!this.#options.cache) {
                this.#options.url = appendQueryString(this.#options.url, '_', Date.now());
            }

            if (!('Content-Type' in this.#options.headers) && this.#options.contentType) {
                this.#options.headers['Content-Type'] = this.#options.contentType;
            }

            if (this.#options.isLocal === null) {
                this.#options.isLocal = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(location.protocol);
            }

            if (!this.#options.isLocal && !('X-Requested-With' in this.#options.headers)) {
                this.#options.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            this.#promise = new Promise((resolve, reject) => {
                this.#resolve = (value) => {
                    this.#isResolved = true;
                    resolve(value);
                };

                this.#reject = (error) => {
                    this.#isRejected = true;
                    reject(error);
                };
            });

            this.xhr = this.#options.xhr();

            if (this.#options.data) {
                if (this.#options.processData && isObject(this.#options.data)) {
                    if (this.#options.contentType === 'application/json') {
                        this.#options.data = JSON.stringify(this.#options.data);
                    } else if (this.#options.contentType === 'application/x-www-form-urlencoded') {
                        this.#options.data = parseParams(this.#options.data);
                    } else {
                        this.#options.data = parseFormData(this.#options.data);
                    }
                }

                if (this.#options.method === 'GET') {
                    const dataParams = new URLSearchParams(this.#options.data);

                    const searchParams = getSearchParams(this.#options.url);
                    for (const [key, value] of dataParams.entries()) {
                        searchParams.append(key, value);
                    }

                    this.#options.url = setSearchParams(this.#options.url, searchParams);
                    this.#options.data = null;
                }
            }

            this.xhr.open(this.#options.method, this.#options.url, true, this.#options.username, this.#options.password);

            for (const [key, value] of Object.entries(this.#options.headers)) {
                this.xhr.setRequestHeader(key, value);
            }

            if (this.#options.responseType) {
                this.xhr.responseType = this.#options.responseType;
            }

            if (this.#options.mimeType) {
                this.xhr.overrideMimeType(this.#options.mimeType);
            }

            if (this.#options.timeout) {
                this.xhr.timeout = this.#options.timeout;
            }

            this.xhr.onload = (e) => {
                if (this.xhr.status > 400) {
                    this.#reject({
                        status: this.xhr.status,
                        xhr: this.xhr,
                        event: e,
                    });
                } else {
                    this.#resolve({
                        response: this.xhr.response,
                        xhr: this.xhr,
                        event: e,
                    });
                }
            };

            if (!this.#options.isLocal) {
                this.xhr.onerror = (e) =>
                    this.#reject({
                        status: this.xhr.status,
                        xhr: this.xhr,
                        event: e,
                    });
            }

            if (this.#options.onProgress) {
                this.xhr.onprogress = (e) =>
                    this.#options.onProgress(e.loaded / e.total, this.xhr, e);
            }

            if (this.#options.onUploadProgress) {
                this.xhr.upload.onprogress = (e) =>
                    this.#options.onUploadProgress(e.loaded / e.total, this.xhr, e);
            }

            if (this.#options.beforeSend) {
                this.#options.beforeSend(this.xhr);
            }

            this.xhr.send(this.#options.data);

            if (this.#options.afterSend) {
                this.#options.afterSend(this.xhr);
            }
        }

        /**
         * Cancel a pending request.
         * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
         */
        cancel(reason = 'Request was cancelled') {
            if (this.#isResolved || this.#isRejected || this.#isCancelled) {
                return;
            }

            this.xhr.abort();

            this.#isCancelled = true;

            if (this.#options.rejectOnCancel) {
                this.#reject({
                    status: this.xhr.status,
                    xhr: this.xhr,
                    reason,
                });
            }
        }

        /**
         * Execute a callback if the request is rejected.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @return {Promise} The promise.
         */
        catch(onRejected) {
            return this.#promise.catch(onRejected);
        }

        /**
         * Execute a callback once the request is settled (resolved or rejected).
         * @param {function} [onFinally] The callback to execute once the request is settled.
         * @return {Promise} The promise.
         */
        finally(onFinally) {
            return this.#promise.finally(onFinally);
        }

        /**
         * Execute a callback once the request is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the request is resolved.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @return {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this.#promise.then(onFulfilled, onRejected);
        }
    }

    Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);

    /**
     * DOM Ajax
     */

    /**
     * Perform an XHR DELETE request.
     * @param {string} url The URL of the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=DELETE] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function _delete(url, options) {
        return new AjaxRequest({
            url,
            method: 'DELETE',
            ...options,
        });
    }
    /**
     * New AjaxRequest constructor.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object|FormData} [options.data=null] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function ajax(options) {
        return new AjaxRequest(options);
    }
    /**
     * Perform an XHR GET request.
     * @param {string} url The URL of the request.
     * @param {string|array|object} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function get(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            ...options,
        });
    }
    /**
     * Perform an XHR PATCH request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=PATCH] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function patch(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            method: 'PATCH',
            ...options,
        });
    }
    /**
     * Perform an XHR POST request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function post(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            method: 'POST',
            ...options,
        });
    }
    /**
     * Perform an XHR PUT request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=PUT] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {string} [options.mimeType] The MIME type to use.
     * @param {string} [options.username] The username to authenticate with.
     * @param {string} [options.password] The password to authenticate with.
     * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
     * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
     * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function put(url, data, options) {
        return new AjaxRequest({
            url,
            data,
            method: 'PUT',
            ...options,
        });
    }

    /**
     * Animation Helpers
     */

    let animating = false;

    /**
     * Get the current time.
     * @return {number} The current time.
     */
    function getTime() {
        return document.timeline ?
            document.timeline.currentTime :
            performance.now();
    }
    /**
     * Start the animation loop (if not already started).
     */
    function start() {
        if (animating) {
            return;
        }

        animating = true;
        update();
    }
    /**
     * Run a single frame of all animations, and then queue up the next frame.
     */
    function update() {
        const time = getTime();

        for (const [node, currentAnimations] of animations) {
            const otherAnimations = currentAnimations.filter((animation) => !animation.update(time));

            if (!otherAnimations.length) {
                animations.delete(node);
            } else {
                animations.set(node, otherAnimations);
            }
        }

        if (!animations.size) {
            animating = false;
        } else if (config.useTimeout) {
            setTimeout(update, 1000 / 60);
        } else {
            getWindow().requestAnimationFrame(update);
        }
    }

    /**
     * Animation Class
     * @class
     */
    class Animation {
        #node;
        #callback;
        #options;
        #promise;
        #resolve;
        #reject;

        #isStopped = false;
        #isFinished = false;

        /**
         * New Animation constructor.
         * @param {HTMLElement} node The input node.
         * @param {DOM~animationCallback} callback The animation callback.
         * @param {object} [options] The options to use for the animation.
         * @param {string} [options.type=ease-in-out] The type of animation
         * @param {number} [options.duration=1000] The duration the animation should last.
         * @param {Boolean} [options.infinite] Whether to repeat the animation.
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         */
        constructor(node, callback, options) {
            this.#node = node;
            this.#callback = callback;

            this.#options = {
                ...getAnimationDefaults(),
                ...options,
            };

            if (!('start' in this.#options)) {
                this.#options.start = getTime();
            }

            if (this.#options.debug) {
                this.#node.dataset.animationStart = this.#options.start;
            }

            this.#promise = new Promise((resolve, reject) => {
                this.#resolve = resolve;
                this.#reject = reject;
            });

            if (!animations.has(node)) {
                animations.set(node, []);
            }

            animations.get(node).push(this);
        }

        /**
         * Execute a callback if the animation is rejected.
         * @param {function} [onRejected] The callback to execute if the animation is rejected.
         * @return {Promise} The promise.
         */
        catch(onRejected) {
            return this.#promise.catch(onRejected);
        }

        /**
         * Clone the animation to a new node.
         * @param {HTMLElement} node The input node.
         * @return {Animation} The cloned Animation.
         */
        clone(node) {
            return new Animation(node, this.#callback, this.#options);
        }

        /**
         * Execute a callback once the animation is settled (resolved or rejected).
         * @param {function} [onFinally] The callback to execute once the animation is settled.
         * @return {Promise} The promise.
         */
        finally(onFinally) {
            return this.#promise.finally(onFinally);
        }

        /**
         * Stop the animation.
         * @param {object} [options] The options for stopping the animation.
         * @param {Boolean} [options.finish=true] Whether to finish the animation.
        */
        stop({ finish = true } = {}) {
            if (this.#isStopped || this.#isFinished) {
                return;
            }

            const otherAnimations = animations.get(this.#node)
                .filter((animation) => animation !== this);

            if (!otherAnimations.length) {
                animations.delete(this.#node);
            } else {
                animations.set(this.#node, otherAnimations);
            }

            if (finish) {
                this.update();
            }

            this.#isStopped = true;

            if (!finish) {
                this.#reject(this.#node);
            }
        }

        /**
         * Execute a callback once the animation is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the animation is resolved.
         * @param {function} [onRejected] The callback to execute if the animation is rejected.
         * @return {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this.#promise.then(onFulfilled, onRejected);
        }

        /**
         * Run a single frame of the animation.
         * @param {number} [time] The current time.
         * @return {Boolean} TRUE if the animation is finished, otherwise FALSE.
         */
        update(time = null) {
            if (this.#isStopped) {
                return true;
            }

            let progress;

            if (time === null) {
                progress = 1;
            } else {
                progress = (time - this.#options.start) / this.#options.duration;

                if (this.#options.infinite) {
                    progress %= 1;
                } else {
                    progress = clamp(progress);
                }

                if (this.#options.type === 'ease-in') {
                    progress = progress ** 2;
                } else if (this.#options.type === 'ease-out') {
                    progress = Math.sqrt(progress);
                } else if (this.#options.type === 'ease-in-out') {
                    if (progress <= 0.5) {
                        progress = progress ** 2 * 2;
                    } else {
                        progress = 1 - ((1 - progress) ** 2 * 2);
                    }
                }
            }

            if (this.#options.debug) {
                this.#node.dataset.animationTime = time;
                this.#node.dataset.animationProgress = progress;
            }

            this.#callback(this.#node, progress, this.#options);

            if (progress < 1) {
                return false;
            }

            if (this.#options.debug) {
                delete this.#node.dataset.animationStart;
                delete this.#node.dataset.animationTime;
                delete this.#node.dataset.animationProgress;
            }

            if (!this.#isFinished) {
                this.#isFinished = true;

                this.#resolve(this.#node);
            }

            return true;
        }
    }

    Object.setPrototypeOf(Animation.prototype, Promise.prototype);

    /**
    * AnimationSet Class
    * @class
    */
    class AnimationSet {
        #animations;
        #promise;

        /**
         * New AnimationSet constructor.
         * @param {array} animations The animations.
         */
        constructor(animations) {
            this.#animations = animations;
            this.#promise = Promise.all(animations);
        }

        /**
         * Execute a callback if any of the animations is rejected.
         * @param {function} [onRejected] The callback to execute if an animation is rejected.
         * @return {Promise} The promise.
         */
        catch(onRejected) {
            return this.#promise.catch(onRejected);
        }

        /**
         * Execute a callback once the animation is settled (resolved or rejected).
         * @param {function} [onFinally] The callback to execute once the animation is settled.
         * @return {Promise} The promise.
         */
        finally(onFinally) {
            return this.#promise.finally(onFinally);
        }

        /**
         * Stop the animations.
         * @param {object} [options] The options for stopping the animation.
         * @param {Boolean} [options.finish=true] Whether to finish the animations.
        */
        stop({ finish = true } = {}) {
            for (const animation of this.#animations) {
                animation.stop({ finish });
            }
        }

        /**
         * Execute a callback once the animation is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the animation is resolved.
         * @param {function} [onRejected] The callback to execute if the animation is rejected.
         * @return {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this.#promise.then(onFulfilled, onRejected);
        }
    }

    Object.setPrototypeOf(AnimationSet.prototype, Promise.prototype);

    /**
     * DOM Create
     */

    /**
     * Attach a shadow DOM tree to the first node.
     * @param {string|array|HTMLElement|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for attaching the shadow DOM.
     * @param {Boolean} [options.open=true] Whether the elements are accessible from JavaScript outside the root.
     * @return {ShadowRoot} The new ShadowRoot.
     */
    function attachShadow$1(selector, { open = true } = {}) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.attachShadow({
            mode: open ?
                'open' :
                'closed',
        });
    }
    /**
     * Create a new DOM element.
     * @param {string} [tagName=div] The type of HTML element to create.
     * @param {object} [options] The options to use for creating the element.
     * @param {string} [options.html] The HTML contents.
     * @param {string} [options.text] The text contents.
     * @param {string|array} [options.class] The classes.
     * @param {object} [options.style] An object containing style properties.
     * @param {string} [options.value] The value.
     * @param {object} [options.attributes] An object containing attributes.
     * @param {object} [options.properties] An object containing properties.
     * @param {object} [options.dataset] An object containing dataset values.
     * @return {HTMLElement} The new HTMLElement.
     */
    function create(tagName = 'div', options = {}) {
        const node = getContext().createElement(tagName);

        if ('html' in options) {
            node.innerHTML = options.html;
        } else if ('text' in options) {
            node.textContent = options.text;
        }

        if ('class' in options) {
            const classes = parseClasses(wrap$2(options.class));

            node.classList.add(...classes);
        }

        if ('style' in options) {
            for (let [style, value] of Object.entries(options.style)) {
                style = kebabCase(style);

                // if value is numeric and not a number property, add px
                if (value && isNumeric(value) && !cssNumberProperties.includes(style)) {
                    value += 'px';
                }

                node.style.setProperty(style, value);
            }
        }

        if ('value' in options) {
            node.value = options.value;
        }

        if ('attributes' in options) {
            for (const [key, value] of Object.entries(options.attributes)) {
                node.setAttribute(key, value);
            }
        }

        if ('properties' in options) {
            for (const [key, value] of Object.entries(options.properties)) {
                node[key] = value;
            }
        }

        if ('dataset' in options) {
            const dataset = parseData(options.dataset, null, { json: true });

            for (let [key, value] of Object.entries(dataset)) {
                key = camelCase(key);
                node.dataset[key] = value;
            }
        }

        return node;
    }
    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @return {Node} The new comment node.
     */
    function createComment(comment) {
        return getContext().createComment(comment);
    }
    /**
     * Create a new document fragment.
     * @return {DocumentFragment} The new DocumentFragment.
     */
    function createFragment() {
        return getContext().createDocumentFragment();
    }
    /**
     * Create a new range object.
     * @return {Range} The new Range.
     */
    function createRange() {
        return getContext().createRange();
    }
    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @return {Node} The new text node.
     */
    function createText(text) {
        return getContext().createTextNode(text);
    }

    /**
     * DOM Parser
     */

    const parser = new DOMParser();

    /**
     * Create a Document object from a string.
     * @param {string} input The input string.
     * @param {object} [options] The options for parsing the string.
     * @param {string} [options.contentType=text/html] The content type.
     * @return {Document} A new Document object.
     */
    function parseDocument(input, { contentType = 'text/html' } = {}) {
        return parser.parseFromString(input, contentType);
    }
    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @return {array} An array of nodes.
     */
    function parseHTML(html) {
        const childNodes = createRange()
            .createContextualFragment(html)
            .children;

        return merge([], childNodes);
    }

    /**
     * QuerySet Class
     * @class
     */
    class QuerySet {
        #nodes = [];

        /**
         * New DOM constructor.
         * @param {array} nodes The input nodes.
         */
        constructor(nodes = []) {
            this.#nodes = nodes;
        }

        /**
         * Get the number of nodes.
         * @return {number} The number of nodes.
         */
        get length() {
            return this.#nodes.length;
        }

        /**
         * Execute a function for each node in the set.
         * @param {function} callback The callback to execute
         * @return {QuerySet} The QuerySet object.
         */
        each(callback) {
            this.#nodes.forEach(
                (v, i) => callback(v, i),
            );

            return this;
        }

        /**
         * Retrieve the DOM node(s) contained in the QuerySet.
         * @param {number} [index=null] The index of the node.
         * @return {array|Node|Document|Window} The node(s).
         */
        get(index = null) {
            if (index === null) {
                return this.#nodes;
            }

            return index < 0 ?
                this.#nodes[index + this.#nodes.length] :
                this.#nodes[index];
        }

        /**
         * Execute a function for each node in the set.
         * @param {function} callback The callback to execute
         * @return {QuerySet} A new QuerySet object.
         */
        map(callback) {
            const nodes = this.#nodes.map(callback);

            return new QuerySet(nodes);
        }

        /**
         * Reduce the set of matched nodes to a subset specified by a range of indices.
         * @param {number} [begin] The index to slice from.
         * @param {number} [end]  The index to slice to.
         * @return {QuerySet} A new QuerySet object.
         */
        slice(begin, end) {
            const nodes = this.#nodes.slice(begin, end);

            return new QuerySet(nodes);
        }

        /**
         * Return an iterable from the nodes.
         * @return {ArrayIterator} The iterator object.
         */
        [Symbol.iterator]() {
            return this.#nodes.values();
        }
    }

    /**
     * DOM Find
     */

    /**
     * Return all nodes matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function find$1(selector, context = getContext()) {
        if (!selector) {
            return [];
        }

        // fast selector
        const match = selector.match(/^([\#\.]?)([\w\-]+)$/);

        if (match) {
            if (match[1] === '#') {
                return findById$1(match[2], context);
            }

            if (match[1] === '.') {
                return findByClass$1(match[2], context);
            }

            return findByTag$1(match[2], context);
        }

        if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(selector));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = node.querySelectorAll(selector);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function findByClass$1(className, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return merge([], context.getElementsByClassName(className));
        }

        if (isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(`.${className}`));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = isFragment(node) || isShadow(node) ?
                node.querySelectorAll(`.${className}`) :
                node.getElementsByClassName(className);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all nodes with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function findById$1(id, context = getContext()) {
        if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(`#${id}`));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = node.querySelectorAll(`#${id}`);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function findByTag$1(tagName, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return merge([], context.getElementsByTagName(tagName));
        }

        if (isFragment(context) || isShadow(context)) {
            return merge([], context.querySelectorAll(tagName));
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const newNodes = isFragment(node) || isShadow(node) ?
                node.querySelectorAll(tagName) :
                node.getElementsByTagName(tagName);

            results.push(...newNodes);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return a single node matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching node.
     */
    function findOne$1(selector, context = getContext()) {
        if (!selector) {
            return null;
        }

        // fast selector
        const match = selector.match(/^([\#\.]?)([\w\-]+)$/);

        if (match) {
            if (match[1] === '#') {
                return findOneById$1(match[2], context);
            }

            if (match[1] === '.') {
                return findOneByClass$1(match[2], context);
            }

            return findOneByTag$1(match[2], context);
        }

        if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
            return context.querySelector(selector);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = node.querySelector(selector);

            if (result) {
                return result;
            }
        }

        return null;
    }
    /**
     * Return a single node with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching node.
     */
    function findOneByClass$1(className, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return context.getElementsByClassName(className).item(0);
        }

        if (isFragment(context) || isShadow(context)) {
            return context.querySelector(`.${className}`);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = isFragment(node) || isShadow(node) ?
                node.querySelector(`.${className}`) :
                node.getElementsByClassName(className).item(0);

            if (result) {
                return result;
            }
        }

        return null;
    }
    /**
     * Return a single node with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching element.
     */
    function findOneById$1(id, context = getContext()) {
        if (isDocument(context)) {
            return context.getElementById(id);
        }

        if (isElement(context) || isFragment(context) || isShadow(context)) {
            return context.querySelector(`#${id}`);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = isDocument(node) ?
                node.getElementById(id) :
                node.querySelector(`#${id}`);

            if (result) {
                return result;
            }
        }

        return null;
    }
    /**
     * Return a single node with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
     * @return {HTMLElement} The matching node.
     */
    function findOneByTag$1(tagName, context = getContext()) {
        if (isDocument(context) || isElement(context)) {
            return context.getElementsByTagName(tagName).item(0);
        }

        if (isFragment(context) || isShadow(context)) {
            return context.querySelector(tagName);
        }

        const nodes = parseNodes(context, {
            fragment: true,
            shadow: true,
            document: true,
        });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = isFragment(node) || isShadow(node) ?
                node.querySelector(tagName) :
                node.getElementsByTagName(tagName).item(0);

            if (result) {
                return result;
            }
        }

        return null;
    }

    /**
     * DOM Filters
     */

    /**
     * Recursively parse nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
     * @param {DOM~nodeCallback} [nodeFilter] The callback to use for filtering nodes.
     * @param {Boolean} [first=false] Whether to only return the first result.
     * @return {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
     */
    function _parseNode(nodes, context, nodeFilter, { html = false } = {}) {
        if (isString(nodes)) {
            if (html && nodes.trim().charAt(0) === '<') {
                return parseHTML(nodes).shift();
            }

            return findOne$1(nodes, context);
        }

        if (nodeFilter(nodes)) {
            return nodes;
        }

        if (nodes instanceof QuerySet) {
            const node = nodes.get(0);

            return nodeFilter(node) ? node : undefined;
        }

        if (nodes instanceof HTMLCollection || nodes instanceof NodeList) {
            const node = nodes.item(0);

            return nodeFilter(node) ? node : undefined;
        }
    }
    /**
     * Recursively parse nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
     * @param {DOM~nodeCallback} [nodeFilter] The callback to use for filtering nodes.
     * @param {Boolean} [first=false] Whether to only return the first result.
     * @return {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
     */
    function _parseNodes(nodes, context, nodeFilter, { html = false } = {}) {
        if (isString(nodes)) {
            if (html && nodes.trim().charAt(0) === '<') {
                return parseHTML(nodes);
            }

            return find$1(nodes, context);
        }

        if (nodeFilter(nodes)) {
            return [nodes];
        }

        if (nodes instanceof QuerySet) {
            return nodes.get().filter(nodeFilter);
        }

        if (nodes instanceof HTMLCollection || nodes instanceof NodeList) {
            return merge([], nodes).filter(nodeFilter);
        }

        return [];
    }
    /**
     * Return a node filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [defaultValue=true] The default return value.
     * @return {DOM~filterCallback} The node filter callback.
     */
    function parseFilter(filter, defaultValue = true) {
        if (!filter) {
            return (_) => defaultValue;
        }

        if (isFunction(filter)) {
            return filter;
        }

        if (isString(filter)) {
            return (node) => isElement(node) && node.matches(filter);
        }

        if (isNode(filter) || isFragment(filter) || isShadow(filter)) {
            return (node) => node.isSameNode(filter);
        }

        filter = parseNodes(filter, {
            node: true,
            fragment: true,
            shadow: true,
        });

        if (filter.length) {
            return (node) => filter.includes(node);
        }

        return (_) => !defaultValue;
    }
    /**
     * Return a node contains filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [defaultValue=true] The default return value.
     * @return {DOM~filterCallback} The node contains filter callback.
     */
    function parseFilterContains(filter, defaultValue = true) {
        if (!filter) {
            return (_) => defaultValue;
        }

        if (isFunction(filter)) {
            return (node) => merge([], node.querySelectorAll('*')).some(filter);
        }

        if (isString(filter)) {
            return (node) => !!findOne$1(filter, node);
        }

        if (isNode(filter) || isFragment(filter) || isShadow(filter)) {
            return (node) => node.contains(filter);
        }

        filter = parseNodes(filter, {
            node: true,
            fragment: true,
            shadow: true,
        });

        if (filter.length) {
            return (node) => filter.some((other) => node.contains(other));
        }

        return (_) => !defaultValue;
    }
    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=getContext()] The Document context.
     * @return {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
     */
    function parseNode(nodes, options = {}) {
        const filter = parseNodesFilter(options);

        if (!isArray(nodes)) {
            return _parseNode(nodes, options.context || getContext(), filter, options);
        }

        for (const node of nodes) {
            const result = _parseNode(node, options.context || getContext(), filter, options);

            if (result) {
                return result;
            }
        }
    }
    /**
     * Return a filtered array of nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=getContext()] The Document context.
     * @return {array} The filtered array of nodes.
     */
    function parseNodes(nodes, options = {}) {
        const filter = parseNodesFilter(options);

        if (!isArray(nodes)) {
            return _parseNodes(nodes, options.context || getContext(), filter, options);
        }

        const results = nodes.flatMap((node) => _parseNodes(node, options.context || getContext(), filter, options));

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return a function for filtering nodes.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @return {DOM~nodeCallback} The node filter function.
     */
    function parseNodesFilter(options) {
        if (!options) {
            return isElement;
        }

        const callbacks = [];

        if (options.node) {
            callbacks.push(isNode);
        } else {
            callbacks.push(isElement);
        }

        if (options.document) {
            callbacks.push(isDocument);
        }

        if (options.window) {
            callbacks.push(isWindow);
        }

        if (options.fragment) {
            callbacks.push(isFragment);
        }

        if (options.shadow) {
            callbacks.push(isShadow);
        }

        return (node) => callbacks.some((callback) => callback(node));
    }

    /**
     * DOM Animate
     */

    /**
     * Add an animation to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function animate$1(selector, callback, options) {
        const nodes = parseNodes(selector);

        const newAnimations = nodes.map((node) => new Animation(node, callback, options));

        start();

        return new AnimationSet(newAnimations);
    }
    /**
     * Stop all animations for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to complete all current animations.
     */
    function stop$1(selector, { finish = true } = {}) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            if (!animations.has(node)) {
                continue;
            }

            const currentAnimations = animations.get(node);
            for (const animation of currentAnimations) {
                animation.stop({ finish });
            }
        }
    }

    /**
     * DOM Animations
     */

    /**
     * Drop each node into place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function dropIn$1(selector, options) {
        return slideIn$1(
            selector,
            {
                direction: 'top',
                ...options,
            },
        );
    }
    /**
     * Drop each node out of place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function dropOut$1(selector, options) {
        return slideOut$1(
            selector,
            {
                direction: 'top',
                ...options,
            },
        );
    }
    /**
     * Fade the opacity of each node in.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function fadeIn$1(selector, options) {
        return animate$1(
            selector,
            (node, progress) =>
                node.style.setProperty(
                    'opacity',
                    progress < 1 ?
                        progress.toFixed(2) :
                        '',
                ),
            options,
        );
    }
    /**
     * Fade the opacity of each node out.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function fadeOut$1(selector, options) {
        return animate$1(
            selector,
            (node, progress) =>
                node.style.setProperty(
                    'opacity',
                    progress < 1 ?
                        (1 - progress).toFixed(2) :
                        '',
                ),
            options,
        );
    }
    /**
     * Rotate each node in on an X, Y or Z.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=1] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function rotateIn$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                const amount = ((90 - (progress * 90)) * (options.inverse ? -1 : 1)).toFixed(2);
                node.style.setProperty(
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                        '',
                );
            },
            {
                x: 0,
                y: 1,
                z: 0,
                ...options,
            },
        );
    }
    /**
     * Rotate each node out on an X, Y or Z.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=1] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function rotateOut$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                const amount = ((progress * 90) * (options.inverse ? -1 : 1)).toFixed(2);
                node.style.setProperty(
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                        '',
                );
            },
            {
                x: 0,
                y: 1,
                z: 0,
                ...options,
            },
        );
    }
    /**
     * Slide each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function slideIn$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                if (progress === 1) {
                    node.style.setProperty('overflow', '');
                    if (options.useGpu) {
                        node.style.setProperty('transform', '');
                    } else {
                        node.style.setProperty('margin-left', '');
                        node.style.setProperty('margin-top', '');
                    }
                    return;
                }

                const dir = evaluate(options.direction);

                let size; let translateStyle; let inverse;
                if (['top', 'bottom'].includes(dir)) {
                    size = node.clientHeight;
                    translateStyle = options.useGpu ?
                        'Y' :
                        'margin-top';
                    inverse = dir === 'top';
                } else {
                    size = node.clientWidth;
                    translateStyle = options.useGpu ?
                        'X' :
                        'margin-left';
                    inverse = dir === 'left';
                }

                const translateAmount = ((size - (size * progress)) * (inverse ? -1 : 1)).toFixed(2);
                if (options.useGpu) {
                    node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                } else {
                    node.style.setProperty(translateStyle, `${translateAmount}px`);
                }
            },
            {
                direction: 'bottom',
                useGpu: true,
                ...options,
            },
        );
    }
    /**
     * Slide each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function slideOut$1(selector, options) {
        return animate$1(
            selector,
            (node, progress, options) => {
                if (progress === 1) {
                    node.style.setProperty('overflow', '');
                    if (options.useGpu) {
                        node.style.setProperty('transform', '');
                    } else {
                        node.style.setProperty('margin-left', '');
                        node.style.setProperty('margin-top', '');
                    }
                    return;
                }

                const dir = evaluate(options.direction);

                let size; let translateStyle; let inverse;
                if (['top', 'bottom'].includes(dir)) {
                    size = node.clientHeight;
                    translateStyle = options.useGpu ?
                        'Y' :
                        'margin-top';
                    inverse = dir === 'top';
                } else {
                    size = node.clientWidth;
                    translateStyle = options.useGpu ?
                        'X' :
                        'margin-left';
                    inverse = dir === 'left';
                }

                const translateAmount = (size * progress * (inverse ? -1 : 1)).toFixed(2);
                if (options.useGpu) {
                    node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                } else {
                    node.style.setProperty(translateStyle, `${translateAmount}px`);
                }
            },
            {
                direction: 'bottom',
                useGpu: true,
                ...options,
            },
        );
    }
    /**
     * Squeeze each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function squeezeIn$1(selector, options) {
        const nodes = parseNodes(selector);

        options = {
            direction: 'bottom',
            useGpu: true,
            ...options,
        };

        const newAnimations = nodes.map((node) => {
            const initialHeight = node.style.height;
            const initialWidth = node.style.width;
            node.style.setProperty('overflow', 'hidden');

            return new Animation(
                node,
                (node, progress, options) => {
                    node.style.setProperty('height', initialHeight);
                    node.style.setProperty('width', initialWidth);

                    if (progress === 1) {
                        node.style.setProperty('overflow', '');
                        if (options.useGpu) {
                            node.style.setProperty('transform', '');
                        } else {
                            node.style.setProperty('margin-left', '');
                            node.style.setProperty('margin-top', '');
                        }
                        return;
                    }

                    const dir = evaluate(options.direction);

                    let size; let sizeStyle; let translateStyle;
                    if (['top', 'bottom'].includes(dir)) {
                        size = node.clientHeight;
                        sizeStyle = 'height';
                        if (dir === 'top') {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                        }
                    } else {
                        size = node.clientWidth;
                        sizeStyle = 'width';
                        if (dir === 'left') {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                        }
                    }

                    const amount = (size * progress).toFixed(2);

                    node.style.setProperty(sizeStyle, `${amount}px`);

                    if (translateStyle) {
                        const translateAmount = (size - amount).toFixed(2);
                        if (options.useGpu) {
                            node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                        } else {
                            node.style.setProperty(translateStyle, `${translateAmount}px`);
                        }
                    }
                },
                options,
            );
        });

        start();

        return new AnimationSet(newAnimations);
    }
    /**
     * Squeeze each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
     */
    function squeezeOut$1(selector, options) {
        const nodes = parseNodes(selector);

        options = {
            direction: 'bottom',
            useGpu: true,
            ...options,
        };

        const newAnimations = nodes.map((node) => {
            const initialHeight = node.style.height;
            const initialWidth = node.style.width;
            node.style.setProperty('overflow', 'hidden');

            return new Animation(
                node,
                (node, progress, options) => {
                    node.style.setProperty('height', initialHeight);
                    node.style.setProperty('width', initialWidth);

                    if (progress === 1) {
                        node.style.setProperty('overflow', '');
                        if (options.useGpu) {
                            node.style.setProperty('transform', '');
                        } else {
                            node.style.setProperty('margin-left', '');
                            node.style.setProperty('margin-top', '');
                        }
                        return;
                    }

                    const dir = evaluate(options.direction);

                    let size; let sizeStyle; let translateStyle;
                    if (['top', 'bottom'].includes(dir)) {
                        size = node.clientHeight;
                        sizeStyle = 'height';
                        if (dir === 'top') {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                        }
                    } else {
                        size = node.clientWidth;
                        sizeStyle = 'width';
                        if (dir === 'left') {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                        }
                    }

                    const amount = (size - (size * progress)).toFixed(2);

                    node.style.setProperty(sizeStyle, `${amount}px`);

                    if (translateStyle) {
                        const translateAmount = (size - amount).toFixed(2);
                        if (options.useGpu) {
                            node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                        } else {
                            node.style.setProperty(translateStyle, `${translateAmount}px`);
                        }
                    }
                },
                options,
            );
        });

        start();

        return new AnimationSet(newAnimations);
    }

    /**
     * DOM Utility
     */

    /**
     * Execute a command in the document context.
     * @param {string} command The command to execute.
     * @param {string} [value] The value to give the command.
     * @return {Boolean} TRUE if the command was executed, otherwise FALSE.
     */
    function exec(command, value = null) {
        return getContext().execCommand(command, false, value);
    }
    /**
     * Get the index of the first node relative to it's parent.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {number} The index.
     */
    function index$2(selector) {
        const node = parseNode(selector, {
            node: true,
        });

        if (!node || !node.parentNode) {
            return;
        }

        return merge([], node.parentNode.children).indexOf(node);
    }
    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {number} The index.
     */
    function indexOf$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).findIndex(nodeFilter);
    }
    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function normalize$1(selector) {
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
        });

        for (const node of nodes) {
            node.normalize();
        }
    }
    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The serialized string.
     */
    function serialize$1(selector) {
        return parseParams(
            serializeArray$1(selector),
        );
    }
    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The serialized array.
     */
    function serializeArray$1(selector) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
        }).reduce(
            (values, node) => {
                if (
                    (isElement(node) && node.matches('form')) ||
                    isFragment(node) ||
                    isShadow(node)
                ) {
                    return values.concat(
                        serializeArray$1(
                            node.querySelectorAll(
                                'input, select, textarea',
                            ),
                        ),
                    );
                }

                if (
                    isElement(node) &&
                    node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')
                ) {
                    return values;
                }

                const name = node.getAttribute('name');
                if (!name) {
                    return values;
                }

                if (
                    isElement(node) &&
                    node.matches('select[multiple]')
                ) {
                    for (const option of node.selectedOptions) {
                        values.push(
                            {
                                name,
                                value: option.value || '',
                            },
                        );
                    }
                } else {
                    values.push(
                        {
                            name,
                            value: node.value || '',
                        },
                    );
                }

                return values;
            },
            [],
        );
    }

    /**
     * Sort nodes by their position in the document.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The sorted array of nodes.
     */
    function sort$1(selector) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        }).sort((node, other) => {
            if (isWindow(node)) {
                return 1;
            }

            if (isWindow(other)) {
                return -1;
            }

            if (isDocument(node)) {
                return 1;
            }

            if (isDocument(other)) {
                return -1;
            }

            if (isFragment(other)) {
                return 1;
            }

            if (isFragment(node)) {
                return -1;
            }

            if (isShadow(node)) {
                node = node.host;
            }

            if (isShadow(other)) {
                other = other.host;
            }

            if (node.isSameNode(other)) {
                return 0;
            }

            const pos = node.compareDocumentPosition(other);

            if (pos & Node.DOCUMENT_POSITION_FOLLOWING || pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return -1;
            }

            if (pos & Node.DOCUMENT_POSITION_PRECEDING || pos & Node.DOCUMENT_POSITION_CONTAINS) {
                return 1;
            }

            return 0;
        });
    }
    /**
     * Return the tag name (lowercase) of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The nodes tag name (lowercase).
     */
    function tagName$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.tagName.toLowerCase();
    }

    /**
     * DOM Traversal
     */

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function child$1(selector, nodeFilter) {
        return children$1(selector, nodeFilter, { first: true });
    }
    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {object} [options] The options for filtering the nodes.
     * @param {Boolean} [options.first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [options.elementsOnly=true] Whether to only return element nodes.
     * @return {array} The matching nodes.
     */
    function children$1(selector, nodeFilter, { first = false, elementsOnly = true } = {}) {
        nodeFilter = parseFilter(nodeFilter);

        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        const results = [];

        for (const node of nodes) {
            const childNodes = elementsOnly ?
                merge([], node.children) :
                merge([], node.childNodes);

            for (const child of childNodes) {
                if (!nodeFilter(child)) {
                    continue;
                }

                results.push(child);

                if (first) {
                    break;
                }
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function closest$1(selector, nodeFilter, limitFilter) {
        return parents$1(selector, nodeFilter, limitFilter, { first: true });
    }
    /**
     * Return the common ancestor of all nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {HTMLElement} The common ancestor.
     */
    function commonAncestor$1(selector) {
        const nodes = sort$1(selector);

        if (!nodes.length) {
            return;
        }

        // Make sure all nodes have a parent
        if (nodes.some((node) => !node.parentNode)) {
            return;
        }

        const range = createRange();

        if (nodes.length === 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        return range.commonAncestorContainer;
    }
    /**
     * Return all children of each node (including text and comment nodes).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The matching nodes.
     */
    function contents$1(selector) {
        return children$1(selector, false, { elementsOnly: false });
    }
    /**
     * Return the DocumentFragment of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {DocumentFragment} The DocumentFragment.
     */
    function fragment$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.content;
    }
    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function next$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            while (node = node.nextSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (nodeFilter(node)) {
                    results.push(node);
                }

                break;
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @return {array} The matching nodes.
     */
    function nextAll$1(selector, nodeFilter, limitFilter, { first = false } = {}) {
        nodeFilter = parseFilter(nodeFilter);
        limitFilter = parseFilter(limitFilter, false);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            while (node = node.nextSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (limitFilter(node)) {
                    break;
                }

                if (!nodeFilter(node)) {
                    continue;
                }

                results.push(node);

                if (first) {
                    break;
                }
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {HTMLElement} The offset parent.
     */
    function offsetParent$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.offsetParent;
    }
    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function parent$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes have no parent
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            node = node.parentNode;

            if (!node) {
                continue;
            }

            if (!nodeFilter(node)) {
                continue;
            }

            results.push(node);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @return {array} The matching nodes.
     */
    function parents$1(selector, nodeFilter, limitFilter, { first = false } = {}) {
        nodeFilter = parseFilter(nodeFilter);
        limitFilter = parseFilter(limitFilter, false);

        // DocumentFragment and ShadowRoot nodes have no parent
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            const parents = [];
            while (node = node.parentNode) {
                if (isDocument(node)) {
                    break;
                }

                if (limitFilter(node)) {
                    break;
                }

                if (!nodeFilter(node)) {
                    continue;
                }

                parents.unshift(node);

                if (first) {
                    break;
                }
            }

            results.push(...parents);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The matching nodes.
     */
    function prev$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            while (node = node.previousSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (nodeFilter(node)) {
                    results.push(node);
                }

                break;
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @return {array} The matching nodes.
     */
    function prevAll$1(selector, nodeFilter, limitFilter, { first = false } = {}) {
        nodeFilter = parseFilter(nodeFilter);
        limitFilter = parseFilter(limitFilter, false);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (let node of nodes) {
            const siblings = [];
            while (node = node.previousSibling) {
                if (!isElement(node)) {
                    continue;
                }

                if (limitFilter(node)) {
                    break;
                }

                if (!nodeFilter(node)) {
                    continue;
                }

                siblings.unshift(node);

                if (first) {
                    break;
                }
            }

            results.push(...siblings);
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Return the ShadowRoot of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {ShadowRoot} The ShadowRoot.
     */
    function shadow$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node.shadowRoot;
    }
    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {object} [options] The options for filtering the nodes.
     * @param {Boolean} [options.elementsOnly=true] Whether to only return element nodes.
     * @return {array} The matching nodes.
     */
    function siblings$1(selector, nodeFilter, { elementsOnly = true } = {}) {
        nodeFilter = parseFilter(nodeFilter);

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        const results = [];

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            const siblings = elementsOnly ?
                parent.children :
                parent.childNodes;

            let sibling;
            for (sibling of siblings) {
                if (node.isSameNode(sibling)) {
                    continue;
                }

                if (!nodeFilter(sibling)) {
                    continue;
                }

                results.push(sibling);
            }
        }

        return nodes.length > 1 && results.length > 1 ?
            unique(results) :
            results;
    }

    /**
     * DOM Event Factory
     */

    /**
     * Return a function for matching a delegate target to a custom selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @return {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    function getDelegateContainsFactory(node, selector) {
        return (target) => {
            const matches = merge([], node.querySelectorAll(selector));

            if (!matches.length) {
                return false;
            }

            if (matches.includes(target)) {
                return target;
            }

            return closest$1(
                target,
                (parent) => matches.includes(parent),
                (parent) => parent.isSameNode(node),
            ).shift();
        };
    }
    /**
     * Return a function for matching a delegate target to a standard selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @return {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    function getDelegateMatchFactory(node, selector) {
        return (target) =>
            target.matches && target.matches(selector) ?
                target :
                closest$1(
                    target,
                    (parent) => parent.matches(selector),
                    (parent) => parent.isSameNode(node),
                ).shift();
    }
    /**
     * Return a wrapped event callback that executes on a delegate selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @param {function} callback The event callback.
     * @return {DOM~eventCallback} The delegated event callback.
     */
    function delegateFactory(node, selector, callback) {
        const getDelegate = selector.match(/(?:^\s*\:scope|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*\:scope)/) ?
            getDelegateContainsFactory(node, selector) :
            getDelegateMatchFactory(node, selector);

        return (event) => {
            if (node.isSameNode(event.target)) {
                return;
            }

            const delegate = getDelegate(event.target);

            if (!delegate) {
                return;
            }

            Object.defineProperty(event, 'currentTarget', {
                value: delegate,
                configurable: true,
            });
            Object.defineProperty(event, 'delegateTarget', {
                value: node,
                configurable: true,
            });

            return callback(event);
        };
    }
    /**
     * Return a wrapped mouse drag event (optionally debounced).
     * @param {DOM~eventCallback} down The callback to execute on mousedown.
     * @param {DOM~eventCallback} move The callback to execute on mousemove.
     * @param {DOM~eventCallback} up The callback to execute on mouseup.
     * @param {object} [options] The options for the mouse drag event.
     * @param {Boolean} [options.debounce] Whether to debounce the move event.
     * @param {Boolean} [options.passive] Whether to use passive event listeners.
     * @return {DOM~eventCallback} The mouse drag event callback.
     */
    function mouseDragFactory(down, move, up, { debounce: debounce$1 = true, passive = true, touches = 1 } = {}) {
        if (move && debounce$1) {
            move = debounce(move);

            // needed to make sure up callback executes after final move callback
            if (up) {
                up = debounce(up);
            }
        }

        return (event) => {
            const isTouch = event.type === 'touchstart';

            if (isTouch && event.touches.length !== touches) {
                return;
            }

            if (down && down(event) === false) {
                return;
            }

            if (isTouch) {
                event.preventDefault();
            }

            if (!move && !up) {
                return;
            }

            const moveEvent = isTouch ?
                'touchmove' :
                'mousemove';

            const realMove = (event) => {
                if (isTouch && event.touches.length !== touches) {
                    return;
                }

                if (!move) {
                    return;
                }

                move(event);
            };

            const upEvent = isTouch ?
                'touchend' :
                'mouseup';

            const realUp = (event) => {
                if (isTouch && event.touches.length !== touches - 1) {
                    return;
                }

                if (up && up(event) === false) {
                    return;
                }

                if (isTouch) {
                    event.preventDefault();
                }

                removeEvent$1(window, moveEvent, realMove);
                removeEvent$1(window, upEvent, realUp);
            };

            addEvent$1(window, moveEvent, realMove, { passive });
            addEvent$1(window, upEvent, realUp, { passive });
        };
    }
    /**
     * Return a wrapped event callback that checks for a namespace match.
     * @param {string} eventName The namespaced event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @return {DOM~eventCallback} The wrapped event callback.
     */
    function namespaceFactory(eventName, callback) {
        return (event) => {
            if ('namespaceRegExp' in event && !event.namespaceRegExp.test(eventName)) {
                return;
            }

            return callback(event);
        };
    }
    /**
     * Return a wrapped event callback that checks for a return false for preventing default.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @return {DOM~eventCallback} The wrapped event callback.
     */
    function preventFactory(callback) {
        return (event) => {
            if (callback(event) === false) {
                event.preventDefault();
            }
        };
    }
    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} eventName The event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {string} [optoins.delegate] The delegate selector.
     * @return {DOM~eventCallback} The wrapped event callback.
     */
    function selfDestructFactory(node, eventName, callback, { capture = null, delegate = null } = {}) {
        return (event) => {
            removeEvent$1(node, eventName, callback, { capture, delegate });
            return callback(event);
        };
    }

    /**
     * DOM Event Handlers
     */

    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} eventNames The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {string} [options.delegate] The delegate selector.
     * @param {Boolean} [options.selfDestruct] Whether to use a self-destructing event.
     */
    function addEvent$1(selector, eventNames, callback, { capture = false, delegate = null, selfDestruct = false } = {}) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        eventNames = parseEvents(eventNames);

        for (const eventName of eventNames) {
            const realEventName = parseEvent(eventName);

            const eventData = {
                callback,
                delegate,
                selfDestruct,
                capture,
            };

            for (const node of nodes) {
                if (!events.has(node)) {
                    events.set(node, {});
                }

                const nodeEvents = events.get(node);

                let realCallback = callback;

                if (selfDestruct) {
                    realCallback = selfDestructFactory(node, eventName, realCallback, { capture, delegate });
                }

                realCallback = preventFactory(realCallback);

                if (delegate) {
                    realCallback = delegateFactory(node, delegate, realCallback);
                }

                realCallback = namespaceFactory(eventName, realCallback);

                eventData.realCallback = realCallback;
                eventData.eventName = eventName;
                eventData.realEventName = realEventName;

                if (!nodeEvents[realEventName]) {
                    nodeEvents[realEventName] = [];
                }

                nodeEvents[realEventName].push({ ...eventData });

                node.addEventListener(realEventName, realCallback, { capture });
            }
        }
    }
    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     */
    function addEventDelegate$1(selector, events, delegate, callback, { capture = false } = {}) {
        addEvent$1(selector, events, callback, { capture, delegate });
    }
    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     */
    function addEventDelegateOnce$1(selector, events, delegate, callback, { capture = false } = {}) {
        addEvent$1(selector, events, callback, { capture, delegate, selfDestruct: true });
    }
    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     */
    function addEventOnce$1(selector, events, callback, { capture = false } = {}) {
        addEvent$1(selector, events, callback, { capture, selfDestruct: true });
    }
    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function cloneEvents$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        for (const node of nodes) {
            const nodeEvents = events.get(node);

            for (const realEvents of Object.values(nodeEvents)) {
                for (const eventData of realEvents) {
                    addEvent$1(
                        otherSelector,
                        eventData.eventName,
                        eventData.callback,
                        {
                            capture: eventData.capture,
                            delegate: eventData.delegate,
                            selfDestruct: eventData.selfDestruct,
                        },
                    );
                }
            }
        }
    }
    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [eventNames] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     * @param {string} [options.delegate] The delegate selector.
     */
    function removeEvent$1(selector, eventNames, callback, { capture = null, delegate = null } = {}) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        let eventLookup;
        if (eventNames) {
            eventNames = parseEvents(eventNames);

            eventLookup = {};

            for (const eventName of eventNames) {
                const realEventName = parseEvent(eventName);

                if (!(realEventName in eventLookup)) {
                    eventLookup[realEventName] = [];
                }

                eventLookup[realEventName].push(eventName);
            }
        }

        for (const node of nodes) {
            if (!events.has(node)) {
                continue;
            }

            const nodeEvents = events.get(node);

            for (const [realEventName, realEvents] of Object.entries(nodeEvents)) {
                if (eventLookup && !(realEventName in eventLookup)) {
                    continue;
                }

                const otherEvents = realEvents.filter((eventData) => {
                    if (eventLookup && !eventLookup[realEventName].some((eventName) => {
                        if (eventName === realEventName) {
                            return true;
                        }

                        const regExp = eventNamespacedRegExp(eventName);

                        return eventData.eventName.match(regExp);
                    })) {
                        return true;
                    }

                    if (callback && callback !== eventData.callback) {
                        return true;
                    }

                    if (delegate && delegate !== eventData.delegate) {
                        return true;
                    }

                    if (capture !== null && capture !== eventData.capture) {
                        return true;
                    }

                    node.removeEventListener(realEventName, eventData.realCallback, eventData.capture);

                    return false;
                });

                if (!otherEvents.length) {
                    delete nodeEvents[realEventName];
                }
            }

            if (!Object.keys(nodeEvents).length) {
                events.delete(node);
            }
        }
    }
    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {object} [options] The options for the event.
     * @param {Boolean} [options.capture] Whether to use a capture event.
     */
    function removeEventDelegate$1(selector, events, delegate, callback, { capture = null } = {}) {
        removeEvent$1(selector, events, callback, { capture, delegate });
    }
    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    function triggerEvent$1(selector, events, { detail = null, bubbles = true, cancelable = true } = {}) {
        const nodes = parseNodes(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        events = parseEvents(events);

        for (const event of events) {
            const realEvent = parseEvent(event);

            const eventData = new CustomEvent(realEvent, {
                detail,
                bubbles,
                cancelable,
            });

            if (realEvent !== event) {
                eventData.namespace = event.substring(realEvent.length + 1);
                eventData.namespaceRegExp = eventNamespacedRegExp(event);
            }

            for (const node of nodes) {
                node.dispatchEvent(eventData);
            }
        }
    }
    /**
     * Trigger an event for the first node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} event The event name.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @return {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    function triggerOne$1(selector, event, { detail = null, bubbles = true, cancelable = true } = {}) {
        const node = parseNode(selector, {
            shadow: true,
            document: true,
            window: true,
        });

        const realEvent = parseEvent(event);

        const eventData = new CustomEvent(realEvent, {
            detail,
            bubbles,
            cancelable,
        });

        if (realEvent !== event) {
            eventData.namespace = event.substring(realEvent.length + 1);
            eventData.namespaceRegExp = eventNamespacedRegExp(event);
        }

        return node.dispatchEvent(eventData);
    }

    /**
     * DOM Manipulation
     */

    /**
     * Clone each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} options The options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @return {array} The cloned nodes.
     */
    function clone$1(selector, { deep = true, events = false, data = false, animations = false } = {}) {
        // ShadowRoot nodes can not be cloned
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
        });

        return nodes.map((node) => {
            const clone = node.cloneNode(deep);

            if (events || data || animations) {
                deepClone(node, clone, { deep, events, data, animations });
            }

            return clone;
        });
    }
    /**
     * Deep clone a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The node.
     * @param {Node|HTMLElement|DocumentFragment} clone The clone.
     * @param {object} options The options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     */
    function deepClone(node, clone, { deep = true, events: events$1 = false, data: data$1 = false, animations: animations$1 = false } = {}) {
        if (events$1 && events.has(node)) {
            const nodeEvents = events.get(node);

            for (const realEvents of Object.values(nodeEvents)) {
                for (const eventData of realEvents) {
                    addEvent$1(
                        clone,
                        eventData.eventName,
                        eventData.callback,
                        {
                            capture: eventData.capture,
                            delegate: eventData.delegate,
                            selfDestruct: eventData.selfDestruct,
                        },
                    );
                }
            }
        }

        if (data$1 && data.has(node)) {
            const nodeData = data.get(node);
            data.set(clone, { ...nodeData });
        }

        if (animations$1 && animations.has(node)) {
            const nodeAnimations = animations.get(node);

            for (const animation of nodeAnimations) {
                animation.clone(clone);
            }
        }

        if (deep) {
            for (const [i, child] of node.childNodes.entries()) {
                const childClone = clone.childNodes.item(i);
                deepClone(child, childClone, { deep, events: events$1, data: data$1, animations: animations$1 });
            }
        }
    }
    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The detached nodes.
     */
    function detach$1(selector) {
        // DocumentFragment and ShadowRoot nodes can not be detached
        const nodes = parseNodes(selector, {
            node: true,
        });

        for (const node of nodes) {
            node.remove();
        }

        return nodes;
    }
    /**
     * Remove all children of each node from the DOM.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function empty$1(selector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        for (const node of nodes) {
            const childNodes = merge([], node.childNodes);

            // Remove descendent elements
            for (const child of childNodes) {
                if (isElement(node) || isFragment(node) || isShadow(node)) {
                    removeNode(child);
                }

                child.remove();
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                removeNode(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                removeNode(node.content);
            }
        }
    }
    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function remove$1(selector) {
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        for (const node of nodes) {
            if (isElement(node) || isFragment(node) || isShadow(node)) {
                removeNode(node);
            }

            // DocumentFragment and ShadowRoot nodes can not be removed
            if (isNode(node)) {
                node.remove();
            }
        }
    }
    /**
     * Remove all data for a single node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node.
     */
    function removeNode(node) {
        if (events.has(node)) {
            const nodeEvents = events.get(node);

            if ('remove' in nodeEvents) {
                const eventData = new CustomEvent('remove', {
                    bubbles: false,
                    cancelable: false,
                });

                node.dispatchEvent(eventData);
            }

            for (const [realEventName, realEvents] of Object.entries(nodeEvents)) {
                for (const eventData of realEvents) {
                    node.removeEventListener(realEventName, eventData.realCallback, { capture: eventData.capture });
                }
            }

            events.delete(node);
        }

        if (queues.has(node)) {
            queues.delete(node);
        }

        if (animations.has(node)) {
            const nodeAnimations = animations.get(node);
            for (const animation of nodeAnimations) {
                animation.stop();
            }
        }

        if (styles.has(node)) {
            styles.delete(node);
        }

        if (data.has(node)) {
            data.delete(node);
        }

        // Remove descendent elements
        const childNodes = merge([], node.children);

        for (const child of childNodes) {
            removeNode(child);
        }

        // Remove ShadowRoot
        if (node.shadowRoot) {
            removeNode(node.shadowRoot);
        }

        // Remove DocumentFragment
        if (node.content) {
            removeNode(node.content);
        }
    }
    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector string.
     */
    function replaceAll$1(selector, otherSelector) {
        replaceWith$1(otherSelector, selector);
    }
    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector or HTML string.
     */
    function replaceWith$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not be removed
        let nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be cloned
        let others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        // Move nodes to a fragment so they don't get removed
        const fragment = createFragment();

        for (const other of others) {
            fragment.insertBefore(other, null);
        }

        others = merge([], fragment.childNodes);

        nodes = nodes.filter((node) =>
            !others.includes(node) &&
            !nodes.some((other) =>
                !other.isSameNode(node) &&
                other.contains(node),
            ),
        );

        for (const [i, node] of nodes.entries()) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }
        }

        remove$1(nodes);
    }

    /**
     * DOM Attributes
     */

    /**
     * Get attribute value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [attribute] The attribute name.
     * @return {string|object} The attribute value, or an object containing attributes.
     */
    function getAttribute$1(selector, attribute) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (attribute) {
            return node.getAttribute(attribute);
        }

        return Object.fromEntries(
            merge([], node.attributes)
                .map((attribute) => [attribute.nodeName, attribute.nodeValue]),
        );
    }
    /**
     * Get dataset value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @return {*} The dataset value, or an object containing the dataset.
     */
    function getDataset$1(selector, key) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (key) {
            key = camelCase(key);

            return parseDataset(node.dataset[key]);
        }

        return Object.fromEntries(
            Object.entries(node.dataset)
                .map(([key, value]) => [key, parseDataset(value)]),
        );
    }
    /**
     * Get the HTML contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The HTML contents.
     */
    function getHTML$1(selector) {
        return getProperty$1(selector, 'innerHTML');
    }
    /**
     * Get a property value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @return {string} The property value.
     */
    function getProperty$1(selector, property) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        return node[property];
    }
    /**
     * Get the text contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The text contents.
     */
    function getText$1(selector) {
        return getProperty$1(selector, 'textContent');
    }
    /**
     * Get the value property of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {string} The value.
     */
    function getValue$1(selector) {
        return getProperty$1(selector, 'value');
    }
    /**
     * Remove an attribute from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     */
    function removeAttribute$1(selector, attribute) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.removeAttribute(attribute);
        }
    }
    /**
     * Remove a dataset value from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} key The dataset key.
     */
    function removeDataset$1(selector, key) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            key = camelCase(key);

            delete node.dataset[key];
        }
    }
    /**
     * Remove a property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    function removeProperty$1(selector, property) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            delete node[property];
        }
    }
    /**
     * Set an attribute value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     */
    function setAttribute$1(selector, attribute, value) {
        const nodes = parseNodes(selector);

        const attributes = parseData(attribute, value);

        for (const [key, value] of Object.entries(attributes)) {
            for (const node of nodes) {
                node.setAttribute(key, value);
            }
        }
    }
    /**
     * Set a dataset value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     */
    function setDataset$1(selector, key, value) {
        const nodes = parseNodes(selector);

        const dataset = parseData(key, value, { json: true });

        for (let [key, value] of Object.entries(dataset)) {
            key = camelCase(key);
            for (const node of nodes) {
                node.dataset[key] = value;
            }
        }
    }
    /**
     * Set the HTML contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} html The HTML contents.
     */
    function setHTML$1(selector, html) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            const childNodes = merge([], node.children);

            for (const child of childNodes) {
                removeNode(child);
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                removeNode(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                removeNode(node.content);
            }

            node.innerHTML = html;
        }
    }
    /**
     * Set a property value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     */
    function setProperty$1(selector, property, value) {
        const nodes = parseNodes(selector);

        const properties = parseData(property, value);

        for (const [key, value] of Object.entries(properties)) {
            for (const node of nodes) {
                node[key] = value;
            }
        }
    }
    /**
     * Set the text contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} text The text contents.
     */
    function setText$1(selector, text) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            const childNodes = merge([], node.children);

            for (const child of childNodes) {
                removeNode(child);
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                removeNode(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                removeNode(node.content);
            }

            node.textContent = text;
        }
    }
    /**
     * Set the value property of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} value The value.
     */
    function setValue$1(selector, value) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.value = value;
        }
    }

    /**
     * DOM Data
     */

    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function cloneData$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        const others = parseNodes(otherSelector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (!data.has(node)) {
                continue;
            }

            const nodeData = data.get(node);
            setData$1(others, { ...nodeData });
        }
    }
    /**
     * Get custom data for the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @return {*} The data value.
     */
    function getData$1(selector, key) {
        const node = parseNode(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        if (!node || !data.has(node)) {
            return;
        }

        const nodeData = data.get(node);

        return key ?
            nodeData[key] :
            nodeData;
    }
    /**
     * Remove custom data from each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     */
    function removeData$1(selector, key) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (!data.has(node)) {
                continue;
            }

            const nodeData = data.get(node);

            if (key) {
                delete nodeData[key];
            }

            if (!key || !Object.keys(nodeData).length) {
                data.delete(node);
            }
        }
    }
    /**
     * Set custom data for each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     */
    function setData$1(selector, key, value) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        });

        const newData = parseData(key, value);

        for (const node of nodes) {
            if (!data.has(node)) {
                data.set(node, {});
            }

            const nodeData = data.get(node);

            Object.assign(nodeData, newData);
        }
    }

    /**
     * DOM Styles
     */

    /**
     * Add classes to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    function addClass$1(selector, ...classes) {
        const nodes = parseNodes(selector);

        classes = parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            node.classList.add(...classes);
        }
    }
    /**
     * Get computed CSS style value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [style] The CSS style name.
     * @return {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    function css$1(selector, style) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (!styles.has(node)) {
            styles.set(
                node,
                getWindow().getComputedStyle(node),
            );
        }

        const nodeStyles = styles.get(node);

        if (!style) {
            return { ...nodeStyles };
        }

        style = kebabCase(style);

        return nodeStyles.getPropertyValue(style);
    }
    /**
     * Get style properties for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [style] The style name.
     * @return {string|object} The style value, or an object containing the style properties.
     */
    function getStyle$1(selector, style) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        if (style) {
            style = kebabCase(style);

            return node.style[style];
        }

        const styles = {};

        for (const style of node.style) {
            styles[style] = node.style[style];
        }

        return styles;
    }
    /**
     * Hide each node from display.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function hide$1(selector) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.style.setProperty('display', 'none');
        }
    }
    /**
     * Remove classes from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    function removeClass$1(selector, ...classes) {
        const nodes = parseNodes(selector);

        classes = parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            node.classList.remove(...classes);
        }
    }
    /**
     * Set style properties for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {object} [options] The options for setting the style.
     * @param {Boolean} [options.important] Whether the style should be !important.
     */
    function setStyle$1(selector, style, value, { important = false } = {}) {
        const nodes = parseNodes(selector);

        const styles = parseData(style, value);

        for (let [style, value] of Object.entries(styles)) {
            style = kebabCase(style);

            // if value is numeric and not a number property, add px
            if (value && isNumeric(value) && !cssNumberProperties.includes(style)) {
                value += 'px';
            }

            for (const node of nodes) {
                node.style.setProperty(
                    style,
                    value,
                    important ?
                        'important' :
                        '',
                );
            }
        }
    }
    /**
     * Display each hidden node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function show$1(selector) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.style.setProperty('display', '');
        }
    }
    /**
     * Toggle the visibility of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function toggle$1(selector) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            node.style.setProperty(
                'display',
                node.style.display === 'none' ?
                    '' :
                    'none',
            );
        }
    }
    /**
     * Toggle classes for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    function toggleClass$1(selector, ...classes) {
        const nodes = parseNodes(selector);

        classes = parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            for (const className of classes) {
                node.classList.toggle(className);
            }
        }
    }

    /**
     * DOM Position
     */

    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the co-ordinates.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the x and y co-ordinates.
     */
    function center$1(selector, { offset = false } = {}) {
        const nodeBox = rect$1(selector, { offset });

        if (!nodeBox) {
            return;
        }

        return {
            x: nodeBox.left + nodeBox.width / 2,
            y: nodeBox.top + nodeBox.height / 2,
        };
    }
    /**
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} containerSelector The container node, or a query selector string.
     */
    function constrain$1(selector, containerSelector) {
        const containerBox = rect$1(containerSelector);

        if (!containerBox) {
            return;
        }

        const nodes = parseNodes(selector);

        const context = getContext();
        const window = getWindow();
        const getScrollX = (_) => context.documentElement.scrollHeight > window.outerHeight;
        const getScrollY = (_) => context.documentElement.scrollWidth > window.outerWidth;

        const preScrollX = getScrollX();
        const preScrollY = getScrollY();

        for (const node of nodes) {
            const nodeBox = rect$1(node);

            if (nodeBox.height > containerBox.height) {
                node.style.setProperty('height', `${containerBox.height}px`);
            }

            if (nodeBox.width > containerBox.width) {
                node.style.setProperty('width', `${containerBox.width}px`);
            }

            let leftOffset;
            if (nodeBox.left - containerBox.left < 0) {
                leftOffset = nodeBox.left - containerBox.left;
            } else if (nodeBox.right - containerBox.right > 0) {
                leftOffset = nodeBox.right - containerBox.right;
            }

            if (leftOffset) {
                const oldLeft = css$1(node, 'left');
                const trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
                node.style.setProperty('left', `${trueLeft - leftOffset}px`);
            }

            let topOffset;
            if (nodeBox.top - containerBox.top < 0) {
                topOffset = nodeBox.top - containerBox.top;
            } else if (nodeBox.bottom - containerBox.bottom > 0) {
                topOffset = nodeBox.bottom - containerBox.bottom;
            }

            if (topOffset) {
                const oldTop = css$1(node, 'top');
                const trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
                node.style.setProperty('top', `${trueTop - topOffset}px`);
            }

            if (css$1(node, 'position') === 'static') {
                node.style.setProperty('position', 'relative');
            }
        }

        const postScrollX = getScrollX();
        const postScrollY = getScrollY();

        if (preScrollX !== postScrollX || preScrollY !== postScrollY) {
            constrain$1(nodes, containerSelector);
        }
    }
    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {number} The distance to the element.
     */
    function distTo$1(selector, x, y, { offset = false } = {}) {
        const nodeCenter = center$1(selector, { offset });

        if (!nodeCenter) {
            return;
        }

        return dist(nodeCenter.x, nodeCenter.y, x, y);
    }
    /**
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {number} The distance between the nodes.
     */
    function distToNode$1(selector, otherSelector) {
        const otherCenter = center$1(otherSelector);

        if (!otherCenter) {
            return;
        }

        return distTo$1(selector, otherCenter.x, otherCenter.y);
    }
    /**
     * Get the nearest node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {HTMLElement} The nearest node.
     */
    function nearestTo$1(selector, x, y, { offset = false } = {}) {
        let closest;
        let closestDistance = Number.MAX_VALUE;

        const nodes = parseNodes(selector);

        for (const node of nodes) {
            const dist = distTo$1(node, x, y, { offset });
            if (dist && dist < closestDistance) {
                closestDistance = dist;
                closest = node;
            }
        }

        return closest;
    }
    /**
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {HTMLElement} The nearest node.
     */
    function nearestToNode$1(selector, otherSelector) {
        const otherCenter = center$1(otherSelector);

        if (!otherCenter) {
            return;
        }

        return nearestTo$1(selector, otherCenter.x, otherCenter.y);
    }
    /**
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentX$1(selector, x, { offset = false, clamp = true } = {}) {
        const nodeBox = rect$1(selector, { offset });

        if (!nodeBox) {
            return;
        }

        const percent = (x - nodeBox.left) /
            nodeBox.width *
            100;

        return clamp ?
            clampPercent(percent) :
            percent;
    }
    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentY$1(selector, y, { offset = false, clamp = true } = {}) {
        const nodeBox = rect$1(selector, { offset });

        if (!nodeBox) {
            return;
        }

        const percent = (y - nodeBox.top) /
            nodeBox.height *
            100;

        return clamp ?
            clampPercent(percent) :
            percent;
    }
    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the position.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the X and Y co-ordinates.
     */
    function position$1(selector, { offset = false } = {}) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        const result = {
            x: node.offsetLeft,
            y: node.offsetTop,
        };

        if (offset) {
            let offsetParent = node;

            while (offsetParent = offsetParent.offsetParent) {
                result.x += offsetParent.offsetLeft;
                result.y += offsetParent.offsetTop;
            }
        }

        return result;
    }
    /**
     * Get the computed bounding rectangle of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the bounding rectangle.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {DOMRect} The computed bounding rectangle.
     */
    function rect$1(selector, { offset = false } = {}) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        const result = node.getBoundingClientRect();

        if (offset) {
            const window = getWindow();
            result.x += window.scrollX;
            result.y += window.scrollY;
        }

        return result;
    }

    /**
     * DOM Scroll
     */

    /**
     * Get the scroll X position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {number} The scroll X position.
     */
    function getScrollX$1(selector) {
        const node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return node.scrollX;
        }

        if (isDocument(node)) {
            return node.scrollingElement.scrollLeft;
        }

        return node.scrollLeft;
    }
    /**
     * Get the scroll Y position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {number} The scroll Y position.
     */
    function getScrollY$1(selector) {
        const node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return node.scrollY;
        }

        if (isDocument(node)) {
            return node.scrollingElement.scrollTop;
        }

        return node.scrollTop;
    }
    /**
     * Scroll each node to an X,Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    function setScroll$1(selector, x, y) {
        const nodes = parseNodes(selector, {
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (isWindow(node)) {
                node.scroll(x, y);
            } else if (isDocument(node)) {
                node.scrollingElement.scrollLeft = x;
                node.scrollingElement.scrollTop = y;
            } else {
                node.scrollLeft = x;
                node.scrollTop = y;
            }
        }
    }
    /**
     * Scroll each node to an X position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    function setScrollX$1(selector, x) {
        const nodes = parseNodes(selector, {
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (isWindow(node)) {
                node.scroll(x, node.scrollY);
            } else if (isDocument(node)) {
                node.scrollingElement.scrollLeft = x;
            } else {
                node.scrollLeft = x;
            }
        }
    }
    /**
     * Scroll each node to a Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    function setScrollY$1(selector, y) {
        const nodes = parseNodes(selector, {
            document: true,
            window: true,
        });

        for (const node of nodes) {
            if (isWindow(node)) {
                node.scroll(node.scrollX, y);
            } else if (isDocument(node)) {
                node.scrollingElement.scrollTop = y;
            } else {
                node.scrollTop = y;
            }
        }
    }

    /**
     * DOM Size
     */

    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the height.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer height.
     * @return {number} The height.
     */
    function height$1(selector, { boxSize = PADDING_BOX, outer = false } = {}) {
        let node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return outer ?
                node.outerHeight :
                node.innerHeight;
        }

        if (isDocument(node)) {
            node = node.documentElement;
        }

        if (boxSize >= SCROLL_BOX) {
            return node.scrollHeight;
        }

        let result = node.clientHeight;

        if (boxSize <= CONTENT_BOX) {
            result -= parseInt(css$1(node, 'padding-top'));
            result -= parseInt(css$1(node, 'padding-bottom'));
        }

        if (boxSize >= BORDER_BOX) {
            result += parseInt(css$1(node, 'border-top-width'));
            result += parseInt(css$1(node, 'border-bottom-width'));
        }

        if (boxSize >= MARGIN_BOX) {
            result += parseInt(css$1(node, 'margin-top'));
            result += parseInt(css$1(node, 'margin-bottom'));
        }

        return result;
    }
    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for calculating the width.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer width.
     * @return {number} The width.
     */
    function width$1(selector, { boxSize = PADDING_BOX, outer = false } = {}) {
        let node = parseNode(selector, {
            document: true,
            window: true,
        });

        if (!node) {
            return;
        }

        if (isWindow(node)) {
            return outer ?
                node.outerWidth :
                node.innerWidth;
        }

        if (isDocument(node)) {
            node = node.documentElement;
        }

        if (boxSize >= SCROLL_BOX) {
            return node.scrollWidth;
        }

        let result = node.clientWidth;

        if (boxSize <= CONTENT_BOX) {
            result -= parseInt(css$1(node, 'padding-left'));
            result -= parseInt(css$1(node, 'padding-right'));
        }

        if (boxSize >= BORDER_BOX) {
            result += parseInt(css$1(node, 'border-left-width'));
            result += parseInt(css$1(node, 'border-right-width'));
        }

        if (boxSize >= MARGIN_BOX) {
            result += parseInt(css$1(node, 'margin-left'));
            result += parseInt(css$1(node, 'margin-right'));
        }

        return result;
    }

    /**
     * DOM Cookie
     */

    /**
     * Get a cookie value.
     * @param {string} name The cookie name.
     * @return {*} The cookie value.
     */
    function getCookie(name) {
        const cookie = getContext().cookie
            .split(';')
            .find((cookie) =>
                cookie
                    .trimStart()
                    .substring(0, name.length) === name,
            )
            .trimStart();

        if (!cookie) {
            return null;
        }

        return decodeURIComponent(
            cookie.substring(name.length + 1),
        );
    }
    /**
     * Remove a cookie.
     * @param {string} name The cookie name.
     * @param {object} [options] The options to use for the cookie.
     * @param {string} [options.path] The cookie path.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    function removeCookie(name, { path = null, secure = false } = {}) {
        if (!name) {
            return;
        }

        let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;

        if (path) {
            cookie += `;path=${path}`;
        }

        if (secure) {
            cookie += ';secure';
        }

        getContext().cookie = cookie;
    }
    /**
     * Set a cookie value.
     * @param {string} name The cookie name.
     * @param {*} value The cookie value.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The path to use for the cookie.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    function setCookie(name, value, { expires = null, path = null, secure = false } = {}) {
        if (!name) {
            return;
        }

        let cookie = `${name}=${value}`;

        if (expires) {
            const date = new Date;
            date.setTime(
                date.getTime() +
                expires * 1000,
            );
            cookie += `;expires=${date.toUTCString()}`;
        }

        if (path) {
            cookie += `;path=${path}`;
        }

        if (secure) {
            cookie += ';secure';
        }

        getContext().cookie = cookie;
    }

    /**
     * DOM Events
     */

    /**
     * Trigger a blur event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function blur$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        node.blur();
    }
    /**
     * Trigger a click event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function click$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        node.click();
    }
    /**
     * Trigger a focus event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function focus$1(selector) {
        const node = parseNode(selector);

        if (!node) {
            return;
        }

        node.focus();
    }
    /**
     * Add a function to the ready queue.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    function ready(callback) {
        if (getContext().readyState === 'complete') {
            callback();
        } else {
            getWindow().addEventListener('DOMContentLoaded', callback, { once: true });
        }
    }

    /**
     * DOM Move
     */

    /**
     * Insert each other node after each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function after$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        }).reverse();

        for (const [i, node] of nodes.entries()) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                parent.insertBefore(clone, node.nextSibling);
            }
        }
    }
    /**
     * Append each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function append$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        for (const [i, node] of nodes.entries()) {
            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                node.insertBefore(clone, null);
            }
        }
    }
    /**
     * Append each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function appendTo$1(selector, otherSelector) {
        append$1(otherSelector, selector);
    }
    /**
     * Insert each other node before each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function before$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not have siblings
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        for (const [i, node] of nodes.entries()) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }
        }
    }
    /**
     * Insert each node after each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function insertAfter$1(selector, otherSelector) {
        after$1(otherSelector, selector);
    }
    /**
     * Insert each node before each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function insertBefore$1(selector, otherSelector) {
        before$1(otherSelector, selector);
    }
    /**
     * Prepend each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} otherSelector The other node(s), or a query selector or HTML string.
     */
    function prepend$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        });

        // ShadowRoot nodes can not be moved
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            html: true,
        });

        for (const [i, node] of nodes.entries()) {
            const firstChild = node.firstChild;

            let clones;
            if (i === nodes.length - 1) {
                clones = others;
            } else {
                clones = clone$1(others, {
                    events: true,
                    data: true,
                    animations: true,
                });
            }

            for (const clone of clones) {
                node.insertBefore(clone, firstChild);
            }
        }
    }
    /**
     * Prepend each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     */
    function prependTo$1(selector, otherSelector) {
        prepend$1(otherSelector, selector);
    }

    /**
     * DOM Wrap
     */

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     */
    function unwrap$1(selector, nodeFilter) {
        // DocumentFragment and ShadowRoot nodes can not be unwrapped
        const nodes = parseNodes(selector, {
            node: true,
        });

        nodeFilter = parseFilter(nodeFilter);

        const parents = [];

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            if (parents.includes(parent)) {
                continue;
            }

            if (!nodeFilter(parent)) {
                continue;
            }

            parents.push(parent);
        }

        for (const parent of parents) {
            const outerParent = parent.parentNode;

            if (!outerParent) {
                continue;
            }

            const children = merge([], parent.childNodes);

            for (const child of children) {
                outerParent.insertBefore(child, parent);
            }
        }

        remove$1(parents);
    }
    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function wrap$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not be wrapped
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be cloned
        const others = parseNodes(otherSelector, {
            fragment: true,
            html: true,
        });

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            const clones = clone$1(others, {
                events: true,
                data: true,
                animations: true,
            });

            const firstClone = clones.slice().shift();

            const firstCloneNode = isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone;
            const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }

            deepest.insertBefore(node, null);
        }
    }
    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function wrapAll$1(selector, otherSelector) {
        // DocumentFragment and ShadowRoot nodes can not be wrapped
        const nodes = parseNodes(selector, {
            node: true,
        });

        // ShadowRoot nodes can not be cloned
        const others = parseNodes(otherSelector, {
            fragment: true,
            html: true,
        });

        const clones = clone$1(others, {
            events: true,
            data: true,
            animations: true,
        });

        const firstNode = nodes[0];

        if (!firstNode) {
            return;
        }

        const parent = firstNode.parentNode;

        if (!parent) {
            return;
        }

        const firstClone = clones[0];

        const firstCloneNode = isFragment(firstClone) ?
            firstClone.firstChild :
            firstClone;
        const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

        for (const clone of clones) {
            parent.insertBefore(clone, firstNode);
        }

        for (const node of nodes) {
            deepest.insertBefore(node, null);
        }
    }
    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     */
    function wrapInner$1(selector, otherSelector) {
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        // ShadowRoot nodes can not be cloned
        const others = parseNodes(otherSelector, {
            fragment: true,
            html: true,
        });

        for (const node of nodes) {
            const children = merge([], node.childNodes);

            const clones = clone$1(others, {
                events: true,
                data: true,
                animations: true,
            });

            const firstClone = clones.slice().shift();

            const firstCloneNode = isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone;
            const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

            for (const clone of clones) {
                node.insertBefore(clone, null);
            }

            for (const child of children) {
                deepest.insertBefore(child, null);
            }
        }
    }

    /**
     * QuerySet Animate
     */

    /**
     * Add an animation to the queue for each node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function animate(callback, { queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            animate$1(node, callback, options),
        { queueName },
        );
    }
    /**
     * Stop all animations and clear the queue of each node.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to complete all current animations.
     * @return {QuerySet} The QuerySet object.
     */
    function stop({ finish = true } = {}) {
        this.clearQueue();
        stop$1(this, { finish });

        return this;
    }

    /**
     * QuerySet Animations
     */

    /**
     * Add a drop in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function dropIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            dropIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a drop out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function dropOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            dropOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a fade in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function fadeIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            fadeIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a fade out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function fadeOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            fadeOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a rotate in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=0] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function rotateIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            rotateIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a rotate out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=0] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function rotateOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            rotateOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a slide in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function slideIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            slideIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a slide out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function slideOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            slideOut$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a squeeze in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function squeezeIn({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            squeezeIn$1(node, options),
        { queueName },
        );
    }
    /**
     * Add a squeeze out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @return {QuerySet} The QuerySet object.
     */
    function squeezeOut({ queueName = 'default', ...options } = {}) {
        return this.queue((node) =>
            squeezeOut$1(node, options),
        { queueName },
        );
    }

    /**
     * QuerySet Attributes
     */

    /**
     * Get attribute value(s) for the first node.
     * @param {string} [attribute] The attribute name.
     * @return {string} The attribute value.
     */
    function getAttribute(attribute) {
        return getAttribute$1(this, attribute);
    }
    /**
     * Get dataset value(s) for the first node.
     * @param {string} [key] The dataset key.
     * @return {*} The dataset value, or an object containing the dataset.
     */
    function getDataset(key) {
        return getDataset$1(this, key);
    }
    /**
     * Get the HTML contents of the first node.
     * @return {string} The HTML contents.
     */
    function getHTML() {
        return getHTML$1(this);
    }
    /**
     * Get a property value for the first node.
     * @param {string} property The property name.
     * @return {string} The property value.
     */
    function getProperty(property) {
        return getProperty$1(this, property);
    }
    /**
     * Get the text contents of the first node.
     * @return {string} The text contents.
     */
    function getText() {
        return getText$1(this);
    }
    /**
     * Get the value property of the first node.
     * @return {string} The value.
     */
    function getValue() {
        return getValue$1(this);
    }
    /**
     * Remove an attribute from each node.
     * @param {string} attribute The attribute name.
     * @return {QuerySet} The QuerySet object.
     */
    function removeAttribute(attribute) {
        removeAttribute$1(this, attribute);

        return this;
    }
    /**
     * Remove a dataset value from each node.
     * @param {string} key The dataset key.
     * @return {QuerySet} The QuerySet object.
     */
    function removeDataset(key) {
        removeDataset$1(this, key);

        return this;
    }
    /**
     * Remove a property from each node.
     * @param {string} property The property name.
     * @return {QuerySet} The QuerySet object.
     */
    function removeProperty(property) {
        removeProperty$1(this, property);

        return this;
    }
    /**
     * Set an attribute value for each node.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     * @return {QuerySet} The QuerySet object.
     */
    function setAttribute(attribute, value) {
        setAttribute$1(this, attribute, value);

        return this;
    }
    /**
     * Set a dataset value for each node.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     * @return {QuerySet} The QuerySet object.
     */
    function setDataset(key, value) {
        setDataset$1(this, key, value);

        return this;
    }
    /**
     * Set the HTML contents of each node.
     * @param {string} html The HTML contents.
     * @return {QuerySet} The QuerySet object.
     */
    function setHTML(html) {
        setHTML$1(this, html);

        return this;
    }
    /**
     * Set a property value for each node.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     * @return {QuerySet} The QuerySet object.
     */
    function setProperty(property, value) {
        setProperty$1(this, property, value);

        return this;
    }
    /**
     * Set the text contents of each node.
     * @param {string} text The text contents.
     * @return {QuerySet} The QuerySet object.
     */
    function setText(text) {
        setText$1(this, text);

        return this;
    }
    /**
     * Set the value property of each node.
     * @param {string} value The value.
     * @return {QuerySet} The QuerySet object.
     */
    function setValue(value) {
        setValue$1(this, value);

        return this;
    }

    /**
     * QuerySet Data
     */

    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function cloneData(otherSelector) {
        cloneData$1(this, otherSelector);

        return this;
    }
    /**
     * Get custom data for the first node.
     * @param {string} [key] The data key.
     * @return {*} The data value.
     */
    function getData(key) {
        return getData$1(this, key);
    }
    /**
     * Remove custom data from each node.
     * @param {string} [key] The data key.
     * @return {QuerySet} The QuerySet object.
     */
    function removeData(key) {
        removeData$1(this, key);

        return this;
    }
    /**
     * Set custom data for each node.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     * @return {QuerySet} The QuerySet object.
     */
    function setData(key, value) {
        setData$1(this, key, value);

        return this;
    }

    /**
     * QuerySet Position
     */

    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {object} [options] The options for calculating the co-ordinates.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the x and y co-ordinates.
     */
    function center({ offset = false } = {}) {
        return center$1(this, { offset });
    }
    /**
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function constrain(container) {
        constrain$1(this, container);

        return this;
    }
    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {number} The distance to the node.
     */
    function distTo(x, y, { offset = false } = {}) {
        return distTo$1(this, x, y, { offset });
    }
    /**
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {number} The distance between the nodes.
     */
    function distToNode(otherSelector) {
        return distToNode$1(this, otherSelector);
    }
    /**
     * Get the nearest node to an X,Y position in the Window.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the distance.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {QuerySet} A new QuerySet object.
     */
    function nearestTo(x, y, { offset = false } = {}) {
        const node = nearestTo$1(this, x, y, { offset });

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
     * @return {QuerySet} A new QuerySet object.
     */
    function nearestToNode(otherSelector) {
        const node = nearestToNode$1(this, otherSelector);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {number} x The X co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentX(x, { offset = false, clamp = true } = {}) {
        return percentX$1(this, x, { offset, clamp });
    }
    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {number} y The Y co-ordinate.
     * @param {object} [options] The options for calculating the percentage.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
     * @return {number} The percent.
     */
    function percentY(y, { offset = false, clamp = true } = {}) {
        return percentY$1(this, y, { offset, clamp });
    }
    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {object} [options] The options for calculating the position.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {object} An object with the x and y co-ordinates.
     */
    function position({ offset = false } = {}) {
        return position$1(this, { offset });
    }
    /**
     * Get the computed bounding rectangle of the first node.
     * @param {object} [options] The options for calculating the bounding rectangle.
     * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
     * @return {DOMRect} The computed bounding rectangle.
     */
    function rect({ offset = false } = {}) {
        return rect$1(this, { offset });
    }

    /**
     * QuerySet Scroll
     */

    /**
     * Get the scroll X position of the first node.
     * @return {number} The scroll X position.
     */
    function getScrollX() {
        return getScrollX$1(this);
    }
    /**
     * Get the scroll Y position of the first node.
     * @return {number} The scroll Y position.
     */
    function getScrollY() {
        return getScrollY$1(this);
    }
    /**
     * Scroll each node to an X,Y position.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     * @return {QuerySet} The QuerySet object.
     */
    function setScroll(x, y) {
        setScroll$1(this, x, y);

        return this;
    }
    /**
     * Scroll each node to an X position.
     * @param {number} x The scroll X position.
     * @return {QuerySet} The QuerySet object.
     */
    function setScrollX(x) {
        setScrollX$1(this, x);

        return this;
    }
    /**
     * Scroll each node to a Y position.
     * @param {number} y The scroll Y position.
     * @return {QuerySet} The QuerySet object.
     */
    function setScrollY(y) {
        setScrollY$1(this, y);

        return this;
    }

    /**
     * QuerySet Size
     */

    /**
     * Get the computed height of the first node.
     * @param {object} [options] The options for calculating the height.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer height.
     * @return {number} The height.
     */
    function height({ boxSize = PADDING_BOX, outer = false } = {}) {
        return height$1(this, { boxSize, outer });
    }
    /**
     * Get the computed width of the first node.
     * @param {object} [options] The options for calculating the width.
     * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
     * @param {Boolean} [options.outer] Whether to use the window outer width.
     * @return {number} The width.
     */
    function width({ boxSize = PADDING_BOX, outer = false } = {}) {
        return width$1(this, { boxSize, outer });
    }

    /**
     * QuerySet Styles
     */

    /**
     * Add classes to each node.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function addClass(...classes) {
        addClass$1(this, ...classes);

        return this;
    }
    /**
     * Get computed CSS style values for the first node.
     * @param {string} [style] The CSS style name.
     * @return {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    function css(style) {
        return css$1(this, style);
    }
    /**
     * Get style properties for the first node.
     * @param {string} [style] The style name.
     * @return {string|object} The style value, or an object containing the style properties.
     */
    function getStyle(style) {
        return getStyle$1(this, style);
    }
    /**
     * Hide each node from display.
     * @return {QuerySet} The QuerySet object.
     */
    function hide() {
        hide$1(this);

        return this;
    }
    /**
     * Remove classes from each node.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function removeClass(...classes) {
        removeClass$1(this, ...classes);

        return this;
    }
    /**
     * Set style properties for each node.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {object} [options] The options for setting the style.
     * @param {Boolean} [options.important] Whether the style should be !important.
     * @return {QuerySet} The QuerySet object.
     */
    function setStyle(style, value, { important = false } = {}) {
        setStyle$1(this, style, value, { important });

        return this;
    }
    /**
     * Display each hidden node.
     * @return {QuerySet} The QuerySet object.
     */
    function show() {
        show$1(this);

        return this;
    }
    /**
     * Toggle the visibility of each node.
     * @return {QuerySet} The QuerySet object.
     */
    function toggle() {
        toggle$1(this);

        return this;
    }
    /**
     * Toggle classes for each node.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function toggleClass(...classes) {
        toggleClass$1(this, ...classes);

        return this;
    }

    /**
     * QuerySet Event Handlers
     */

    /**
     * Add an event to each node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEvent(events, callback, { capture = false } = {}) {
        addEvent$1(this, events, callback, { capture });

        return this;
    }
    /**
     * Add a delegated event to each node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEventDelegate(events, delegate, callback, { capture = false } = {}) {
        addEventDelegate$1(this, events, delegate, callback, { capture });

        return this;
    }
    /**
     * Add a self-destructing delegated event to each node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEventDelegateOnce(events, delegate, callback, { capture = false } = {}) {
        addEventDelegateOnce$1(this, events, delegate, callback, { capture });

        return this;
    }
    /**
     * Add a self-destructing event to each node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function addEventOnce(events, callback, { capture = false } = {}) {
        addEventOnce$1(this, events, callback, { capture });

        return this;
    }
    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function cloneEvents(otherSelector) {
        cloneEvents$1(this, otherSelector);

        return this;
    }
    /**
     * Remove events from each node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {Boolean} [capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function removeEvent(events, callback, { capture = false } = {}) {
        removeEvent$1(this, events, callback, { capture });

        return this;
    }
    /**
     * Remove delegated events from each node.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {Boolean} [capture] Whether to use a capture event.
     * @return {QuerySet} The QuerySet object.
     */
    function removeEventDelegate(events, delegate, callback, { capture = false } = {}) {
        removeEventDelegate$1(this, events, delegate, callback, { capture });

        return this;
    }
    /**
     * Trigger events on each node.
     * @param {string} events The event names.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @return {QuerySet} The QuerySet object.
     */
    function triggerEvent(events, { detail = null, bubbles = true, cancelable = true } = {}) {
        triggerEvent$1(this, events, { detail, bubbles, cancelable });

        return this;
    }
    /**
     * Trigger an event for the first node.
     * @param {string} event The event name.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @return {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    function triggerOne(event, { detail = null, bubbles = true, cancelable = true } = {}) {
        return triggerOne$1(this, event, { detail, bubbles, cancelable });
    }

    /**
     * QuerySet Events
     */

    /**
     * Trigger a blur event on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function blur() {
        blur$1(this);

        return this;
    }
    /**
     * Trigger a click event on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function click() {
        click$1(this);

        return this;
    }
    /**
     * Trigger a focus event on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function focus() {
        focus$1(this);

        return this;
    }

    /**
     * QuerySet Create
     */

    /**
     * Attach a shadow DOM tree to the first node.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @return {QuerySet} A new QuerySet object.
     */
    function attachShadow({ open = true } = {}) {
        const shadow = attachShadow$1(this, { open });

        return new QuerySet(shadow ? [shadow] : []);
    }

    /**
     * QuerySet Manipulation
     */

    /**
     * Clone each node.
     * @param {object} options The options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @return {QuerySet} A new QuerySet object.
     */
    function clone(options) {
        const clones = clone$1(this, options);

        return new QuerySet(clones);
    }
    /**
     * Detach each node from the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function detach() {
        detach$1(this);

        return this;
    }
    /**
     * Remove all children of each node from the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function empty() {
        empty$1(this);

        return this;
    }
    /**
     * Remove each node from the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function remove() {
        remove$1(this);

        return this;
    }
    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function replaceAll(otherSelector) {
        replaceAll$1(this, otherSelector);

        return this;
    }
    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function replaceWith(otherSelector) {
        replaceWith$1(this, otherSelector);

        return this;
    }

    /**
     * QuerySet Move
     */

    /**
     * Insert each other node after the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function after(otherSelector) {
        after$1(this, otherSelector);

        return this;
    }
    /**
     * Append each other node to the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function append(otherSelector) {
        append$1(this, otherSelector);

        return this;
    }
    /**
     * Append each node to the first other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function appendTo(otherSelector) {
        appendTo$1(this, otherSelector);

        return this;
    }
    /**
     * Insert each other node before the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function before(otherSelector) {
        before$1(this, otherSelector);

        return this;
    }
    /**
     * Insert each node after the first other node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function insertAfter(otherSelector) {
        insertAfter$1(this, otherSelector);

        return this;
    }
    /**
     * Insert each node before the first other node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function insertBefore(otherSelector) {
        insertBefore$1(this, otherSelector);

        return this;
    }
    /**
     * Prepend each other node to the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function prepend(otherSelector) {
        prepend$1(this, otherSelector);

        return this;
    }
    /**
     * Prepend each node to the first other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function prependTo(otherSelector) {
        prependTo$1(this, otherSelector);

        return this;
    }

    /**
     * QuerySet Wrap
     */

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function unwrap(nodeFilter) {
        unwrap$1(this, nodeFilter);

        return this;
    }
    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function wrap(otherSelector) {
        wrap$1(this, otherSelector);

        return this;
    }
    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function wrapAll(otherSelector) {
        wrapAll$1(this, otherSelector);

        return this;
    }
    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
     * @return {QuerySet} The QuerySet object.
     */
    function wrapInner(otherSelector) {
        wrapInner$1(this, otherSelector);

        return this;
    }

    /**
     * DOM Queue
     */

    /**
     * Clear the queue of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName] The name of the queue to use.
     */
    function clearQueue$1(selector, { queueName = null } = {}) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            if (!queues.has(node)) {
                continue;
            }

            const queue = queues.get(node);

            if (queueName) {
                delete queue[queueName];
            }

            if (!queueName || !Object.keys(queue).length) {
                queues.delete(node);
            }
        }
    }
    /**
     * Run the next callback for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     */
    function dequeue(node, { queueName = 'default' } = {}) {
        const queue = queues.get(node);

        if (!queue || !(queueName in queue)) {
            return;
        }

        const next = queue[queueName].shift();

        if (!next) {
            queues.delete(node);
            return;
        }

        Promise.resolve(next(node))
            .then((_) => {
                dequeue(node, { queueName });
            }).catch((_) => {
                queues.delete(node);
            });
    }
    /**
     * Queue a callback on each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     */
    function queue$1(selector, callback, { queueName = 'default' } = {}) {
        const nodes = parseNodes(selector);

        for (const node of nodes) {
            if (!queues.has(node)) {
                queues.set(node, {});
            }

            const queue = queues.get(node);
            const runningQueue = queueName in queue;

            if (!runningQueue) {
                queue[queueName] = [
                    (_) => new Promise((resolve) => {
                        setTimeout(resolve, 1);
                    }),
                ];
            }

            queue[queueName].push(callback);

            if (!runningQueue) {
                dequeue(node, { queueName });
            }
        }
    }

    /**
     * QuerySet Queue
     */

    /**
     * Clear the queue of each node.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to clear.
     * @return {QuerySet} The QuerySet object.
     */
    function clearQueue({ queueName = 'default' } = {}) {
        clearQueue$1(this, { queueName });

        return this;
    }
    /**
     * Delay execution of subsequent items in the queue for each node.
     * @param {number} duration The number of milliseconds to delay execution by.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @return {QuerySet} The QuerySet object.
     */
    function delay(duration, { queueName = 'default' } = {}) {
        return this.queue((_) =>
            new Promise((resolve) =>
                setTimeout(resolve, duration),
            ),
        { queueName },
        );
    }
    /**
     * Queue a callback on each node.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {object} [options] The options for clearing the queue.
     * @param {string} [options.queueName=default] The name of the queue to use.
     * @return {QuerySet} The QuerySet object.
     */
    function queue(callback, { queueName = 'default' } = {}) {
        queue$1(this, callback, { queueName });

        return this;
    }

    /**
     * DOM Filter
     */

    /**
     * Return all nodes connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function connected$1(selector) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node) => node.isConnected);
    }
    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function equal$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node) =>
            others.some((other) =>
                node.isEqualNode(other),
            ),
        );
    }
    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The filtered nodes.
     */
    function filter$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter(nodeFilter);
    }
    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    function filterOne$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).find(nodeFilter) || null;
    }
    /**
     * Return all "fixed" nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function fixed$1(selector) {
        return parseNodes(selector, {
            node: true,
        }).filter((node) =>
            (isElement(node) && css$1(node, 'position') === 'fixed') ||
            closest$1(
                node,
                (parent) => isElement(parent) && css$1(parent, 'position') === 'fixed',
            ).length,
        );
    }
    /**
     * Return all hidden nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function hidden$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).filter((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState !== 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState !== 'visible';
            }

            return !node.offsetParent;
        });
    }
    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The filtered nodes.
     */
    function not$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node, index) => !nodeFilter(node, index));
    }
    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    function notOne$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).find((node, index) => !nodeFilter(node, index)) || null;
    }
    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function same$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).filter((node) =>
            others.some((other) =>
                node.isSameNode(other),
            ),
        );
    }
    /**
     * Return all visible nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function visible$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).filter((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState === 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState === 'visible';
            }

            return node.offsetParent;
        });
    }
    /**
     * Return all nodes with an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withAnimation$1(selector) {
        return parseNodes(selector)
            .filter((node) =>
                animations.has(node),
            );
    }
    /**
     * Return all nodes with a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @return {array} The filtered nodes.
     */
    function withAttribute$1(selector, attribute) {
        return parseNodes(selector)
            .filter((node) =>
                node.hasAttribute(attribute),
            );
    }
    /**
     * Return all nodes with child elements.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withChildren$1(selector) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).filter((node) =>
            !!node.childElementCount,
        );
    }
    /**
     * Return all nodes with any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @return {array} The filtered nodes.
     */
    function withClass$1(selector, ...classes) {
        classes = parseClasses(classes);

        return parseNodes(selector)
            .filter((node) =>
                classes.some((className) =>
                    node.classList.contains(className),
                ),
            );
    }
    /**
     * Return all nodes with a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withCSSAnimation$1(selector) {
        return parseNodes(selector)
            .filter((node) =>
                parseFloat(css$1(node, 'animation-duration')),
            );
    }
    /**
     * Return all nodes with a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {array} The filtered nodes.
     */
    function withCSSTransition$1(selector) {
        return parseNodes(selector)
            .filter((node) =>
                parseFloat(css$1(node, 'transition-duration')),
            );
    }
    /**
     * Return all nodes with custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @return {array} The filtered nodes.
     */
    function withData$1(selector, key) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        }).filter((node) => {
            if (!data.has(node)) {
                return false;
            }

            if (!key) {
                return true;
            }

            const nodeData = data.get(node);

            return nodeData.hasOwnProperty(key);
        });
    }
    /**
     * Return all nodes with a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {array} The filtered nodes.
     */
    function withDescendent$1(selector, nodeFilter) {
        nodeFilter = parseFilterContains(nodeFilter);

        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).filter(nodeFilter);
    }
    /**
     * Return all nodes with a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @return {array} The filtered nodes.
     */
    function withProperty$1(selector, property) {
        return parseNodes(selector)
            .filter((node) =>
                node.hasOwnProperty(property),
            );
    }

    /**
     * QuerySet Filter
     */

    /**
     * Return all nodes connected to the DOM.
     * @return {QuerySet} The QuerySet object.
     */
    function connected() {
        return new QuerySet(connected$1(this));
    }
    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function equal(otherSelector) {
        return new QuerySet(equal$1(this, otherSelector));
    }
    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function filter(nodeFilter) {
        return new QuerySet(filter$1(this, nodeFilter));
    }
    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function filterOne(nodeFilter) {
        const node = filterOne$1(this, nodeFilter);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all "fixed" nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function fixed() {
        return new QuerySet(fixed$1(this));
    }
    /**
     * Return all hidden nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function hidden() {
        return new QuerySet(hidden$1(this));
    }
    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function not(nodeFilter) {
        return new QuerySet(not$1(this, nodeFilter));
    }
    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function notOne(nodeFilter) {
        const node = notOne$1(this, nodeFilter);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {QuerySet} The QuerySet object.
     */
    function same(otherSelector) {
        return new QuerySet(same$1(this, otherSelector));
    }
    /**
     * Return all visible nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function visible() {
        return new QuerySet(visible$1(this));
    }
    /**
     * Return all nodes with an animation.
     * @return {QuerySet} The QuerySet object.
    */
    function withAnimation() {
        return new QuerySet(withAnimation$1(this));
    }
    /**
     * Return all nodes with a specified attribute.
     * @param {string} attribute The attribute name.
     * @return {QuerySet} The QuerySet object.
     */
    function withAttribute(attribute) {
        return new QuerySet(withAttribute$1(this, attribute));
    }
    /**
     * Return all nodes with child elements.
     * @return {QuerySet} The QuerySet object.
     */
    function withChildren() {
        return new QuerySet(withChildren$1(this));
    }
    /**
     * Return all nodes with any of the specified classes.
     * @param {...string|string[]} classes The classes.
     * @return {QuerySet} The QuerySet object.
     */
    function withClass(classes) {
        return new QuerySet(withClass$1(this, classes));
    }
    /**
     * Return all nodes with a CSS animation.
     * @return {QuerySet} The QuerySet object.
    */
    function withCSSAnimation() {
        return new QuerySet(withCSSAnimation$1(this));
    }
    /**
     * Return all nodes with a CSS transition.
     * @return {QuerySet} The QuerySet object.
     */
    function withCSSTransition() {
        return new QuerySet(withCSSTransition$1(this));
    }
    /**
     * Return all nodes with custom data.
     * @param {string} [key] The data key.
     * @return {QuerySet} The QuerySet object.
     */
    function withData(key) {
        return new QuerySet(withData$1(this, key));
    }
    /**
     * Return all elements with a descendent matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function withDescendent(nodeFilter) {
        return new QuerySet(withDescendent$1(this, nodeFilter));
    }
    /**
     * Return all nodes with a specified property.
     * @param {string} property The property name.
     * @return {QuerySet} The QuerySet object.
     */
    function withProperty(property) {
        return new QuerySet(withProperty$1(this, property));
    }

    /**
     * QuerySet Find
     */

    /**
     * Return all descendent nodes matching a selector.
     * @param {string} selector The query selector.
     * @return {QuerySet} The QuerySet object.
     */
    function find(selector) {
        return new QuerySet(find$1(selector, this));
    }
    /**
     * Return all descendent nodes with a specific class.
     * @param {string} className The class name.
     * @return {QuerySet} The QuerySet object.
     */
    function findByClass(className) {
        return new QuerySet(findByClass$1(className, this));
    }
    /**
     * Return all descendent nodes with a specific ID.
     * @param {string} id The id.
     * @return {QuerySet} The QuerySet object.
     */
    function findById(id) {
        return new QuerySet(findById$1(id, this));
    }
    /**
     * Return all descendent nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @return {QuerySet} The QuerySet object.
     */
    function findByTag(tagName) {
        return new QuerySet(findByTag$1(tagName, this));
    }
    /**
     * Return a single descendent node matching a selector.
     * @param {string} selector The query selector.
     * @return {QuerySet} The QuerySet object.
     */
    function findOne(selector) {
        const node = findOne$1(selector, this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return a single descendent node with a specific class.
     * @param {string} className The class name.
     * @return {QuerySet} The QuerySet object.
     */
    function findOneByClass(className) {
        const node = findOneByClass$1(className, this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return a single descendent node with a specific ID.
     * @param {string} id The id.
     * @return {QuerySet} The QuerySet object.
     */
    function findOneById(id) {
        const node = findOneById$1(id, this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return a single descendent node with a specific tag.
     * @param {string} tagName The tag name.
     * @return {QuerySet} The QuerySet object.
     */
    function findOneByTag(tagName) {
        const node = findOneByTag$1(tagName, this);

        return new QuerySet(node ? [node] : []);
    }

    /**
     * QuerySet Traversal
     */

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function child(nodeFilter) {
        return new QuerySet(child$1(this, nodeFilter));
    }
    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function children(nodeFilter, { elementsOnly = true } = {}) {
        return new QuerySet(children$1(this, nodeFilter, { elementsOnly }));
    }
    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function closest(nodeFilter, limitFilter) {
        return new QuerySet(closest$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the common ancestor of all nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function commonAncestor() {
        const node = commonAncestor$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all children of each node (including text and comment nodes).
     * @return {QuerySet} The QuerySet object.
     */
    function contents() {
        return new QuerySet(contents$1(this));
    }
    /**
     * Return the DocumentFragment of the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function fragment() {
        const node = fragment$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function next(nodeFilter) {
        return new QuerySet(next$1(this, nodeFilter));
    }
    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function nextAll(nodeFilter, limitFilter) {
        return new QuerySet(nextAll$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function offsetParent() {
        const node = offsetParent$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function parent(nodeFilter) {
        return new QuerySet(parent$1(this, nodeFilter));
    }
    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function parents(nodeFilter, limitFilter) {
        return new QuerySet(parents$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function prev(nodeFilter) {
        return new QuerySet(prev$1(this, nodeFilter));
    }
    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
     * @return {QuerySet} The QuerySet object.
     */
    function prevAll(nodeFilter, limitFilter) {
        return new QuerySet(prevAll$1(this, nodeFilter, limitFilter));
    }
    /**
     * Return the ShadowRoot of the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function shadow() {
        const node = shadow$1(this);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function siblings(nodeFilter, { elementsOnly = true } = {}) {
        return new QuerySet(siblings$1(this, nodeFilter, { elementsOnly }));
    }

    /**
     * DOM Selection
     */

    /**
     * Insert each node after the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     */
    function afterSelection$1(selector) {
        // ShadowRoot nodes can not be moved
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            html: true,
        }).reverse();

        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();
        range.collapse();

        for (const node of nodes) {
            range.insertNode(node);
        }
    }
    /**
     * Insert each node before the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     */
    function beforeSelection$1(selector) {
        // ShadowRoot nodes can not be moved
        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            html: true,
        }).reverse();

        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        for (const node of nodes) {
            range.insertNode(node);
        }
    }
    /**
     * Extract selected nodes from the DOM.
     * @return {array} The selected nodes.
     */
    function extractSelection() {
        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const fragment = range.extractContents();

        return merge([], fragment.childNodes);
    }
    /**
     * Return all selected nodes.
     * @return {array} The selected nodes.
     */
    function getSelection() {
        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);
        const nodes = merge([], range.commonAncestorContainer.querySelectorAll('*'));

        if (!nodes.length) {
            return [range.commonAncestorContainer];
        }

        if (nodes.length === 1) {
            return nodes;
        }

        const startContainer = range.startContainer;
        const endContainer = range.endContainer;
        const start = isElement(startContainer) ?
            startContainer :
            startContainer.parentNode;
        const end = isElement(endContainer) ?
            endContainer :
            endContainer.parentNode;

        const selectedNodes = nodes.slice(
            nodes.indexOf(start),
            nodes.indexOf(end) + 1,
        );
        const results = [];

        let lastNode;
        for (const node of selectedNodes) {
            if (lastNode && lastNode.contains(node)) {
                continue;
            }

            lastNode = node;
            results.push(node);
        }

        return results.length > 1 ?
            unique(results) :
            results;
    }
    /**
     * Create a selection on the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function select$1(selector) {
        const node = parseNode(selector, {
            node: true,
        });

        if (node && 'select' in node) {
            node.select();
            return;
        }

        const selection = getWindow().getSelection();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        if (!node) {
            return;
        }

        const range = createRange();
        range.selectNode(node);
        selection.addRange(range);
    }
    /**
     * Create a selection containing all of the nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     */
    function selectAll$1(selector) {
        const nodes = sort$1(selector);

        const selection = getWindow().getSelection();

        if (selection.rangeCount) {
            selection.removeAllRanges();
        }

        if (!nodes.length) {
            return;
        }

        const range = createRange();

        if (nodes.length == 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        selection.addRange(range);
    }
    /**
     * Wrap selected nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
     */
    function wrapSelection$1(selector) {
        // ShadowRoot nodes can not be cloned
        const nodes = parseNodes(selector, {
            fragment: true,
            html: true,
        });

        const selection = getWindow().getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const node = nodes.slice().shift();
        const deepest = merge([], node.querySelectorAll('*')).find((node) => !node.childElementCount) || node;

        const fragment = range.extractContents();

        const childNodes = merge([], fragment.childNodes);

        for (const child of childNodes) {
            deepest.insertBefore(child, null);
        }

        for (const node of nodes) {
            range.insertNode(node);
        }
    }

    /**
     * QuerySet Selection
     */

    /**
     * Insert each node after the selection.
     * @return {QuerySet} The QuerySet object.
     */
    function afterSelection() {
        afterSelection$1(this);

        return this;
    }
    /**
     * Insert each node before the selection.
     * @return {QuerySet} The QuerySet object.
     */
    function beforeSelection() {
        beforeSelection$1(this);

        return this;
    }
    /**
     * Create a selection on the first node.
     * @return {QuerySet} The QuerySet object.
     */
    function select() {
        select$1(this);

        return this;
    }
    /**
     * Create a selection containing all of the nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function selectAll() {
        selectAll$1(this);

        return this;
    }
    /**
     * Wrap selected nodes with other nodes.
     * @return {QuerySet} The QuerySet object.
     */
    function wrapSelection() {
        wrapSelection$1(this);

        return this;
    }

    /**
     * DOM Tests
     */

    /**
     * Returns true if any of the nodes has an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    function hasAnimation$1(selector) {
        return parseNodes(selector)
            .some((node) => animations.has(node));
    }
    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @return {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    function hasAttribute$1(selector, attribute) {
        return parseNodes(selector)
            .some((node) => node.hasAttribute(attribute));
    }
    /**
     * Returns true if any of the nodes has child nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    function hasChildren$1(selector) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).some((node) => node.childElementCount);
    }
    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @return {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    function hasClass$1(selector, ...classes) {
        classes = parseClasses(classes);

        return parseNodes(selector)
            .some((node) =>
                classes.some((className) => node.classList.contains(className)),
            );
    }
    /**
     * Returns true if any of the nodes has a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    function hasCSSAnimation$1(selector) {
        return parseNodes(selector)
            .some((node) =>
                parseFloat(css$1(node, 'animation-duration')),
            );
    }
    /**
     * Returns true if any of the nodes has a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    function hasCSSTransition$1(selector) {
        return parseNodes(selector)
            .some((node) =>
                parseFloat(css$1(node, 'transition-duration')),
            );
    }
    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @return {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    function hasData$1(selector, key) {
        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
            window: true,
        }).some((node) => {
            if (!data.has(node)) {
                return false;
            }

            if (!key) {
                return true;
            }

            const nodeData = data.get(node);

            return nodeData.hasOwnProperty(key);
        });
    }
    /**
     * Returns true if any of the nodes has the specified dataset value.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @return {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
     */
    function hasDataset$1(selector, key) {
        key = camelCase(key);

        return parseNodes(selector)
            .some((node) => !!node.dataset[key]);
    }
    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    function hasDescendent$1(selector, nodeFilter) {
        nodeFilter = parseFilterContains(nodeFilter);

        return parseNodes(selector, {
            fragment: true,
            shadow: true,
            document: true,
        }).some(nodeFilter);
    }
    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    function hasFragment$1(selector) {
        return parseNodes(selector)
            .some((node) => node.content);
    }
    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @return {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    function hasProperty$1(selector, property) {
        return parseNodes(selector)
            .some((node) => node.hasOwnProperty(property));
    }
    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    function hasShadow$1(selector) {
        return parseNodes(selector)
            .some((node) => node.shadowRoot);
    }
    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    function is$1(selector, nodeFilter) {
        nodeFilter = parseFilter(nodeFilter);

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some(nodeFilter);
    }
    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    function isConnected$1(selector) {
        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some((node) => node.isConnected);
    }
    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    function isEqual$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some((node) =>
            others.some((other) => node.isEqualNode(other)),
        );
    }
    /**
     * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    function isFixed$1(selector) {
        return parseNodes(selector, {
            node: true,
        }).some((node) =>
            (isElement(node) && css$1(node, 'position') === 'fixed') ||
            closest$1(
                node,
                (parent) => isElement(parent) && css$1(parent, 'position') === 'fixed',
            ).length,
        );
    }
    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    function isHidden$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).some((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState !== 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState !== 'visible';
            }

            return !node.offsetParent;
        });
    }
    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    function isSame$1(selector, otherSelector) {
        const others = parseNodes(otherSelector, {
            node: true,
            fragment: true,
            shadow: true,
        });

        return parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
        }).some((node) =>
            others.some((other) => node.isSameNode(other)),
        );
    }
    /**
     * Returns true if any of the nodes is visible.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    function isVisible$1(selector) {
        return parseNodes(selector, {
            node: true,
            document: true,
            window: true,
        }).some((node) => {
            if (isWindow(node)) {
                return node.document.visibilityState === 'visible';
            }

            if (isDocument(node)) {
                return node.visibilityState === 'visible';
            }

            return node.offsetParent;
        });
    }

    /**
     * QuerySet Tests
     */

    /**
     * Returns true if any of the nodes has an animation.
     * @return {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    function hasAnimation() {
        return hasAnimation$1(this);
    }
    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string} attribute The attribute name.
     * @return {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    function hasAttribute(attribute) {
        return hasAttribute$1(this, attribute);
    }
    /**
     * Returns true if any of the nodes has child nodes.
     * @return {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    function hasChildren() {
        return hasChildren$1(this);
    }
    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {...string|string[]} classes The classes.
     * @return {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    function hasClass(...classes) {
        return hasClass$1(this, ...classes);
    }
    /**
     * Returns true if any of the nodes has a CSS animation.
     * @return {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    function hasCSSAnimation() {
        return hasCSSAnimation$1(this);
    }
    /**
     * Returns true if any of the nodes has a CSS transition.
     * @return {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    function hasCSSTransition() {
        return hasCSSTransition$1(this);
    }
    /**
     * Returns true if any of the nodes has custom data.
     * @param {string} [key] The data key.
     * @return {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    function hasData(key) {
        return hasData$1(this, key);
    }
    /**
     * Returns true if any of the nodes has the specified dataset value.
     * @param {string} [key] The dataset key.
     * @return {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
     */
    function hasDataset(key) {
        return hasDataset$1(this, key);
    }
    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    function hasDescendent(nodeFilter) {
        return hasDescendent$1(this, nodeFilter);
    }
    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @return {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    function hasFragment() {
        return hasFragment$1(this);
    }
    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string} property The property name.
     * @return {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    function hasProperty(property) {
        return hasProperty$1(this, property);
    }
    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @return {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    function hasShadow() {
        return hasShadow$1(this);
    }
    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    function is(nodeFilter) {
        return is$1(this, nodeFilter);
    }
    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @return {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    function isConnected() {
        return isConnected$1(this);
    }
    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    function isEqual(otherSelector) {
        return isEqual$1(this, otherSelector);
    }
    /**
     * Returns true if any of the elements or a parent of any of the elements is "fixed".
     * @return {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    function isFixed() {
        return isFixed$1(this);
    }
    /**
     * Returns true if any of the nodes is hidden.
     * @return {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    function isHidden() {
        return isHidden$1(this);
    }
    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
     * @return {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    function isSame(otherSelector) {
        return isSame$1(this, otherSelector);
    }
    /**
     * Returns true if any of the nodes is visible.
     * @return {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    function isVisible() {
        return isVisible$1(this);
    }

    /**
     * QuerySet Utility
     */

    /**
     * Merge with new nodes and sort the results.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input selector.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @return {QuerySet} The QuerySet object.
     */
    function add(selector, context = null) {
        const nodes = sort$1(unique(merge([], this.get(), query(selector, context).get())));

        return new QuerySet(nodes);
    }
    /**
     * Reduce the set of nodes to the one at the specified index.
     * @param {number} index The index of the node.
     * @return {QuerySet} The QuerySet object.
     */
    function eq(index) {
        const node = this.get(index);

        return new QuerySet(node ? [node] : []);
    }
    /**
     * Reduce the set of nodes to the first.
     * @return {QuerySet} The QuerySet object.
     */
    function first() {
        return this.eq(0);
    }
    /**
     * Get the index of the first node relative to it's parent node.
     * @return {number} The index.
     */
    function index$1() {
        return index$2(this);
    }
    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
     * @return {number} The index.
     */
    function indexOf(nodeFilter) {
        return indexOf$1(this, nodeFilter);
    }
    /**
     * Reduce the set of nodes to the last.
     * @return {QuerySet} The QuerySet object.
     */
    function last() {
        return this.eq(-1);
    }
    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @return {QuerySet} The QuerySet object.
     */
    function normalize() {
        normalize$1(this);

        return this;
    }
    /**
     * Return a serialized string containing names and values of all form nodes.
     * @return {string} The serialized string.
     */
    function serialize() {
        return serialize$1(this);
    }
    /**
     * Return a serialized array containing names and values of all form nodes.
     * @return {array} The serialized array.
     */
    function serializeArray() {
        return serializeArray$1(this);
    }
    /**
     * Sort nodes by their position in the document.
     * @return {QuerySet} The QuerySet object.
     */
    function sort() {
        return new QuerySet(sort$1(this));
    }
    /**
     * Return the tag name (lowercase) of the first node.
     * @return {string} The nodes tag name (lowercase).
     */
    function tagName() {
        return tagName$1(this);
    }

    const proto = QuerySet.prototype;

    proto.add = add;
    proto.addClass = addClass;
    proto.addEvent = addEvent;
    proto.addEventDelegate = addEventDelegate;
    proto.addEventDelegateOnce = addEventDelegateOnce;
    proto.addEventOnce = addEventOnce;
    proto.after = after;
    proto.afterSelection = afterSelection;
    proto.animate = animate;
    proto.append = append;
    proto.appendTo = appendTo;
    proto.attachShadow = attachShadow;
    proto.before = before;
    proto.beforeSelection = beforeSelection;
    proto.blur = blur;
    proto.center = center;
    proto.child = child;
    proto.children = children;
    proto.clearQueue = clearQueue;
    proto.click = click;
    proto.clone = clone;
    proto.cloneData = cloneData;
    proto.cloneEvents = cloneEvents;
    proto.closest = closest;
    proto.commonAncestor = commonAncestor;
    proto.connected = connected;
    proto.constrain = constrain;
    proto.contents = contents;
    proto.css = css;
    proto.delay = delay;
    proto.detach = detach;
    proto.distTo = distTo;
    proto.distToNode = distToNode;
    proto.dropIn = dropIn;
    proto.dropOut = dropOut;
    proto.empty = empty;
    proto.eq = eq;
    proto.equal = equal;
    proto.fadeIn = fadeIn;
    proto.fadeOut = fadeOut;
    proto.filter = filter;
    proto.filterOne = filterOne;
    proto.find = find;
    proto.findByClass = findByClass;
    proto.findById = findById;
    proto.findByTag = findByTag;
    proto.findOne = findOne;
    proto.findOneByClass = findOneByClass;
    proto.findOneById = findOneById;
    proto.findOneByTag = findOneByTag;
    proto.first = first;
    proto.fixed = fixed;
    proto.focus = focus;
    proto.fragment = fragment;
    proto.getAttribute = getAttribute;
    proto.getData = getData;
    proto.getDataset = getDataset;
    proto.getHTML = getHTML;
    proto.getProperty = getProperty;
    proto.getScrollX = getScrollX;
    proto.getScrollY = getScrollY;
    proto.getStyle = getStyle;
    proto.getText = getText;
    proto.getValue = getValue;
    proto.hasAnimation = hasAnimation;
    proto.hasAttribute = hasAttribute;
    proto.hasChildren = hasChildren;
    proto.hasClass = hasClass;
    proto.hasCSSAnimation = hasCSSAnimation;
    proto.hasCSSTransition = hasCSSTransition;
    proto.hasData = hasData;
    proto.hasDataset = hasDataset;
    proto.hasDescendent = hasDescendent;
    proto.hasFragment = hasFragment;
    proto.hasProperty = hasProperty;
    proto.hasShadow = hasShadow;
    proto.height = height;
    proto.hidden = hidden;
    proto.hide = hide;
    proto.index = index$1;
    proto.indexOf = indexOf;
    proto.insertAfter = insertAfter;
    proto.insertBefore = insertBefore;
    proto.is = is;
    proto.isConnected = isConnected;
    proto.isEqual = isEqual;
    proto.isFixed = isFixed;
    proto.isHidden = isHidden;
    proto.isSame = isSame;
    proto.isVisible = isVisible;
    proto.last = last;
    proto.nearestTo = nearestTo;
    proto.nearestToNode = nearestToNode;
    proto.next = next;
    proto.nextAll = nextAll;
    proto.normalize = normalize;
    proto.not = not;
    proto.notOne = notOne;
    proto.offsetParent = offsetParent;
    proto.parent = parent;
    proto.parents = parents;
    proto.percentX = percentX;
    proto.percentY = percentY;
    proto.position = position;
    proto.prepend = prepend;
    proto.prependTo = prependTo;
    proto.prev = prev;
    proto.prevAll = prevAll;
    proto.queue = queue;
    proto.rect = rect;
    proto.remove = remove;
    proto.removeAttribute = removeAttribute;
    proto.removeClass = removeClass;
    proto.removeData = removeData;
    proto.removeDataset = removeDataset;
    proto.removeEvent = removeEvent;
    proto.removeEventDelegate = removeEventDelegate;
    proto.removeProperty = removeProperty;
    proto.replaceAll = replaceAll;
    proto.replaceWith = replaceWith;
    proto.rotateIn = rotateIn;
    proto.rotateOut = rotateOut;
    proto.same = same;
    proto.select = select;
    proto.selectAll = selectAll;
    proto.serialize = serialize;
    proto.serializeArray = serializeArray;
    proto.setAttribute = setAttribute;
    proto.setData = setData;
    proto.setDataset = setDataset;
    proto.setHTML = setHTML;
    proto.setProperty = setProperty;
    proto.setScroll = setScroll;
    proto.setScrollX = setScrollX;
    proto.setScrollY = setScrollY;
    proto.setStyle = setStyle;
    proto.setText = setText;
    proto.setValue = setValue;
    proto.shadow = shadow;
    proto.show = show;
    proto.siblings = siblings;
    proto.slideIn = slideIn;
    proto.slideOut = slideOut;
    proto.sort = sort;
    proto.squeezeIn = squeezeIn;
    proto.squeezeOut = squeezeOut;
    proto.stop = stop;
    proto.tagName = tagName;
    proto.toggle = toggle;
    proto.toggleClass = toggleClass;
    proto.triggerEvent = triggerEvent;
    proto.triggerOne = triggerOne;
    proto.unwrap = unwrap;
    proto.visible = visible;
    proto.width = width;
    proto.withAnimation = withAnimation;
    proto.withAttribute = withAttribute;
    proto.withChildren = withChildren;
    proto.withClass = withClass;
    proto.withCSSAnimation = withCSSAnimation;
    proto.withCSSTransition = withCSSTransition;
    proto.withData = withData;
    proto.withDescendent = withDescendent;
    proto.withProperty = withProperty;
    proto.wrap = wrap;
    proto.wrapAll = wrapAll;
    proto.wrapInner = wrapInner;
    proto.wrapSelection = wrapSelection;

    /**
     * DOM Query
     */

    /**
     * Add a function to the ready queue or return a QuerySet.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} selector The input selector.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @return {QuerySet} The new QuerySet object.
     */
    function query(selector, context = null) {
        if (isFunction(selector)) {
            return ready(selector);
        }

        const nodes = parseNodes(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
            html: true,
            context: context || getContext(),
        });

        return new QuerySet(nodes);
    }
    /**
     * Return a QuerySet for the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input selector.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @return {QuerySet} The new QuerySet object.
     */
    function queryOne(selector, context = null) {
        const node = parseNode(selector, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
            html: true,
            context: context || getContext(),
        });

        return new QuerySet(node ? [node] : []);
    }

    /**
     * DOM AJAX Scripts
     */

    /**
     * Load and execute a JavaScript file.
     * @param {string} url The URL of the script.
     * @param {object} [attributes] Additional attributes to set on the script tag.
     * @param {object} [options] The options for loading the script.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the script is loaded, or rejects on failure.
     */
    function loadScript(url, attributes, { cache = true, context = getContext() } = {}) {
        attributes = {
            src: url,
            type: 'text/javascript',
            ...attributes,
        };

        if (!('async' in attributes)) {
            attributes.defer = '';
        }

        if (!cache) {
            attributes.src = appendQueryString(attributes.src, '_', Date.now());
        }

        const script = context.createElement('script');

        for (const [key, value] of Object.entries(attributes)) {
            script.setAttribute(key, value);
        }

        context.head.appendChild(script);

        return new Promise((resolve, reject) => {
            script.onload = (_) => resolve();
            script.onerror = (error) => reject(error);
        });
    }
    /**
     * Load and executes multiple JavaScript files (in order).
     * @param {array} urls An array of script URLs or attribute objects.
     * @param {object} [options] The options for loading the scripts.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    function loadScripts(urls, { cache = true, context = getContext() } = {}) {
        return Promise.all(
            urls.map((url) =>
                isString(url) ?
                    loadScript(url, null, { cache, context }) :
                    loadScript(null, url, { cache, context }),
            ),
        );
    }

    /**
     * DOM AJAX Styles
     */

    /**
     * Import a CSS Stylesheet file.
     * @param {string} url The URL of the stylesheet.
     * @param {object} [attributes] Additional attributes to set on the style tag.
     * @param {object} [options] The options for loading the stylesheet.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the stylesheet is loaded, or rejects on failure.
     */
    function loadStyle(url, attributes, { cache = true, context = getContext() } = {}) {
        attributes = {
            href: url,
            rel: 'stylesheet',
            ...attributes,
        };

        if (!cache) {
            attributes.href = appendQueryString(attributes.href, '_', Date.now());
        }

        const link = context.createElement('link');

        for (const [key, value] of Object.entries(attributes)) {
            link.setAttribute(key, value);
        }

        context.head.appendChild(link);

        return new Promise((resolve, reject) => {
            link.onload = (_) => resolve();
            link.onerror = (error) => reject(error);
        });
    }
    /**
     * Import multiple CSS Stylesheet files.
     * @param {array} urls An array of stylesheet URLs or attribute objects.
     * @param {object} [options] The options for loading the stylesheets.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Document} [options.context=getContext()] The document context.
     * @return {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    function loadStyles(urls, { cache = true, context = getContext() } = {}) {
        return Promise.all(
            urls.map((url) =>
                isString(url) ?
                    loadStyle(url, null, { cache, context }) :
                    loadStyle(null, url, { cache, context }),
            ),
        );
    }

    /**
     * DOM Utility
     */

    /**
     * Sanitize a HTML string.
     * @param {string} html The input HTML string.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     * @return {string} The sanitized HTML string.
     */
    function sanitize(html, allowedTags$1 = allowedTags) {
        const template = getContext().createElement('template');
        template.innerHTML = html;
        const fragment = template.content;
        const childNodes = merge([], fragment.children);

        for (const child of childNodes) {
            sanitizeNode(child, allowedTags$1);
        }

        return template.innerHTML;
    }
    /**
     * Sanitize a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     */
    function sanitizeNode(node, allowedTags$1 = allowedTags) {
        // check node
        const name = node.tagName.toLowerCase();

        if (!(name in allowedTags$1)) {
            node.remove();
            return;
        }

        // check node attributes
        const allowedAttributes = [];

        if ('*' in allowedTags$1) {
            allowedAttributes.push(...allowedTags$1['*']);
        }

        allowedAttributes.push(...allowedTags$1[name]);

        const attributes = merge([], node.attributes);

        for (const attribute of attributes) {
            if (!allowedAttributes.find((test) => attribute.nodeName.match(test))) {
                node.removeAttribute(attribute.nodeName);
            }
        }

        // check children
        const childNodes = merge([], node.children);
        for (const child of childNodes) {
            sanitizeNode(child, allowedTags$1);
        }
    }

    Object.assign(query, {
        BORDER_BOX,
        CONTENT_BOX,
        MARGIN_BOX,
        PADDING_BOX,
        SCROLL_BOX,
        Animation,
        AnimationSet,
        QuerySet,
        addClass: addClass$1,
        addEvent: addEvent$1,
        addEventDelegate: addEventDelegate$1,
        addEventDelegateOnce: addEventDelegateOnce$1,
        addEventOnce: addEventOnce$1,
        after: after$1,
        afterSelection: afterSelection$1,
        ajax,
        animate: animate$1,
        append: append$1,
        appendTo: appendTo$1,
        attachShadow: attachShadow$1,
        before: before$1,
        beforeSelection: beforeSelection$1,
        blur: blur$1,
        center: center$1,
        child: child$1,
        children: children$1,
        clearQueue: clearQueue$1,
        click: click$1,
        clone: clone$1,
        cloneData: cloneData$1,
        cloneEvents: cloneEvents$1,
        closest: closest$1,
        commonAncestor: commonAncestor$1,
        connected: connected$1,
        constrain: constrain$1,
        contents: contents$1,
        create,
        createComment,
        createFragment,
        createRange,
        createText,
        css: css$1,
        debounce,
        delete: _delete,
        detach: detach$1,
        distTo: distTo$1,
        distToNode: distToNode$1,
        dropIn: dropIn$1,
        dropOut: dropOut$1,
        empty: empty$1,
        equal: equal$1,
        exec,
        extractSelection,
        fadeIn: fadeIn$1,
        fadeOut: fadeOut$1,
        filter: filter$1,
        filterOne: filterOne$1,
        find: find$1,
        findByClass: findByClass$1,
        findById: findById$1,
        findByTag: findByTag$1,
        findOne: findOne$1,
        findOneByClass: findOneByClass$1,
        findOneById: findOneById$1,
        findOneByTag: findOneByTag$1,
        fixed: fixed$1,
        focus: focus$1,
        fragment: fragment$1,
        get,
        getAjaxDefaults,
        getAnimationDefaults,
        getAttribute: getAttribute$1,
        getContext,
        getCookie,
        getData: getData$1,
        getDataset: getDataset$1,
        getHTML: getHTML$1,
        getProperty: getProperty$1,
        getScrollX: getScrollX$1,
        getScrollY: getScrollY$1,
        getSelection,
        getStyle: getStyle$1,
        getText: getText$1,
        getValue: getValue$1,
        getWindow,
        hasAnimation: hasAnimation$1,
        hasAttribute: hasAttribute$1,
        hasCSSAnimation: hasCSSAnimation$1,
        hasCSSTransition: hasCSSTransition$1,
        hasChildren: hasChildren$1,
        hasClass: hasClass$1,
        hasData: hasData$1,
        hasDataset: hasDataset$1,
        hasDescendent: hasDescendent$1,
        hasFragment: hasFragment$1,
        hasProperty: hasProperty$1,
        hasShadow: hasShadow$1,
        height: height$1,
        hidden: hidden$1,
        hide: hide$1,
        index: index$2,
        indexOf: indexOf$1,
        insertAfter: insertAfter$1,
        insertBefore: insertBefore$1,
        is: is$1,
        isConnected: isConnected$1,
        isEqual: isEqual$1,
        isFixed: isFixed$1,
        isHidden: isHidden$1,
        isSame: isSame$1,
        isVisible: isVisible$1,
        loadScript,
        loadScripts,
        loadStyle,
        loadStyles,
        mouseDragFactory,
        nearestTo: nearestTo$1,
        nearestToNode: nearestToNode$1,
        next: next$1,
        nextAll: nextAll$1,
        noConflict,
        normalize: normalize$1,
        not: not$1,
        notOne: notOne$1,
        offsetParent: offsetParent$1,
        parent: parent$1,
        parents: parents$1,
        parseDocument,
        parseFormData,
        parseHTML,
        parseParams,
        patch,
        percentX: percentX$1,
        percentY: percentY$1,
        position: position$1,
        post,
        prepend: prepend$1,
        prependTo: prependTo$1,
        prev: prev$1,
        prevAll: prevAll$1,
        put,
        query,
        queryOne,
        queue: queue$1,
        ready,
        rect: rect$1,
        remove: remove$1,
        removeAttribute: removeAttribute$1,
        removeClass: removeClass$1,
        removeCookie,
        removeData: removeData$1,
        removeDataset: removeDataset$1,
        removeEvent: removeEvent$1,
        removeEventDelegate: removeEventDelegate$1,
        removeProperty: removeProperty$1,
        replaceAll: replaceAll$1,
        replaceWith: replaceWith$1,
        rotateIn: rotateIn$1,
        rotateOut: rotateOut$1,
        same: same$1,
        sanitize,
        select: select$1,
        selectAll: selectAll$1,
        serialize: serialize$1,
        serializeArray: serializeArray$1,
        setAjaxDefaults,
        setAnimationDefaults,
        setAttribute: setAttribute$1,
        setContext,
        setCookie,
        setData: setData$1,
        setDataset: setDataset$1,
        setHTML: setHTML$1,
        setProperty: setProperty$1,
        setScroll: setScroll$1,
        setScrollX: setScrollX$1,
        setScrollY: setScrollY$1,
        setStyle: setStyle$1,
        setText: setText$1,
        setValue: setValue$1,
        setWindow,
        shadow: shadow$1,
        show: show$1,
        siblings: siblings$1,
        slideIn: slideIn$1,
        slideOut: slideOut$1,
        sort: sort$1,
        squeezeIn: squeezeIn$1,
        squeezeOut: squeezeOut$1,
        stop: stop$1,
        tagName: tagName$1,
        toggle: toggle$1,
        toggleClass: toggleClass$1,
        triggerEvent: triggerEvent$1,
        triggerOne: triggerOne$1,
        unwrap: unwrap$1,
        useTimeout,
        visible: visible$1,
        width: width$1,
        withAnimation: withAnimation$1,
        withAttribute: withAttribute$1,
        withCSSAnimation: withCSSAnimation$1,
        withCSSTransition: withCSSTransition$1,
        withChildren: withChildren$1,
        withClass: withClass$1,
        withData: withData$1,
        withDescendent: withDescendent$1,
        withProperty: withProperty$1,
        wrap: wrap$1,
        wrapAll: wrapAll$1,
        wrapInner: wrapInner$1,
        wrapSelection: wrapSelection$1,
    });

    for (const [key, value] of Object.entries(_)) {
        query[`_${key}`] = value;
    }

    let _$;

    /**
     * Reset the global $ variable.
     */
    function noConflict() {
        const window = getWindow();

        if (window.$ === query) {
            window.$ = _$;
        }
    }
    /**
     * Register the global variables.
     * @param {Window} window The window.
     * @param {Document} [document] The document.
     * @return {object} The fQuery object.
     */
    function registerGlobals(window, document) {
        setWindow(window);
        setContext(document || window.document);

        _$ = window.$;
        window.$ = query;

        return query;
    }

    var index = isWindow(globalThis) ? registerGlobals(globalThis) : registerGlobals;

    return index;

}));
//# sourceMappingURL=fquery.js.map
