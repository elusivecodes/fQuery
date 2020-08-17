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
