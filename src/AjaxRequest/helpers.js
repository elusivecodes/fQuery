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

        if (this._options.data) {
            if (this._options.processData && Core.isObject(this._options.data)) {
                if (this._options.contentType === 'application/json') {
                    this._options.data = JSON.stringify(this._options.data);
                } else if (this._options.contentType === 'application/x-www-form-urlencoded') {
                    this._options.data = this.constructor._parseParams(this._options.data);
                } else {
                    this._options.data = this.constructor._parseFormData(this._options.data);
                }
            }

            if (this._options.method === 'GET') {
                const dataParams = new URLSearchParams(this._options.data);

                const searchParams = this.constructor.getSearchParams(this._options.url);
                for (const [key, value] of dataParams.entries()) {
                    searchParams.append(key, value);
                }

                this._options.url = this.constructor.setSearchParams(this._options.url, searchParams);
                this._options.data = null;
            }
        }

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

        this._xhr.send(this._options.data);

        if (this._options.afterSend) {
            this._options.afterSend(this._xhr);
        }
    }

});

