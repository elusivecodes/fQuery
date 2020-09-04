## Ajax Request

The *AjaxRequest* class provides a Promise-based wrapper for performing XHR requests.

- `options` is an object containing options for the request.
    - `url` is a string containing the URL for the request, and will default to the current window location.
    - `method` is a string containing the method to use for the request, and will default to "*GET*".
    - `data` can be an object, array, string or *FormData* containing data to send with the request, and will default to *null*.
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

```javascript
const request = new AjaxRequest(options);
```

The *AjaxRequest* object resolves when the request is completed, or rejects on failure.

### Cancelling A Request

It is also possible to cancel a pending *AjaxRequest*.

- `reason` is a string indicating the reason the request was cancelled, and will default to "*Request was cancelled*".

```javascript
request.cancel(reason);
```