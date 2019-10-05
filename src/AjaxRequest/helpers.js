/**
 * AjaxRequest Helpers
 */

Object.assign(AjaxRequest.prototype, {

    /**
     * Build the XHR request object.
     */
    _build() {
        this._xhr = new XMLHttpRequest;

        this._xhr.open(this._settings.method, this._settings.url, true);

        for (const key in this._settings.headers) {
            this._xhr.setRequestHeader(key, this._settings.headers[key]);
        }

        if (this._settings.responseType) {
            this._xhr.responseType = this._settings.responseType;
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

        if (this._settings.onProgress) {
            this._xhr.onprogress = e =>
                this._settings.onProgress(e.loaded / e.total, this._xhr, e);
        }

        if (this._settings.onUploadProgress) {
            this._xhr.upload.onprogress = e =>
                this._settings.onUploadProgress(e.loaded / e.total, this._xhr, e);
        }
    },

    /**
     * Process the data and send the XHR request.
     */
    _send() {
        if (this._settings.beforeSend) {
            this._settings.beforeSend(this._xhr);
        }

        if (this._settings.data && this._settings.processData) {
            if (this._settings.contentType === 'application/json') {
                this._settings.data = JSON.stringify(this._settings.data);
            } else if (this._settings.contentType === 'application/x-www-form-urlencoded') {
                this._settings.data = AjaxRequest._parseParams(this._settings.data);
            } else {
                this._settings.data = AjaxRequest._parseFormData(this._settings.data);
            }
        }

        this._xhr.send(this._settings.data);

        if (this._settings.afterSend) {
            this._settings.afterSend(this._xhr);
        }
    }

});
