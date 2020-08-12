/**
 * AjaxRequest (Static) Properties
 */

Object.assign(AjaxRequest, {

    // AjaxRequest defaults
    defaults: {
        afterSend: null,
        beforeSend: null,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        data: null,
        headers: {},
        isLocal: null,
        method: 'GET',
        onProgress: null,
        onUploadProgress: null,
        processData: true,
        rejectOnCancel: true,
        responseType: null,
        url: null
    },

    // Use mock
    useMock: false,

    // Local protocol test
    _localRegExp: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/

});

// Set the AjaxRequest prototype
Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);
