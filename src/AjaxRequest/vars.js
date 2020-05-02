/**
 * AjaxRequest (Static) Properties
 */

Object.assign(AjaxRequest, {

    // AjaxRequest defaults
    defaults: {
        afterSend: false,
        beforeSend: false,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        data: null,
        headers: {},
        method: 'GET',
        onProgress: false,
        onUploadProgress: false,
        processData: true,
        rejectOnCancel: true,
        responseType: false,
        url: false
    },

    // Local protocol test
    _localRegExp: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/

});

// Set the AjaxRequest prototype
Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);
