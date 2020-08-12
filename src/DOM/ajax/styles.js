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
        if (!cache) {
            url = AjaxRequest.appendQueryString(url, '_', Date.now());
        }

        return new Promise((resolve, reject) => {
            const link = this.create('link', {
                attributes: {
                    href: url,
                    rel: 'stylesheet',
                    ...attributes
                }
            });

            link.onload = _ => resolve();
            link.onerror = _ => reject();

            this._context.head.appendChild(link);
        });
    },

    /**
     * Import multiple CSS Stylesheet files.
     * @param {string[]} urls An array of stylesheet URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyles(urls, cache = true) {
        return Promise.all(
            urls.map(url =>
                this.loadStyle(url, cache)
            )
        );
    }

});
