/**
 * DOM AJAX Scripts
 */

Object.assign(DOM.prototype, {

    /**
     * Load and execute a JavaScript file.
     * @param {string} url The URL of the script.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    loadScript(url, cache = true) {
        return new AjaxRequest({ url, cache })
            .then(response =>
                eval.call(window, response.response)
            );
    },

    /**
     * Load and executes multiple JavaScript files (in order).
     * @param {string[]} urls An array of script URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScripts(urls, cache = true) {
        return Promise.all
            (
                urls.map(url =>
                    new AjaxRequest({ url, cache })
                )
            )
            .then(responses => {
                for (const response of responses) {
                    eval.call(window, response.response);
                }
            });
    }

});
