class MockXMLHttpRequest {

    constructor() {
        this.data = {
            headers: {}
        };
        this.status = 200;
        this.upload = {};
    }

    abort() {
        clearTimeout(this._uploadTimer);
        clearTimeout(this._progressTimer);
        clearTimeout(this._completeTimer);
    }

    open(method, url, async) {
        this.data.method = method;
        this.data.url = url;
        this.data.async = async;
    }

    send(data) {
        this.data.body = data;

        if (this.responseType) {
            this.data.responseType = this.responseType;
        }

        if (this.upload && this.upload.onprogress) {
            this._uploadTimer = setTimeout(_ => {
                this._uploadTimer = null;

                const progressEvent = new Event('progress');
                progressEvent.loaded = 5000;
                progressEvent.total = 10000;

                this.upload.onprogress(progressEvent);
            }, 10);
        }

        if (this.onprogress) {
            this._progressTimer = setTimeout(_ => {
                this._progressTimer = null;

                const progressEvent = new Event('progress');
                progressEvent.loaded = 500;
                progressEvent.total = 1000;

                this.onprogress(progressEvent);
            }, 10);
        }

        this._completeTimer = setTimeout(_ => {
            this._completeTimer = null;

            if (this.forceError) {
                if (this.onerror) {
                    const errorEvent = new Event('error');
                    this.onerror(errorEvent);
                }
                return;
            }

            this.data.status = this.status;
            this.response = 'Test';

            if (this.onload) {
                const loadEvent = new Event('load');
                this.onload(loadEvent);
            }
        }, 20);
    }

    setRequestHeader(header, value) {
        this.data.headers[header] = value;
    }

}
