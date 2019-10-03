/**
 * DOM (Static) Helpers
 */

Object.assign(DOM, {

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
            .flatMap(val => val.split(' '));
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
    },

    /**
     * Return a FormData object from an array or object.
     * @param {array|object} data The input data.
     * @returns {FormData} The FormData object.
     */
    _parseFormData(data) {
        const formData = new FormData;

        if (Core.isArray(data)) {
            const obj = {};
            for (const value of data) {
                obj[value.name] = value.value;
            }
            data = obj;
        }

        this._parseFormValues(data, formData);

        return formData;
    },

    /**
     * Recursively append an object to a FormData object.
     * @param {object} data The input object.
     * @param {FormData} formData The FormData object to append to.
     * @param {string} [prevKey] The previous key value.
     */
    _parseFormValues(data, formData, prevKey) {
        let key;
        for (key in data) {
            const value = data[key];

            if (prevKey) {
                key = `${prevKey}[${key}]`;
            }

            if (Core.isPlainObject(value)) {
                this._parseFormValues(value, formData, key);
            } else if (!Core.isArray(value)) {
                formData.set(key, value);
            } else {
                for (const val of value) {
                    formData.append(key, val);
                }
            }
        }
    },

    /**
     * Return a string attribute, or a flat array of attributes from a key and value.
     * @param {string} key The input key.
     * @param {array|object|string} value The input value.
     * @returns {string|array} The parsed attributes.
     */
    _parseParam(key, value) {
        if (Core.isArray(value)) {
            return value.map(val =>
                this._parseParam(key, val)
            ).flat();
        }

        if (Core.isObject(value)) {
            return Object.keys(value)
                .map(subKey =>
                    this._parseParam(
                        `${key}[${subKey}]`,
                        value[subKey]
                    )
                ).flat();
        }

        return `${key}=${value}`;
    },

    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @returns {string} The URI-encoded attribute string.
     */
    _parseParams(data) {
        let values = [];

        if (Core.isArray(data)) {
            values = data.map(value =>
                this._parseParam(
                    value.name,
                    value.value
                )
            );
        } else if (Core.isObject(data)) {
            values = Object.keys(data)
                .map(key =>
                    this._parseParam(key, data[key])
                );
        }

        return values
            .flatMap(encodeURI)
            .join('&');
    },

    /**
     * Return a prefixed selector string.
     * @param {string} selectors The input selectors.
     * @param {string} prefix The input prefix.
     * @returns {string} The prefixed selector.
     */
    _prefixSelectors(selectors, prefix) {
        return selectors.split(this._splitRegExp)
            .filter(select => !!select)
            .map(select => `${prefix} ${select}`);
    }

});
