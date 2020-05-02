class MockXMLHttpRequest {

    constructor() {
        this.data = {
            headers: {}
        };
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

        if (this.forceError) {
            if (this.onerror) {
                const errorEvent = new Event('error');
                this.onerror(errorEvent);
            }
            return;
        }

        if (this.onprogress) {
            setTimeout(_ => {
                const progressEvent = new Event('progress');
                progressEvent.loaded = 500;
                progressEvent.total = 1000;

                this.onprogress(progressEvent);
            }, 5);
        }

        this.data.status = 200;
        this.response = 'Test';

        if (this.onload) {
            setTimeout(_ => {
                const loadEvent = new Event('load');
                this.onload(loadEvent);
            }, 10);
        }
    }

    setRequestHeader(header, value) {
        this.data.headers[header] = value;
    }

}
