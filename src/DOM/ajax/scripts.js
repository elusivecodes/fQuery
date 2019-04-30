/**
 * DOM AJAX Scripts
 */

Object.assign(DOM.prototype, {

    /**
     * Load and execute a JavaScript file.
     * @param {string} script The URL of the script.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScript(script, cache = true) {
        return this.ajax(script, { cache })
            .then(response =>
                eval.apply(window, response.response)
            );
    },

    /**
     * Load and executes multiple JavaScript files (in order).
     * @param {string[]} scripts An array of script URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScripts(scripts, cache = true) {
        return Promise.all
            (
                scripts.map(script =>
                    this.ajax(script, { cache })
                )
            )
            .then(responses => {
                for (const response of responses) {
                    eval.apply(window, response.response);
                }
            });
    }

});
