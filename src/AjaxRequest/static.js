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
        const searchParams = this.getSearchParams(url);

        searchParams.append(key, value);

        return this.setSearchParams(url, searchParams);
    },

    /**
     * Get the URL from a URL string.
     * @param {string} url The URL.
     * @returns {URL} The URL.
     */
    getURL(url) {
        const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');

        return new URL(url, baseHref);
    },

    /**
     * Get the URLSearchParams from a URL string.
     * @param {string} url The URL.
     * @returns {URLSearchParams} The URLSearchParams.
     */
    getSearchParams(url) {
        return this.getURL(url).searchParams;
    },

    /**
     * Merge two or more URLSearchParams.
     * @param  {...URLSearchParams} params The URLSearchParms.
     * @returns {URLSearchParams} The new URLSearchParams.
     */
    mergeSearchParams(...params) {
        const searchParams = new URLSearchParams('');
        for (const param of params) {
            for (const [key, value] of param.entries()) {
                searchParams.set(key, value);
            }
        }

        return searchParams;
    },

    /**
     * Set the URLSearchParams for a URL string.
     * @param {string} url The URL.
     * @param {URLSearchParams} searchParams The URLSearchParams.
     * @returns The new URL string.
     */
    setSearchParams(url, searchParams) {
        const urlData = this.getURL(url);

        urlData.search = searchParams.toString();

        const newUrl = urlData.toString();

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
