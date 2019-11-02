/**
 * AjaxRequest (Static) Helpers
 */

Object.assign(AjaxRequest, {

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
            const values = [];
            for (const val of value) {
                values.push(
                    this._parseParam(key, val)
                );
            }
            return values.flat();
        }

        if (Core.isObject(value)) {
            const values = [];
            for (const key in value) {
                values.push(
                    this._parseParam(
                        `${key}[${subKey}]`,
                        value[subKey]
                    )
                );
            }
            return values.flat();
        }

        return `${key}=${value}`;
    },

    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @returns {string} The URI-encoded attribute string.
     */
    _parseParams(data) {
        const values = [];

        if (Core.isArray(data)) {
            for (const value of data) {
                values.push(
                    this._parseParam(
                        value.name,
                        value.value
                    )
                )
            }
        } else if (Core.isObject(data)) {
            for (const key in data) {
                values.push(
                    this._parseParam(key, data[key])
                );
            }
        }

        return values
            .flatMap(encodeURI)
            .join('&');
    }

});
