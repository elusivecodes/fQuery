/**
 * FrostDOM Bundle v1.1.6
 * https://github.com/elusivecodes/FrostCore
 * https://github.com/elusivecodes/FrostDOM
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        factory(global);
    }

})(this, function(window) {
    'use strict';

    if (typeof module === 'object') {
        module.exports = null;
    }

    /**
     * FrostCore v1.0.11
     * https://github.com/elusivecodes/FrostCore
     */
    (function(global, factory) {
        'use strict';

        if (typeof module === 'object' && typeof module.exports === 'object') {
            module.exports = factory(global);
        } else {
            global.Core = factory(global);
        }

    })(this || window, function(window) {
        'use strict';

        const Core = {};

        /**
         * Array methods
         */

        /**
         * Create a new array containing the values of the first array, that do not exist in any of the additional passed arrays.
         * @param {array} array The input array.
         * @param {...array} arrays The arrays to compare against.
         * @returns {array} The output array.
         */
        Core.diff = (array, ...arrays) => {
            arrays = arrays.map(Core.unique);
            return array.filter(
                value => !arrays
                    .some(other => other.includes(value))
            )
        };

        /**
         * Create a new array containing the unique values that exist in all of the passed arrays.
         * @param {...array} arrays The input arrays.
         * @returns {array} The output array.
         */
        Core.intersect = (...arrays) =>
            Core.unique(
                arrays
                    .reduce(
                        (acc, array, index) => {
                            array = Core.unique(array);
                            return Core.merge(
                                acc,
                                array.filter(
                                    value =>
                                        arrays.every(
                                            (other, otherIndex) =>
                                                index == otherIndex ||
                                                other.includes(value)
                                        )
                                )
                            )
                        },
                        []
                    )
            );

        /**
         * Merge the values from one or more arrays or array-like objects onto an array.
         * @param {array} array The input array.
         * @param {...array|...object} arrays The arrays or array-like objects to merge.
         * @returns {array} The output array.
         */
        Core.merge = (array = [], ...arrays) =>
            arrays.reduce(
                (acc, other) => {
                    Array.prototype.push.apply(acc, other);
                    return array;
                },
                array
            );

        /**
         * Return a random value from an array.
         * @param {array} array The input array.
         * @returns {*} A random value from the array, or null if it is empty.
         */
        Core.randomValue = array =>
            array.length ?
                array[Core.randomInt(array.length)] :
                null;

        /**
         * Return an array containing a range of values.
         * @param {number} start The first value of the sequence.
         * @param {number} end The value to end the sequence on.
         * @param {number} [step=1] The increment between values in the sequence.
         * @returns {number[]} The array of values from start to end.
         */
        Core.range = (start, end, step = 1) => {
            const sign = Math.sign(end - start);
            return new Array(
                (
                    (
                        Math.abs(end - start)
                        / step
                    )
                    + 1
                ) | 0
            )
                .fill()
                .map(
                    (_, i) =>
                        start + Core.toStep(
                            (i * step * sign),
                            step
                        )
                );
        };

        /**
         * Remove duplicate elements in an array.
         * @param {array} array The input array.
         * @returns {array} The filtered array.
         */
        Core.unique = array =>
            Array.from(
                new Set(array)
            );

        /**
         * Create an array from any value.
         * @param {*} value The input value.
         * @returns {array} The wrapped array.
         */
        Core.wrap = value =>
            Core.isUndefined(value) ?
                [] :
                (
                    Core.isArray(value) ?
                        value :
                        (
                            Core.isArrayLike(value) ?
                                Core.merge([], value) :
                                [value]
                        )
                );

        /**
         * Function methods
         */

        /**
         * Create a wrapped version of a function that executes at most once per animation frame
         * (using the most recent arguments passed to it).
         * @param {function} callback Callback function to execute.
         * @param {Boolean} [leading] Whether to execute on the leading edge of the animation frame.
         * @returns {function} The wrapped function.
         */
        Core.animation = (callback, leading) => {
            let animationReference,
                newArgs,
                running;

            const animation = (...args) => {
                newArgs = args;

                if (running) {
                    return;
                }

                if (leading) {
                    callback(...newArgs);
                }

                running = true;
                animationReference = Core._requestAnimationFrame(_ => {
                    if (!leading) {
                        callback(...newArgs);
                    }

                    running = false;
                    animationReference = null;
                });
            };

            animation.cancel = _ => {
                if (!animationReference) {
                    return;
                }

                if ('requestAnimationFrame' in window) {
                    window.cancelAnimationFrame(animationReference);
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
         * @returns {function} The wrapped function.
         */
        Core.compose = (...callbacks) =>
            arg =>
                callbacks.reduceRight(
                    (acc, callback) =>
                        callback(acc),
                    arg
                );

        /**
         * Create a wrapped version of a function, that will return new functions
         * until the number of total arguments passed reaches the arguments length
         * of the original function (at which point the function will execute).
         * @param {function} callback Callback function to execute.
         * @returns {function} The wrapped function.
         */
        Core.curry = callback => {
            const curried = (...args) =>
                args.length >= callback.length ?
                    callback(...args) :
                    (...newArgs) =>
                        curried(
                            ...args.concat(newArgs)
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
         * @returns {function} The wrapped function.
         */
        Core.debounce = (callback, wait = 0, leading = false, trailing = true) => {
            let debounceReference,
                lastRan,
                newArgs;

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
                    _ => {
                        lastRan = Date.now();
                        callback(...newArgs);

                        debounceReference = null;
                    },
                    wait
                );
            };

            debounced.cancel = _ => {
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
         * @returns {*} The evaluated value.
         */
        Core.evaluate = value =>
            Core.isFunction(value) ?
                value() :
                value;

        /**
         * Create a wrapped version of a function that will only ever execute once.
         * Subsequent calls to the wrapped function will return the result of the initial call.
         * @param {function} callback Callback function to execute.
         * @returns {function} The wrapped function.
         */
        Core.once = callback => {
            let ran,
                result;

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
         * @returns {function} The wrapped function.
         */
        Core.partial = (callback, ...defaultArgs) =>
            (...args) =>
                callback(
                    ...(defaultArgs
                        .slice()
                        .map(v =>
                            Core.isUndefined(v) ?
                                args.shift() :
                                v
                        ).concat(args)
                    )
                );

        /**
         * Create a wrapped function that will execute each callback in order,
         * passing the result from each function to the next.
         * @param {...function} callbacks Callback functions to execute.
         * @returns {function} The wrapped function.
         */
        Core.pipe = (...callbacks) =>
            arg =>
                callbacks.reduce(
                    (acc, callback) =>
                        callback(acc),
                    arg
                );

        /**
         * Create a wrapped version of a function that executes at most once per wait period.
         * (using the most recent arguments passed to it).
         * @param {function} callback Callback function to execute.
         * @param {number} [wait=0] The number of milliseconds to wait until next execution.
         * @param {Boolean} [leading=true] Whether to execute on the leading edge of the wait period.
         * @param {Boolean} [trailing=true] Whether to execute on the trailing edge of the wait period.
         * @returns {function} The wrapped function.
         */
        Core.throttle = (callback, wait = 0, leading = true, trailing = true) => {
            let throttleReference,
                lastRan,
                newArgs,
                running;

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
                    _ => {
                        lastRan = Date.now();
                        callback(...newArgs);

                        running = false;
                        throttleReference = null;
                    },
                    delta === null ?
                        wait :
                        wait - delta
                );
            };

            throttled.cancel = _ => {
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
        Core.times = (callback, amount) => {
            while (amount--) {
                if (callback() === false) {
                    break;
                }
            }
        };

        /**
         * Execute a callback on the next animation frame
         * @param {function} callback Callback function to execute.
         */
        Core._requestAnimationFrame = 'requestAnimationFrame' in window ?
            (...args) => window.requestAnimationFrame(...args) :
            callback => setTimeout(callback, 1000 / 60);

        /**
         * Split a string into individual words.
         * @param {string} string The input string.
         * @returns {string[]} The split parts of the string.
         */
        Core._splitString = string =>
            `${string}`
                .split(/[^a-zA-Z0-9']|(?=[A-Z])/)
                .reduce(
                    (acc, word) => {
                        word = word.replace(/[^\w]/, '').toLowerCase();
                        if (word) {
                            acc.push(word)
                        }
                        return acc;
                    },
                    []
                );

        /**
         * Math methods
         */

        /**
         * Clamp a value between a min and max.
         * @param {number} value The value to clamp.
         * @param {number} [min=0] The minimum value of the clamped range.
         * @param {number} [max=1] The maximum value of the clamped range.
         * @returns {number} The clamped value.
         */
        Core.clamp = (value, min = 0, max = 1) =>
            Math.max(
                min,
                Math.min(
                    max,
                    value
                )
            );

        /**
         * Clamp a value between 0 and 100.
         * @param {number} value The value to clamp.
         * @returns {number} The clamped value.
         */
        Core.clampPercent = value =>
            Core.clamp(value, 0, 100);

        /**
         * Get the distance between two vectors.
         * @param {number} x1 The first vector X co-ordinate.
         * @param {number} y1 The first vector Y co-ordinate.
         * @param {number} x2 The second vector X co-ordinate.
         * @param {number} y2 The second vector Y co-ordinate.
         * @returns {number} The distance between the vectors.
         */
        Core.dist = (x1, y1, x2, y2) =>
            Core.len(
                x1 - x2,
                y1 - y2
            );

        /**
         * Inverse linear interpolation from one value to another.
         * @param {number} v1 The starting value.
         * @param {number} v2 The ending value.
         * @param {number} value The value to inverse interpolate.
         * @returns {number} The interpolated amount.
         */
        Core.inverseLerp = (v1, v2, value) =>
            (value - v1) / (v2 - v1);

        /**
         * Get the length of an X,Y vector.
         * @param {number} x The X co-ordinate.
         * @param {number} y The Y co-ordinate.
         * @returns {number} The length of the vector.
         */
        Core.len = Math.hypot;

        /**
         * Linear interpolation from one value to another.
         * @param {number} v1 The starting value.
         * @param {number} v2 The ending value.
         * @param {number} amount The amount to interpolate.
         * @returns {number} The interpolated value.
         */
        Core.lerp = (v1, v2, amount) =>
            v1
            * (1 - amount)
            + v2
            * amount;

        /**
         * Map a value from one range to another.
         * @param {number} value The value to map.
         * @param {number} fromMin The minimum value of the current range.
         * @param {number} fromMax The maximum value of the current range.
         * @param {number} toMin The minimum value of the target range.
         * @param {number} toMax The maximum value of the target range.
         * @returns {number} The mapped value.
         */
        Core.map = (value, fromMin, fromMax, toMin, toMax) =>
            (value - fromMin)
            * (toMax - toMin)
            / (fromMax - fromMin)
            + toMin;

        /**
         * Return a random floating-point number.
         * @param {number} [a=1] The minimum value (inclusive).
         * @param {number} [b] The maximum value (exclusive).
         * @returns {number} A random number.
         */
        Core.random = (a = 1, b = null) =>
            Core.isNull(b) ?
                Math.random() * a :
                Core.map(
                    Math.random(),
                    0,
                    1,
                    a,
                    b
                );

        /**
         * Return a random number.
         * @param {number} [a=1] The minimum value (inclusive).
         * @param {number} [b] The maximum value (exclusive).
         * @returns {number} A random number.
         */
        Core.randomInt = (a = 1, b = null) =>
            Core.random(a, b) | 0;

        /**
         * Constrain a number to a specified step-size.
         * @param {number} value The value to constrain.
         * @param {number} step The minimum step-size.
         * @returns {number} The constrained value.
         */
        Core.toStep = (value, step = 0.01) =>
            parseFloat(
                (
                    Math.round(value / step)
                    * step
                ).toFixed(
                    `${step}`.replace('\d*\.?/', '').length
                )
            );

        /**
         * Object methods
         */

        /**
         * Merge the values from one or more objects onto an object (recursively).
         * @param {object} object The input object.
         * @param {...object} objects The objects to merge.
         * @returns {object} The output objects.
         */
        Core.extend = (object, ...objects) =>
            objects.reduce(
                (acc, val) => {
                    for (const k in val) {
                        if (Core.isArray(val[k])) {
                            acc[k] = Core.extend(
                                Core.isArray(acc[k]) ?
                                    acc[k] :
                                    [],
                                val[k]
                            );
                        } else if (Core.isPlainObject(val[k])) {
                            acc[k] = Core.extend(
                                Core.isPlainObject(acc[k]) ?
                                    acc[k] :
                                    {},
                                val[k]
                            );
                        } else {
                            acc[k] = val[k];
                        }
                    }
                    return acc;
                },
                object
            );

        /**
         * Remove a specified key from an object using dot notation.
         * @param {object} object The input object.
         * @param {string} key The key to remove from the object.
         */
        Core.forgetDot = (object, key) => {
            const keys = key.split('.');
            while (key = keys.shift()) {
                if (
                    !Core.isObject(object) ||
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
         * @returns {*} The value retrieved from the object.
         */
        Core.getDot = (object, key, defaultValue) => {
            const keys = key.split('.');
            while (key = keys.shift()) {
                if (
                    !Core.isObject(object) ||
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
         * @returns {Boolean} TRUE if the key exists, otherwise FALSE.
         */
        Core.hasDot = (object, key) => {
            const keys = key.split('.');
            while (key = keys.shift()) {
                if (
                    !Core.isObject(object) ||
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
         * @returns {array} An array of values retrieved from the objects.
         */
        Core.pluckDot = (objects, key, defaultValue) =>
            objects
                .map(pointer =>
                    Core.getDot(pointer, key, defaultValue)
                );

        /**
         * Set a specified value of a key for an object using dot notation.
         * @param {object} object The input object.
         * @param {string} key The key to set in the object.
         * @param {*} value The value to set.
         * @param {Boolean} [overwrite=true] Whether to overwrite, if the key already exists.
         */
        Core.setDot = (object, key, value, overwrite = true) => {
            const keys = key.split('.');
            while (key = keys.shift()) {
                if (key === '*') {
                    for (const k in object) {
                        Core.setDot(
                            object,
                            [k].concat(keys).join('.'),
                            value,
                            overwrite
                        );
                    }
                    return;
                }

                if (keys.length) {
                    if (
                        !Core.isObject(object[key]) ||
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

        /**
         * String methods
         */

        /**
         * Convert a string to camelCase.
         * @param {string} string The input string.
         * @returns {string} The camelCased string.
         */
        Core.camelCase = string =>
            Core._splitString(string)
                .map(
                    (word, index) =>
                        index ?
                            Core.capitalize(word) :
                            word
                )
                .join('');

        /**
         * Convert the first character of string to upper case and the remaining to lower case.
         * @param {string} string The input string.
         * @returns {string} The capitalized string.
         */
        Core.capitalize = string =>
            string.charAt(0).toUpperCase() +
            string.substring(1).toLowerCase();

        /**
         * Convert HTML special characters in a string to their corresponding HTML entities.
         * @param {string} string The input string.
         * @returns {string} The escaped string.
         */
        Core.escape = string =>
            string.replace(
                Core._escapeRegExp,
                match =>
                    Core._escapeChars[match]
            );

        /**
         * Escape RegExp special characters in a string.
         * @param {string} string The input string.
         * @returns {string} The escaped string.
         */
        Core.escapeRegExp = string =>
            string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        /**
         * Convert a string to a humanized form.
         * @param {string} string The input string.
         * @returns {string} The humanized string.
         */
        Core.humanize = string =>
            Core.capitalize(
                Core._splitString(string)
                    .join(' ')
            );

        /**
         * Convert a string to kebab-case.
         * @param {string} string The input string.
         * @returns {string} The kebab-cased string.
         */
        Core.kebabCase = string =>
            Core._splitString(string)
                .join('-')
                .toLowerCase();

        /**
         * Convert a string to PascalCase.
         * @param {string} string The input string.
         * @returns {string} The camelCased string.
         */
        Core.pascalCase = string =>
            Core._splitString(string)
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.substring(1)
                )
                .join('');

        /**
         * Return a random string.
         * @param {number} [length=16] The length of the output string.
         * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789] The characters to generate the string from.
         * @returns {string} The random string.
         */
        Core.randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789') =>
            new Array(length)
                .fill()
                .map(
                    _ =>
                        chars[Core.random(chars.length) | 0]
                )
                .join('');

        /**
         * Convert a string to snake_case.
         * @param {string} string The input string.
         * @returns {string} The snake_cased string.
         */
        Core.snakeCase = string =>
            Core._splitString(string)
                .join('_')
                .toLowerCase();

        /**
         * Convert HTML entities in a string to their corresponding characters.
         * @param {string} string The input string.
         * @returns {string} The unescaped string.
         */
        Core.unescape = string =>
            string.replace(
                Core._unescapeRegExp,
                (_, code) =>
                    Core._unescapeChars[code]
            );

        /**
         * Testing methods
         */

        /**
         * Returns true if the value is an array.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is an array, otherwise FALSE.
         */
        Core.isArray = Array.isArray;

        /**
         * Returns true if the value is array-like.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is array-like, otherwise FALSE.
         */
        Core.isArrayLike = value =>
            Core.isArray(value) ||
            (
                Core.isObject(value) &&
                !Core.isFunction(value) &&
                !Core.isWindow(value) &&
                !Core.isElement(value) &&
                (
                    (
                        Symbol.iterator in value &&
                        Core.isFunction(value[Symbol.iterator])
                    ) ||
                    (
                        'length' in value &&
                        Core.isNumeric(value.length) &&
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
         * @returns {Boolean} TRUE if the value is boolean, otherwise FALSE.
         */
        Core.isBoolean = value =>
            value === !!value;

        /**
         * Returns true if the value is a Document.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
         */
        Core.isDocument = value =>
            !!value &&
            value.nodeType === Core.DOCUMENT_NODE;

        /**
         * Returns true if the value is a HTMLElement.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
         */
        Core.isElement = value =>
            !!value &&
            value.nodeType === Core.ELEMENT_NODE;

        /**
         * Returns true if the value is a DocumentFragment.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a DocumentFragment, otherwise FALSE.
         */
        Core.isFragment = value =>
            !!value &&
            value.nodeType === Core.DOCUMENT_FRAGMENT_NODE &&
            !value.host;

        /**
         * Returns true if the value is a function.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a function, otherwise FALSE.
         */
        Core.isFunction = value =>
            typeof value === 'function';

        /**
         * Returns true if the value is NaN.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is NaN, otherwise FALSE.
         */
        Core.isNaN = Number.isNaN;

        /**
         * Returns true if the value is a Node.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
         */
        Core.isNode = value =>
            !!value &&
            (
                value.nodeType === Core.ELEMENT_NODE ||
                value.nodeType === Core.TEXT_NODE ||
                value.nodeType === Core.COMMENT_NODE
            );

        /**
         * Returns true if the value is null.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is null, otherwise FALSE.
         */
        Core.isNull = value =>
            value === null;

        /**
         * Returns true if the value is numeric.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is numeric, otherwise FALSE.
         */
        Core.isNumeric = value =>
            !isNaN(parseFloat(value)) &&
            isFinite(value);

        /**
         * Returns true if the value is a plain object.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a plain object, otherwise FALSE.
         */
        Core.isPlainObject = value =>
            !!value &&
            value.constructor === Object;

        /**
         * Returns true if the value is an object.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is an object, otherwise FALSE.
         */
        Core.isObject = value =>
            !!value &&
            value === Object(value);

        /**
         * Returns true if the value is a ShadowRoot.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a ShadowRoot, otherwise FALSE.
         */
        Core.isShadow = value =>
            !!value &&
            value.nodeType === Core.DOCUMENT_FRAGMENT_NODE &&
            !!value.host;

        /**
         * Returns true if the value is a string.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE is the value is a string, otherwise FALSE.
         */
        Core.isString = value =>
            value === `${value}`;

        /**
         * Returns true if the value is undefined.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is undefined, otherwise FALSE.
         */
        Core.isUndefined = value =>
            value === undefined;

        /**
         * Returns true if the value is a Window.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE is the value is a Window, otherwise FALSE.
         */
        Core.isWindow = value =>
            !!value &&
            !!value.document &&
            value.document.defaultView === value;

        /**
         * Core Properties
         */

        // Node type constants
        Core.ELEMENT_NODE = 1;
        Core.TEXT_NODE = 3;
        Core.COMMENT_NODE = 8;
        Core.DOCUMENT_NODE = 9;
        Core.DOCUMENT_FRAGMENT_NODE = 11;

        // HTML escape regex
        Core._escapeRegExp = /[&<>"']/g;
        Core._unescapeRegExp = /\&(amp|lt|gt|quot|apos);/g;

        // HTML escape characters
        Core._escapeChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&apos;'
        };

        Core._unescapeChars = {
            'amp': '&',
            'lt': '<',
            'gt': '>',
            'quot': '"',
            'apos': '\''
        };

        return Core;

    });

    /**
     * FrostDOM v2.0.3
     * https://github.com/elusivecodes/FrostDOM
     */
    (function(global, factory) {
        'use strict';

        if (typeof module === 'object' && typeof module.exports === 'object') {
            module.exports = factory;
        } else {
            Object.assign(global, factory(global));
        }

    })(this || window, function(window) {
        'use strict';

        if (!window) {
            throw new Error('FrostDOM requires a Window.');
        }

        if (!('Core' in window)) {
            throw new Error('FrostDOM requires FrostCore.');
        }

        const Core = window.Core;
        const document = window.document;
        let dom;

        /**
         * AjaxRequest Class
         * @class
         */
        class AjaxRequest {

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            constructor(options) {
                this._options = Core.extend(
                    {},
                    this.constructor.defaults,
                    options
                );

                if (!this._options.url) {
                    this._options.url = window.location.href;
                }

                if (!this._options.cache) {
                    this._options.url = this.constructor.appendQueryString(this._options.url, '_', Date.now());
                }

                if (!('Content-Type' in this._options.headers) && this._options.contentType) {
                    this._options.headers['Content-Type'] = this._options.contentType;
                }

                if (this._options.isLocal === null) {
                    this._options.isLocal = this.constructor._localRegExp.test(location.protocol);
                }

                if (!this._options.isLocal && !('X-Requested-With' in this._options.headers)) {
                    this._options.headers['X-Requested-With'] = 'XMLHttpRequest';
                }

                this._isResolved = false;
                this._isRejected = false;
                this._isCancelled = false;

                this.promise = new Promise((resolve, reject) => {
                    this._resolve = value => {
                        this._isResolved = true;
                        resolve(value);
                    };

                    this._reject = error => {
                        this._isRejected = true;
                        reject(error);
                    };
                });

                this._build();
                this._events();
                this._send();
            }

            /**
             * Cancel a pending request.
             * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
             */
            cancel(reason = 'Request was cancelled') {
                if (this._isResolved || this._isRejected || this._isCancelled) {
                    return;
                }

                this._xhr.abort();

                this._isCancelled = true;

                if (this._options.rejectOnCancel) {
                    this._reject({
                        status: this._xhr.status,
                        xhr: this._xhr,
                        reason
                    });
                }
            }

            /**
             * Execute a callback if the request is rejected.
             * @param {function} [onRejected] The callback to execute if the request is rejected.
             * @returns {Promise} The promise.
             */
            catch(onRejected) {
                return this.promise.catch(onRejected);
            }

            /**
             * Execute a callback once the request is settled (resolved or rejected).
             * @param {function} [onRejected] The callback to execute once the request is settled.
             * @returns {Promise} The promise.
             */
            finally(onFinally) {
                return this.promise.finally(onFinally);
            }

            /**
             * Execute a callback once the request is resolved (or optionally rejected).
             * @param {function} onFulfilled The callback to execute if the request is resolved.
             * @param {function} [onRejected] The callback to execute if the request is rejected.
             * @returns {Promise} The promise.
             */
            then(onFulfilled, onRejected) {
                return this.promise.then(onFulfilled, onRejected);
            }

        }

        /**
         * MockXMLHttpRequest Class
         * @class
         */
        class MockXMLHttpRequest {

            /**
             * New MockXMLHttpRequest constructor.
             * @returns {MockXMLHttpRequest} A new MockXMLHttpRequest.
             */
            constructor() {
                this.data = {
                    headers: {}
                };
                this.status = 200;
                this.timeout = 0;
                this.upload = {};
                this._response = 'Test';
            }

            /**
             * Abort the request if it has already been sent.
             */
            abort() {
                clearTimeout(this._uploadTimer);
                clearTimeout(this._progressTimer);
                clearTimeout(this._completeTimer);
            }

            /**
             * Initialize a request.
             * @param {string} method The request method.
             * @param {string} url The URL to send the request to.
             * @param {Boolean} [async=true] Whether to perform the request asynchronously.
             * @param {string} [username] The username to authenticate with.
             * @param {string} [password] The password to authenticate with.
             */
            open(method, url, async = true, username = undefined, password = undefined) {
                this.data.method = method;
                this.data.url = url;
                this.data.async = async;
                this.data.username = username;
                this.data.password = password;
            }

            /**
             * Override the MIME type sent by the server.
             * @param {string} mimeType The MIME type to use.
             */
            overrideMimeType(mimeType) {
                this.data.mimeType = mimeType;
            }

            /**
             * Send the request.
             * @param {*} [data=null] Data to send with the request.
             */
            send(data = null) {
                this.data.body = data;

                if (this.responseType) {
                    this.data.responseType = this.responseType;
                }

                if (this.timeout) {
                    this.data.timeout = this.timeout;
                }

                if (this.upload && this.upload.onprogress) {
                    this._uploadTimer = setTimeout(_ => {
                        this._uploadTimer = null;

                        const progressEvent = new Event('progress');
                        progressEvent.loaded = 5000;
                        progressEvent.total = 10000;

                        this.upload.onprogress(progressEvent);
                    }, 10);
                }

                if (this.onprogress) {
                    this._progressTimer = setTimeout(_ => {
                        this._progressTimer = null;

                        const progressEvent = new Event('progress');
                        progressEvent.loaded = 500;
                        progressEvent.total = 1000;

                        this.onprogress(progressEvent);
                    }, 10);
                }

                this._completeTimer = setTimeout(_ => {
                    this._completeTimer = null;

                    if (this.forceError) {
                        if (this.onerror) {
                            const errorEvent = new Event('error');
                            this.onerror(errorEvent);
                        }
                        return;
                    }

                    this.data.status = this.status;
                    this.response = this._response;

                    if (this.onload) {
                        const loadEvent = new Event('load');
                        this.onload(loadEvent);
                    }
                }, 20);
            }

            /**
             * Set a value of a HTTP request header.
             * @param {string} header The header to set.
             * @param {string} value The value to set.
             */
            setRequestHeader(header, value) {
                this.data.headers[header] = value;
            }

        }

        /**
         * AjaxRequest Helpers
         */

        Object.assign(AjaxRequest.prototype, {

            /**
             * Build the XHR request object.
             */
            _build() {
                this._xhr = this.constructor.useMock ?
                    new MockXMLHttpRequest :
                    new XMLHttpRequest;

                this._xhr.open(this._options.method, this._options.url, true, this._options.username, this._options.password);

                for (const key in this._options.headers) {
                    this._xhr.setRequestHeader(key, this._options.headers[key]);
                }

                if (this._options.responseType) {
                    this._xhr.responseType = this._options.responseType;
                }

                if (this._options.mimeType) {
                    this._xhr.overrideMimeType(this._options.mimeType);
                }

                if (this._options.timeout) {
                    this._xhr.timeout = this._options.timeout;
                }
            },

            /**
             * Attach events to the XHR request object.
             */
            _events() {
                this._xhr.onload = e => {
                    if (this._xhr.status > 400) {
                        this._reject({
                            status: this._xhr.status,
                            xhr: this._xhr,
                            event: e
                        });
                    } else {
                        this._resolve({
                            response: this._xhr.response,
                            xhr: this._xhr,
                            event: e
                        });
                    }
                };

                if (!this._isLocal) {
                    this._xhr.onerror = e =>
                        this._reject({
                            status: this._xhr.status,
                            xhr: this._xhr,
                            event: e
                        });
                }

                if (this._options.onProgress) {
                    this._xhr.onprogress = e =>
                        this._options.onProgress(e.loaded / e.total, this._xhr, e);
                }

                if (this._options.onUploadProgress) {
                    this._xhr.upload.onprogress = e =>
                        this._options.onUploadProgress(e.loaded / e.total, this._xhr, e);
                }
            },

            /**
             * Process the data and send the XHR request.
             */
            _send() {
                if (this._options.beforeSend) {
                    this._options.beforeSend(this._xhr);
                }

                if (this._options.data && this._options.processData && Core.isObject(this._options.data)) {
                    if (this._options.contentType === 'application/json') {
                        this._options.data = JSON.stringify(this._options.data);
                    } else if (this._options.contentType === 'application/x-www-form-urlencoded') {
                        this._options.data = this.constructor._parseParams(this._options.data);
                    } else {
                        this._options.data = this.constructor._parseFormData(this._options.data);
                    }
                }

                this._xhr.send(this._options.data);

                if (this._options.afterSend) {
                    this._options.afterSend(this._xhr);
                }
            }

        });


        /**
         * AjaxRequest (Static) Helpers
         */

        Object.assign(AjaxRequest, {

            /**
             * Append a query string to a URL.
             * @param {string} url The input URL.
             * @param {string} key The query string key.
             * @param {string} value The query string value.
             * @returns {string} The new URL.
             */
            appendQueryString(url, key, value) {
                const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');
                const urlData = new URL(url, baseHref);
                urlData.searchParams.append(key, value);
                let newUrl = urlData.toString();

                if (newUrl.substring(0, url.length) === url) {
                    return newUrl;
                }

                const pos = newUrl.indexOf(url);
                return newUrl.substring(pos);
            },

            /**
             * Return a FormData object from an array or object.
             * @param {array|object} data The input data.
             * @returns {FormData} The FormData object.
             */
            _parseFormData(data) {
                const values = this._parseValues(data);

                const formData = new FormData;

                for (const [key, value] of values) {
                    if (key.substring(key.length - 2) === '[]') {
                        formData.append(key, value);
                    } else {
                        formData.set(key, value);
                    }
                }

                return formData;
            },

            /**
             * Return a URI-encoded attribute string from an array or object.
             * @param {array|object} data The input data.
             * @returns {string} The URI-encoded attribute string.
             */
            _parseParams(data) {
                const values = this._parseValues(data);

                const paramString = values
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');

                return encodeURI(paramString);
            },

            /**
             * Return an attributes array, or a flat array of attributes from a key and value.
             * @param {string} key The input key.
             * @param {array|object|string} value The input value.
             * @returns {array} The parsed attributes.
             */
            _parseValue(key, value) {
                if (Core.isArray(value)) {
                    if (key.substring(key.length - 2) !== '[]') {
                        key += '[]';
                    }

                    const values = [];
                    for (const val of value) {
                        values.push(
                            ...this._parseValue(key, val)
                        );
                    }

                    return values;
                }

                if (Core.isObject(value)) {
                    const values = [];
                    for (const subKey in value) {
                        values.push(
                            ...this._parseValue(
                                `${key}[${subKey}]`,
                                value[subKey]
                            )
                        );
                    }

                    return values;
                }

                return [[key, value]];
            },

            /**
             * Return an attributes array from a data array or data object.
             * @param {array|object} data The input data.
             * @returns {array} The parsed attributes.
             */
            _parseValues(data) {

                if (Core.isArray(data)) {
                    const values = [];

                    for (const value of data) {
                        values.push(
                            ...this._parseValue(
                                value.name,
                                value.value
                            )
                        )
                    }

                    return values;
                }

                if (Core.isObject(data)) {
                    const values = [];

                    for (const key in data) {
                        values.push(
                            ...this._parseValue(
                                key,
                                data[key]
                            )
                        );
                    }

                    return values;
                }

                return data;
            }

        });

        /**
         * AjaxRequest (Static) Properties
         */

        Object.assign(AjaxRequest, {

            // AjaxRequest defaults
            defaults: {
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
                url: null
            },

            // Use mock
            useMock: false,

            // Local protocol test
            _localRegExp: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/

        });

        // Set the AjaxRequest prototype
        Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);

        /**
         * Animation Class
         * @class
         */
        class Animation {

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
                this._node = node;
                this._callback = callback;

                this._options = {
                    ...this.constructor.defaults,
                    ...options
                };

                if (!('start' in this._options)) {
                    this._options.start = performance.now();
                }

                if (this._options.debug) {
                    this._node.dataset.animationStart = this._options.start;
                }

                this.promise = new Promise((resolve, reject) => {
                    this._resolve = resolve;
                    this._reject = reject;
                });

                if (this.constructor._animations.has(node)) {
                    this.constructor._animations.get(node).push(this);
                } else {
                    this.constructor._animations.set(node, [this]);
                }
            }

            /**
             * Execute a callback if the animation is rejected.
             * @param {function} [onRejected] The callback to execute if the animation is rejected.
             * @returns {Promise} The promise.
             */
            catch(onRejected) {
                return this.promise.catch(onRejected);
            }

            /**
             * Execute a callback once the animation is settled (resolved or rejected).
             * @param {function} [onRejected] The callback to execute once the animation is settled.
             * @returns {Promise} The promise.
             */
            finally(onFinally) {
                return this.promise.finally(onFinally);
            }

            /**
             * Stop the animation.
             * @param {Boolean} [finish=true] Whether to finish the animation.
            */
            stop(finish = true) {
                const animations = this.constructor._animations.get(this._node)
                    .filter(animation => animation !== this);

                if (!animations.length) {
                    this.constructor._animations.delete(this._node)
                } else {
                    this.constructor._animations.set(this._node, animations);
                }

                this.update(true, finish);
            }

            /**
             * Execute a callback once the animation is resolved (or optionally rejected).
             * @param {function} onFulfilled The callback to execute if the animation is resolved.
             * @param {function} [onRejected] The callback to execute if the animation is rejected.
             * @returns {Promise} The promise.
             */
            then(onFulfilled, onRejected) {
                return this.promise.then(onFulfilled, onRejected);
            }

            /**
             * Run a single frame of the animation.
             * @param {Boolean} [stop] Whether to stop the animation.
             * @param {Booelan} [finish] Whether to finish the animation.
             */
            update(stop = false, finish = false) {
                if (stop && !finish) {
                    this._reject(this._node);
                    return true;
                }

                const now = performance.now();

                let progress;
                if (finish) {
                    progress = 1;
                } else {
                    progress = (now - this._options.start) / this._options.duration;

                    if (this._options.infinite) {
                        progress %= 1;
                    } else {
                        progress = Core.clamp(progress);
                    }

                    if (this._options.type === 'ease-in') {
                        progress = progress ** 2;
                    } else if (this._options.type === 'ease-out') {
                        progress = Math.sqrt(progress);
                    } else if (this._options.type === 'ease-in-out') {
                        if (progress <= 0.5) {
                            progress = progress ** 2 * 2;
                        } else {
                            progress = 1 - ((1 - progress) ** 2 * 2);
                        }
                    }
                }

                if (this._options.debug) {
                    this._node.dataset.animationNow = now;
                    this._node.dataset.animationProgress = progress;
                }

                this._callback(this._node, progress, this._options);

                if (progress < 1) {
                    return;
                }

                if (this._options.debug) {
                    delete this._node.dataset.animationStart;
                    delete this._node.dataset.animationNow;
                    delete this._node.dataset.animationProgress;
                }

                this._resolve(this._node);
                return true;
            }

        }

        /**
        * AnimationSet Class
        * @class
        */
        class AnimationSet {

            /**
             * New AnimationSet constructor.
             * @param {array} animations The animations.
             */
            constructor(animations) {
                this._animations = animations;
                this.promise = Promise.all(animations);
            }

            /**
             * Execute a callback if any of the animations is rejected.
             * @param {function} [onRejected] The callback to execute if an animation is rejected.
             * @returns {Promise} The promise.
             */
            catch(onRejected) {
                return this.promise.catch(onRejected);
            }

            /**
             * Execute a callback once the animation is settled (resolved or rejected).
             * @param {function} [onRejected] The callback to execute once the animation is settled.
             * @returns {Promise} The promise.
             */
            finally(onFinally) {
                return this.promise.finally(onFinally);
            }

            /**
             * Stop the animations.
             * @param {Boolean} [finish=true] Whether to finish the animations.
            */
            stop(finish = true) {
                for (const animation of this._animations) {
                    animation.stop(finish);
                }
            }

            /**
             * Execute a callback once the animation is resolved (or optionally rejected).
             * @param {function} onFulfilled The callback to execute if the animation is resolved.
             * @param {function} [onRejected] The callback to execute if the animation is rejected.
             * @returns {Promise} The promise.
             */
            then(onFulfilled, onRejected) {
                return this.promise.then(onFulfilled, onRejected);
            }

        }

        /**
         * Animation (Static) Helpers
         */

        Object.assign(Animation, {

            /**
             * Clone animations for a single node.
             * @param {Node|HTMLElement|DocumentFragment} node The input node.
             * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
             */
            clone(node, clone) {
                if (!this._animations.has(node)) {
                    return;
                }

                const animations = this._animations.get(node)
                    .map(animation =>
                        new Animation(clone, animation._callback, animation._options)
                    );

                this._animations.set(clone, animations);
            },

            /**
             * Start the animation loop (if not already started).
             */
            start() {
                if (this._animating) {
                    return;
                }

                this._animating = true;
                this.update();
            },

            /**
             * Stop all animations for a single element.
             * @param {HTMLElement} node The input node.
             * @param {Boolean} [finish=true] Whether to complete all current animations.
             */
            stop(node, finish = true) {
                if (!this._animations.has(node)) {
                    return;
                }

                const animations = this._animations.get(node);
                for (const animation of animations) {
                    animation.update(true, finish);
                }

                this._animations.delete(node);
            },

            /**
             * Run a single frame of all animations, and then queue up the next frame.
             */
            update() {
                for (let [node, animations] of this._animations) {
                    animations = animations.filter(animation => !animation.update());

                    if (!animations.length) {
                        this._animations.delete(node)
                    } else {
                        this._animations.set(node, animations);
                    }
                }

                if (!this._animations.size) {
                    this._animating = false;
                    return;
                }

                if (this.useTimeout) {
                    setTimeout(_ => this.update(), 1000 / 60)
                } else {
                    window.requestAnimationFrame(_ => this.update());
                }
            }

        });

        /**
         * Animation (Static) Properties
         */

        Object.assign(Animation, {

            // Animation defaults
            defaults: {
                duration: 1000,
                type: 'ease-in-out',
                infinite: false,
                debug: false
            },

            // Use timeout
            useTimeout: false,

            // Animating flag
            _animating: false,

            // Current animations
            _animations: new Map()

        });

        // Set the Animation prototype
        Object.setPrototypeOf(Animation.prototype, Promise.prototype);

        // Set the AnimationSet prototype
        Object.setPrototypeOf(AnimationSet.prototype, Promise.prototype);

        /**
         * DOM Class
         * @class
         */
        class DOM {

            /**
             * New DOM constructor.
             * @param {Document} [context=document] The document context.
             * @returns {DOM} A new DOM object.
             */
            constructor(context = document) {
                if (!(Core.isDocument(context))) {
                    throw new Error('Invalid document');
                }

                this._context = context;
            }

        }

        /**
         * DOM Animate
         */

        Object.assign(DOM.prototype, {

            /**
             * Add an animation to each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {DOM~animationCallback} callback The animation callback.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            animate(nodes, callback, options) {
                nodes = this.parseNodes(nodes);

                const animations = nodes.map(node =>
                    new Animation(node, callback, options)
                );

                Animation.start();

                return new AnimationSet(animations);
            },

            /**
             * Stop all animations for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [finish=true] Whether to complete all current animations.
             */
            stop(nodes, finish = true) {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    Animation.stop(node, finish);
                }
            }

        });

        /**
         * DOM Animations
         */

        Object.assign(DOM.prototype, {

            /**
             * Drop each node into place.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            dropIn(nodes, options) {
                return this.slideIn(
                    nodes,
                    {
                        direction: 'top',
                        ...options
                    }
                );
            },

            /**
             * Drop each node out of place.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            dropOut(nodes, options) {
                return this.slideOut(
                    nodes,
                    {
                        direction: 'top',
                        ...options
                    }
                );
            },

            /**
             * Fade the opacity of each node in.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            fadeIn(nodes, options) {
                return this.animate(
                    nodes,
                    (node, progress) =>
                        node.style.setProperty(
                            'opacity',
                            progress < 1 ?
                                progress.toFixed(2) :
                                ''
                        ),
                    options
                );
            },

            /**
             * Fade the opacity of each node out.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            fadeOut(nodes, options) {
                return this.animate(
                    nodes,
                    (node, progress) =>
                        node.style.setProperty(
                            'opacity',
                            progress < 1 ?
                                (1 - progress).toFixed(2) :
                                ''
                        ),
                    options
                );
            },

            /**
             * Rotate each node in on an X, Y or Z.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=1] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            rotateIn(nodes, options) {
                return this.animate(
                    nodes,
                    (node, progress, options) => {
                        const amount = ((90 - (progress * 90)) * (options.inverse ? -1 : 1)).toFixed(2);
                        node.style.setProperty(
                            'transform',
                            progress < 1 ?
                                `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                                ''
                        );
                    },
                    {
                        x: 0,
                        y: 1,
                        z: 0,
                        ...options
                    }
                );
            },

            /**
             * Rotate each node out on an X, Y or Z.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=1] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            rotateOut(nodes, options) {
                return this.animate(
                    nodes,
                    (node, progress, options) => {
                        const amount = ((progress * 90) * (options.inverse ? -1 : 1)).toFixed(2);
                        node.style.setProperty(
                            'transform',
                            progress < 1 ?
                                `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                                ''
                        );
                    },
                    {
                        x: 0,
                        y: 1,
                        z: 0,
                        ...options
                    }
                );
            },

            /**
             * Slide each node in from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            slideIn(nodes, options) {
                return this.animate(
                    nodes,
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

                        const dir = Core.evaluate(options.direction);

                        let translateStyle, size, inverse;
                        if (['top', 'bottom'].includes(dir)) {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                            size = this.constructor._height(node);
                            inverse = dir === 'top';
                        } else {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                            size = this.constructor._width(node);
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
                        ...options
                    }
                );
            },

            /**
             * Slide each node out from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            slideOut(nodes, options) {
                return this.animate(
                    nodes,
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

                        const dir = Core.evaluate(options.direction);

                        let translateStyle, size, inverse;
                        if (['top', 'bottom'].includes(dir)) {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                            size = this.constructor._height(node);
                            inverse = dir === 'top';
                        } else {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                            size = this.constructor._width(node);
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
                        ...options
                    }
                );
            },

            /**
             * Squeeze each node in from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            squeezeIn(nodes, options) {
                nodes = this.parseNodes(nodes);

                options = {
                    direction: 'bottom',
                    useGpu: true,
                    ...options
                };

                const animations = nodes.map(node => {
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

                            const dir = Core.evaluate(options.direction);

                            let sizeStyle, translateStyle;
                            if (['top', 'bottom'].includes(dir)) {
                                sizeStyle = 'height';
                                if (dir === 'top') {
                                    translateStyle = options.useGpu ?
                                        'Y' :
                                        'margin-top';
                                }
                            } else {
                                sizeStyle = 'width';
                                if (dir === 'left') {
                                    translateStyle = options.useGpu ?
                                        'X' :
                                        'margin-left';
                                }
                            }

                            const size = DOM[`_${sizeStyle}`](node),
                                amount = (size * progress).toFixed(2);

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
                        options
                    );
                });

                Animation.start();

                return new AnimationSet(animations);
            },

            /**
             * Squeeze each node out from a direction.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
             */
            squeezeOut(nodes, options) {
                nodes = this.parseNodes(nodes);

                options = {
                    direction: 'bottom',
                    useGpu: true,
                    ...options
                };

                const animations = nodes.map(node => {
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

                            const dir = Core.evaluate(options.direction);

                            let sizeStyle, translateStyle;
                            if (['top', 'bottom'].includes(dir)) {
                                sizeStyle = 'height';
                                if (dir === 'top') {
                                    translateStyle = options.useGpu ?
                                        'Y' :
                                        'margin-top';
                                }
                            } else {
                                sizeStyle = 'width';
                                if (dir === 'left') {
                                    translateStyle = options.useGpu ?
                                        'X' :
                                        'margin-left';
                                }
                            }

                            const size = DOM[`_${sizeStyle}`](node),
                                amount = (size - (size * progress)).toFixed(2);

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
                        options
                    );
                });

                Animation.start();

                return new AnimationSet(animations);
            }

        });

        /**
         * DOM Queue
         */

        Object.assign(DOM.prototype, {

            /**
             * Clear the queue of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [queueName=default] The name of the queue to use.
             */
            clearQueue(nodes, queueName = 'default') {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    this.constructor._clearQueue(node, queueName);
                }
            },

            /**
             * Queue a callback on each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {DOM~queueCallback} callback The callback to queue.
             * @param {string} [queueName=default] The name of the queue to use.
             */
            queue(nodes, callback, queueName = 'default') {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    this.constructor._queue(node, callback, queueName);
                }
            }

        });

        /**
         * DOM Attributes
         */

        Object.assign(DOM.prototype, {

            /**
             * Get attribute value(s) for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [attribute] The attribute name.
             * @returns {string|object} The attribute value, or an object containing attributes.
             */
            getAttribute(nodes, attribute) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                if (attribute) {
                    return node.getAttribute(attribute);
                }

                return this.constructor._getAttributes(node, attribute);
            },

            /**
             * Get dataset value(s) for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The dataset key.
             * @returns {*} The dataset value, or an object containing the dataset.
             */
            getDataset(nodes, key) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                if (key) {
                    key = Core.camelCase(key);

                    return this.constructor._parseDataset(node.dataset[key]);
                }

                const dataset = {};

                for (const k in node.dataset) {
                    dataset[k] = this.constructor._parseDataset(node.dataset[k]);
                }

                return dataset;
            },

            /**
             * Get the HTML contents of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The HTML contents.
             */
            getHTML(nodes) {
                return this.getProperty(nodes, 'innerHTML');
            },

            /**
             * Get a property value for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             * @returns {string} The property value.
             */
            getProperty(nodes, property) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return node[property];
            },

            /**
             * Get the text contents of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The text contents.
             */
            getText(nodes) {
                return this.getProperty(nodes, 'innerText');
            },

            /**
             * Get the value property of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The value.
             */
            getValue(nodes) {
                return this.getProperty(nodes, 'value');
            },

            /**
             * Remove an attribute from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} attribute The attribute name.
             */
            removeAttribute(nodes, attribute) {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    node.removeAttribute(attribute);
                }
            },

            /**
             * Remove a dataset value from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} key The dataset key.
             */
            removeDataset(nodes, key) {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    key = Core.camelCase(key);

                    delete node.dataset[key];
                }
            },

            /**
             * Remove a property from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             */
            removeProperty(nodes, property) {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    delete node[property];
                }
            },

            /**
             * Set an attribute value for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} attribute The attribute name, or an object containing attributes.
             * @param {string} [value] The attribute value.
             */
            setAttribute(nodes, attribute, value) {
                nodes = this.parseNodes(nodes);

                const attributes = this.constructor._parseData(attribute, value);

                for (const node of nodes) {
                    this.constructor._setAttributes(node, attributes);
                }
            },

            /**
             * Set a dataset value for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} key The dataset key, or an object containing dataset values.
             * @param {*} [value] The dataset value.
             */
            setDataset(nodes, key, value) {
                nodes = this.parseNodes(nodes);

                const dataset = this.constructor._parseData(key, value, true);

                for (const node of nodes) {
                    this.constructor._setDataset(node, dataset);
                }
            },

            /**
             * Set the HTML contents of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} html The HTML contents.
             */
            setHTML(nodes, html) {
                this.empty(nodes);

                this.setProperty(nodes, 'innerHTML', html);
            },

            /**
             * Set a property value for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} property The property name, or an object containing properties.
             * @param {string} [value] The property value.
             */
            setProperty(nodes, property, value) {
                nodes = this.parseNodes(nodes);

                const properties = this.constructor._parseData(property, value);

                for (const node of nodes) {
                    for (const property in properties) {
                        node[property] = properties[property];
                    }
                }
            },

            /**
             * Set the text contents of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} text The text contents.
             */
            setText(nodes, text) {
                this.empty(nodes);

                this.setProperty(nodes, 'innerText', text);
            },

            /**
             * Set the value property of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} value The value.
             */
            setValue(nodes, value) {
                this.setProperty(nodes, 'value', value);
            }

        });

        /**
         * DOM Data
         */

        Object.assign(DOM.prototype, {

            /**
             * Clone custom data from each node to each other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */
            cloneData(nodes, others) {
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });

                others = this.parseNodes(others, {
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });

                for (const node of nodes) {
                    for (const other of others) {
                        this.constructor._cloneData(node, other);
                    }
                }
            },

            /**
             * Get custom data for the first node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             * @returns {*} The data value.
             */
            getData(nodes, key) {
                const node = this.parseNode(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });

                if (!node) {
                    return;
                }

                return this.constructor._getData(node, key);
            },

            /**
             * Remove custom data from each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             */
            removeData(nodes, key) {
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });

                for (const node of nodes) {
                    this.constructor._removeData(node, key);
                }
            },

            /**
             * Set custom data for each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} key The data key, or an object containing data.
             * @param {*} [value] The data value.
             */
            setData(nodes, key, value) {
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });

                const data = this.constructor._parseData(key, value);

                for (const node of nodes) {
                    this.constructor._setData(node, data);
                }
            }

        });

        /**
         * DOM Position
         */

        Object.assign(DOM.prototype, {

            /**
             * Get the X,Y co-ordinates for the center of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the x and y co-ordinates.
             */
            center(nodes, offset) {
                const nodeBox = this.rect(nodes, offset);

                if (!nodeBox) {
                    return;
                }

                return {
                    x: nodeBox.left + nodeBox.width / 2,
                    y: nodeBox.top + nodeBox.height / 2
                };
            },

            /**
             * Contrain each node to a container node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
             */
            constrain(nodes, container) {
                const containerBox = this.rect(container);

                if (!containerBox) {
                    return;
                }

                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    const nodeBox = this.constructor._rect(node);

                    const style = {};

                    if (nodeBox.height > containerBox.height) {
                        style.height = containerBox.height;
                    }

                    if (nodeBox.width > containerBox.width) {
                        style.width = containerBox.width;
                    }

                    let leftOffset;
                    if (nodeBox.left - containerBox.left < 0) {
                        leftOffset = nodeBox.left - containerBox.left
                    } else if (nodeBox.right - containerBox.right > 0) {
                        leftOffset = nodeBox.right - containerBox.right;
                    }

                    if (leftOffset) {
                        const oldLeft = this.constructor._css(node, 'left');
                        const trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
                        style.left = `${trueLeft - leftOffset}px`;
                    }

                    let topOffset;
                    if (nodeBox.top - containerBox.top < 0) {
                        topOffset = nodeBox.top - containerBox.top;
                    } else if (nodeBox.bottom - containerBox.bottom > 0) {
                        topOffset = nodeBox.bottom - containerBox.bottom;
                    }

                    if (topOffset) {
                        const oldTop = this.constructor._css(node, 'top');
                        const trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
                        style.top = `${trueTop - topOffset}px`;
                    }

                    if (this.constructor._css(node, 'position') === 'static') {
                        style.position = 'relative';
                    }

                    this.constructor._setStyles(node, style);
                }
            },

            /**
             * Get the distance of a node to an X,Y position in the Window.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {number} The distance to the element.
             */
            distTo(nodes, x, y, offset) {
                const nodeCenter = this.center(nodes, offset);

                if (!nodeCenter) {
                    return;
                }

                return Core.dist(nodeCenter.x, nodeCenter.y, x, y);
            },

            /**
             * Get the distance between two nodes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {number} The distance between the nodes.
             */
            distToNode(nodes, others) {
                const otherCenter = this.center(others);

                if (!otherCenter) {
                    return;
                }

                return this.distTo(nodes, otherCenter.x, otherCenter.y);
            },

            /**
             * Get the nearest node to an X,Y position in the Window.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {HTMLElement} The nearest node.
             */
            nearestTo(nodes, x, y, offset) {
                let closest,
                    closestDistance = Number.MAX_VALUE;

                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    const dist = this.distTo(node, x, y, offset);
                    if (dist && dist < closestDistance) {
                        closestDistance = dist;
                        closest = node;
                    }
                }

                return closest;
            },

            /**
             * Get the nearest node to another node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {HTMLElement} The nearest node.
             */
            nearestToNode(nodes, others) {
                const otherCenter = this.center(others);

                if (!otherCenter) {
                    return;
                }

                return this.nearestTo(nodes, otherCenter.x, otherCenter.y);
            },

            /**
             * Get the percentage of an X co-ordinate relative to a node's width.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The X co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */
            percentX(nodes, x, offset, clamp = true) {
                const nodeBox = this.rect(nodes, offset);

                if (!nodeBox) {
                    return;
                }

                const percent = (x - nodeBox.left)
                    / nodeBox.width
                    * 100;

                return clamp ?
                    Core.clampPercent(percent) :
                    percent;
            },

            /**
             * Get the percentage of a Y co-ordinate relative to a node's height.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */
            percentY(nodes, y, offset, clamp = true) {
                const nodeBox = this.rect(nodes, offset);

                if (!nodeBox) {
                    return;
                }

                const percent = (y - nodeBox.top)
                    / nodeBox.height
                    * 100;

                return clamp ?
                    Core.clampPercent(percent) :
                    percent;
            },

            /**
             * Get the position of the first node relative to the Window or Document.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the X and Y co-ordinates.
             */
            position(nodes, offset) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return this.constructor._forceShow(node, node => {
                    const result = {
                        x: node.offsetLeft,
                        y: node.offsetTop
                    };

                    if (offset) {
                        let offsetParent = node;

                        while (offsetParent = offsetParent.offsetParent) {
                            result.x += offsetParent.offsetLeft;
                            result.y += offsetParent.offsetTop;
                        }
                    }

                    return result;
                });
            },

            /**
             * Get the computed bounding rectangle of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {DOMRect} The computed bounding rectangle.
             */
            rect(nodes, offset) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return this.constructor._rect(node, offset);
            }

        });

        /**
         * DOM Scroll
         */

        Object.assign(DOM.prototype, {

            /**
             * Get the scroll X position of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The scroll X position.
             */
            getScrollX(nodes) {
                const node = this.parseNode(nodes, {
                    document: true,
                    window: true
                });

                if (!node) {
                    return;
                }

                if (Core.isWindow(node)) {
                    return node.scrollX;
                }

                if (Core.isDocument(node)) {
                    return node.scrollingElement.scrollLeft;
                }

                return node.scrollLeft;
            },

            /**
             * Get the scroll Y position of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The scroll Y position.
             */
            getScrollY(nodes) {
                const node = this.parseNode(nodes, {
                    document: true,
                    window: true
                });

                if (!node) {
                    return;
                }

                if (Core.isWindow(node)) {
                    return node.scrollY;
                }

                if (Core.isDocument(node)) {
                    return node.scrollingElement.scrollTop;
                }

                return node.scrollTop;
            },

            /**
             * Scroll each node to an X,Y position.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The scroll X position.
             * @param {number} y The scroll Y position.
             */
            setScroll(nodes, x, y) {
                nodes = this.parseNodes(nodes, {
                    document: true,
                    window: true
                });

                for (const node of nodes) {
                    if (Core.isWindow(node)) {
                        node.scroll(x, y);
                    } else if (Core.isDocument(node)) {
                        node.scrollingElement.scrollLeft = x;
                        node.scrollingElement.scrollTop = y;
                    } else {
                        node.scrollLeft = x;
                        node.scrollTop = y;
                    }
                }
            },

            /**
             * Scroll each node to an X position.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} x The scroll X position.
             */
            setScrollX(nodes, x) {
                nodes = this.parseNodes(nodes, {
                    document: true,
                    window: true
                });

                for (const node of nodes) {
                    if (Core.isWindow(node)) {
                        node.scroll(x, node.scrollY);
                    } else if (Core.isDocument(node)) {
                        node.scrollingElement.scrollLeft = x;
                    } else {
                        node.scrollLeft = x;
                    }
                }
            },

            /**
             * Scroll each node to a Y position.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} y The scroll Y position.
             */
            setScrollY(nodes, y) {
                nodes = this.parseNodes(nodes, {
                    document: true,
                    window: true
                });

                for (const node of nodes) {
                    if (Core.isWindow(node)) {
                        node.scroll(node.scrollX, y);
                    } else if (Core.isDocument(node)) {
                        node.scrollingElement.scrollTop = y;
                    } else {
                        node.scrollTop = y;
                    }
                }
            }

        });

        /**
         * DOM Size
         */

        Object.assign(DOM.prototype, {

            /**
             * Get the computed height of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} [boxSize=1] The box sizing to calculate.
             * @returns {number} The height.
             */
            height(nodes, boxSize) {
                const node = this.parseNode(nodes, {
                    document: true,
                    window: true
                });

                if (!node) {
                    return;
                }

                if (Core.isWindow(node)) {
                    return boxSize ?
                        node.outerHeight :
                        node.innerHeight;
                }

                if (Core.isUndefined(boxSize)) {
                    boxSize = this.constructor.PADDING_BOX;
                }

                return this.constructor._height(node, boxSize);
            },

            /**
             * Get the computed width of the first node.
             * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {number} [boxSize=1] The box sizing to calculate.
             * @returns {number} The width.
             */
            width(nodes, boxSize) {
                const node = this.parseNode(nodes, {
                    document: true,
                    window: true
                });

                if (!node) {
                    return;
                }

                if (Core.isWindow(node)) {
                    return boxSize ?
                        node.outerWidth :
                        node.innerWidth;
                }

                if (Core.isUndefined(boxSize)) {
                    boxSize = this.constructor.PADDING_BOX;
                }

                return this.constructor._width(node, boxSize);
            }

        });

        /**
         * DOM Styles
         */

        Object.assign(DOM.prototype, {

            /**
             * Add classes to each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             */
            addClass(nodes, ...classes) {
                nodes = this.parseNodes(nodes);

                classes = this.constructor._parseClasses(classes);

                if (!classes.length) {
                    return;
                }

                for (const node of nodes) {
                    node.classList.add(...classes);
                }
            },

            /**
             * Get computed CSS style value(s) for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [style] The CSS style name.
             * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
             */
            css(nodes, style) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return this.constructor._css(node, style);
            },

            /**
             * Get style properties for the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [style] The style name.
             * @returns {string|object} The style value, or an object containing the style properties.
             */
            getStyle(nodes, style) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                if (style) {
                    style = Core.kebabCase(style);

                    return node.style[style];
                }

                const styles = {};

                for (const style of node.style) {
                    styles[style] = node.style[style];
                }

                return styles;
            },

            /**
             * Hide each node from display.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            hide(nodes) {
                this.setStyle(nodes, 'display', 'none');
            },

            /**
             * Remove classes from each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             */
            removeClass(nodes, ...classes) {
                nodes = this.parseNodes(nodes);

                classes = this.constructor._parseClasses(classes);

                if (!classes.length) {
                    return;
                }

                for (const node of nodes) {
                    node.classList.remove(...classes);
                }
            },

            /**
             * Set style properties for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|object} style The style name, or an object containing styles.
             * @param {string} [value] The style value.
             * @param {Boolean} [important] Whether the style should be !important.
             */
            setStyle(nodes, style, value, important) {
                nodes = this.parseNodes(nodes);

                const styles = this.constructor._parseData(style, value);

                for (const node of nodes) {
                    this.constructor._setStyles(node, styles, important);
                }
            },

            /**
             * Display each hidden node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            show(nodes) {
                this.setStyle(nodes, 'display', '');
            },

            /**
             * Toggle the visibility of each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            toggle(nodes) {
                nodes = this.parseNodes(nodes);

                for (const node of nodes) {
                    node.style.setProperty(
                        'display',
                        node.style.display === 'none' ?
                            '' :
                            'none'
                    );
                }
            },

            /**
             * Toggle classes for each node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             */
            toggleClass(nodes, ...classes) {
                nodes = this.parseNodes(nodes);

                classes = this.constructor._parseClasses(classes);

                if (!classes.length) {
                    return;
                }

                for (const node of nodes) {
                    for (const className of classes) {
                        node.classList.toggle(className);
                    }
                }
            }

        });

        /**
         * DOM Cookie
         */

        Object.assign(DOM.prototype, {

            /**
             * Get a cookie value.
             * @param {string} name The cookie name.
             * @returns {*} The cookie value.
             */
            getCookie(name) {
                const cookie = this._context.cookie
                    .split(';')
                    .find(cookie =>
                        cookie
                            .trimStart()
                            .substring(0, name.length) === name
                    )
                    .trimStart();

                if (!cookie) {
                    return null;
                }

                return decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
            },

            /**
             * Remove a cookie.
             * @param {string} name The cookie name.
             * @param {object} [options] The options to use for the cookie.
             * @param {string} [options.path] The cookie path.
             * @param {Boolean} [options.secure] Whether the cookie is secure.
             */
            removeCookie(name, options) {
                if (!name) {
                    return;
                }

                let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;

                if (options) {
                    if (options.path) {
                        cookie += `;path=${options.path}`;
                    }

                    if (options.secure) {
                        cookie += ';secure';
                    }
                }

                this._context.cookie = cookie;
            },

            /**
             * Set a cookie value.
             * @param {string} name The cookie name.
             * @param {*} value The cookie value.
             * @param {object} [options] The options to use for the cookie.
             * @param {number} [options.expires] The number of seconds until the cookie will expire.
             * @param {string} [options.path] The path to use for the cookie.
             * @param {Boolean} [options.secure] Whether the cookie is secure.
             */
            setCookie(name, value, options) {
                if (!name) {
                    return;
                }

                let cookie = `${name}=${value}`;

                if (options) {
                    if (options.expires) {
                        const date = new Date;
                        date.setTime(
                            date.getTime()
                            + options.expires * 1000
                        );
                        cookie += `;expires=${date.toUTCString()}`;
                    }

                    if (options.path) {
                        cookie += `;path=${options.path}`;
                    }

                    if (options.secure) {
                        cookie += ';secure';
                    }
                }

                this._context.cookie = cookie;
            }

        });

        /**
         * DOM Event Factory
         */

        Object.assign(DOM.prototype, {

            /** 
             * Return a wrapped mouse drag event (optionally debounced).
             * @param {DOM~eventCallback} down The callback to execute on mousedown.
             * @param {DOM~eventCallback} move The callback to execute on mousemove.
             * @param {DOM~eventCallback} up The callback to execute on mouseup.
             * @param {Boolean} [debounce=true] Whether to debounce the move event.
             * @returns {DOM~eventCallback} The mouse drag event callback.
             */
            mouseDragFactory(down, move, up, debounce = true) {
                if (move && debounce) {
                    move = this.constructor.debounce(move);

                    // needed to make sure up callback executes after final move callback
                    if (up) {
                        up = this.constructor.debounce(up);
                    }
                }

                return e => {
                    if (down && down(e) === false) {
                        return false;
                    }

                    if (move) {
                        this.addEvent(window, 'mousemove', move);
                    }

                    if (move || up) {
                        this.addEventOnce(window, 'mouseup', e => {
                            if (move) {
                                this.removeEvent(window, 'mousemove', move);
                            }

                            if (up) {
                                up(e);
                            }
                        });
                    }
                };
            }

        });

        /**
         * DOM Events
         */

        Object.assign(DOM.prototype, {

            /**
             * Trigger a blur event on the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            blur(nodes) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                node.blur();
            },

            /**
             * Trigger a click event on the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            click(nodes) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                node.click();
            },

            /**
             * Trigger a focus event on the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            focus(nodes) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                node.focus();
            },

            /**
             * Add a function to the ready queue.
             * @param {DOM~eventCallback} callback The callback to execute.
             */
            ready(callback) {
                if (this._context.readyState === 'complete') {
                    callback();
                    return;
                }

                window.addEventListener('DOMContentLoaded', callback, {
                    once: true
                })
            }

        });

        /**
         * DOM Event Handlers
         */

        Object.assign(DOM.prototype, {

            /**
             * Add events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @param {string} [delegate] The delegate selector.
             * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
             */
            addEvent(nodes, events, callback, delegate, selfDestruct) {
                nodes = this.parseNodes(nodes, {
                    shadow: true,
                    document: true,
                    window: !delegate
                });

                for (const node of nodes) {
                    for (const event of this.constructor._parseEvents(events)) {
                        this.constructor._addEvent(node, event, callback, delegate, selfDestruct);
                    }
                }
            },

            /**
             * Add delegated events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             */
            addEventDelegate(nodes, events, delegate, callback) {
                this.addEvent(nodes, events, callback, delegate);
            },

            /**
             * Add self-destructing delegated events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             */
            addEventDelegateOnce(nodes, events, delegate, callback) {
                this.addEvent(nodes, events, callback, delegate, true);
            },

            /**
             * Add self-destructing events to each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             */
            addEventOnce(nodes, events, callback) {
                this.addEvent(nodes, events, callback, null, true);
            },

            /**
             * Clone all events from each node to other nodes.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */
            cloneEvents(nodes, others) {
                nodes = this.parseNodes(nodes, {
                    shadow: true,
                    document: true,
                    window: true
                });

                others = this.parseNodes(others, {
                    shadow: true,
                    document: true,
                    window: true
                });

                for (const node of nodes) {
                    for (const other of others) {
                        this.constructor._cloneEvents(node, other);
                    }
                }
            },

            /**
             * Remove events from each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [events] The event names.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @param {string} [delegate] The delegate selector.
             */
            removeEvent(nodes, events, callback, delegate) {
                nodes = this.parseNodes(nodes, {
                    shadow: true,
                    document: true,
                    window: !delegate
                });

                events = events ?
                    this.constructor._parseEvents(events) :
                    false;

                for (const node of nodes) {
                    if (!this.constructor._events.has(node)) {
                        continue;
                    }

                    if (!events) {
                        this.constructor._removeEvent(node, events, callback, delegate);
                        continue;
                    }

                    for (const event of events) {
                        this.constructor._removeEvent(node, event, callback, delegate);
                    }
                }
            },

            /**
             * Remove delegated events from each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [events] The event names.
             * @param {string} [delegate] The delegate selector.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             */
            removeEventDelegate(nodes, events, delegate, callback) {
                this.removeEvent(nodes, events, callback, delegate);
            },

            /**
             * Trigger events on each node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} events The event names.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             */
            triggerEvent(nodes, events, options) {
                nodes = this.parseNodes(nodes, {
                    shadow: true,
                    document: true,
                    window: true
                });

                events = this.constructor._parseEvents(events);

                for (const node of nodes) {
                    for (const event of events) {
                        this.constructor._triggerEvent(node, event, options);
                    }
                }
            },

            /**
             * Trigger an event for the first node.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} event The event name.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             */
            triggerOne(nodes, event, options) {
                const node = this.parseNode(nodes, {
                    shadow: true,
                    document: true,
                    window: true
                });

                return this.constructor._triggerEvent(node, event, options);
            }

        });

        /**
         * DOM Create
         */

        Object.assign(DOM.prototype, {

            /**
             * Attach a shadow DOM tree to the first node.
             * @param {string|array|HTMLElement|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
             * @returns {ShadowRoot} The new ShadowRoot.
             */
            attachShadow(nodes, open = true) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return node.attachShadow({
                    mode: open ?
                        'open' :
                        'closed'
                });
            },

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
             * @returns {HTMLElement} The new HTMLElement.
             */
            create(tagName = 'div', options) {
                const node = this._context.createElement(tagName);

                if (!options) {
                    return node;
                }

                if ('html' in options) {
                    node.innerHTML = options.html;
                } else if ('text' in options) {
                    node.innerText = options.text;
                }

                if ('class' in options) {
                    node.classList.add(
                        ...this.constructor._parseClasses(
                            Core.wrap(options.class)
                        )
                    );
                }

                if ('style' in options) {
                    this.constructor._setStyles(node, options.style);
                }

                if ('value' in options) {
                    node.value = options.value;
                }

                if ('attributes' in options) {
                    this.constructor._setAttributes(node, options.attributes);
                }

                if ('properties' in options) {
                    for (const key in options.properties) {
                        node[key] = options.properties[key];
                    }
                }

                if ('dataset' in options) {
                    const dataset = this.constructor._parseData(options.dataset, null, true);
                    this.constructor._setDataset(node, dataset);
                }

                return node;
            },

            /**
             * Create a new comment node.
             * @param {string} comment The comment contents.
             * @returns {Node} The new comment node.
             */
            createComment(comment) {
                return this._context.createComment(comment);
            },

            /**
             * Create a new document fragment.
             * @returns {DocumentFragment} The new DocumentFragment.
             */
            createFragment() {
                return this._context.createDocumentFragment();
            },

            /**
             * Create a new range object.
             * @returns {Range} The new Range.
             */
            createRange() {
                return this._context.createRange();
            },

            /**
             * Create a new text node.
             * @param {string} text The text contents.
             * @returns {Node} The new text node.
             */
            createText(text) {
                return this._context.createTextNode(text);
            },

            /**
             * Create an Array containing nodes parsed from a HTML string.
             * @param {string} html The HTML input string.
             * @returns {array} An array of nodes.
             */
            parseHTML(html) {
                return Core.wrap(
                    this.createRange()
                        .createContextualFragment(html)
                        .children
                );
            }

        });

        /**
         * DOM Manipulation
         */

        Object.assign(DOM.prototype, {

            /**
             * Clone each node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             * @returns {array} The cloned nodes.
             */
            clone(nodes, options) {
                options = {
                    deep: true,
                    ...options
                };

                // ShadowRoot nodes can not be cloned
                nodes = this.parseNodes(nodes, {
                    node: true,
                    fragment: true
                });

                return nodes.map(node =>
                    this.constructor._clone(node, options)
                );
            },

            /**
             * Detach each node from the DOM.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @return {array} The detached nodes.
             */
            detach(nodes) {

                // DocumentFragment and ShadowRoot nodes can not be detached
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    parent.removeChild(node);
                }

                return nodes;
            },

            /**
             * Remove all children of each node from the DOM.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            empty(nodes) {
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                for (const node of nodes) {
                    this.constructor._empty(node);
                }
            },

            /**
             * Remove each node from the DOM.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            remove(nodes) {

                // DocumentFragment and ShadowRoot nodes can not be removed
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    this.constructor._remove(node);
                    parent.removeChild(node);
                }
            },

            /**
             * Replace each other node with nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
             */
            replaceAll(nodes, others) {
                this.replaceWith(others, nodes);
            },

            /**
             * Replace each node with other nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
             */
            replaceWith(nodes, others) {

                // DocumentFragment and ShadowRoot nodes can not be removed
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                // ShadowRoot nodes can not be cloned
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    html: true
                });

                // Move nodes to a fragment so they don't get removed
                const fragment = this.createFragment();

                for (const other of others) {
                    fragment.insertBefore(other, null);
                }

                others = Core.wrap(fragment.childNodes);

                nodes = nodes.filter(node =>
                    !others.includes(node) &&
                    !nodes.some(other =>
                        !other.isSameNode(node) &&
                        other.contains(node)
                    )
                );

                const lastNode = nodes[nodes.length - 1];

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    for (const other of others) {
                        parent.insertBefore(
                            node.isSameNode(lastNode) ?
                                other :
                                this.constructor._clone(other, {
                                    deep: true,
                                    events: true,
                                    data: true,
                                    animations: true
                                }),
                            node
                        );
                    }
                }

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    this.constructor._remove(node);
                    parent.removeChild(node);
                }
            }

        });

        /**
         * DOM Move
         */

        Object.assign(DOM.prototype, {

            /**
             * Insert each other node after each node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */
            after(nodes, others) {

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                // ShadowRoot nodes can not be moved
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    html: true
                }).reverse();

                const lastNode = nodes[nodes.length - 1];

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    for (const other of others) {
                        parent.insertBefore(
                            node.isSameNode(lastNode) ?
                                other :
                                this.constructor._clone(other, {
                                    deep: true,
                                    events: true,
                                    data: true,
                                    animations: true
                                }),
                            node.nextSibling
                        );
                    }
                }
            },

            /**
             * Append each other node to each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */
            append(nodes, others) {
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                // ShadowRoot nodes can not be moved
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    html: true
                });

                const lastNode = nodes[nodes.length - 1];

                for (const node of nodes) {
                    for (const other of others) {
                        node.insertBefore(
                            node.isSameNode(lastNode) ?
                                other :
                                this.constructor._clone(other, {
                                    deep: true,
                                    events: true,
                                    data: true,
                                    animations: true
                                }),
                            null
                        );
                    }
                }
            },

            /**
             * Append each node to each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */
            appendTo(nodes, others) {
                this.append(others, nodes);
            },

            /**
             * Insert each other node before each node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */
            before(nodes, others) {

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                // ShadowRoot nodes can not be moved
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    html: true
                });

                const lastNode = nodes[nodes.length - 1];

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    for (const other of others) {
                        parent.insertBefore(
                            node.isSameNode(lastNode) ?
                                other :
                                this.constructor._clone(other, {
                                    deep: true,
                                    events: true,
                                    data: true,
                                    animations: true
                                }),
                            node
                        );
                    }
                }
            },

            /**
             * Insert each node after each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */
            insertAfter(nodes, others) {
                this.after(others, nodes);
            },

            /**
             * Insert each node before each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */
            insertBefore(nodes, others) {
                this.before(others, nodes);
            },

            /**
             * Prepend each other node to each node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
             */
            prepend(nodes, others) {
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                // ShadowRoot nodes can not be moved
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    html: true
                });

                const lastNode = nodes[nodes.length - 1];

                for (const node of nodes) {
                    const firstChild = node.firstChild;

                    for (const other of others) {
                        node.insertBefore(
                            node.isSameNode(lastNode) ?
                                other :
                                this.constructor._clone(other, {
                                    deep: true,
                                    events: true,
                                    data: true,
                                    animations: true
                                }),
                            firstChild
                        );
                    }
                }
            },

            /**
             * Prepend each node to each other node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             */
            prependTo(nodes, others) {
                this.prepend(others, nodes);
            }

        });

        /**
         * DOM Wrap
         */

        Object.assign(DOM.prototype, {

            /**
             * Unwrap each node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             */
            unwrap(nodes, filter) {

                // DocumentFragment and ShadowRoot nodes can not be unwrapped
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                filter = this.parseFilter(filter);

                const parents = [];

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    if (parents.includes(parent)) {
                        continue;
                    }

                    if (filter && !filter(parent)) {
                        continue;
                    }

                    parents.push(parent);
                }

                for (const parent of parents) {
                    const outerParent = parent.parentNode;

                    if (!outerParent) {
                        continue;
                    }

                    const children = Core.wrap(parent.childNodes);

                    for (const child of children) {
                        outerParent.insertBefore(child, parent);
                    }

                    this.constructor._remove(parent);
                    outerParent.removeChild(parent);
                }
            },

            /**
             * Wrap each nodes with other nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */
            wrap(nodes, others) {

                // DocumentFragment and ShadowRoot nodes can not be wrapped
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                // ShadowRoot nodes can not be cloned
                others = this.parseNodes(others, {
                    fragment: true,
                    html: true
                });

                for (const node of nodes) {
                    const parent = node.parentNode;

                    if (!parent) {
                        continue;
                    }

                    const clones = others.map(other =>
                        this.constructor._clone(other, {
                            deep: true,
                            events: true,
                            data: true,
                            animations: true
                        })
                    );

                    const firstClone = clones.slice().shift();

                    const deepest = this.constructor._deepest(
                        Core.isFragment(firstClone) ?
                            firstClone.firstChild :
                            firstClone
                    );

                    for (const clone of clones) {
                        parent.insertBefore(clone, node);
                    }

                    deepest.insertBefore(node, null);
                }
            },

            /**
             * Wrap all nodes with other nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */
            wrapAll(nodes, others) {

                // DocumentFragment and ShadowRoot nodes can not be wrapped
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                // ShadowRoot nodes can not be cloned
                others = this.parseNodes(others, {
                    fragment: true,
                    html: true
                });

                const clones = this.clone(others, {
                    events: true,
                    data: true,
                    animations: true
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

                const deepest = this.constructor._deepest(
                    Core.isFragment(firstClone) ?
                        firstClone.firstChild :
                        firstClone
                );

                for (const clone of clones) {
                    parent.insertBefore(clone, firstNode);
                }

                for (const node of nodes) {
                    deepest.insertBefore(node, null);
                }
            },

            /**
             * Wrap the contents of each node with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             */
            wrapInner(nodes, others) {
                nodes = this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                // ShadowRoot nodes can not be cloned
                others = this.parseNodes(others, {
                    fragment: true,
                    html: true
                });

                for (const node of nodes) {
                    const children = Core.wrap(node.childNodes);

                    const clones = others.map(other =>
                        this.constructor._clone(other, {
                            deep: true,
                            events: true,
                            data: true,
                            animatinos: true
                        })
                    );

                    const firstClone = clones.slice().shift();

                    const deepest = this.constructor._deepest(
                        Core.isFragment(firstClone) ?
                            firstClone.firstChild :
                            firstClone
                    );

                    for (const clone of clones) {
                        node.insertBefore(clone, null);
                    }

                    for (const child of children) {
                        deepest.insertBefore(child, null);
                    }
                }
            }

        });

        /**
         * DOM Query
         */

        Object.assign(DOM.prototype, {

            /**
             * Add a function to the ready queue or return a QuerySetImmutable.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @param {Boolean} [mutable=false] Whether to create a mutable QuerySet.
             * @returns {QuerySet} The new QuerySet object.
             */
            query(query, context = null, mutable = false) {
                if (Core.isFunction(query)) {
                    return this.ready(query);
                }

                const nodes = this.parseNodes(query, {
                    node: true,
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true,
                    html: true,
                    context: context ?
                        context :
                        this._context
                });

                return mutable ?
                    new QuerySet(nodes, this) :
                    new QuerySetImmutable(nodes, this);
            },

            /**
             * Add a function to the ready queue or return a QuerySet.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @returns {QuerySet} The new QuerySet object.
             */
            queryMutable(query, context = null) {
                return this.query(query, context, true);
            },

            /**
             * Return a QuerySetImmutable for the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @param {Boolean} [mutable=false] Whether to create a mutable QuerySet.
             * @returns {QuerySet} The new QuerySet object.
             */
            queryOne(query, context = null, mutable = false) {
                const node = this.parseNode(query, {
                    node: true,
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true,
                    html: true,
                    context: context ?
                        context :
                        this._context
                });

                const nodes = [node].filter(v => v);

                return mutable ?
                    new QuerySet(nodes, this) :
                    new QuerySetImmutable(nodes, this);
            },

            /**
             * Return a QuerySet for the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @returns {QuerySet} The new QuerySet object.
             */
            queryOneMutable(query, context = null) {
                return this.queryOne(query, context, true);
            }

        });

        /**
         * DOM AJAX Scripts
         */

        Object.assign(DOM.prototype, {

            /**
             * Load and execute a JavaScript file.
             * @param {string} url The URL of the script.
             * @param {object} [attributes] Additional attributes to set on the script tag.
             * @param {Boolean} [cache=true] Whether to cache the request.
             * @returns {Promise} A new Promise that resolves when the script is loaded, or rejects on failure.
             */
            loadScript(url, attributes, cache = true) {
                attributes = {
                    src: url,
                    type: 'text/javascript',
                    ...attributes
                };

                if (!cache) {
                    attributes.src = AjaxRequest.appendQueryString(attributes.src, '_', Date.now());
                }

                return new Promise((resolve, reject) => {
                    const script = this.create('script', {
                        attributes
                    });

                    script.onload = _ => resolve();
                    script.onerror = _ => reject();

                    this._context.head.appendChild(script);
                });
            },

            /**
             * Load and executes multiple JavaScript files (in order).
             * @param {array} urls An array of script URLs or attribute objects.
             * @param {Boolean} [cache=true] Whether to cache the requests.
             * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
             */
            loadScripts(urls, cache = true) {
                return Promise.all(
                    urls.map(url =>
                        Core.isString(url) ?
                            this.loadScript(url, null, cache) :
                            this.loadScript(null, url, cache)
                    )
                );
            }

        });

        /**
         * DOM AJAX Styles
         */

        Object.assign(DOM.prototype, {

            /**
             * Import a CSS Stylesheet file.
             * @param {string} url The URL of the stylesheet.
             * @param {object} [attributes] Additional attributes to set on the style tag.
             * @param {Boolean} [cache=true] Whether to cache the request.
             * @returns {Promise} A new Promise that resolves when the stylesheet is loaded, or rejects on failure.
             */
            loadStyle(url, attributes, cache = true) {
                attributes = {
                    href: url,
                    rel: 'stylesheet',
                    ...attributes
                };

                if (!cache) {
                    attributes.href = AjaxRequest.appendQueryString(attributes.href, '_', Date.now());
                }

                return new Promise((resolve, reject) => {
                    const link = this.create('link', {
                        attributes
                    });

                    link.onload = _ => resolve();
                    link.onerror = _ => reject();

                    this._context.head.appendChild(link);
                });
            },

            /**
             * Import multiple CSS Stylesheet files.
             * @param {array} urls An array of stylesheet URLs or attribute objects.
             * @param {Boolean} [cache=true] Whether to cache the requests.
             * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
             */
            loadStyles(urls, cache = true) {
                return Promise.all(
                    urls.map(url =>
                        Core.isString(url) ?
                            this.loadStyle(url, null, cache) :
                            this.loadStyle(null, url, cache)
                    )
                );
            }

        });

        /**
         * DOM Filter
         */

        Object.assign(DOM.prototype, {

            /**
             * Return all nodes connected to the DOM.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            connected(nodes) {
                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).filter(node => node.isConnected);
            },

            /**
             * Return all nodes considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            equal(nodes, others) {
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).filter(node =>
                    others.some(other =>
                        node.isEqualNode(other)
                    )
                );
            },

            /**
             * Return all nodes matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The filtered nodes.
             */
            filter(nodes, filter) {
                filter = this.parseFilter(filter);

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).filter((node, index) =>
                    !filter || filter(node, index)
                );
            },

            /**
             * Return the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
             */
            filterOne(nodes, filter) {
                filter = this.parseFilter(filter);

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).find((node, index) =>
                    !filter || filter(node, index)
                ) || null;
            },

            /**
             * Return all "fixed" nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            fixed(nodes) {
                return this.parseNodes(nodes, {
                    node: true
                }).filter(node =>
                    (
                        Core.isElement(node) &&
                        this.constructor._css(node, 'position') === 'fixed'
                    ) ||
                    this.constructor._parents(
                        node,
                        parent =>
                            Core.isElement(parent) &&
                            this.constructor._css(parent, 'position') === 'fixed',
                        false,
                        true
                    ).length
                );
            },

            /**
             * Return all hidden nodes.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            hidden(nodes) {
                return this.parseNodes(nodes, {
                    node: true,
                    document: true,
                    window: true
                }).filter(node =>
                    !this.constructor._isVisible(node)
                );
            },

            /**
             * Return all nodes not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The filtered nodes.
             */
            not(nodes, filter) {
                filter = this.parseFilter(filter);

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).filter((node, index) =>
                    filter && !filter(node, index)
                );
            },

            /**
             * Return the first node not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
             */
            notOne(nodes, filter) {
                filter = this.parseFilter(filter);

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).find((node, index) =>
                    filter && !filter(node, index)
                ) || null;
            },

            /**
             * Return all nodes considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            same(nodes, others) {
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).filter(node =>
                    others.some(other =>
                        node.isSameNode(other)
                    )
                );
            },

            /**
             * Return all visible nodes.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            visible(nodes) {
                return this.parseNodes(nodes, {
                    node: true,
                    document: true,
                    window: true
                }).filter(node =>
                    this.constructor._isVisible(node)
                );
            },

            /**
             * Return all nodes with an animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            withAnimation(nodes) {
                return this.parseNodes(nodes)
                    .filter(node =>
                        Animation._animations.has(node)
                    );
            },

            /**
             * Return all nodes with a specified attribute.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} attribute The attribute name.
             * @returns {array} The filtered nodes.
             */
            withAttribute(nodes, attribute) {
                return this.parseNodes(nodes)
                    .filter(node =>
                        node.hasAttribute(attribute)
                    );
            },

            /**
             * Return all nodes with child elements.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            withChildren(nodes) {
                return this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                }).filter(node =>
                    !!node.childElementCount
                );
            },

            /**
             * Return all nodes with any of the specified classes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             * @returns {array} The filtered nodes.
             */
            withClass(nodes, ...classes) {
                classes = this.constructor._parseClasses(classes);

                return this.parseNodes(nodes)
                    .filter(node =>
                        classes.some(className =>
                            node.classList.contains(className)
                        )
                    );
            },

            /**
             * Return all nodes with a CSS animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            withCSSAnimation(nodes) {
                return this.parseNodes(nodes)
                    .filter(node =>
                        this.constructor._hasCSSAnimation(node)
                    );
            },

            /**
             * Return all nodes with a CSS transition.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The filtered nodes.
             */
            withCSSTransition(nodes) {
                return this.parseNodes(nodes)
                    .filter(node =>
                        this.constructor._hasCSSTransition(node)
                    );
            },

            /**
             * Return all nodes with custom data.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             * @returns {array} The filtered nodes.
             */
            withData(nodes, key) {
                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                }).filter(node =>
                    this.constructor._hasData(node, key)
                );
            },

            /**
             * Return all nodes with a descendent matching a filter.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The filtered nodes.
             */
            withDescendent(nodes, filter) {
                filter = this.parseFilterContains(filter);

                return this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                }).filter((node, index) =>
                    !filter || filter(node, index)
                );
            },

            /**
             * Return all nodes with a specified property.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             * @returns {array} The filtered nodes.
             */
            withProperty(nodes, property) {
                return this.parseNodes(nodes)
                    .filter(node =>
                        node.hasOwnProperty(property)
                    );
            }

        });

        /**
         * DOM Find
         */

        Object.assign(DOM.prototype, {

            /**
             * Return all nodes matching a selector.
             * @param {string} selector The query selector.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */
            find(selector, nodes = this._context) {
                // fast selector
                const match = selector.match(this.constructor._fastRegExp);
                if (match) {
                    if (match[1] === '#') {
                        return this.findById(match[2], nodes);
                    }

                    if (match[1] === '.') {
                        return this.findByClass(match[2], nodes);
                    }

                    return this.findByTag(match[2], nodes);
                }

                // standard selector
                if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return Core.wrap(
                        nodes.querySelectorAll(selector)
                    );
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                return this.constructor._findBySelector(selector, nodes);
            },

            /**
             * Return all nodes with a specific class.
             * @param {string} className The class name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */
            findByClass(className, nodes = this._context) {
                if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                    return Core.wrap(
                        nodes.getElementsByClassName(className)
                    );
                }

                if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return Core.wrap(
                        nodes.querySelectorAll(`.${className}`)
                    );
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        Core.isFragment(node) || Core.isShadow(node) ?
                            node.querySelectorAll(`.${className}`) :
                            node.getElementsByClassName(className)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return all nodes with a specific ID.
             * @param {string} id The id.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */
            findById(id, nodes = this._context) {
                if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return Core.wrap(
                        nodes.querySelectorAll(`#${id}`)
                    );
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                return this.constructor._findBySelector(`#${id}`, nodes);
            },

            /**
             * Return all nodes with a specific tag.
             * @param {string} tagName The tag name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */
            findByTag(tagName, nodes = this._context) {
                if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                    return Core.wrap(
                        nodes.getElementsByTagName(tagName)
                    );
                }

                if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return Core.wrap(
                        nodes.querySelectorAll(tagName)
                    );
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        Core.isFragment(node) || Core.isShadow(node) ?
                            node.querySelectorAll(tagName) :
                            node.getElementsByTagName(tagName)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return a single node matching a selector.
             * @param {string} selector The query selector.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching node.
             */
            findOne(selector, nodes = this._context) {
                // fast selector
                const match = selector.match(this.constructor._fastRegExp);
                if (match) {
                    if (match[1] === '#') {
                        return this.findOneById(match[2], nodes);
                    }

                    if (match[1] === '.') {
                        return this.findOneByClass(match[2], nodes);
                    }

                    return this.findOneByTag(match[2], nodes);
                }

                // standard selector
                if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return nodes.querySelector(selector);
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                if (!nodes.length) {
                    return;
                }

                return this.constructor._findOneBySelector(selector, nodes);
            },

            /**
             * Return a single node with a specific class.
             * @param {string} className The class name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching node.
             */
            findOneByClass(className, nodes = this._context) {
                if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                    return nodes.getElementsByClassName(className).item(0);
                }

                if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return nodes.querySelector(`.${className}`);
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                if (!nodes.length) {
                    return;
                }

                for (const node of nodes) {
                    const result = Core.isFragment(node) || Core.isShadow(node) ?
                        node.querySelector(`.${className}`) :
                        node.getElementsByClassName(className).item(0);
                    if (result) {
                        return result;
                    }
                }

                return null;
            },

            /**
             * Return a single node with a specific ID.
             * @param {string} id The id.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching element.
             */
            findOneById(id, nodes = this._context) {
                if (Core.isDocument(nodes)) {
                    return nodes.getElementById(id);
                }

                if (Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return nodes.querySelector(`#${id}`);
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                if (!nodes.length) {
                    return;
                }

                return this.constructor._findOneBySelector(`#${id}`, nodes);
            },

            /**
             * Return a single node with a specific tag.
             * @param {string} tagName The tag name.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
             * @returns {HTMLElement} The matching node.
             */
            findOneByTag(tagName, nodes = this._context) {
                if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                    return nodes.getElementsByTagName(tagName).item(0);
                }

                if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return nodes.querySelector(tagName);
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                if (!nodes.length) {
                    return;
                }

                for (const node of nodes) {
                    const result = Core.isFragment(node) || Core.isShadow(node) ?
                        node.querySelector(tagName) :
                        node.getElementsByTagName(tagName).item(0);
                    if (result) {
                        return result;
                    }
                }

                return null;
            }

        });

        /**
         * DOM Traversal
         */

        Object.assign(DOM.prototype, {

            /**
             * Return the first child of each node (optionally matching a filter).
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */
            child(nodes, filter) {
                return this.children(nodes, filter, true);
            },

            /**
             * Return all children of each node (optionally matching a filter).
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */
            children(nodes, filter, first = false, elementsOnly = true) {
                filter = this.parseFilter(filter);

                if (Core.isElement(nodes) || Core.isDocument(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                    return this.constructor._children(nodes, filter, first, elementsOnly);
                }

                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._children(node, filter, first, elementsOnly)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */
            closest(nodes, filter, limit) {
                return this.parents(nodes, filter, limit, true);
            },

            /**
             * Return the common ancestor of all nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {HTMLElement} The common ancestor.
             */
            commonAncestor(nodes) {
                nodes = this.sort(nodes);

                if (!nodes.length) {
                    return;
                }

                // Make sure all nodes have a parent
                if (nodes.some(node => !node.parentNode)) {
                    return;
                }

                const range = this.createRange();

                if (nodes.length === 1) {
                    range.selectNode(nodes.shift());
                } else {
                    range.setStartBefore(nodes.shift());
                    range.setEndAfter(nodes.pop());
                }

                return range.commonAncestorContainer;
            },

            /**
             * Return all children of each node (including text and comment nodes).
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The matching nodes.
             */
            contents(nodes) {
                return this.children(nodes, false, false, false);
            },

            /**
             * Return the DocumentFragment of the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {DocumentFragment} The DocumentFragment.
             */
            fragment(nodes) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return node.content;
            },

            /**
             * Return the next sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */
            next(nodes, filter) {
                filter = this.parseFilter(filter);

                if (Core.isNode(nodes)) {
                    return this.constructor._next(nodes, filter);
                }

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._nextAll(node, filter, null, true)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return all next siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */
            nextAll(nodes, filter, limit, first = false) {
                filter = this.parseFilter(filter);
                limit = this.parseFilter(limit);

                if (Core.isNode(nodes)) {
                    return this.constructor._nextAll(nodes, filter, limit, first);
                }

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._nextAll(node, filter, limit, first)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return the offset parent (relatively positioned) of the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {HTMLElement} The offset parent.
             */
            offsetParent(nodes) {
                return this.forceShow(
                    nodes,
                    node => node.offsetParent
                );
            },

            /**
             * Return the parent of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */
            parent(nodes, filter) {
                filter = this.parseFilter(filter);

                if (Core.isNode(nodes)) {
                    return this.constructor._parent(nodes, filter);
                }

                // DocumentFragment and ShadowRoot nodes have no parent
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._parent(node, filter)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return all parents of each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */
            parents(nodes, filter, limit, first = false) {
                filter = this.parseFilter(filter);
                limit = this.parseFilter(limit);

                if (Core.isNode(nodes)) {
                    return this.constructor._parents(nodes, filter, limit, first);
                }

                // DocumentFragment and ShadowRoot nodes have no parent
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._parents(node, filter, limit, first)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return the previous sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {array} The matching nodes.
             */
            prev(nodes, filter) {
                filter = this.parseFilter(filter);

                if (Core.isNode(nodes)) {
                    return this.constructor._prev(nodes, filter);
                }

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._prev(node, filter)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return all previous siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */
            prevAll(nodes, filter, limit, first = false) {
                filter = this.parseFilter(filter);
                limit = this.parseFilter(limit);

                if (Core.isNode(nodes)) {
                    return this.constructor._prevAll(nodes, filter, limit, first);
                }

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._prevAll(node, filter, limit, first)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return the ShadowRoot of the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {ShadowRoot} The ShadowRoot.
             */
            shadow(nodes) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return node.shadowRoot;
            },

            /**
             * Return all siblings for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */
            siblings(nodes, filter, elementsOnly = true) {
                filter = this.parseFilter(filter);

                if (Core.isNode(nodes)) {
                    return this.constructor._siblings(nodes, filter, elementsOnly);
                }

                // DocumentFragment and ShadowRoot nodes can not have siblings
                nodes = this.parseNodes(nodes, {
                    node: true
                });

                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        this.constructor._siblings(node, filter, elementsOnly)
                    )
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            }

        });

        /**
         * DOM Filters
         */

        Object.assign(DOM.prototype, {

            /**
             * Return a node filter callback.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
             * @returns {DOM~filterCallback} The node filter callback.
             */
            parseFilter(filter) {
                if (!filter) {
                    return false;
                }

                if (Core.isFunction(filter)) {
                    return filter;
                }

                if (Core.isString(filter)) {
                    return node => Core.isElement(node) && node.matches(filter);
                }

                if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
                    return node => node.isSameNode(filter);
                }

                filter = this.parseNodes(filter, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                if (filter.length) {
                    return node => filter.includes(node);
                }

                return false;
            },

            /**
             * Return a node contains filter callback.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
             * @returns {DOM~filterCallback} The node contains filter callback.
             */
            parseFilterContains(filter) {
                if (!filter) {
                    return false;
                }

                if (Core.isFunction(filter)) {
                    return node =>
                        Core.wrap(
                            node.querySelectorAll('*')
                        ).some(filter);
                }

                if (Core.isString(filter)) {
                    return node => !!this.findOne(filter, node);
                }

                if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
                    return node => node.contains(filter);
                }

                filter = this.parseNodes(filter, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                if (filter.length) {
                    return node => filter.some(other => node.contains(other));
                }

                return false;
            },

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
             * @param {HTMLElement|Document} [options.context=this._context] The Document context.
             * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
             */
            parseNode(nodes, options = {}) {
                const filter = this.constructor.parseNodesFactory(options);

                return this._parseNodesDeep(
                    nodes,
                    options.context || this._context,
                    filter,
                    options.html,
                    true
                );
            },

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
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=this._context] The Document context.
             * @returns {array} The filtered array of nodes.
             */
            parseNodes(nodes, options = {}) {
                const filter = this.constructor.parseNodesFactory(options);

                return this._parseNodesDeep(
                    nodes,
                    options.context || this._context,
                    filter,
                    options.html
                );
            },

            /**
             * Recursively parse nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
             * @param {DOM~nodeCallback} [filter] The callback to use for filtering nodes.
             * @param {Boolean} [first=false] Whether to only return the first result.
             * @returns {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
             */
            _parseNodesDeep(nodes, context, filter, html = false, first = false) {

                // check nodes
                if (!nodes) {
                    return first ?
                        null :
                        [];
                }

                // String
                if (Core.isString(nodes)) {
                    // HTML string
                    if (html && nodes.trim().charAt(0) === '<') {
                        return this.parseHTML(nodes);
                    }

                    // query selector
                    if (!first) {
                        return this.find(nodes, context);
                    }

                    const node = this.findOne(nodes, context);
                    return node ?
                        node :
                        null;
                }

                // Node/HTMLElement/Window/Document
                if (filter(nodes)) {
                    return first ?
                        nodes :
                        [nodes];
                }

                // QuerySet
                if (nodes instanceof QuerySet) {
                    if (!first) {
                        return nodes.get().filter(filter);
                    }

                    const node = nodes.get(0);
                    return node && filter(node) ?
                        node :
                        null;
                }

                // HTMLCollection
                if (nodes instanceof HTMLCollection) {
                    if (!first) {
                        return Core.wrap(nodes);
                    }

                    return nodes.length ?
                        nodes.item(0) :
                        null;
                }

                // Array
                if (Core.isArray(nodes)) {
                    const subFilter = this.constructor.parseNodesFactory({
                        node: true,
                        fragment: true,
                        shadow: true,
                        document: true,
                        window: true
                    });
                    nodes = nodes.flatMap(node =>
                        this._parseNodesDeep(node, context, subFilter, html)
                    );
                } else {
                    nodes = Core.wrap(nodes);
                }

                if (nodes.length) {
                    nodes = Core.unique(nodes);
                }

                if (!first) {
                    return nodes.filter(filter);
                }

                const node = nodes.shift();
                return node && filter(node) ?
                    node :
                    null;
            }

        });

        /**
         * DOM Selection
         */

        Object.assign(DOM.prototype, {

            /**
             * Insert each node after the selection.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             */
            afterSelection(nodes) {

                // ShadowRoot nodes can not be moved
                nodes = this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    html: true
                }).reverse();

                const selection = window.getSelection();

                if (!selection.rangeCount) {
                    return;
                }

                const range = selection.getRangeAt(0);

                selection.removeAllRanges();
                range.collapse();

                for (const node of nodes) {
                    range.insertNode(node);
                }
            },

            /**
             * Insert each node before the selection.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             */
            beforeSelection(nodes) {

                // ShadowRoot nodes can not be moved
                nodes = this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    html: true
                }).reverse();

                const selection = window.getSelection();

                if (!selection.rangeCount) {
                    return;
                }

                const range = selection.getRangeAt(0);

                selection.removeAllRanges();

                for (const node of nodes) {
                    range.insertNode(node);
                }
            },

            /**
             * Extract selected nodes from the DOM.
             * @returns {array} The selected nodes.
             */
            extractSelection() {
                const selection = window.getSelection();

                if (!selection.rangeCount) {
                    return [];
                }

                const range = selection.getRangeAt(0);

                selection.removeAllRanges();

                const fragment = range.extractContents();

                return Core.wrap(fragment.childNodes);
            },

            /**
             * Return all selected nodes.
             * @returns {array} The selected nodes.
             */
            getSelection() {
                const selection = window.getSelection();

                if (!selection.rangeCount) {
                    return [];
                }

                const range = selection.getRangeAt(0),
                    nodes = Core.wrap(
                        range.commonAncestorContainer.querySelectorAll('*')
                    );

                if (!nodes.length) {
                    return [range.commonAncestorContainer];
                }

                if (nodes.length === 1) {
                    return nodes;
                }

                const startContainer = range.startContainer,
                    endContainer = range.endContainer,
                    start = (Core.isElement(startContainer) ?
                        startContainer :
                        startContainer.parentNode),
                    end = (Core.isElement(endContainer) ?
                        endContainer :
                        endContainer.parentNode);

                const selectedNodes = nodes.slice(
                    nodes.indexOf(start),
                    nodes.indexOf(end) + 1
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

                return results;
            },

            /**
             * Create a selection on the first node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            select(nodes) {
                const node = this.parseNode(nodes, {
                    node: true
                });

                if (node && 'select' in node) {
                    return node.select();
                }

                const selection = window.getSelection();

                if (selection.rangeCount > 0) {
                    selection.removeAllRanges();
                }

                if (!node) {
                    return;
                }

                const range = this.createRange();
                range.selectNode(node);
                selection.addRange(range);
            },

            /**
             * Create a selection containing all of the nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            selectAll(nodes) {
                nodes = this.sort(nodes);

                const selection = window.getSelection();

                if (selection.rangeCount) {
                    selection.removeAllRanges();
                }

                if (!nodes.length) {
                    return;
                }

                const range = this.createRange();

                if (nodes.length == 1) {
                    range.selectNode(nodes.shift());
                } else {
                    range.setStartBefore(nodes.shift());
                    range.setEndAfter(nodes.pop());
                }

                selection.addRange(range);
            },

            /**
             * Wrap selected nodes with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
             */
            wrapSelection(nodes) {

                // ShadowRoot nodes can not be cloned
                nodes = this.parseNodes(nodes, {
                    fragment: true,
                    html: true
                });

                const selection = window.getSelection();

                if (!selection.rangeCount) {
                    return;
                }

                const range = selection.getRangeAt(0);

                selection.removeAllRanges();

                const fragment = range.extractContents(),
                    deepest = this.constructor._deepest(nodes.slice().shift()),
                    children = Core.wrap(fragment.childNodes);

                for (const child of children) {
                    deepest.insertBefore(child, null);
                }

                for (const node of nodes) {
                    range.insertNode(node);
                }
            }

        });

        /**
         * DOM Tests
         */

        Object.assign(DOM.prototype, {

            /**
             * Returns true if any of the nodes has an animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
             */
            hasAnimation(nodes) {
                return this.parseNodes(nodes)
                    .some(node =>
                        Animation._animations.has(node)
                    );
            },

            /**
             * Returns true if any of the nodes has a specified attribute.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} attribute The attribute name.
             * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
             */
            hasAttribute(nodes, attribute) {
                return this.parseNodes(nodes)
                    .some(node =>
                        node.hasAttribute(attribute)
                    );
            },

            /**
             * Returns true if any of the nodes has child nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
             */
            hasChildren(nodes) {
                return this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                }).some(node =>
                    !!node.childElementCount
                );
            },

            /**
             * Returns true if any of the nodes has any of the specified classes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {...string|string[]} classes The classes.
             * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
             */
            hasClass(nodes, ...classes) {
                classes = this.constructor._parseClasses(classes);

                return this.parseNodes(nodes)
                    .some(node =>
                        classes.some(className =>
                            node.classList.contains(className)
                        )
                    );
            },

            /**
             * Returns true if any of the nodes has a CSS animation.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
             */
            hasCSSAnimation(nodes) {
                return this.parseNodes(nodes)
                    .some(node =>
                        this.constructor._hasCSSAnimation(node)
                    );
            },

            /**
             * Returns true if any of the nodes has a CSS transition.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
             */
            hasCSSTransition(nodes) {
                return this.parseNodes(nodes)
                    .some(node =>
                        this.constructor._hasCSSTransition(node)
                    );
            },

            /**
             * Returns true if any of the nodes has custom data.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The data key.
             * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
             */
            hasData(nodes, key) {
                return this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                }).some(node =>
                    this.constructor._hasData(node, key)
                );
            },

            /**
             * Returns true if any of the nodes has the specified dataset value.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} [key] The dataset key.
             * @returns {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
             */
            hasDataset(nodes, key) {
                key = Core.camelCase(key);

                return this.parseNodes(nodes).some(node =>
                    !!node.dataset[key]
                );
            },

            /**
             * Returns true if any of the nodes contains a descendent matching a filter.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
             */
            hasDescendent(nodes, filter) {
                filter = this.parseFilterContains(filter);

                return this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true,
                    document: true
                }).some(node =>
                    !filter || filter(node)
                );
            },

            /**
             * Returns true if any of the nodes has a DocumentFragment.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
             */
            hasFragment(nodes) {
                return this.parseNodes(nodes)
                    .some(node =>
                        !!node.content
                    );
            },

            /**
             * Returns true if any of the nodes has a specified property.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string} property The property name.
             * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
             */
            hasProperty(nodes, property) {
                return this.parseNodes(nodes)
                    .some(node =>
                        node.hasOwnProperty(property)
                    );
            },

            /**
             * Returns true if any of the nodes has a ShadowRoot.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
             */
            hasShadow(nodes) {
                return this.parseNodes(nodes)
                    .some(node =>
                        !!node.shadowRoot
                    );
            },

            /**
             * Returns true if any of the nodes matches a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
             */
            is(nodes, filter) {
                filter = this.parseFilter(filter);

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).some(node =>
                    !filter || filter(node)
                );
            },

            /**
             * Returns true if any of the nodes is connected to the DOM.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
             */
            isConnected(nodes) {
                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).some(node => node.isConnected);
            },

            /**
             * Returns true if any of the nodes is considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
             */
            isEqual(nodes, others) {
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).some(node =>
                    others.some(other =>
                        node.isEqualNode(other)
                    )
                );
            },

            /**
             * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
             */
            isFixed(nodes) {
                return this.parseNodes(nodes, {
                    node: true
                }).some(node =>
                    (
                        Core.isElement(node) &&
                        this.constructor._css(node, 'position') === 'fixed'
                    ) ||
                    this.constructor._parents(
                        node,
                        parent =>
                            Core.isElement(parent) &&
                            this.constructor._css(parent, 'position') === 'fixed',
                        false,
                        true
                    ).length
                );
            },

            /**
             * Returns true if any of the nodes is hidden.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
             */
            isHidden(nodes) {
                return this.parseNodes(nodes, {
                    node: true,
                    document: true,
                    window: true
                }).some(node =>
                    !this.constructor._isVisible(node)
                );
            },

            /**
             * Returns true if any of the nodes is considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
             */
            isSame(nodes, others) {
                others = this.parseNodes(others, {
                    node: true,
                    fragment: true,
                    shadow: true
                });

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).some(node =>
                    others.some(other =>
                        node.isSameNode(other)
                    )
                );
            },

            /**
             * Returns true if any of the nodes is visible.
             * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
             */
            isVisible(nodes) {
                return this.parseNodes(nodes, {
                    node: true,
                    document: true,
                    window: true
                }).some(node =>
                    this.constructor._isVisible(node)
                );
            }

        });

        /**
         * DOM Utility
         */

        Object.assign(DOM.prototype, {

            /**
             * Execute a command in the document context.
             * @param {string} command The command to execute.
             * @param {string} [value] The value to give the command.
             * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
             */
            exec(command, value = null) {
                return this._context.execCommand(command, false, value);
            },

            /**
             * Force a node to be shown, and then execute a callback.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {DOM~nodeCallback} callback The callback to execute.
             * @returns {*} The result of the callback.
             */
            forceShow(nodes, callback) {

                // DocumentFragment and ShadowRoot nodes have no parent
                const node = this.parseNode(nodes, {
                    node: true
                });

                if (!node) {
                    return;
                }

                return this.constructor._forceShow(node, callback);
            },

            /**
             * Get the index of the first node relative to it's parent.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {number} The index.
             */
            index(nodes) {
                const node = this.parseNode(nodes, {
                    node: true
                });

                if (!node) {
                    return;
                }

                return Core.wrap(
                    node.parentNode.children
                ).indexOf(node);
            },

            /**
             * Get the index of the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {number} The index.
             */
            indexOf(nodes, filter) {
                filter = this.parseFilter(filter);

                return this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true
                }).findIndex(node =>
                    !filter || filter(node)
                );
            },

            /**
             * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             */
            normalize(nodes) {
                nodes = this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true,
                    document: true
                });

                for (const node of nodes) {
                    node.normalize();
                }
            },

            /**
             * Sanitize a HTML string.
             * @param {string} html The input HTML string.
             * @param {object} [allowedTags] An object containing allowed tags and attributes.
             * @returns {string} The sanitized HTML string.
             */
            sanitize(html, allowedTags = DOM.allowedTags) {
                const template = this.create('template', { html }),
                    fragment = template.content,
                    children = this.constructor._children(fragment, null, false, true);

                for (const child of children) {
                    this.constructor._sanitize(child, fragment, allowedTags);
                }

                return this.getHTML(template);
            },

            /**
             * Return a serialized string containing names and values of all form nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The serialized string.
             */
            serialize(nodes) {
                return AjaxRequest._parseParams(
                    this.serializeArray(nodes)
                );
            },

            /**
             * Return a serialized array containing names and values of all form nodes.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The serialized array.
             */
            serializeArray(nodes) {
                return this.parseNodes(nodes, {
                    fragment: true,
                    shadow: true
                }).reduce(
                    (values, node) => {
                        if (
                            (
                                Core.isElement(node) &&
                                node.matches('form')
                            ) ||
                            Core.isFragment(node) ||
                            Core.isShadow(node)
                        ) {
                            return values.concat(
                                this.serializeArray(
                                    node.querySelectorAll(
                                        'input, select, textarea'
                                    )
                                )
                            );
                        }

                        if (
                            Core.isElement(node) &&
                            node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')
                        ) {
                            return values;
                        }

                        const name = node.getAttribute('name');
                        if (!name) {
                            return values;
                        }

                        if (
                            Core.isElement(node) &&
                            node.matches('select[multiple]')
                        ) {
                            for (const option of node.selectedOptions) {
                                values.push(
                                    {
                                        name,
                                        value: option.value || ''
                                    }
                                );
                            }
                        } else {
                            values.push(
                                {
                                    name,
                                    value: node.value || ''
                                }
                            );
                        }

                        return values;
                    },
                    []
                );
            },

            /**
             * Sort nodes by their position in the document.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {array} The sorted array of nodes.
             */
            sort(nodes) {
                nodes = this.parseNodes(nodes, {
                    node: true,
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });

                return nodes.sort((node, other) => {
                    if (Core.isWindow(node)) {
                        return 1;
                    }

                    if (Core.isWindow(other)) {
                        return -1;
                    }

                    if (Core.isDocument(node)) {
                        return 1;
                    }

                    if (Core.isDocument(other)) {
                        return -1;
                    }

                    if (Core.isFragment(other)) {
                        return 1;
                    }

                    if (Core.isFragment(node)) {
                        return -1;
                    }

                    if (Core.isShadow(node)) {
                        node = node.host;
                    }

                    if (Core.isShadow(other)) {
                        other = other.host;
                    }

                    if (node.isSameNode(other)) {
                        return 0;
                    }

                    const pos = node.compareDocumentPosition(other);

                    if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                        pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                        return -1;
                    }

                    if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                        pos & Node.DOCUMENT_POSITION_CONTAINS) {
                        return 1;
                    }

                    return 0;
                });
            },

            /**
             * Return the tag name (lowercase) of the first node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
             * @returns {string} The nodes tag name (lowercase).
             */
            tagName(nodes) {
                const node = this.parseNode(nodes);

                if (!node) {
                    return;
                }

                return node.tagName.toLowerCase();
            }

        });

        /**
         * DOM (Static) AJAX
         */

        Object.assign(DOM, {

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            ajax(options) {
                return new AjaxRequest(options);
            },

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            delete(url, options) {
                return new AjaxRequest({
                    url,
                    method: 'DELETE',
                    ...options
                });
            },

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            get(url, data, options) {
                return new AjaxRequest({
                    url,
                    data,
                    ...options
                });
            },

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            patch(url, data, options) {
                return new AjaxRequest({
                    url,
                    data,
                    method: 'PATCH',
                    ...options
                });
            },

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            post(url, data, options) {
                return new AjaxRequest({
                    url,
                    data,
                    method: 'POST',
                    ...options
                });
            },

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
             * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
             */
            put(url, data, options) {
                return new AjaxRequest({
                    url,
                    data,
                    method: 'PUT',
                    ...options
                });
            }

        });

        /**
         * DOM (Static) Queue
         */

        Object.assign(DOM, {

            /**
             * Clear the queue of a single node.
             * @param {HTMLElement} node The input node.
             * @param {string} queueName The name of the queue to clear.
             */
            _clearQueue(node, queueName) {
                const queue = this._queues.get(node);

                if (!queue || (queueName && !(queueName in queue))) {
                    return;
                }

                for (const key in queue) {
                    if (!queueName || key === queueName) {
                        delete queue[key];
                    }
                }

                if (Object.keys(queue).length) {
                    return;
                }

                this._queues.delete(node);
            },

            /**
             * Run the next callback for a single node.
             * @param {HTMLElement} node The input node.
             * @param {string} queueName The name of the queue to use.
             */
            _dequeue(node, queueName) {
                const queue = this._queues.get(node);

                if (!queue || !(queueName in queue)) {
                    return;
                }

                const next = queue[queueName].shift();

                if (!next) {
                    return this._clearQueue(node, queueName);
                }

                Promise.resolve(next(node))
                    .then(_ =>
                        this._dequeue(node, queueName)
                    ).catch(_ =>
                        this._clearQueue(node, queueName)
                    );
            },

            /**
             * Queue a callback on a single node.
             * @param {HTMLElement} node The input node.
             * @param {DOM~queueCallback} callback The callback to queue.
             * @param {string} queueName The name of the queue to use.
             */
            _queue(node, callback, queueName) {
                if (!this._queues.has(node)) {
                    this._queues.set(node, {});
                }

                const queue = this._queues.get(node);
                const runningQueue = queueName in queue;

                if (!runningQueue) {
                    queue[queueName] = [
                        _ => new Promise(
                            resolve => setTimeout(resolve, 0)
                        )
                    ];
                }

                queue[queueName].push(callback);

                if (!runningQueue) {
                    this._dequeue(node, queueName);
                }
            }

        });

        /**
         * DOM (Static) Attributes
         */

        Object.assign(DOM, {

            /**
             * Get attribute value(s) for a single node.
             * @param {HTMLElement} node The input node.
             * @returns {object} An object containing attributes.
             */
            _getAttributes(node) {
                const attributes = {};

                for (const attr of node.attributes) {
                    attributes[attr.nodeName] = attr.nodeValue;
                }

                return attributes;
            },

            /**
             * Set an attribute value for a single node.
             * @param {HTMLElement} node The input node.
             * @param {object} attributes An object containing attributes.
             */
            _setAttributes(node, attributes) {
                for (const key in attributes) {
                    node.setAttribute(key, attributes[key]);
                }
            },

            /**
             * Set dataset values for a single node.
             * @param {HTMLElement} node The input node.
             * @param {object} dataset An object containing dataset values.
             */
            _setDataset(node, dataset) {
                for (const key in dataset) {
                    const realKey = Core.camelCase(key);
                    node.dataset[realKey] = dataset[key];
                }
            }

        });

        /**
         * DOM (Static) Data
         */

        Object.assign(DOM, {

            /**
             * Clone custom data from a single node to each other node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} other The other node.
             */
            _cloneData(node, other) {
                if (!this._data.has(node)) {
                    return;
                }

                this._setData(other, {
                    ...this._data.get(node)
                });
            },

            /**
             * Get custom data for a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} [key] The data key.
             * @returns {*} The data value.
             */
            _getData(node, key) {
                if (!this._data.has(node)) {
                    return;
                }

                if (!key) {
                    return this._data.get(node);
                }

                return this._data.get(node)[key];
            },

            /**
             * Remove custom data from a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} [key] The data key.
             */
            _removeData(node, key) {
                if (!this._data.has(node)) {
                    return;
                }

                if (key) {
                    const data = this._data.get(node);

                    delete data[key];

                    if (Object.keys(data).length) {
                        return;
                    }
                }

                this._data.delete(node);
            },

            /**
             * Set custom data for a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {object} data An object containing data.
             */
            _setData(node, data) {
                if (!this._data.has(node)) {
                    this._data.set(node, {});
                }

                Object.assign(
                    this._data.get(node),
                    data
                );
            }

        });

        /**
         * DOM (Static) Position
         */

        Object.assign(DOM, {

            /**
             * Get the computed bounding rectangle of a single node.
             * @param {HTMLElement} node The input node.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {DOMRect} The computed bounding rectangle.
             */
            _rect(node, offset) {
                return this._forceShow(node, node => {
                    const result = node.getBoundingClientRect();

                    if (offset) {
                        result.x += window.scrollX;
                        result.y += window.scrollY;
                    }

                    return result;
                });
            }

        });

        /**
         * DOM (Static) Size
         */

        Object.assign(DOM, {

            /**
             * Get the computed height of a single node.
             * @param {HTMLElement} node The input node.
             * @param {number} [boxSize=1] The box sizing to calculate.
             * @returns {number} The height.
             */
            _height(node, boxSize = 1) {
                return this._forceShow(node, node => {
                    if (Core.isDocument(node)) {
                        node = node.documentElement;
                    }

                    if (boxSize === this.SCROLL_BOX) {
                        return node.scrollHeight;
                    }

                    let result = node.clientHeight;

                    if (boxSize === this.CONTENT_BOX) {
                        result -= parseInt(this._css(node, 'padding-top'))
                            + parseInt(this._css(node, 'padding-bottom'));
                    }

                    if (boxSize >= this.BORDER_BOX) {
                        result += parseInt(this._css(node, 'border-top-width'))
                            + parseInt(this._css(node, 'border-bottom-width'));
                    }

                    if (boxSize === this.MARGIN_BOX) {
                        result += parseInt(this._css(node, 'margin-top'))
                            + parseInt(this._css(node, 'margin-bottom'));
                    }

                    return result;
                });
            },

            /**
             * Get the computed width of a single node.
             * @param {HTMLElement} node The input node.
             * @param {number} [boxSize=1] The box sizing to calculate.
             * @returns {number} The width.
             */
            _width(node, boxSize = 1) {
                return this._forceShow(node, node => {
                    if (Core.isDocument(node)) {
                        node = node.documentElement;
                    }

                    if (boxSize === this.SCROLL_BOX) {
                        return node.scrollWidth;
                    }

                    let result = node.clientWidth;

                    if (boxSize === this.CONTENT_BOX) {
                        result -= parseInt(this._css(node, 'padding-left'))
                            + parseInt(this._css(node, 'padding-right'));
                    }

                    if (boxSize >= this.BORDER_BOX) {
                        result += parseInt(this._css(node, 'border-left-width'))
                            + parseInt(this._css(node, 'border-right-width'));
                    }

                    if (boxSize === this.MARGIN_BOX) {
                        result += parseInt(this._css(node, 'margin-left'))
                            + parseInt(this._css(node, 'margin-right'));
                    }

                    return result;
                });
            }

        });

        /**
         * DOM (Static) Styles
         */

        Object.assign(DOM, {

            /**
             * Get computed CSS style value(s) for a single node.
             * @param {HTMLElement} node The input node.
             * @param {string} [style] The CSS style name.
             * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
             */
            _css(node, style) {
                if (!this._styles.has(node)) {
                    this._styles.set(
                        node,
                        window.getComputedStyle(node)
                    );
                }

                if (!style) {
                    return {
                        ...this._styles.get(node)
                    };
                }

                style = Core.kebabCase(style);

                return this._styles.get(node)
                    .getPropertyValue(style);
            },

            /**
             * Set style properties for a single node.
             * @param {HTMLElement} node The input node.
             * @param {object} styles An object containing styles.
             * @param {Boolean} [important] Whether the style should be !important.
             */
            _setStyles(node, styles, important) {
                for (let style in styles) {
                    let value = styles[style];
                    style = Core.kebabCase(style);

                    // if value is numeric and not a number property, add px
                    if (value && Core.isNumeric(value) && !this.cssNumberProperties.includes(style)) {
                        value += 'px';
                    }

                    node.style.setProperty(
                        style,
                        value,
                        important ?
                            'important' :
                            ''
                    );
                }
            }

        });

        /**
         * DOM (Static) Event Factory
         */

        Object.assign(DOM, {

            /**
             * Return a wrapped event callback that executes on a delegate selector.
             * @param {HTMLElement|ShadowRoot|Document} node The input node.
             * @param {string} selector The delegate query selector.
             * @param {function} callback The event callback.
             * @returns {DOM~eventCallback} The delegated event callback.
             */
            _delegateFactory(node, selector, callback) {
                const getDelegate = this._getDelegateMatchFactory(node, selector);

                return e => {
                    if (node.isSameNode(e.target)) {
                        return;
                    }

                    const delegate = getDelegate(e.target);

                    if (!delegate) {
                        return;
                    }

                    const event = {};

                    for (const key in e) {
                        event[key] = Core.isFunction(e[key]) ?
                            (...args) => e[key](...args) :
                            e[key];
                    }

                    event.currentTarget = delegate;
                    event.delegateTarget = node;
                    event.originalEvent = e;

                    Object.freeze(event)

                    return callback(event);
                };
            },

            /**
             * Return a function for matching a delegate target to a standard selector.
             * @param {HTMLElement|ShadowRoot|Document} node The input node.
             * @param {string} selector The delegate query selector.
             * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
             */
            _getDelegateMatchFactory(node, selector) {
                return target =>
                    target.matches(selector) ?
                        target :
                        this._parents(
                            target,
                            parent => parent.matches(selector),
                            parent => parent.isSameNode(node),
                            true
                        ).shift();
            },

            /**
             * Return a wrapped event callback that checks for a namespace match.
             * @param {string} event The namespaced event name.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {DOM~eventCallback} The wrapped event callback.
             */
            _namespaceFactory(event, callback) {
                return e => {
                    if ('namespaceRegExp' in e && !e.namespaceRegExp.test(event)) {
                        return;
                    }

                    return callback(e);
                };
            },

            /**
             * Return a wrapped event callback that checks for a return false for preventing default.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {DOM~eventCallback} The wrapped event callback.
             */
            _preventFactory(callback) {
                return e => {
                    if (callback(e) === false) {
                        e.preventDefault();
                    }
                };
            },

            /**
             * Return a wrapped event callback that removes itself after execution.
             * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {DOM~eventCallback} The wrapped event callback.
             */
            _selfDestructFactory(node, events, delegate, callback) {
                return e => {
                    this._removeEvent(node, events, callback, delegate);
                    return callback(e);
                };
            }

        });

        /**
         * DOM (Static) Event Handlers
         */

        Object.assign(DOM, {

            /**
             * Add an event to a single node.
             * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
             * @param {string} event The event name.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @param {string} [delegate] The delegate selector.
             * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
             */
            _addEvent(node, event, callback, delegate, selfDestruct) {
                if (!this._events.has(node)) {
                    this._events.set(node, {});
                }

                const nodeEvents = this._events.get(node),
                    eventData = {
                        delegate,
                        callback,
                        selfDestruct
                    },
                    realEvent = this._parseEvent(event);

                let realCallback = callback;

                if (selfDestruct) {
                    realCallback = this._selfDestructFactory(node, event, delegate, realCallback);
                }

                realCallback = this._preventFactory(realCallback);

                if (delegate) {
                    realCallback = this._delegateFactory(node, delegate, realCallback);
                }

                realCallback = this._namespaceFactory(event, realCallback);

                eventData.realCallback = realCallback;
                eventData.event = event;
                eventData.realEvent = realEvent;

                if (!nodeEvents[realEvent]) {
                    nodeEvents[realEvent] = [];
                }

                nodeEvents[realEvent].push(eventData);

                node.addEventListener(realEvent, realCallback);
            },

            /**
             * Clone all events from a single node to other nodes.
             * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
             * @param {HTMLElement|ShadowRoot|Document|Window} other The other node.
             */
            _cloneEvents(node, other) {
                if (!this._events.has(node)) {
                    return;
                }

                const nodeEvents = this._events.get(node);
                for (const event in nodeEvents) {
                    for (const eventData of nodeEvents[event]) {
                        this._addEvent(
                            other,
                            eventData.event,
                            eventData.callback,
                            eventData.delegate,
                            eventData.selfDestruct
                        );
                    }
                }
            },

            /**
             * Remove an event from a single node.
             * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
             * @param {string} [event] The event name.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @param {string} [delegate] The delegate selector.
             */
            _removeEvent(node, event, callback, delegate) {
                if (!this._events.has(node)) {
                    return;
                }

                const nodeEvents = this._events.get(node);

                if (!event) {
                    const realEvents = Object.keys(nodeEvents);

                    for (const realEvent of realEvents) {
                        this._removeEvent(node, realEvent, callback, delegate);
                    }

                    return;
                }

                const realEvent = this._parseEvent(event);

                if (!nodeEvents[realEvent]) {
                    return;
                }

                nodeEvents[realEvent] = nodeEvents[realEvent].filter(eventData => {
                    if (
                        (
                            delegate &&
                            delegate !== eventData.delegate
                        ) ||
                        (
                            callback &&
                            callback !== eventData.callback
                        )
                    ) {
                        return true;
                    }

                    if (realEvent !== event) {
                        const regExp = this._eventNamespacedRegExp(event);

                        if (!eventData.event.match(regExp)) {
                            return true;
                        }
                    }

                    node.removeEventListener(eventData.realEvent, eventData.realCallback);

                    return false;
                });

                if (!nodeEvents[realEvent].length) {
                    delete nodeEvents[realEvent];
                }

                if (Object.keys(nodeEvents).length) {
                    return;
                }

                this._events.delete(node);
            },

            /**
             * Trigger an event on a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} event The event name.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
             */
            _triggerEvent(node, event, options) {
                const realEvent = this._parseEvent(event);

                const eventData = new CustomEvent(realEvent, {
                    bubbles: true,
                    cancelable: true,
                    ...options
                });

                if (realEvent !== event) {
                    eventData.namespace = event.substring(realEvent.length + 1);
                    eventData.namespaceRegExp = this._eventNamespacedRegExp(event);
                }

                return node.dispatchEvent(eventData);
            }

        });

        /**
         * DOM (Static) Helpers
         */

        Object.assign(DOM, {

            /**
             * Create a wrapped version of a function that executes once per tick.
             * @param {function} callback Callback function to debounce.
             * @returns {function} The wrapped function.
             */
            debounce(callback) {
                let running;

                return (...args) => {
                    if (running) {
                        return;
                    }

                    running = true;

                    Promise.resolve().then(_ => {
                        callback(...args);
                        running = false;
                    });
                };
            },

            /**
             * Return a RegExp for testing a namespaced event.
             * @param {string} event The namespaced event.
             * @returns {RegExp} The namespaced event RegExp.
             */
            _eventNamespacedRegExp(event) {
                return new RegExp(`^${Core.escapeRegExp(event)}(?:\\.|$)`, 'i');
            },

            /**
             * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
             * @param {array} classList The classes to parse.
             * @returns {string[]} The parsed classes.
             */
            _parseClasses(classList) {
                return classList
                    .flat()
                    .flatMap(val => val.split(' '))
                    .filter(val => !!val);
            },

            /**
             * Return a data object from a key and value, or a data object.
             * @param {string|object} key The data key, or an object containing data.
             * @param {*} [value] The data value.
             * @param {Boolean} [json=false] Whether to JSON encode the values.
             * @returns {object} The data object.
             */
            _parseData(key, value, json = false) {
                const obj = Core.isObject(key) ?
                    key :
                    { [key]: value };

                const result = {};

                for (const k in obj) {
                    const v = obj[k];
                    result[k] = json && (Core.isObject(v) || Core.isArray(v)) ?
                        JSON.stringify(v) :
                        v;
                }

                return result;
            },

            /**
             * Return a JS primitive from a dataset string.
             * @param {string} value The input value.
             * @return {*} The parsed value.
             */
            _parseDataset(value) {
                if (Core.isUndefined(value)) {
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

                if (Core.isNumeric(lower)) {
                    return parseFloat(lower);
                }

                if (['{', '['].includes(lower.charAt(0))) {
                    try {
                        const result = JSON.parse(value);
                        return result;
                    } catch (e) { }
                }

                return value;
            },

            /**
             * Return a "real" event from a namespaced event.
             * @param {string} event The namespaced event.
             * @returns {string} The real event.
             */
            _parseEvent(event) {
                return event.split('.')
                    .shift();
            },

            /**
             * Return an array of events from a space-separated string.
             * @param {string} events The events.
             * @returns {array} The parsed events.
             */
            _parseEvents(events) {
                return events.split(' ');
            }

        });

        /**
         * DOM (Static) Manipulation
         */

        Object.assign(DOM, {

            /**
             * Clone a single node.
             * @param {Node|HTMLElement|DocumentFragment} node The input node.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.deep] Whether to also clone all descendent nodes.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
             */
            _clone(node, options) {
                const clone = node.cloneNode(options.deep);

                if (options.events) {
                    this._cloneEvents(node, clone);
                }

                if (options.data) {
                    this._cloneData(node, clone);
                }

                if (options.animations) {
                    Animation.clone(node, clone);
                }

                if (options.deep) {
                    this._deepClone(node, clone, options);
                }

                return clone;
            },

            /**
             * Deep clone a node.
             * @param {Node|HTMLElement|DocumentFragment} node The input node.
             * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             */
            _deepClone(node, clone, options) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    const child = node.childNodes.item(i);
                    const childClone = clone.childNodes.item(i);

                    if (options.events) {
                        this._cloneEvents(child, childClone);
                    }

                    if (options.data) {
                        this._cloneData(child, childClone);
                    }

                    if (options.animations) {
                        Animation.clone(child, childClone);
                    }

                    this._deepClone(child, childClone, options);
                }
            },

            /**
             * Remove all children of a single node from the DOM.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
             * @param {Boolean} [detach=true] Whether to detach elements from the DOM.
             */
            _empty(node, detach = true) {
                // Remove descendent elements
                const children = Core.wrap(node.childNodes);

                for (const child of children) {
                    this._remove(child);

                    if (detach) {
                        node.removeChild(child);
                    }
                }

                // Remove ShadowRoot
                if (node.shadowRoot) {
                    this._remove(node.shadowRoot);
                }

                // Remove DocumentFragment
                if (node.content) {
                    this._remove(node.content);
                }
            },

            /**
             * Remove a single node from the DOM.
             * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
             */
            _remove(node) {
                const eventData = new Event('remove');
                node.dispatchEvent(eventData);

                this._empty(node, false);

                if (Core.isElement(node)) {
                    this._clearQueue(node);
                    Animation.stop(node);

                    if (this._styles.has(node)) {
                        this._styles.delete(node);
                    }
                }

                this._removeEvent(node);
                this._removeData(node);
            }

        });

        /**
         * DOM (Static) Parsing
         */

        Object.assign(DOM, {

            /**
             * Create a Document object from a HTML string.
             * @param {string} html The HTML input string.
             * @returns {Document} A new Document object.
             */
            parseHTML(html) {
                return new DOMParser()
                    .parseFromString(html, 'text/html');
            },

            /**
             * Create a Document object from an XML string.
             * @param {string} xml The XML input string.
             * @returns {Document} A new Document object.
             */
            parseXML(xml) {
                return new DOMParser()
                    .parseFromString(xml, 'application/xml');
            }

        });

        /**
         * DOM (Static) Find
         */

        Object.assign(DOM, {

            /**
             * Return all nodes matching a standard CSS selector.
             * @param {string} selector The query selector.
             * @param {array} nodes The input nodes.
             * @returns {array} The matching nodes.
             */
            _findBySelector(selector, nodes) {
                const results = [];

                for (const node of nodes) {
                    Core.merge(
                        results,
                        node.querySelectorAll(selector)
                    );
                }

                return nodes.length > 1 && results.length > 1 ?
                    Core.unique(results) :
                    results;
            },

            /**
             * Return a single node matching a standard CSS selector.
             * @param {string} selector The query selector.
             * @param {array} nodes The input nodes.
             * @returns {HTMLElement} The matching node.
             */
            _findOneBySelector(selector, nodes) {
                for (const node of nodes) {
                    const result = node.querySelector(selector);
                    if (result) {
                        return result;
                    }
                }

                return null;
            }

        });

        /**
         * DOM (Static) Traversal
         */

        Object.assign(DOM, {

            /**
             * Return all children of a single node (optionally matching a filter).
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */
            _children(node, filter, first = false, elementsOnly = true) {
                const children = elementsOnly ?
                    node.children :
                    node.childNodes;
                const results = [];

                let child;
                for (child of children) {
                    if (filter && !filter(child)) {
                        continue;
                    }

                    results.push(child);
                    if (first) {
                        break;
                    }
                }

                return results;
            },

            /**
             * Return the deepest child node for a single node.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
             * @returns {HTMLElement} The deepest node.
             */
            _deepest(node) {
                return Core.wrap(
                    node.querySelectorAll('*')
                ).find(node =>
                    !node.childElementCount
                ) || node;
            },

            /**
             * Return the next sibling for a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @returns {array} The matching nodes.
             */
            _next(node, filter) {
                const results = [];

                while (node = node.nextSibling) {
                    if (!Core.isElement(node)) {
                        continue;
                    }

                    if (!filter || filter(node)) {
                        results.push(node);
                    }

                    break;
                }

                return results;
            },

            /**
             * Return all next siblings for a single node (optionally matching a filter, and before a limit).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {DOM~filterCallback} [limit] The limit function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */
            _nextAll(node, filter, limit, first = false) {
                const results = [];

                while (node = node.nextSibling) {
                    if (!Core.isElement(node)) {
                        continue;
                    }

                    if (limit && limit(node)) {
                        break;
                    }

                    if (filter && !filter(node)) {
                        continue;
                    }

                    results.push(node);

                    if (first) {
                        break;
                    }
                }

                return results;
            },

            /**
             * Return the parent of a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @returns {array} The matching nodes.
             */
            _parent(node, filter) {
                const results = [];

                const parent = node.parentNode;

                if (!parent) {
                    return results;
                }

                if (filter && !filter(parent)) {
                    return results;
                }

                results.push(parent);

                return results;
            },

            /**
             * Return all parents of a single node (optionally matching a filter, and before a limit).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {DOM~filterCallback} [limit] The limit function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */
            _parents(node, filter, limit, first = false) {
                const results = [];

                while (node = node.parentNode) {
                    if (Core.isDocument(node)) {
                        break;
                    }

                    if (limit && limit(node)) {
                        break;
                    }

                    if (filter && !filter(node)) {
                        continue;
                    }

                    results.unshift(node);

                    if (first) {
                        break;
                    }
                }

                return results;
            },

            /**
             * Return the previous sibling for a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @returns {array} The matching nodes.
             */
            _prev(node, filter) {
                const results = [];

                while (node = node.previousSibling) {
                    if (!Core.isElement(node)) {
                        continue;
                    }

                    if (!filter || filter(node)) {
                        results.push(node);
                    }

                    break;
                }

                return results;
            },

            /**
             * Return all previous siblings for a single node (optionally matching a filter, and before a limit).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {DOM~filterCallback} [limit] The limit function.
             * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
             * @returns {array} The matching nodes.
             */
            _prevAll(node, filter, limit, first = false) {
                const results = [];

                while (node = node.previousSibling) {
                    if (!Core.isElement(node)) {
                        continue;
                    }

                    if (limit && limit(node)) {
                        break;
                    }

                    if (filter && !filter(node)) {
                        continue;
                    }

                    results.unshift(node);

                    if (first) {
                        break;
                    }
                }

                return results;
            },

            /**
             * Return all siblings for a single node (optionally matching a filter).
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~filterCallback} [filter] The filter function.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {array} The matching nodes.
             */
            _siblings(node, filter, elementsOnly = true) {
                const results = [];

                const parent = node.parentNode;

                if (!parent) {
                    return results;
                }

                const siblings = elementsOnly ?
                    parent.children :
                    parent.childNodes;

                let sibling;
                for (sibling of siblings) {
                    if (node.isSameNode(sibling)) {
                        continue;
                    }

                    if (filter && !filter(sibling)) {
                        continue;
                    }

                    results.push(sibling);
                }

                return results;
            }

        });

        /**
         * DOM (Static) Filters
         */

        Object.assign(DOM, {

            /**
             * Return a function for filtering nodes.
             * @param {object} [options] The options for filtering.
             * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
             * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
             * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
             * @param {Boolean} [options.document=false] Whether to allow Document.
             * @param {Boolean} [options.window=false] Whether to allow Window.
             * @returns {DOM~nodeCallback} The node filter function.
             */
            parseNodesFactory(options) {
                return options ?
                    node =>
                        (options.node ? Core.isNode(node) : Core.isElement(node)) ||
                        (options.fragment && Core.isFragment(node)) ||
                        (options.shadow && Core.isShadow(node)) ||
                        (options.document && Core.isDocument(node)) ||
                        (options.window && Core.isWindow(node)) :
                    Core.isElement;
            }

        });

        /**
         * DOM (Static) Tests
         */

        Object.assign(DOM, {

            /**
             * Returns true if a single node has a CSS animation.
             * @param {HTMLElement} node The input node.
             * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
             */
            _hasCSSAnimation(node) {
                return !!parseFloat(
                    this._css(node, 'animation-duration')
                );
            },

            /**
             * Returns true if a single node has a CSS transition.
             * @param {HTMLElement} node The input node.
             * @returns {Boolean} TRUE if the node has a CSS transition, otherwise FALSE.
             */
            _hasCSSTransition(node) {
                return !!parseFloat(
                    this._css(node, 'transition-duration')
                );
            },

            /**
             * Returns true if a single node has custom data.
             * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
             * @param {string} [key] The data key.
             * @returns {Boolean} TRUE if the node has custom data, otherwise FALSE.
             */
            _hasData(node, key) {
                return this._data.has(node) &&
                    (
                        !key ||
                        this._data.get(node)
                            .hasOwnProperty(key)
                    );
            },

            /**
             * Returns true if a single node is visible.
             * @param {HTMLElement|Document|Window} node The input node.
             * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
             */
            _isVisible(node) {
                if (Core.isWindow(node)) {
                    return node.document.visibilityState === 'visible';
                }

                if (Core.isDocument(node)) {
                    return node.visibilityState === 'visible';
                }

                return !!node.offsetParent;
            }

        });

        /**
         * DOM (Static) Utility
         */

        Object.assign(DOM, {

            /**
             * Force a single node to be shown, and then execute a callback.
             * @param {Node|HTMLElement} node The input node.
             * @param {DOM~nodeCallback} callback The callback to execute.
             * @returns {*} The result of the callback.
             */
            _forceShow(node, callback) {
                if (this._isVisible(node)) {
                    return callback(node);
                }

                const elements = [];

                if (Core.isElement(node) && this._css(node, 'display') === 'none') {
                    elements.push(node);
                }

                Core.merge(
                    elements,
                    this._parents(
                        node,
                        parent =>
                            Core.isElement(parent) &&
                            this._css(parent, 'display') === 'none'
                    )
                );

                const hidden = new Map;

                for (const element of elements) {
                    hidden.set(element, element.getAttribute('style'));
                    element.style.setProperty('display', 'initial', 'important');
                }

                const result = callback(node);

                for (const [element, style] of hidden) {
                    if (style) {
                        element.setAttribute('style', style);
                    } else {
                        // force DOM to update
                        element.getAttribute('style');
                        element.removeAttribute('style');
                    }
                }

                return result;
            },

            /**
             * Sanitize a single node.
             * @param {HTMLElement} node The input node.
             * @param {HTMLElement} parent The parent node.
             * @param {object} [allowedTags] An object containing allowed tags and attributes.
             */
            _sanitize(node, parent, allowedTags = this.allowedTags) {
                // check node
                const name = node.tagName.toLowerCase();

                if (!(name in allowedTags)) {
                    parent.removeChild(node);
                    return;
                }

                // check node attributes
                const allowedAttributes = [];

                if ('*' in allowedTags && allowedTags['*'].length) {
                    allowedAttributes.push(...allowedTags['*']);
                }

                if (allowedTags[name].length) {
                    allowedAttributes.push(...allowedTags[name]);
                }

                const attributes = this._getAttributes(node);
                for (const attribute in attributes) {
                    const valid = !!allowedAttributes.find(test => attribute.match(test));

                    if (!valid) {
                        node.removeAttribute(attribute);
                    }
                }

                // check children
                const children = this._children(node, null, false, true);
                for (const child of children) {
                    this._sanitize(child, node, allowedTags);
                }
            }

        });

        /**
         * DOM (Static) Properties
         */

        /**
         * @callback DOM~animationCallback
         * @param {HTMLElement} node The input node.
         * @param {number} progress The animation progress.
         * @param {object} options The options to use for animating.
         */

        /**
         * @callback DOM~delegateCallback
         * @param {HTMLElement} node The input node.
         */

        /**
         * @callback DOM~eventCallback
         * @param {Event} event The event object.
         */

        /**
         * @callback DOM~nodeCallback
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         */

        /**
         * @callback DOM~queueCallback
         * @param {HTMLElement} node The input node.
         */

        Object.assign(DOM, {

            _queues: new WeakMap,

            _data: new WeakMap,
            _events: new WeakMap,
            _styles: new WeakMap,

            // Default allowed tags/attributes for sanitizer
            allowedTags: {
                '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
                a: ['target', 'href', 'title', 'rel'],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ['src', 'alt', 'title', 'width', 'height'],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },

            // CSS properties that can have number-only values
            cssNumberProperties: [
                'font-weight',
                'line-height',
                'opacity',
                'orphans',
                'scale',
                'widows',
                'z-index'
            ],

            CONTENT_BOX: 0,
            PADDING_BOX: 1,
            BORDER_BOX: 2,
            MARGIN_BOX: 3,
            SCROLL_BOX: 4,

            // Fast selector RegExp
            _fastRegExp: /^([\#\.]?)([\w\-]+)$/

        });

        /**
         * QuerySet Class
         * @class
         */
        class QuerySet {

            /**
             * New DOM constructor.
             * @param {array} nodes The input nodes.
             * @param {DOM} [context=dom] The DOM context.
             * @returns {QuerySet} A new QuerySet object.
             */
            constructor(nodes, context = dom) {
                this._dom = context;
                this._nodes = nodes;
            }

            get length() {
                return this._nodes.length;
            }

            /**
             * Push a single node to the stack.
             * @param {Node|DocumentFragment|ShadowRoot|Document|Window} [node] The node to push.
             * @returns {QuerySet} The QuerySet object.
             */
            pushNode(node) {
                return this.pushStack(
                    [node].filter(v => v)
                );
            }

            /**
             * Push a new set of nodes to the stack.
             * @param {array} nodes The nodes to push.
             * @returns {QuerySet} The QuerySet object.
             */
            pushStack(nodes) {
                this._nodes = nodes;

                return this;
            }

        }

        /**
         * QuerySetImmutable Class
         * @class
         */
        class QuerySetImmutable extends QuerySet {

            /**
             * Push a new set of nodes to the stack.
             * @param {array} nodes The nodes to push.
             * @returns {QuerySet} The QuerySet object.
             */
            pushStack(nodes) {
                return new QuerySetImmutable(nodes);
            }

        }

        /**
         * QuerySet Animate
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Add an animation to the queue for each node.
             * @param {DOM~animationCallback} callback The animation callback.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            animate(callback, options) {
                return this.queue(node =>
                    this._dom.animate(node, callback, options)
                );
            },

            /**
             * Stop all animations and clear the queue of each node.
             * @param {Boolean} [finish=true] Whether to complete all current animations.
             * @returns {QuerySet} The QuerySet object.
             */
            stop(finish = true) {
                this.clearQueue();
                this._dom.stop(this, finish);

                return this;
            }

        });

        /**
         * QuerySet Animations
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Add a drop in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            dropIn(options) {
                return this.queue(node =>
                    this._dom.dropIn(node, options)
                );
            },

            /**
             * Add a drop out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=top] The direction to drop the node to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            dropOut(options) {
                return this.queue(node =>
                    this._dom.dropOut(node, options)
                );
            },

            /**
             * Add a fade in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            fadeIn(options) {
                return this.queue(node =>
                    this._dom.fadeIn(node, options)
                );
            },

            /**
             * Add a fade out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            fadeOut(options) {
                return this.queue(node =>
                    this._dom.fadeOut(node, options)
                );
            },

            /**
             * Add a rotate in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=0] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            rotateIn(options) {
                return this.queue(node =>
                    this._dom.rotateIn(node, options)
                );
            },

            /**
             * Add a rotate out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {number} [options.x=0] The amount to rotate on the X-axis.
             * @param {number} [options.y=1] The amount to rotate on the Y-axis.
             * @param {number} [options.z=0] The amount to rotate on the Z-axis.
             * @param {Boolean} [options.inverse] Whether to invert the rotation.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            rotateOut(options) {
                return this.queue(node =>
                    this._dom.rotateOut(node, options)
                );
            },

            /**
             * Add a slide in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            slideIn(options) {
                return this.queue(node =>
                    this._dom.slideIn(node, options)
                );
            },

            /**
             * Add a slide out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to slide to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            slideOut(options) {
                return this.queue(node =>
                    this._dom.slideOut(node, options)
                );
            },
            /**
             * Add a squeeze in animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze from.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            squeezeIn(options) {
                return this.queue(node =>
                    this._dom.squeezeIn(node, options)
                );
            },

            /**
             * Add a squeeze out animation to the queue for each node.
             * @param {object} [options] The options to use for animating.
             * @param {string|function} [options.direction=bottom] The direction to squeeze to.
             * @param {number} [options.duration=1000] The duration of the animation.
             * @param {string} [options.type=ease-in-out] The type of animation.
             * @param {Boolean} [options.infinite] Whether the animation should run forever.
             * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
             * @param {Boolean} [options.debug] Whether to set debugging info on the node.
             * @returns {QuerySet} The QuerySet object.
             */
            squeezeOut(options) {
                return this.queue(node =>
                    this._dom.squeezeOut(node, options)
                );
            }

        });

        /**
         * QuerySet Queue
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Clear the queue of each node.
             * @param {string} [queueName=default] The name of the queue to clear.
             * @returns {QuerySet} The QuerySet object.
             */
            clearQueue(queueName = 'default') {
                this._dom.clearQueue(this, queueName);

                return this;
            },

            /**
             * Delay execution of subsequent items in the queue for each node.
             * @param {number} duration The number of milliseconds to delay execution by.
             * @param {string} [queueName=default] The name of the queue to use.
             * @returns {QuerySet} The QuerySet object.
             */
            delay(duration, queueName = 'default') {
                return this.queue(_ =>
                    new Promise(resolve =>
                        setTimeout(
                            resolve,
                            duration
                        )
                    ),
                    queueName
                );
            },

            /**
             * Queue a callback on each node.
             * @param {DOM~queueCallback} callback The callback to queue.
             * @param {string} [queueName=default] The name of the queue to use.
             * @returns {QuerySet} The QuerySet object.
             */
            queue(callback, queueName = 'default') {
                this._dom.queue(this, callback, queueName);

                return this;
            }

        });

        /**
         * QuerySet Attributes
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Get attribute value(s) for the first node.
             * @param {string} [attribute] The attribute name.
             * @returns {string} The attribute value.
             */
            getAttribute(attribute) {
                return this._dom.getAttribute(this, attribute);
            },

            /**
             * Get dataset value(s) for the first node.
             * @param {string} [key] The dataset key.
             * @returns {*} The dataset value, or an object containing the dataset.
             */
            getDataset(key) {
                return this._dom.getDataset(this, key);
            },

            /**
             * Get the HTML contents of the first node.
             * @returns {string} The HTML contents.
             */
            getHTML() {
                return this._dom.getHTML(this);
            },

            /**
             * Get a property value for the first node.
             * @param {string} property The property name.
             * @returns {string} The property value.
             */
            getProperty(property) {
                return this._dom.getProperty(this, property);
            },

            /**
             * Get the text contents of the first node.
             * @returns {string} The text contents.
             */
            getText() {
                return this._dom.getText(this);
            },

            /**
             * Get the value property of the first node.
             * @returns {string} The value.
             */
            getValue() {
                return this._dom.getValue(this);
            },

            /**
             * Remove an attribute from each node.
             * @param {string} attribute The attribute name.
             * @returns {QuerySet} The QuerySet object.
             */
            removeAttribute(attribute) {
                this._dom.removeAttribute(this, attribute);

                return this;
            },

            /**
             * Remove a dataset value from each node.
             * @param {string} key The dataset key.
             * @returns {QuerySet} The QuerySet object.
             */
            removeDataset(key) {
                this._dom.removeDataset(this, key);

                return this;
            },

            /**
             * Remove a property from each node.
             * @param {string} property The property name.
             * @returns {QuerySet} The QuerySet object.
             */
            removeProperty(property) {
                this._dom.removeProperty(this, property);

                return this;
            },

            /**
             * Set an attribute value for each node.
             * @param {string|object} attribute The attribute name, or an object containing attributes.
             * @param {string} [value] The attribute value.
             * @returns {QuerySet} The QuerySet object.
             */
            setAttribute(attribute, value) {
                this._dom.setAttribute(this, attribute, value);

                return this;
            },

            /**
             * Set a dataset value for each node.
             * @param {string|object} key The dataset key, or an object containing dataset values.
             * @param {*} [value] The dataset value.
             * @returns {QuerySet} The QuerySet object.
             */
            setDataset(key, value) {
                this._dom.setDataset(this, key, value);

                return this;
            },

            /**
             * Set the HTML contents of each node.
             * @param {string} html The HTML contents.
             * @returns {QuerySet} The QuerySet object.
             */
            setHTML(html) {
                this._dom.setHTML(this, html);

                return this;
            },

            /**
             * Set a property value for each node.
             * @param {string|object} property The property name, or an object containing properties.
             * @param {string} [value] The property value.
             * @returns {QuerySet} The QuerySet object.
             */
            setProperty(property, value) {
                this._dom.setProperty(this, property, value);

                return this;
            },

            /**
             * Set the text contents of each node.
             * @param {string} text The text contents.
             * @returns {QuerySet} The QuerySet object.
             */
            setText(text) {
                this._dom.setText(this, text);

                return this;
            },
            /**
             * Set the value property of each node.
             * @param {string} value The value.
             * @returns {QuerySet} The QuerySet object.
             */
            setValue(value) {
                this._dom.setValue(this, value);

                return this;
            }

        });

        /**
         * QuerySet Data
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Clone custom data from each node to each other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            cloneData(others) {
                this._dom.cloneData(this, others);

                return this;
            },

            /**
             * Get custom data for the first node.
             * @param {string} [key] The data key.
             * @returns {*} The data value.
             */
            getData(key) {
                return this._dom.getData(this, key);
            },

            /**
             * Remove custom data from each node.
             * @param {string} [key] The data key.
             * @returns {QuerySet} The QuerySet object.
             */
            removeData(key) {
                this._dom.removeData(this, key);

                return this;
            },

            /**
             * Set custom data for each node.
             * @param {string|object} key The data key, or an object containing data.
             * @param {*} [value] The data value.
             * @returns {QuerySet} The QuerySet object.
             */
            setData(key, value) {
                this._dom.setData(this, key, value);

                return this;
            }

        });

        /**
         * QuerySet Position
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Get the X,Y co-ordinates for the center of the first node.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the x and y co-ordinates.
             */
            center(offset) {
                return this._dom.center(this, offset);
            },

            /**
             * Contrain each node to a container node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            constrain(container) {
                this._dom.constrain(this, container);

                return this;
            },

            /**
             * Get the distance of a node to an X,Y position in the Window.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {number} The distance to the node.
             */
            distTo(x, y, offset) {
                return this._dom.distTo(this, x, y, offset);
            },

            /**
             * Get the distance between two nodes.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {number} The distance between the nodes.
             */
            distToNode(others) {
                return this._dom.distToNode(this, others);
            },

            /**
             * Get the nearest node to an X,Y position in the Window.
             * @param {number} x The X co-ordinate.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {QuerySet} A new QuerySet object.
             */
            nearestTo(x, y, offset) {
                const node = this._dom.nearestTo(this, x, y, offset);
                return new this.constructor(
                    [node].filter(v => v)
                );
            },

            /**
             * Get the nearest node to another node.
             * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
             * @returns {QuerySet} A new QuerySet object.
             */
            nearestToNode(others) {
                const node = this._dom.nearestToNode(this, others);
                return new this.constructor(
                    [node].filter(v => v)
                );
            },
            /**
             * Get the percentage of an X co-ordinate relative to a node's width.
             * @param {number} x The X co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */
            percentX(x, offset, clamp = true) {
                return this._dom.percentX(this, x, offset, clamp);
            },

            /**
             * Get the percentage of a Y co-ordinate relative to a node's height.
             * @param {number} y The Y co-ordinate.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
             * @returns {number} The percent.
             */
            percentY(y, offset, clamp = true) {
                return this._dom.percentY(this, y, offset, clamp);
            },

            /**
             * Get the position of the first node relative to the Window or Document.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {object} An object with the x and y co-ordinates.
             */
            position(offset) {
                return this._dom.position(this, offset);
            },

            /**
             * Get the computed bounding rectangle of the first node.
             * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
             * @returns {DOMRect} The computed bounding rectangle.
             */
            rect(offset) {
                return this._dom.rect(this, offset);
            }

        });

        /**
         * QuerySet Scroll
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Get the scroll X position of the first node.
             * @returns {number} The scroll X position.
             */
            getScrollX() {
                return this._dom.getScrollX(this);
            },

            /**
             * Get the scroll Y position of the first node.
             * @returns {number} The scroll Y position.
             */
            getScrollY() {
                return this._dom.getScrollY(this);
            },

            /**
             * Scroll each node to an X,Y position.
             * @param {number} x The scroll X position.
             * @param {number} y The scroll Y position.
             * @returns {QuerySet} The QuerySet object.
             */
            setScroll(x, y) {
                this._dom.setScroll(this, x, y);

                return this;
            },

            /**
             * Scroll each node to an X position.
             * @param {number} x The scroll X position.
             * @returns {QuerySet} The QuerySet object.
             */
            setScrollX(x) {
                this._dom.setScrollX(this, x);

                return this;
            },
            /**
             * Scroll each node to a Y position.
             * @param {number} y The scroll Y position.
             * @returns {QuerySet} The QuerySet object.
             */
            setScrollY(y) {
                this._dom.setScrollY(this, y);

                return this;
            }

        });

        /**
         * QuerySet Size
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Get the computed height of the first node.
             * @param {number} [boxSize=1] The box sizing to calculate.
             * @returns {number} The height.
             */
            height(boxSize) {
                return this._dom.height(this, boxSize);
            },

            /**
             * Get the computed width of the first node.
             * @param {number} [boxSize=1] The box sizing to calculate.
             * @returns {number} The width.
             */
            width(boxSize) {
                return this._dom.width(this, boxSize);
            }

        });

        /**
         * QuerySet Styles
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Add classes to each node.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */
            addClass(...classes) {
                this._dom.addClass(this, ...classes);

                return this;
            },

            /**
             * Get computed CSS style values for the first node.
             * @param {string} [style] The CSS style name.
             * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
             */
            css(style) {
                return this._dom.css(this, style);
            },

            /**
             * Get style properties for the first node.
             * @param {string} [style] The style name.
             * @returns {string|object} The style value, or an object containing the style properties.
             */
            getStyle(style) {
                return this._dom.getStyle(this, style);
            },

            /**
             * Hide each node from display.
             * @returns {QuerySet} The QuerySet object.
             */
            hide() {
                this._dom.hide(this);

                return this;
            },

            /**
             * Remove classes from each node.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */
            removeClass(...classes) {
                this._dom.removeClass(this, ...classes);

                return this;
            },
            /**
             * Set style properties for each node.
             * @param {string|object} style The style name, or an object containing styles.
             * @param {string} [value] The style value.
             * @param {Boolean} [important] Whether the style should be !important.
             * @returns {QuerySet} The QuerySet object.
             */
            setStyle(style, value, important) {
                this._dom.setStyle(this, style, value, important);

                return this;
            },

            /**
             * Display each hidden node.
             * @returns {QuerySet} The QuerySet object.
             */
            show() {
                this._dom.show(this);

                return this;
            },

            /**
             * Toggle the visibility of each node.
             * @returns {QuerySet} The QuerySet object.
             */
            toggle() {
                this._dom.toggle(this);

                return this;
            },
            /**
             * Toggle classes for each node.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */
            toggleClass(...classes) {
                this._dom.toggleClass(this, ...classes);

                return this;
            }

        });

        /**
         * QuerySet Events
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Trigger a blur event on the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            blur() {
                this._dom.blur(this);

                return this;
            },

            /**
             * Trigger a click event on the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            click() {
                this._dom.click(this);

                return this;
            },

            /**
             * Trigger a focus event on the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            focus() {
                this._dom.focus(this);

                return this;
            }

        });

        /**
         * QuerySet Event Handlers
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Add an event to each node.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */
            addEvent(events, callback) {
                this._dom.addEvent(this, events, callback);

                return this;
            },

            /**
             * Add a delegated event to each node.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */
            addEventDelegate(events, delegate, callback) {
                this._dom.addEventDelegate(this, events, delegate, callback);

                return this;
            },

            /**
             * Add a self-destructing delegated event to each node.
             * @param {string} events The event names.
             * @param {string} delegate The delegate selector.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */
            addEventDelegateOnce(events, delegate, callback) {
                this._dom.addEventDelegateOnce(this, events, delegate, callback);

                return this;
            },

            /**
             * Add a self-destructing event to each node.
             * @param {string} events The event names.
             * @param {DOM~eventCallback} callback The callback to execute.
             * @returns {QuerySet} The QuerySet object.
             */
            addEventOnce(events, callback) {
                this._dom.addEventOnce(this, events, callback);

                return this;
            },

            /**
             * Clone all events from each node to other nodes.
             * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            cloneEvents(others) {
                this._dom.cloneEvents(this, others);

                return this;
            },

            /**
             * Remove events from each node.
             * @param {string} [events] The event names.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @returns {QuerySet} The QuerySet object.
             */
            removeEvent(events, callback) {
                this._dom.removeEvent(this, events, callback);

                return this;
            },

            /**
             * Remove delegated events from each node.
             * @param {string} [events] The event names.
             * @param {string} [delegate] The delegate selector.
             * @param {DOM~eventCallback} [callback] The callback to remove.
             * @returns {QuerySet} The QuerySet object.
             */
            removeEventDelegate(events, delegate, callback) {
                this._dom.removeEventDelegate(this, events, delegate, callback);

                return this;
            },

            /**
             * Trigger events on each node.
             * @param {string} events The event names.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             * @returns {QuerySet} The QuerySet object.
             */
            triggerEvent(events, options) {
                this._dom.triggerEvent(this, events, options);

                return this;
            },

            /**
             * Trigger an event for the first node.
             * @param {string} event The event name.
             * @param {object} [options] The options to use for the Event.
             * @param {*} [options.detail] Additional data to attach to the event.
             * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
             * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
             */
            triggerOne(event, options) {
                return this._dom.triggerOne(this, event, options);
            }

        });

        /**
         * QuerySet Create
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Attach a shadow DOM tree to the first node.
             * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
             * @returns {QuerySet} A new QuerySet object.
             */
            attachShadow(open = true) {
                const nodes = [],
                    shadow = this._dom.attachShadow(this, open);

                if (shadow) {
                    nodes.push(shadow);
                }

                return new this.constructor(nodes, this._dom);
            }

        });

        /**
         * QuerySet Manipulation
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Clone each node.
             * @param {object} options Options for cloning the node.
             * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
             * @param {Boolean} [options.events] Whether to also clone events.
             * @param {Boolean} [options.data] Whether to also clone custom data.
             * @param {Boolean} [options.animations] Whether to also clone animations.
             * @returns {QuerySet} A new QuerySet object.
             */
            clone(options) {
                return new this.constructor(
                    this._dom.clone(this, options)
                );
            },

            /**
             * Detach each node from the DOM.
             * @returns {QuerySet} The QuerySet object.
             */
            detach() {
                this._dom.detach(this);

                return this;
            },

            /**
             * Remove all children of each node from the DOM.
             * @returns {QuerySet} The QuerySet object.
             */
            empty() {
                this._dom.empty(this);

                return this;
            },

            /**
             * Remove each node from the DOM.
             * @returns {QuerySet} The QuerySet object.
             */
            remove() {
                this._dom.remove(this);

                return this.pushStack([]);
            },

            /**
             * Replace each other node with nodes.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            replaceAll(others) {
                this._dom.replaceAll(this, others);

                return this;
            },

            /**
             * Replace each node with other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            replaceWith(others) {
                this._dom.replaceWith(this, others);

                return this;
            }

        });

        /**
         * QuerySet Move
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Insert each other node after the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            after(others) {
                this._dom.after(this, others);

                return this;
            },

            /**
             * Append each other node to the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            append(others) {
                this._dom.append(this, others);

                return this;
            },

            /**
             * Append each node to the first other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            appendTo(others) {
                this._dom.appendTo(this, others);

                return this;
            },

            /**
             * Insert each other node before the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            before(others) {
                this._dom.before(this, others);

                return this;
            },

            /**
             * Insert each node after the first other node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            insertAfter(others) {
                this._dom.insertAfter(this, others);

                return this;
            },

            /**
             * Insert each node before the first other node.
             * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            insertBefore(others) {
                this._dom.insertBefore(this, others);

                return this;
            },

            /**
             * Prepend each other node to the first node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            prepend(others) {
                this._dom.prepend(this, others);

                return this;
            },

            /**
             * Prepend each node to the first other node.
             * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            prependTo(others) {
                this._dom.prependTo(this, others);

                return this;
            },

        });

        /**
         * QuerySet Wrap
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Unwrap each node.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            unwrap(filter) {
                this._dom.unwrap(this, filter);

                return this;
            },

            /**
             * Wrap each nodes with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            wrap(others) {
                this._dom.wrap(this, others);

                return this;
            },

            /**
             * Wrap all nodes with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            wrapAll(others) {
                this._dom.wrapAll(this, others);

                return this;
            },

            /**
             * Wrap the contents of each node with other nodes.
             * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
             * @returns {QuerySet} The QuerySet object.
             */
            wrapInner(others) {
                this._dom.wrapInner(this, others);

                return this;
            }

        });

        /**
         * QuerySet Filter
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Return all nodes connected to the DOM.
             * @returns {QuerySet} The QuerySet object.
             */
            connected() {
                return this.pushStack(
                    this._dom.connected(this)
                );
            },

            /**
             * Return all nodes considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            equal(others) {
                return this.pushStack(
                    this._dom.equal(this, others)
                );
            },

            /**
             * Return all nodes matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            filter(filter) {
                return this.pushStack(
                    this._dom.filter(this, filter)
                );
            },

            /**
             * Return the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            filterOne(filter) {
                return this.pushNode(
                    this._dom.filterOne(this, filter)
                );
            },

            /**
             * Return all "fixed" nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            fixed() {
                return this.pushStack(
                    this._dom.fixed(this)
                );
            },

            /**
             * Return all hidden nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            hidden() {
                return this.pushStack(
                    this._dom.hidden(this)
                );
            },

            /**
             * Return all nodes not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            not(filter) {
                return this.pushStack(
                    this._dom.not(this, filter)
                );
            },

            /**
             * Return the first node not matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            notOne(filter) {
                return this.pushNode(
                    this._dom.notOne(this, filter)
                );
            },

            /**
             * Return all nodes considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {QuerySet} The QuerySet object.
             */
            same(others) {
                return this.pushStack(
                    this._dom.same(this, others)
                );
            },

            /**
             * Return all visible nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            visible() {
                return this.pushStack(
                    this._dom.visible(this)
                );
            },

            /**
             * Return all nodes with an animation.
             * @returns {QuerySet} The QuerySet object.
            */
            withAnimation() {
                return this.pushStack(
                    this._dom.withAnimation(this)
                );
            },

            /**
             * Return all nodes with a specified attribute.
             * @param {string} attribute The attribute name.
             * @returns {QuerySet} The QuerySet object.
             */
            withAttribute(attribute) {
                return this.pushStack(
                    this._dom.withAttribute(this, attribute)
                );
            },

            /**
             * Return all nodes with child elements.
             * @returns {QuerySet} The QuerySet object.
             */
            withChildren() {
                return this.pushStack(
                    this._dom.withChildren(this)
                );
            },

            /**
             * Return all nodes with any of the specified classes.
             * @param {...string|string[]} classes The classes.
             * @returns {QuerySet} The QuerySet object.
             */
            withClass(classes) {
                return this.pushStack(
                    this._dom.withClass(this, classes)
                );
            },

            /**
             * Return all nodes with a CSS animation.
             * @returns {QuerySet} The QuerySet object.
            */
            withCSSAnimation() {
                return this.pushStack(
                    this._dom.withCSSAnimation(this)
                );
            },

            /**
             * Return all nodes with a CSS transition.
             * @returns {QuerySet} The QuerySet object.
             */
            withCSSTransition() {
                return this.pushStack(
                    this._dom.withCSSTransition(this)
                );
            },

            /**
             * Return all nodes with custom data.
             * @param {string} [key] The data key.
             * @returns {QuerySet} The QuerySet object.
             */
            withData(key) {
                return this.pushStack(
                    this._dom.withData(this, key)
                );
            },

            /**
             * Return all elements with a descendent matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            withDescendent(filter) {
                return this.pushStack(
                    this._dom.withDescendent(this, filter)
                );
            },

            /**
             * Return all nodes with a specified property.
             * @param {string} property The property name.
             * @returns {QuerySet} The QuerySet object.
             */
            withProperty(property) {
                return this.pushStack(
                    this._dom.withProperty(this, property)
                );
            }

        });

        /**
         * QuerySet Find
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Return all descendent nodes matching a selector.
             * @param {string} selector The query selector.
             * @returns {QuerySet} The QuerySet object.
             */
            find(selector) {
                return this.pushStack(
                    this._dom.find(selector, this)
                );
            },

            /**
             * Return all descendent nodes with a specific class.
             * @param {string} className The class name.
             * @returns {QuerySet} The QuerySet object.
             */
            findByClass(className) {
                return this.pushStack(
                    this._dom.findByClass(className, this)
                );
            },

            /**
             * Return all descendent nodes with a specific ID.
             * @param {string} id The id.
             * @returns {QuerySet} The QuerySet object.
             */
            findById(id) {
                return this.pushStack(
                    this._dom.findById(id, this)
                );
            },

            /**
             * Return all descendent nodes with a specific tag.
             * @param {string} tagName The tag name.
             * @returns {QuerySet} The QuerySet object.
             */
            findByTag(tagName) {
                return this.pushStack(
                    this._dom.findByTag(tagName, this)
                );
            },

            /**
             * Return a single descendent node matching a selector.
             * @param {string} selector The query selector.
             * @returns {QuerySet} The QuerySet object.
             */
            findOne(selector) {
                return this.pushNode(
                    this._dom.findOne(selector, this)
                );
            },

            /**
             * Return a single descendent node with a specific class.
             * @param {string} className The class name.
             * @returns {QuerySet} The QuerySet object.
             */
            findOneByClass(className) {
                return this.pushNode(
                    this._dom.findOneByClass(className, this)
                );
            },

            /**
             * Return a single descendent node with a specific ID.
             * @param {string} id The id.
             * @returns {QuerySet} The QuerySet object.
             */
            findOneById(id) {
                return this.pushNode(
                    this._dom.findOneById(id, this)
                );
            },

            /**
             * Return a single descendent node with a specific tag.
             * @param {string} tagName The tag name.
             * @returns {QuerySet} The QuerySet object.
             */
            findOneByTag(tagName) {
                return this.pushNode(
                    this._dom.findOneByTag(tagName, this)
                );
            }

        });

        /**
         * QuerySet Traversal
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Return the first child of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            child(filter) {
                return this.pushStack(
                    this._dom.child(this, filter)
                );
            },

            /**
             * Return all children of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            children(filter) {
                return this.pushStack(
                    this._dom.children(this, filter)
                );
            },

            /**
             * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            closest(filter, limit) {
                return this.pushStack(
                    this._dom.closest(this, filter, limit)
                );
            },

            /**
             * Return the common ancestor of all nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            commonAncestor() {
                return this.pushNode(
                    this._dom.commonAncestor(this)
                );
            },

            /**
             * Return all children of each node (including text and comment nodes).
             * @returns {QuerySet} The QuerySet object.
             */
            contents() {
                return this.pushStack(
                    this._dom.contents(this)
                );
            },

            /**
             * Return the DocumentFragment of the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            fragment() {
                return this.pushNode(
                    this._dom.fragment(this)
                );
            },

            /**
             * Return the next sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            next(filter) {
                return this.pushStack(
                    this._dom.next(this, filter)
                );
            },

            /**
             * Return all next siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            nextAll(filter, limit) {
                return this.pushStack(
                    this._dom.nextAll(this, filter, limit)
                );
            },

            /**
             * Return the offset parent (relatively positioned) of the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            offsetParent() {
                return this.pushNode(
                    this._dom.offsetParent(this)
                );
            },

            /**
             * Return the parent of each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            parent(filter) {
                return this.pushStack(
                    this._dom.parent(this, filter)
                );
            },

            /**
             * Return all parents of each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            parents(filter, limit) {
                return this.pushStack(
                    this._dom.parents(this, filter, limit)
                );
            },

            /**
             * Return the previous sibling for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            prev(filter) {
                return this.pushStack(
                    this._dom.prev(this, filter)
                );
            },

            /**
             * Return all previous siblings for each node (optionally matching a filter, and before a limit).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
             * @returns {QuerySet} The QuerySet object.
             */
            prevAll(filter, limit) {
                return this.pushStack(
                    this._dom.prevAll(this, filter, limit)
                );
            },

            /**
             * Return the ShadowRoot of the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            shadow() {
                return this.pushNode(
                    this._dom.shadow(this)
                );
            },

            /**
             * Return all siblings for each node (optionally matching a filter).
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            siblings(filter) {
                return this.pushStack(
                    this._dom.siblings(this, filter)
                );
            }

        });

        /**
         * QuerySet Selection
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Insert each node after the selection.
             * @returns {QuerySet} The QuerySet object.
             */
            afterSelection() {
                this._dom.afterSelection(this);

                return this;
            },

            /**
             * Insert each node before the selection.
             * @returns {QuerySet} The QuerySet object.
             */
            beforeSelection() {
                this._dom.beforeSelection(this);

                return this;
            },

            /**
             * Create a selection on the first node.
             * @returns {QuerySet} The QuerySet object.
             */
            select() {
                this._dom.select(this);

                return this;
            },

            /**
             * Create a selection containing all of the nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            selectAll() {
                this._dom.selectAll(this);

                return this;
            },

            /**
             * Wrap selected nodes with other nodes.
             * @returns {QuerySet} The QuerySet object.
             */
            wrapSelection() {
                this._dom.wrapSelection(this);

                return this;
            }

        });

        /**
         * QuerySet Tests
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Returns true if any of the nodes has an animation.
             * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
             */
            hasAnimation() {
                return this._dom.hasAnimation(this);
            },

            /**
             * Returns true if any of the nodes has a specified attribute.
             * @param {string} attribute The attribute name.
             * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
             */
            hasAttribute(attribute) {
                return this._dom.hasAttribute(this, attribute);
            },

            /**
             * Returns true if any of the nodes has child nodes.
             * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
             */
            hasChildren() {
                return this._dom.hasChildren(this);
            },

            /**
             * Returns true if any of the nodes has any of the specified classes.
             * @param {...string|string[]} classes The classes.
             * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
             */
            hasClass(...classes) {
                return this._dom.hasClass(this, ...classes);
            },

            /**
             * Returns true if any of the nodes has a CSS animation.
             * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
             */
            hasCSSAnimation() {
                return this._dom.hasCSSAnimation(this);
            },

            /**
             * Returns true if any of the nodes has a CSS transition.
             * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
             */
            hasCSSTransition() {
                return this._dom.hasCSSTransition(this);
            },

            /**
             * Returns true if any of the nodes has custom data.
             * @param {string} [key] The data key.
             * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
             */
            hasData(key) {
                return this._dom.hasData(this, key);
            },

            /**
             * Returns true if any of the nodes has the specified dataset value.
             * @param {string} [key] The dataset key.
             * @returns {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
             */
            hasDataset(key) {
                return this._dom.hasDataset(this, key);
            },

            /**
             * Returns true if any of the nodes contains a descendent matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
             */
            hasDescendent(filter) {
                return this._dom.hasDescendent(this, filter);
            },

            /**
             * Returns true if any of the nodes has a DocumentFragment.
             * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
             */
            hasFragment() {
                return this._dom.hasFragment(this);
            },

            /**
             * Returns true if any of the nodes has a specified property.
             * @param {string} property The property name.
             * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
             */
            hasProperty(property) {
                return this._dom.hasProperty(this, property);
            },

            /**
             * Returns true if any of the nodes has a ShadowRoot.
             * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
             */
            hasShadow() {
                return this._dom.hasShadow(this);
            },

            /**
             * Returns true if any of the nodes matches a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
             */
            is(filter) {
                return this._dom.is(this, filter);
            },

            /**
             * Returns true if any of the nodes is connected to the DOM.
             * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
             */
            isConnected() {
                return this._dom.isConnected(this);
            },

            /**
             * Returns true if any of the nodes is considered equal to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
             */
            isEqual(others) {
                return this._dom.isEqual(this, others);
            },

            /**
             * Returns true if any of the elements or a parent of any of the elements is "fixed".
             * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
             */
            isFixed() {
                return this._dom.isFixed(this);
            },

            /**
             * Returns true if any of the nodes is hidden.
             * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
             */
            isHidden() {
                return this._dom.isHidden(this);
            },

            /**
             * Returns true if any of the nodes is considered identical to any of the other nodes.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
             * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
             */
            isSame(others) {
                return this._dom.isSame(this, others);
            },

            /**
             * Returns true if any of the nodes is visible.
             * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
             */
            isVisible() {
                return this._dom.isVisible(this);
            }

        });

        /**
         * QuerySet Utility
         */

        Object.assign(QuerySet.prototype, {

            /**
             * Push new nodes to the stack and sort the results.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
             * @returns {QuerySet} The QuerySet object.
             */
            add(query, context = null) {
                return this.pushStack(
                    Core.unique(
                        Core.merge(
                            [],
                            this._nodes,
                            this._dom.query(query, context).get()
                        )
                    )
                ).sort();
            },

            /**
             * Execute a function for each node in the set.
             * @param {function} callback The callback to execute
             * @returns {QuerySet} The QuerySet object.
             */
            each(callback) {
                this._nodes.forEach(
                    (v, i) => callback(v, i)
                );

                return this;
            },

            /**
             * Reduce the set of nodes to the one at the specified index.
             * @param {number} index The index of the node.
             * @returns {QuerySet} The QuerySet object.
             */
            eq(index) {
                return this.pushNode(
                    this.get(index)
                );
            },

            /**
             * Reduce the set of nodes to the first.
             * @returns {QuerySet} The QuerySet object.
             */
            first() {
                return this.eq(0);
            },

            /**
             * Force a node to be shown, and then execute a callback.
             * @param {DOM~nodeCallback} callback The callback to execute.
             * @returns {*} The result of the callback.
             */
            forceShow(callback) {
                return this._dom.forceShow(this, callback);
            },

            /**
             * Retrieve the DOM node(s) contained in the QuerySet.
             * @param {number} [index=null] The index of the node.
             * @returns {array|Node|Document|Window} The node(s).
             */
            get(index = null) {
                if (index === null) {
                    return this._nodes;
                }

                return index < 0 ?
                    this._nodes[index + this._nodes.length] :
                    this._nodes[index];
            },

            /**
             * Get the index of the first node relative to it's parent node.
             * @returns {number} The index.
             */
            index() {
                return this._dom.index(this);
            },

            /**
             * Get the index of the first node matching a filter.
             * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
             * @returns {number} The index.
             */
            indexOf(filter) {
                return this._dom.indexOf(this, filter);
            },

            /**
             * Reduce the set of nodes to the last.
             * @returns {QuerySet} The QuerySet object.
             */
            last() {
                return this.eq(-1);
            },

            /**
             * Execute a function for each node in the set.
             * @param {function} callback The callback to execute
             * @returns {QuerySet} A new QuerySet object.
             */
            map(callback) {
                return new this.constructor(
                    this._nodes.map(
                        (v, i) => callback(v, i)
                    )
                );
            },

            /**
             * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
             * @returns {QuerySet} The QuerySet object.
             */
            normalize() {
                this._dom.normalize(this);

                return this;
            },

            /**
             * Return a serialized string containing names and values of all form nodes.
             * @returns {string} The serialized string.
             */
            serialize() {
                return this._dom.serialize(this);
            },

            /**
             * Return a serialized array containing names and values of all form nodes.
             * @returns {array} The serialized array.
             */
            serializeArray() {
                return this._dom.serializeArray(this);
            },

            /**
             * Reduce the set of matched nodes to a subset specified by a range of indices.
             * @param {number} [begin] The index to slice from.
             * @param {number} [end]  The index to slice to.
             * @returns {QuerySet} A new QuerySet object.
             */
            slice(begin, end) {
                return new this.constructor(
                    this._nodes.slice(begin, end)
                );
            },

            /**
             * Sort nodes by their position in the document.
             * @returns {QuerySet} The QuerySet object.
             */
            sort() {
                return this.pushStack(
                    this._dom.sort(this)
                );
            },

            /**
             * Return the tag name (lowercase) of the first node.
             * @returns {string} The nodes tag name (lowercase).
             */
            tagName() {
                return this._dom.tagName(this);
            },

            /**
             * Return an iterable from the nodes.
             * @returns {Array Iterator} The iterator object.
             */
            [Symbol.iterator]() {
                return this._nodes.values();
            }

        });

        /**
         * QuerySet (Static) Properties
         */

        /**
         * @callback DOM~animationCallback
         * @param {HTMLElement} node The input node.
         * @param {number} progress The animation progress.
         * @param {object} options The options to use for animating.
         */

        /**
         * @callback DOM~eventCallback
         * @param {Event} event The event object.
         */

        /**
         * @callback DOM~nodeCallback
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         */

        /**
         * @callback DOM~queueCallback
         * @param {HTMLElement} node The input node.
         */

        dom = new DOM;

        return {
            AjaxRequest,
            Animation,
            AnimationSet,
            DOM,
            dom,
            QuerySet,
            QuerySetImmutable
        };

    });

    return {
        AjaxRequest: window.AjaxRequest,
        Animation: window.Animation,
        AnimationSet: window.AnimationSet,
        Core: window.Core,
        DOM: window.DOM,
        dom: window.dom,
        QuerySet,
        QuerySetImmutable
    };

});