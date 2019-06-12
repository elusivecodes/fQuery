/**
 * DOM AJAX Styles
 */

Object.assign(DOM.prototype, {

    /**
     * Import a CSS Stylesheet file.
     * @param {string} url The URL of the stylesheet.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyle(url, cache = true) {
        return this.ajax({ url, cache })
            .then(response =>
                DOM._insertBefore(
                    this._context.head,
                    this.create(
                        'style',
                        {
                            html: response.response
                        }
                    )
                )
            );
    },

    /**
     * Import multiple CSS Stylesheet files.
     * @param {string[]} urls An array of stylesheet URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyles(urls, cache = true) {
        return Promise.all
            (
                urls.map(url =>
                    this.ajax({ url, cache })
                )
            )
            .then(responses => {
                for (const response of responses) {
                    DOM._insertBefore(
                        this._context.head,
                        this.create(
                            'style',
                            {
                                html: response.response
                            }
                        )
                    );
                }

            });
    }

});
