"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * FrostDOM v1.0
 * https://github.com/elusivecodes/FrostDOM
 */
(function (global, factory) {
  'use strict';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory;
  } else {
    Object.assign(global, factory(global));
  }
})(void 0, function (window) {
  'use strict';

  if (!window) {
    throw new Error('FrostDOM requires a Window.');
  }

  if (!('Core' in window)) {
    throw new Error('FrostDOM requires FrostCore.');
  }

  var Core = window.Core;
  var document = window.document;
  /**
   * AjaxRequest Class
   * @class
   */

  var AjaxRequest = /*#__PURE__*/function () {
    /**
     * New AjaxRequest constructor.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object|FormData} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    function AjaxRequest(settings) {
      var _this = this;

      _classCallCheck(this, AjaxRequest);

      this._settings = Core.extend({}, this.constructor.defaults, settings);

      if (!this._settings.url) {
        this._settings.url = window.location;
      }

      if (!this._settings.cache) {
        var url = new URL(this._settings.url);
        url.searchParams.append('_', Date.now());
        this._settings.url = url.toString();
      }

      if (!('Content-Type' in this._settings.headers) && this._settings.contentType) {
        this._settings.headers['Content-Type'] = this._settings.contentType;
      }

      this._isLocal = this.constructor._localRegExp.test(location.protocol);

      if (!this._isLocal && !('X-Requested-With' in this._settings.headers)) {
        this._settings.headers['X-Requested-With'] = 'XMLHttpRequest';
      }

      this._isResolved = false;
      this._isRejected = false;
      this._isCancelled = false;
      this._promise = new Promise(function (resolve, reject) {
        _this._resolve = function (value) {
          _this._isResolved = true;
          resolve(value);
        };

        _this._reject = function (error) {
          _this._isRejected = true;
          reject(error);
        };
      });

      this._build();

      this._events();

      this._send();
    }
    /**
     * Cancel a pending request.
     * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
     */


    _createClass(AjaxRequest, [{
      key: "cancel",
      value: function cancel() {
        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Request was cancelled';

        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }

        this._xhr.abort();

        this._isCancelled = true;

        if (this._settings.rejectOnCancel) {
          this._reject({
            status: this._xhr.status,
            xhr: this._xhr,
            reason: reason
          });
        }
      }
      /**
       * Execute a callback if the request is rejected.
       * @param {function} [onRejected] The callback to execute if the request is rejected.
       * @returns {Promise} A new pending Promise.
       */

    }, {
      key: "catch",
      value: function _catch(onRejected) {
        return this._promise["catch"](onRejected);
      }
      /**
       * Execute a callback once the request is settled (resolved or rejected).
       * @param {function} [onRejected] The callback to execute once the request is settled.
       * @returns {Promise} A new pending Promise.
       */

    }, {
      key: "finally",
      value: function _finally(onFinally) {
        return this._promise["finally"](onFinally);
      }
      /**
       * Execute a callback once the request is resolved (or optionally rejected).
       * @param {function} onFulfilled The callback to execute if the request is resolved.
       * @param {function} [onRejected] The callback to execute if the request is rejected.
       * @returns {Promise} A new pending Promise.
       */

    }, {
      key: "then",
      value: function then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
      }
    }]);

    return AjaxRequest;
  }();
  /**
   * AjaxRequest Helpers
   */


  Object.assign(AjaxRequest.prototype, {
    /**
     * Build the XHR request object.
     */
    _build: function _build() {
      this._xhr = new XMLHttpRequest();

      this._xhr.open(this._settings.method, this._settings.url, true);

      for (var key in this._settings.headers) {
        this._xhr.setRequestHeader(key, this._settings.headers[key]);
      }

      if (this._settings.responseType) {
        this._xhr.responseType = this._settings.responseType;
      }
    },

    /**
     * Attach events to the XHR request object.
     */
    _events: function _events() {
      var _this2 = this;

      this._xhr.onload = function (e) {
        if (_this2._xhr.status > 400) {
          _this2._reject({
            status: _this2._xhr.status,
            xhr: _this2._xhr,
            event: e
          });
        } else {
          _this2._resolve({
            response: _this2._xhr.response,
            xhr: _this2._xhr,
            event: e
          });
        }
      };

      if (!this._isLocal) {
        this._xhr.onerror = function (e) {
          return _this2._reject({
            status: _this2._xhr.status,
            xhr: _this2._xhr,
            event: e
          });
        };
      }

      if (this._settings.onProgress) {
        this._xhr.onprogress = function (e) {
          return _this2._settings.onProgress(e.loaded / e.total, _this2._xhr, e);
        };
      }

      if (this._settings.onUploadProgress) {
        this._xhr.upload.onprogress = function (e) {
          return _this2._settings.onUploadProgress(e.loaded / e.total, _this2._xhr, e);
        };
      }
    },

    /**
     * Process the data and send the XHR request.
     */
    _send: function _send() {
      if (this._settings.beforeSend) {
        this._settings.beforeSend(this._xhr);
      }

      if (this._settings.data && this._settings.processData) {
        if (this._settings.contentType === 'application/json') {
          this._settings.data = JSON.stringify(this._settings.data);
        } else if (this._settings.contentType === 'application/x-www-form-urlencoded') {
          this._settings.data = this.constructor._parseParams(this._settings.data);
        } else {
          this._settings.data = this.constructor._parseFormData(this._settings.data);
        }
      }

      this._xhr.send(this._settings.data);

      if (this._settings.afterSend) {
        this._settings.afterSend(this._xhr);
      }
    }
  });
  /**
   * AjaxRequest (Static) Helpers
   */

  Object.assign(AjaxRequest, {
    /**
     * Return a FormData object from an array or object.
     * @param {array|object} data The input data.
     * @returns {FormData} The FormData object.
     */
    _parseFormData: function _parseFormData(data) {
      var formData = new FormData();

      if (Core.isArray(data)) {
        var obj = {};

        var _iterator = _createForOfIteratorHelper(data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var value = _step.value;
            obj[value.name] = value.value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        data = obj;
      }

      this._parseFormValues(data, formData);

      return formData;
    },

    /**
     * Recursively append an object to a FormData object.
     * @param {object} data The input object.
     * @param {FormData} formData The FormData object to append to.
     * @param {string} [prevKey] The previous key value.
     */
    _parseFormValues: function _parseFormValues(data, formData, prevKey) {
      var key;

      for (key in data) {
        var value = data[key];

        if (prevKey) {
          key = "".concat(prevKey, "[").concat(key, "]");
        }

        if (Core.isPlainObject(value)) {
          this._parseFormValues(value, formData, key);
        } else if (!Core.isArray(value)) {
          formData.set(key, value);
        } else {
          var _iterator2 = _createForOfIteratorHelper(value),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var val = _step2.value;
              formData.append(key, val);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    },

    /**
     * Return a string attribute, or a flat array of attributes from a key and value.
     * @param {string} key The input key.
     * @param {array|object|string} value The input value.
     * @returns {string|array} The parsed attributes.
     */
    _parseParam: function _parseParam(key, value) {
      if (Core.isArray(value)) {
        var values = [];

        var _iterator3 = _createForOfIteratorHelper(value),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var val = _step3.value;
            values.push(this._parseParam(key, val));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return values.flat();
      }

      if (Core.isObject(value)) {
        var _values = [];

        for (var _key in value) {
          _values.push(this._parseParam("".concat(_key, "[").concat(subKey, "]"), value[subKey]));
        }

        return _values.flat();
      }

      return "".concat(key, "=").concat(value);
    },

    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @returns {string} The URI-encoded attribute string.
     */
    _parseParams: function _parseParams(data) {
      var values = [];

      if (Core.isArray(data)) {
        var _iterator4 = _createForOfIteratorHelper(data),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var value = _step4.value;
            values.push(this._parseParam(value.name, value.value));
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else if (Core.isObject(data)) {
        for (var key in data) {
          values.push(this._parseParam(key, data[key]));
        }
      }

      var paramString = values.flat().join('&');
      return encodeURI(paramString);
    }
  });
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
      data: false,
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
  }); // Set the AjaxRequest prototype

  Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);
  /**
   * DOM Class
   * @class
   */

  var DOM =
  /**
   * New DOM constructor.
   * @param {Document} [context=document] The document context.
   * @returns {DOM} A new DOM object.
   */
  function DOM() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    _classCallCheck(this, DOM);

    this._context = context;
  };
  /**
   * DOM AJAX
   */


  Object.assign(DOM.prototype, {
    /**
     * New AjaxRequest constructor.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object|FormData} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    ajax: function ajax(options) {
      return new AjaxRequest(options);
    },

    /**
     * Perform an XHR DELETE request.
     * @param {string} url The URL of the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=DELETE] The HTTP method of the request.
     * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    "delete": function _delete(url, options) {
      return new AjaxRequest(_objectSpread({
        url: url,
        method: 'DELETE'
      }, options));
    },

    /**
     * Perform an XHR GET request.
     * @param {string} url The URL of the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    get: function get(url, options) {
      return new AjaxRequest(_objectSpread({
        url: url
      }, options));
    },

    /**
     * Perform an XHR PATCH request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=PATCH] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    patch: function patch(url, data, options) {
      return new AjaxRequest(_objectSpread({
        url: url,
        data: data,
        method: 'PATCH'
      }, options));
    },

    /**
     * Perform an XHR POST request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    post: function post(url, data, options) {
      return new AjaxRequest(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
      }, options));
    },

    /**
     * Perform an XHR PUT request.
     * @param {string} url The URL of the request.
     * @param {string|array|object|FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=PUT] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    put: function put(url, data, options) {
      return new AjaxRequest(_objectSpread({
        url: url,
        data: data,
        method: 'PUT'
      }, options));
    },

    /**
     * Perform an XHR request for a file upload.
     * @param {string} url The URL of the request.
     * @param {FormData} data The data to send with the request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string} [options.contentType=false] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=false] Whether to process the data based on the content type.
     * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
     * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    upload: function upload(url, data, options) {
      return new AjaxRequest(_objectSpread({
        url: url,
        data: data,
        method: 'POST',
        contentType: false
      }, options));
    }
  });
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
    loadScript: function loadScript(url) {
      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new AjaxRequest({
        url: url,
        cache: cache
      }).then(function (response) {
        return eval.call(window, response.response);
      });
    },

    /**
     * Load and executes multiple JavaScript files (in order).
     * @param {string[]} urls An array of script URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScripts: function loadScripts(urls) {
      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return Promise.all(urls.map(function (url) {
        return new AjaxRequest({
          url: url,
          cache: cache
        });
      })).then(function (responses) {
        var _iterator5 = _createForOfIteratorHelper(responses),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var response = _step5.value;
            eval.call(window, response.response);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      });
    }
  });
  /**
   * DOM AJAX Styles
   */

  Object.assign(DOM.prototype, {
    /**
     * Import a CSS Stylesheet file.
     * @param {string} url The URL of the stylesheet.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
     */
    loadStyle: function loadStyle(url) {
      var _this3 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new AjaxRequest({
        url: url,
        cache: cache
      }).then(function (response) {
        return DOMNode.insertBefore(_this3._context.head, _this3.create('style', {
          html: response.response
        }));
      });
    },

    /**
     * Import multiple CSS Stylesheet files.
     * @param {string[]} urls An array of stylesheet URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyles: function loadStyles(urls) {
      var _this4 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return Promise.all(urls.map(function (url) {
        return new AjaxRequest({
          url: url,
          cache: cache
        });
      })).then(function (responses) {
        var _iterator6 = _createForOfIteratorHelper(responses),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var response = _step6.value;
            DOMNode.insertBefore(_this4._context.head, _this4.create('style', {
              html: response.response
            }));
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      });
    }
  });
  /**
   * DOM Cookie
   */

  Object.assign(DOM.prototype, {
    /**
     * Get a cookie value.
     * @param {string} name The cookie name.
     * @param {Boolean} [json=false] Whether the cookie value is in JSON.
     * @returns {*} The cookie value.
     */
    getCookie: function getCookie(name) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cookie = decodeURIComponent(this._context.cookie).split(';').find(function (cookie) {
        return cookie.trimStart().substring(0, name.length) === name;
      });

      if (!cookie) {
        return null;
      }

      var value = cookie.trimStart().substring(name.length + 1);
      return json ? JSON.parse(value) : value;
    },

    /**
     * Remove a cookie.
     * @param {string} name The cookie name.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires=-1] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The cookie path.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    removeCookie: function removeCookie(name, options) {
      this.setCookie(name, '', _objectSpread({
        expires: -1
      }, options));
    },

    /**
     * Set a cookie value.
     * @param {string} name The cookie name.
     * @param {*} value The cookie value.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The path to use for the cookie.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     * @param {Boolean} [json=false] Whether to JSON encode the cookie value.
     */
    setCookie: function setCookie(name, value, options) {
      var json = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!name) {
        return;
      }

      if (json) {
        value = JSON.stringify(value);
      }

      var cookie = "".concat(name, "=").concat(value);

      if (options) {
        if (options.expires) {
          var date = new Date();
          date.setTime(date.getTime() + options.expires * 1000);
          cookie += ";expires=".concat(date.toUTCString());
        }

        if (options.path) {
          cookie += ";path=".concat(options.path);
        }

        if (options.secure) {
          cookie += ';secure';
        }
      }

      this._context.cookie = cookie;
    }
  });
  /**
   * DOM Animate
   */

  Object.assign(DOM.prototype, {
    /**
     * Add an animation to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    animate: function animate(nodes, callback, options) {
      var _this5 = this;

      nodes = this.parseNodes(nodes);
      var promises = nodes.map(function (node) {
        return _this5.constructor._animate(node, callback, _objectSpread({}, _this5.constructor.animationDefaults, {}, options));
      });

      this.constructor._start();

      return Promise.all(promises);
    },

    /**
     * Stop all animations for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    stop: function stop(nodes) {
      var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      nodes = this.parseNodes(nodes);

      var _iterator7 = _createForOfIteratorHelper(nodes),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var node = _step7.value;

          this.constructor._stop(node, finish);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  });
  /**
   * DOM Animations
   */

  Object.assign(DOM.prototype, {
    /**
     * Drop each node into place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    dropIn: function dropIn(nodes, options) {
      return this.slideIn(nodes, _objectSpread({
        direction: 'top'
      }, options));
    },

    /**
     * Drop each node out of place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    dropOut: function dropOut(nodes, options) {
      return this.slideOut(nodes, _objectSpread({
        direction: 'top'
      }, options));
    },

    /**
     * Fade the opacity of each node in.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    fadeIn: function fadeIn(nodes, options) {
      return this.animate(nodes, function (node, progress) {
        return DOMNode.setStyle(node, 'opacity', progress < 1 ? progress : '');
      }, options);
    },

    /**
     * Fade the opacity of each node out.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    fadeOut: function fadeOut(nodes, options) {
      return this.animate(nodes, function (node, progress) {
        return DOMNode.setStyle(node, 'opacity', progress < 1 ? 1 - progress : '');
      }, options);
    },

    /**
     * Rotate each node in on an X,Y.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    rotateIn: function rotateIn(nodes, options) {
      return this.animate(nodes, function (node, progress, options) {
        return DOMNode.setStyle(node, 'transform', progress < 1 ? "rotate3d(".concat(options.x, ", ").concat(options.y, ", 0, ").concat((90 - progress * 90) * (options.inverse ? -1 : 1), "deg)") : '');
      }, _objectSpread({
        x: 0,
        y: 1
      }, options));
    },

    /**
     * Rotate each node out on an X,Y.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    rotateOut: function rotateOut(nodes, options) {
      return this.animate(nodes, function (node, progress, options) {
        return DOMNode.setStyle(node, 'transform', progress < 1 ? "rotate3d(".concat(options.x, ", ").concat(options.y, ", 0, ").concat(progress * 90 * (options.inverse ? -1 : 1), "deg)") : '');
      }, _objectSpread({
        x: 0,
        y: 1
      }, options));
    },

    /**
     * Slide each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideIn: function slideIn(nodes, options) {
      var _this6 = this;

      return this.animate(nodes, function (node, progress, options) {
        if (progress === 1) {
          DOMNode.setStyle(node, 'overflow', '');

          if (options.useGpu) {
            DOMNode.setStyle(node, 'transform', '');
          } else {
            DOMNode.setStyle(node, 'margin-left', '');
            DOMNode.setStyle(node, 'margin-top', '');
          }

          return;
        }

        var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
        var translateStyle, size, inverse;

        if (['top', 'bottom'].includes(dir)) {
          translateStyle = options.useGpu ? 'Y' : 'margin-top';
          size = _this6.constructor._height(node);
          inverse = dir === 'top';
        } else {
          translateStyle = options.useGpu ? 'X' : 'margin-left';
          size = _this6.constructor._width(node);
          inverse = dir === 'left';
        }

        var translateAmount = (size - size * progress) * (inverse ? -1 : 1);

        if (options.useGpu) {
          DOMNode.setStyle(node, 'transform', "translate".concat(translateStyle, "(").concat(translateAmount, "px)"));
        } else {
          DOMNode.setStyle(node, translateStyle, "".concat(translateAmount, "px"));
        }
      }, _objectSpread({
        direction: 'bottom',
        useGpu: true
      }, options));
    },

    /**
     * Slide each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideOut: function slideOut(nodes, options) {
      var _this7 = this;

      return this.animate(nodes, function (node, progress, options) {
        if (progress === 1) {
          DOMNode.setStyle(node, 'overflow', '');

          if (options.useGpu) {
            DOMNode.setStyle(node, 'transform', '');
          } else {
            DOMNode.setStyle(node, 'margin-left', '');
            DOMNode.setStyle(node, 'margin-top', '');
          }

          return;
        }

        var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
        var translateStyle, size, inverse;

        if (['top', 'bottom'].includes(dir)) {
          translateStyle = options.useGpu ? 'Y' : 'margin-top';
          size = _this7.constructor._height(node);
          inverse = dir === 'top';
        } else {
          translateStyle = options.useGpu ? 'X' : 'margin-left';
          size = _this7.constructor._width(node);
          inverse = dir === 'left';
        }

        var translateAmount = size * progress * (inverse ? -1 : 1);

        if (options.useGpu) {
          DOMNode.setStyle(node, 'transform', "translate".concat(translateStyle, "(").concat(translateAmount, "px)"));
        } else {
          DOMNode.setStyle(node, translateStyle, "".concat(translateAmount, "px"));
        }
      }, _objectSpread({
        direction: 'bottom',
        useGpu: true
      }, options));
    },

    /**
     * Squeeze each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeIn: function squeezeIn(nodes, options) {
      var _this8 = this;

      nodes = this.parseNodes(nodes);
      options = _objectSpread({}, this.constructor.animationDefaults, {
        direction: 'bottom',
        useGpu: true
      }, options);
      var promises = nodes.map(function (node) {
        var initialHeight = DOMNode.getStyle(node, 'height');
        var initialWidth = DOMNode.getStyle(node, 'width');
        DOMNode.setStyle(node, 'overflow', 'hidden');
        return _this8.constructor._animate(node, function (node, progress, options) {
          DOMNode.setStyle(node, 'height', initialHeight);
          DOMNode.setStyle(node, 'width', initialWidth);

          if (progress === 1) {
            DOMNode.setStyle(node, 'overflow', '');

            if (options.useGpu) {
              DOMNode.setStyle(node, 'transform', '');
            } else {
              DOMNode.setStyle(node, 'margin-left', '');
              DOMNode.setStyle(node, 'margin-top', '');
            }

            return;
          }

          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var sizeStyle, translateStyle;

          if (['top', 'bottom'].includes(dir)) {
            sizeStyle = 'height';

            if (dir === 'top') {
              translateStyle = options.useGpu ? 'Y' : 'margin-top';
            }
          } else {
            sizeStyle = 'width';

            if (dir === 'left') {
              translateStyle = options.useGpu ? 'X' : 'margin-left';
            }
          }

          var size = DOM["_".concat(sizeStyle)](node),
              amount = size * progress;
          DOMNode.setStyle(node, sizeStyle, "".concat(amount, "px"));

          if (translateStyle) {
            var translateAmount = size - amount;

            if (options.useGpu) {
              DOMNode.setStyle(node, 'transform', "translate".concat(translateStyle, "(").concat(translateAmount, "px)"));
            } else {
              DOMNode.setStyle(node, translateStyle, "".concat(translateAmount, "px"));
            }
          }
        }, options);
      });

      this.constructor._start();

      return Promise.all(promises);
    },

    /**
     * Squeeze each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeOut: function squeezeOut(nodes, options) {
      var _this9 = this;

      nodes = this.parseNodes(nodes);
      options = _objectSpread({}, this.constructor.animationDefaults, {
        direction: 'bottom',
        useGpu: true
      }, options);
      var promises = nodes.map(function (node) {
        var initialHeight = DOMNode.getStyle(node, 'height');
        var initialWidth = DOMNode.getStyle(node, 'width');
        DOMNode.setStyle(node, 'overflow', 'hidden');
        return _this9.constructor._animate(node, function (node, progress, options) {
          DOMNode.setStyle(node, 'height', initialHeight);
          DOMNode.setStyle(node, 'width', initialWidth);

          if (progress === 1) {
            DOMNode.setStyle(node, 'overflow', '');

            if (options.useGpu) {
              DOMNode.setStyle(node, 'transform', '');
            } else {
              DOMNode.setStyle(node, 'margin-left', '');
              DOMNode.setStyle(node, 'margin-top', '');
            }

            return;
          }

          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var sizeStyle, translateStyle;

          if (['top', 'bottom'].includes(dir)) {
            sizeStyle = 'height';

            if (dir === 'top') {
              translateStyle = options.useGpu ? 'Y' : 'margin-top';
            }
          } else {
            sizeStyle = 'width';

            if (dir === 'left') {
              translateStyle = options.useGpu ? 'X' : 'margin-left';
            }
          }

          var size = DOM["_".concat(sizeStyle)](node),
              amount = size - size * progress;
          DOMNode.setStyle(node, sizeStyle, "".concat(amount, "px"));

          if (translateStyle) {
            var translateAmount = size - amount;

            if (options.useGpu) {
              DOMNode.setStyle(node, 'transform', "translate".concat(translateStyle, "(").concat(translateAmount, "px)"));
            } else {
              DOMNode.setStyle(node, translateStyle, "".concat(translateAmount, "px"));
            }
          }
        }, options);
      });

      this.constructor._start();

      return Promise.all(promises);
    }
  });
  /**
   * DOM Queue
   */

  Object.assign(DOM.prototype, {
    /**
     * Clear the queue of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    clearQueue: function clearQueue(nodes) {
      nodes = this.parseNodes(nodes);

      var _iterator8 = _createForOfIteratorHelper(nodes),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var node = _step8.value;

          this.constructor._clearQueue(node);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    },

    /**
     * Queue a callback on each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    queue: function queue(nodes, callback) {
      nodes = this.parseNodes(nodes);

      var _iterator9 = _createForOfIteratorHelper(nodes),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var node = _step9.value;

          this.constructor._queue(node, callback);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  });
  /**
   * DOM Attributes
   */

  Object.assign(DOM.prototype, {
    /**
     * Get attribute value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [attribute] The attribute name.
     * @returns {string|object} The attribute value, or an object containing attributes.
     */
    getAttribute: function getAttribute(nodes, attribute) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return this.constructor._getAttribute(node, attribute);
    },

    /**
     * Get dataset value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @returns {*} The dataset value, or an object containing the dataset.
     */
    getDataset: function getDataset(nodes, key) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return this.constructor._getDataset(node, key);
    },

    /**
     * Get the HTML contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The HTML contents.
     */
    getHTML: function getHTML(nodes) {
      return this.getProperty(nodes, 'innerHTML');
    },

    /**
     * Get a property value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty: function getProperty(nodes, property) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.getProperty(node, property);
    },

    /**
     * Get the text contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The text contents.
     */
    getText: function getText(nodes) {
      return this.getProperty(nodes, 'innerText');
    },

    /**
     * Get the value property of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The value.
     */
    getValue: function getValue(nodes) {
      return this.getProperty(nodes, 'value');
    },

    /**
     * Remove an attribute from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     */
    removeAttribute: function removeAttribute(nodes, attribute) {
      nodes = this.parseNodes(nodes);

      var _iterator10 = _createForOfIteratorHelper(nodes),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var node = _step10.value;
          DOMNode.removeAttribute(node, attribute);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    },

    /**
     * Remove a dataset value from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} key The dataset key.
     */
    removeDataset: function removeDataset(nodes, key) {
      nodes = this.parseNodes(nodes);

      var _iterator11 = _createForOfIteratorHelper(nodes),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var node = _step11.value;

          this.constructor._removeDataset(node, key);
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    },

    /**
     * Remove a property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    removeProperty: function removeProperty(nodes, property) {
      nodes = this.parseNodes(nodes);

      var _iterator12 = _createForOfIteratorHelper(nodes),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var node = _step12.value;
          DOMNode.removeProperty(node, property);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    },

    /**
     * Set an attribute value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     */
    setAttribute: function setAttribute(nodes, attribute, value) {
      nodes = this.parseNodes(nodes);

      var attributes = this.constructor._parseData(attribute, value);

      var _iterator13 = _createForOfIteratorHelper(nodes),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var node = _step13.value;

          this.constructor._setAttribute(node, attributes);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    },

    /**
     * Set a dataset value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     */
    setDataset: function setDataset(nodes, key, value) {
      nodes = this.parseNodes(nodes);

      var dataset = this.constructor._parseData(key, value, true);

      var _iterator14 = _createForOfIteratorHelper(nodes),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var node = _step14.value;

          this.constructor._setDataset(node, dataset);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    },

    /**
     * Set the HTML contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} html The HTML contents.
     */
    setHTML: function setHTML(nodes, html) {
      this.empty(nodes);
      this.setProperty(nodes, 'innerHTML', html);
    },

    /**
     * Set a property value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     */
    setProperty: function setProperty(nodes, property, value) {
      nodes = this.parseNodes(nodes);

      var properties = this.constructor._parseData(property, value);

      var _iterator15 = _createForOfIteratorHelper(nodes),
          _step15;

      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var node = _step15.value;

          for (var _property in properties) {
            DOMNode.setProperty(node, _property, properties[_property]);
          }
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
    },

    /**
     * Set the text contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} text The text contents.
     */
    setText: function setText(nodes, text) {
      this.empty(nodes);
      this.setProperty(nodes, 'innerText', text);
    },

    /**
     * Set the value property of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} value The value.
     */
    setValue: function setValue(nodes, value) {
      this.setProperty(nodes, 'value', value);
    }
  });
  /**
   * DOM Data
   */

  Object.assign(DOM.prototype, {
    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    cloneData: function cloneData(nodes, others) {
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      });
      others = this.parseNodes(others, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      });

      var _iterator16 = _createForOfIteratorHelper(nodes),
          _step16;

      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var node = _step16.value;

          var _iterator17 = _createForOfIteratorHelper(others),
              _step17;

          try {
            for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
              var other = _step17.value;

              this.constructor._cloneData(node, other);
            }
          } catch (err) {
            _iterator17.e(err);
          } finally {
            _iterator17.f();
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
    },

    /**
     * Get custom data for the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    getData: function getData(nodes, key) {
      var node = this.parseNode(nodes, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      return this.constructor._getData(node, key);
    },

    /**
     * Remove custom data from each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     */
    removeData: function removeData(nodes, key) {
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      });

      var _iterator18 = _createForOfIteratorHelper(nodes),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var node = _step18.value;

          this.constructor._removeData(node, key);
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
    },

    /**
     * Set custom data for each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     */
    setData: function setData(nodes, key, value) {
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      });

      var data = this.constructor._parseData(key, value);

      var _iterator19 = _createForOfIteratorHelper(nodes),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var node = _step19.value;

          this.constructor._setData(node, data);
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
    }
  });
  /**
   * DOM Position
   */

  Object.assign(DOM.prototype, {
    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    center: function center(nodes, offset) {
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      return {
        x: nodeBox.left + nodeBox.width / 2,
        y: nodeBox.top + nodeBox.height / 2
      };
    },

    /**
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
     */
    constrain: function constrain(nodes, container) {
      var containerBox = this.rect(container);

      if (!containerBox) {
        return;
      }

      nodes = this.parseNodes(nodes);

      var _iterator20 = _createForOfIteratorHelper(nodes),
          _step20;

      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var node = _step20.value;

          this.constructor._constrain(node, containerBox);
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }
    },

    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {number} The distance to the element.
     */
    distTo: function distTo(nodes, x, y, offset) {
      var nodeCenter = this.center(nodes, offset);

      if (!nodeCenter) {
        return;
      }

      return Core.dist(nodeCenter.x, nodeCenter.y, x, y);
    },

    /**
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
     * @returns {number} The distance between the nodes.
     */
    distToNode: function distToNode(nodes, others) {
      var otherCenter = this.center(others);

      if (!otherCenter) {
        return;
      }

      return this.distTo(nodes, otherCenter.x, otherCenter.y);
    },

    /**
     * Get the nearest node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {HTMLElement} The nearest node.
     */
    nearestTo: function nearestTo(nodes, x, y, offset) {
      var closest,
          closestDistance = Number.MAX_VALUE;
      nodes = this.parseNodes(nodes);

      var _iterator21 = _createForOfIteratorHelper(nodes),
          _step21;

      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var node = _step21.value;
          var dist = this.distTo(node, x, y, offset);

          if (dist && dist < closestDistance) {
            closestDistance = dist;
            closest = node;
          }
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }

      return closest;
    },

    /**
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
     * @returns {HTMLElement} The nearest node.
     */
    nearestToNode: function nearestToNode(nodes, others) {
      var otherCenter = this.center(others);

      if (!otherCenter) {
        return;
      }

      return this.nearestTo(nodes, otherCenter.x, otherCenter.y);
    },

    /**
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
     * @returns {number} The percent.
     */
    percentX: function percentX(nodes, x, offset) {
      var clamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      var percent = (x - nodeBox.left) / nodeBox.width * 100;
      return clamp ? Core.clampPercent(percent) : percent;
    },

    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
     * @returns {number} The percent.
     */
    percentY: function percentY(nodes, y, offset) {
      var clamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      var percent = (y - nodeBox.top) / nodeBox.height * 100;
      return clamp ? Core.clampPercent(percent) : percent;
    },

    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the X and Y co-ordinates.
     */
    position: function position(nodes, offset) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return this.constructor._position(node, offset);
    },

    /**
     * Get the computed bounding rectangle of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect: function rect(nodes, offset) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return this.constructor._rect(node, offset);
    }
  });
  /**
   * DOM Scroll
   */

  Object.assign(DOM.prototype, {
    /**
     * Get the scroll X position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll X position.
     */
    getScrollX: function getScrollX(nodes) {
      var node = this.parseNode(nodes, {
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return DOMNode.getScrollXWindow(node);
      }

      if (Core.isDocument(node)) {
        return this.constructor._getScrollXDocument(node);
      }

      return DOMNode.getScrollX(node);
    },

    /**
     * Get the scroll Y position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll Y position.
     */
    getScrollY: function getScrollY(nodes) {
      var node = this.parseNode(nodes, {
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return DOMNode.getScrollYWindow(node);
      }

      if (Core.isDocument(node)) {
        return this.constructor._getScrollYDocument(node);
      }

      return DOMNode.getScrollY(node);
    },

    /**
     * Scroll each node to an X,Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    setScroll: function setScroll(nodes, x, y) {
      nodes = this.parseNodes(nodes, {
        document: true,
        window: true
      });

      var _iterator22 = _createForOfIteratorHelper(nodes),
          _step22;

      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var node = _step22.value;

          if (Core.isWindow(node)) {
            DOMNode.setScrollWindow(node, x, y);
          } else if (Core.isDocument(node)) {
            this.constructor._setScrollDocument(node, x, y);
          } else {
            this.constructor._setScroll(node, x, y);
          }
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    },

    /**
     * Scroll each node to an X position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    setScrollX: function setScrollX(nodes, x) {
      nodes = this.parseNodes(nodes, {
        document: true,
        window: true
      });

      var _iterator23 = _createForOfIteratorHelper(nodes),
          _step23;

      try {
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          var node = _step23.value;

          if (Core.isWindow(node)) {
            this.constructor._setScrollXWindow(node, x);
          } else if (Core.isDocument(node)) {
            this.constructor._setScrollXDocument(node, x);
          } else {
            DOMNode.setScrollX(node, x);
          }
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
      }
    },

    /**
     * Scroll each node to a Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    setScrollY: function setScrollY(nodes, y) {
      nodes = this.parseNodes(nodes, {
        document: true,
        window: true
      });

      var _iterator24 = _createForOfIteratorHelper(nodes),
          _step24;

      try {
        for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
          var node = _step24.value;

          if (Core.isWindow(node)) {
            this.constructor._setScrollYWindow(node, y);
          } else if (Core.isDocument(node)) {
            this.constructor._setScrollYDocument(node, y);
          } else {
            DOMNode.setScrollY(node, y);
          }
        }
      } catch (err) {
        _iterator24.e(err);
      } finally {
        _iterator24.f();
      }
    }
  });
  /**
   * DOM Size
   */

  Object.assign(DOM.prototype, {
    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
     * @returns {number} The height.
     */
    height: function height(nodes, innerOuter) {
      var node = this.parseNode(nodes, {
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return DOMNode.heightWindow(node, Core.isUndefined(innerOuter) ? 0 : innerOuter);
      }

      if (Core.isUndefined(innerOuter)) {
        innerOuter = 1;
      }

      if (Core.isDocument(node)) {
        return this.constructor._height(DOMNode.documentElement(node), innerOuter);
      }

      return this.constructor._height(node, innerOuter);
    },

    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [innerOuter] Whether to include padding, border and margin widths.
     * @returns {number} The width.
     */
    width: function width(nodes, innerOuter) {
      var node = this.parseNode(nodes, {
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return DOMNode.widthWindow(node, Core.isUndefined(innerOuter) ? 0 : innerOuter);
      }

      if (Core.isUndefined(innerOuter)) {
        innerOuter = 1;
      }

      if (Core.isDocument(node)) {
        return this.constructor._width(DOMNode.documentElement(node), innerOuter);
      }

      return this.constructor._width(node, innerOuter);
    }
  });
  /**
   * DOM Styles
   */

  Object.assign(DOM.prototype, {
    /**
     * Add classes to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    addClass: function addClass(nodes) {
      for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        classes[_key2 - 1] = arguments[_key2];
      }

      nodes = this.parseNodes(nodes);
      classes = this.constructor._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      var _iterator25 = _createForOfIteratorHelper(nodes),
          _step25;

      try {
        for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
          var node = _step25.value;
          DOMNode.addClass.apply(DOMNode, [node].concat(_toConsumableArray(classes)));
        }
      } catch (err) {
        _iterator25.e(err);
      } finally {
        _iterator25.f();
      }
    },

    /**
     * Get computed CSS style value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [style] The CSS style name.
     * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    css: function css(nodes, style) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return this.constructor._css(node, style);
    },

    /**
     * Get style properties for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [style] The style name.
     * @returns {string|object} The style value, or an object containing the style properties.
     */
    getStyle: function getStyle(nodes, style) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return this.constructor._getStyle(node, style);
    },

    /**
     * Hide each node from display.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    hide: function hide(nodes) {
      this.setStyle(nodes, 'display', 'none');
    },

    /**
     * Remove classes from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    removeClass: function removeClass(nodes) {
      for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
        classes[_key3 - 1] = arguments[_key3];
      }

      nodes = this.parseNodes(nodes);
      classes = this.constructor._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      var _iterator26 = _createForOfIteratorHelper(nodes),
          _step26;

      try {
        for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
          var node = _step26.value;
          DOMNode.removeClass.apply(DOMNode, [node].concat(_toConsumableArray(classes)));
        }
      } catch (err) {
        _iterator26.e(err);
      } finally {
        _iterator26.f();
      }
    },

    /**
     * Set style properties for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle: function setStyle(nodes, style, value, important) {
      nodes = this.parseNodes(nodes);

      var styles = this.constructor._parseData(style, value);

      var _iterator27 = _createForOfIteratorHelper(nodes),
          _step27;

      try {
        for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
          var node = _step27.value;

          this.constructor._setStyle(node, styles, important);
        }
      } catch (err) {
        _iterator27.e(err);
      } finally {
        _iterator27.f();
      }
    },

    /**
     * Display each hidden node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    show: function show(nodes) {
      this.setStyle(nodes, 'display', '');
    },

    /**
     * Toggle the visibility of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    toggle: function toggle(nodes) {
      nodes = this.parseNodes(nodes);

      var _iterator28 = _createForOfIteratorHelper(nodes),
          _step28;

      try {
        for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
          var node = _step28.value;
          DOMNode.getStyle(node, 'display') === 'none' ? DOMNode.setStyle(node, 'display', '') : DOMNode.setStyle(node, 'display', 'none');
        }
      } catch (err) {
        _iterator28.e(err);
      } finally {
        _iterator28.f();
      }
    },

    /**
     * Toggle classes for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    toggleClass: function toggleClass(nodes) {
      for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
        classes[_key4 - 1] = arguments[_key4];
      }

      nodes = this.parseNodes(nodes);
      classes = this.constructor._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      var _iterator29 = _createForOfIteratorHelper(nodes),
          _step29;

      try {
        for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
          var node = _step29.value;

          var _iterator30 = _createForOfIteratorHelper(classes),
              _step30;

          try {
            for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
              var className = _step30.value;
              DOMNode.toggleClass(node, className);
            }
          } catch (err) {
            _iterator30.e(err);
          } finally {
            _iterator30.f();
          }
        }
      } catch (err) {
        _iterator29.e(err);
      } finally {
        _iterator29.f();
      }
    }
  });
  /**
   * DOM Event Factory
   */

  Object.assign(DOM.prototype, {
    /** 
     * Return a wrapped mouse drag event (optionally limited by animation frame).
     * @param {DOM~eventCallback} down The callback to execute on mousedown.
     * @param {DOM~eventCallback} move The callback to execute on mousemove.
     * @param {DOM~eventCallback} up The callback to execute on mouseup.
     * @param {Boolean} [animated=true] Whether to limit the move event by animation frame.
     * @returns {DOM~eventCallback} The mouse drag event callback.
     */
    mouseDragFactory: function mouseDragFactory(down, move, up) {
      var _this10 = this;

      var animated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (move && animated) {
        move = Core.animation(move); // needed to make sure up callback executes after final move callback

        if (up) {
          up = Core.animation(up);
        }
      }

      return function (e) {
        if (down && down(e) === false) {
          return false;
        }

        if (move) {
          _this10.addEvent(window, 'mousemove', move);
        }

        if (move || up) {
          _this10.addEvent(window, 'mouseup', function (e) {
            if (move) {
              _this10.removeEvent(window, 'mousemove', move);
            }

            if (up) {
              up(e);
            }
          }, false, true);
        }
      };
    }
  });
  /**
   * DOM Events
   */

  Object.assign(DOM.prototype, {
    /**
     * Trigger a blur event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    blur: function blur(nodes) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      DOMNode.blur(node);
    },

    /**
     * Trigger a click event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    click: function click(nodes) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      DOMNode.click(node);
    },

    /**
     * Trigger a focus event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    focus: function focus(nodes) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      DOMNode.focus(node);
    },

    /**
     * Add a function to the ready queue.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    ready: function ready(callback) {
      if (this._context.readyState === 'complete') {
        callback();
        return;
      }

      this.constructor._addEvent(window, 'DOMContentLoaded', callback);
    }
  });
  /**
   * DOM Event Handlers
   */

  Object.assign(DOM.prototype, {
    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    addEvent: function addEvent(nodes, events, callback, delegate, selfDestruct) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });

      var _iterator31 = _createForOfIteratorHelper(nodes),
          _step31;

      try {
        for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
          var node = _step31.value;

          var _iterator32 = _createForOfIteratorHelper(this.constructor._parseEvents(events)),
              _step32;

          try {
            for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
              var event = _step32.value;

              this.constructor._addEvent(node, event, callback, delegate, selfDestruct);
            }
          } catch (err) {
            _iterator32.e(err);
          } finally {
            _iterator32.f();
          }
        }
      } catch (err) {
        _iterator31.e(err);
      } finally {
        _iterator31.f();
      }
    },

    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate: function addEventDelegate(nodes, events, delegate, callback) {
      this.addEvent(nodes, events, callback, delegate);
    },

    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce: function addEventDelegateOnce(nodes, events, delegate, callback) {
      this.addEvent(nodes, events, callback, delegate, true);
    },

    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce: function addEventOnce(nodes, events, callback) {
      this.addEvent(nodes, events, callback, null, true);
    },

    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    cloneEvents: function cloneEvents(nodes, others) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      others = this.parseNodes(others, {
        shadow: true,
        document: true,
        window: true
      });

      var _iterator33 = _createForOfIteratorHelper(nodes),
          _step33;

      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var node = _step33.value;

          var _iterator34 = _createForOfIteratorHelper(others),
              _step34;

          try {
            for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
              var other = _step34.value;

              this.constructor._cloneEvents(node, other);
            }
          } catch (err) {
            _iterator34.e(err);
          } finally {
            _iterator34.f();
          }
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
      }
    },

    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    removeEvent: function removeEvent(nodes, events, callback, delegate) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      events = events ? this.constructor._parseEvents(events) : false;

      var _iterator35 = _createForOfIteratorHelper(nodes),
          _step35;

      try {
        for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
          var node = _step35.value;

          if (!this.constructor._events.has(node)) {
            continue;
          }

          if (!events) {
            this.constructor._removeEvent(node, events, callback, delegate);

            continue;
          }

          var _iterator36 = _createForOfIteratorHelper(events),
              _step36;

          try {
            for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
              var event = _step36.value;

              this.constructor._removeEvent(node, event, callback, delegate);
            }
          } catch (err) {
            _iterator36.e(err);
          } finally {
            _iterator36.f();
          }
        }
      } catch (err) {
        _iterator35.e(err);
      } finally {
        _iterator35.f();
      }
    },

    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate: function removeEventDelegate(nodes, events, delegate, callback) {
      this.removeEvent(nodes, events, callback, delegate);
    },

    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     * @param {object} [options] The options to use for the Event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    triggerEvent: function triggerEvent(nodes, events, data, options) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      events = this.constructor._parseEvents(events);

      var _iterator37 = _createForOfIteratorHelper(nodes),
          _step37;

      try {
        for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
          var node = _step37.value;

          var _iterator38 = _createForOfIteratorHelper(events),
              _step38;

          try {
            for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
              var event = _step38.value;

              this.constructor._triggerEvent(node, event, data, options);
            }
          } catch (err) {
            _iterator38.e(err);
          } finally {
            _iterator38.f();
          }
        }
      } catch (err) {
        _iterator37.e(err);
      } finally {
        _iterator37.f();
      }
    }
  });
  /**
   * DOM Create
   */

  Object.assign(DOM.prototype, {
    /**
     * Attach a shadow DOM tree to the first node.
     * @param {string|array|HTMLElement|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @returns {ShadowRoot} The new ShadowRoot.
     */
    attachShadow: function attachShadow(nodes) {
      var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.attachShadow(node, open);
    },

    /**
     * Create a new DOM element.
     * @param {string} [tagName=div] The type of HTML element to create.
     * @param {object} [options] The options to use for creating the element.
     * @param {string} [options.html] The HTML contents.
     * @param {string} [options.text] The text contents.
     * @param {string|array} [options.class] The classes.
     * @param {object} [options.style] An object containing style properties.
     * @param {string} [options.value] The value.
     * @param {object} [options.attributes] An object containing attributes.
     * @param {object} [options.properties] An object containing properties.
     * @param {object} [options.dataset] An object containing dataset values.
     * @returns {HTMLElement} The new HTMLElement.
     */
    create: function create() {
      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
      var options = arguments.length > 1 ? arguments[1] : undefined;
      var node = DOMNode.create(this._context, tagName);

      if (!options) {
        return node;
      }

      if ('html' in options) {
        DOMNode.setProperty(node, 'innerHTML', options.html);
      } else if ('text' in options) {
        DOMNode.setProperty(node, 'innerText', options.text);
      }

      if ('class' in options) {
        DOMNode.addClass.apply(DOMNode, [node].concat(_toConsumableArray(this.constructor._parseClasses(Core.wrap(options["class"])))));
      }

      if ('style' in options) {
        this.constructor._setStyle(node, options.style);
      }

      if ('value' in options) {
        DOMNode.setProperty(node, 'value', options.value);
      }

      if ('attributes' in options) {
        this.constructor._setAttribute(node, options.attributes);
      }

      if ('properties' in options) {
        for (var key in options.properties) {
          DOMNode.setProperty(node, key, options.properties[key]);
        }
      }

      if ('dataset' in options) {
        var dataset = this.constructor._parseData(options.dataset, null, true);

        this.constructor._setDataset(node, dataset);
      }

      return node;
    },

    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment: function createComment(comment) {
      return DOMNode.createComment(this._context, comment);
    },

    /**
     * Create a new document fragment.
     * @returns {DocumentFragment} The new DocumentFragment.
     */
    createFragment: function createFragment() {
      return DOMNode.createFragment(this._context);
    },

    /**
     * Create a new range object.
     * @returns {Range} The new Range.
     */
    createRange: function createRange() {
      return DOMNode.createRange(this._context);
    },

    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText: function createText(text) {
      return DOMNode.createText(this._context, text);
    },

    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {array} An array of nodes.
     */
    parseHTML: function parseHTML(html) {
      return Core.wrap(DOMNode.children(this.createRange().createContextualFragment(html)));
    }
  });
  /**
   * DOM Manipulation
   */

  Object.assign(DOM.prototype, {
    /**
     * Clone each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {array} The cloned nodes.
     */
    clone: function clone(nodes) {
      var _this11 = this;

      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cloneEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cloneData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // ShadowRoot nodes can not be cloned
      nodes = this.parseNodes(nodes, {
        node: true,
        fragment: true
      });
      return nodes.map(function (node) {
        return _this11.constructor._clone(node, deep, cloneEvents, cloneData);
      });
    },

    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @return {array} The detached nodes.
     */
    detach: function detach(nodes) {
      // DocumentFragment and ShadowRoot nodes can not be detached
      nodes = this.parseNodes(nodes, {
        node: true
      });

      var _iterator39 = _createForOfIteratorHelper(nodes),
          _step39;

      try {
        for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
          var node = _step39.value;
          var parent = DOMNode.parent(node);

          if (!parent) {
            continue;
          }

          DOMNode.removeChild(parent, node);
        }
      } catch (err) {
        _iterator39.e(err);
      } finally {
        _iterator39.f();
      }

      return nodes;
    },

    /**
     * Remove all children of each node from the DOM.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    empty: function empty(nodes) {
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      var _iterator40 = _createForOfIteratorHelper(nodes),
          _step40;

      try {
        for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
          var node = _step40.value;

          this.constructor._empty(node);
        }
      } catch (err) {
        _iterator40.e(err);
      } finally {
        _iterator40.f();
      }
    },

    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    remove: function remove(nodes) {
      // DocumentFragment and ShadowRoot nodes can not be removed
      nodes = this.parseNodes(nodes, {
        node: true
      });

      var _iterator41 = _createForOfIteratorHelper(nodes),
          _step41;

      try {
        for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
          var node = _step41.value;
          var parent = DOMNode.parent(node);

          if (!parent) {
            continue;
          }

          this.constructor._remove(node);

          DOMNode.removeChild(parent, node);
        }
      } catch (err) {
        _iterator41.e(err);
      } finally {
        _iterator41.f();
      }
    },

    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
     */
    replaceAll: function replaceAll(nodes, others) {
      this.replaceWith(others, nodes);
    },

    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
     */
    replaceWith: function replaceWith(nodes, others) {
      var _this12 = this;

      // DocumentFragment and ShadowRoot nodes can not be removed
      nodes = this.parseNodes(nodes, {
        node: true
      }); // ShadowRoot nodes can not be cloned

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      }); // Clone other nodes first, so they can not be removed during replacement

      var clones = others.map(function (other) {
        return _this12.constructor._clone(other, true);
      });

      var _iterator42 = _createForOfIteratorHelper(nodes),
          _step42;

      try {
        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
          var node = _step42.value;

          this.constructor._replaceWith(node, clones);
        }
      } catch (err) {
        _iterator42.e(err);
      } finally {
        _iterator42.f();
      }
    }
  });
  /**
   * DOM Move
   */

  Object.assign(DOM.prototype, {
    /**
     * Insert each other node after each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    after: function after(nodes, others) {
      // DocumentFragment and ShadowRoot nodes can not have siblings
      nodes = this.parseNodes(nodes, {
        node: true
      }); // ShadowRoot nodes can not be moved

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      }).reverse();
      var lastNode = nodes.slice(-1).pop();

      var _iterator43 = _createForOfIteratorHelper(nodes),
          _step43;

      try {
        for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
          var node = _step43.value;
          var parent = DOMNode.parent(node);

          if (!parent) {
            continue;
          }

          var _iterator44 = _createForOfIteratorHelper(others),
              _step44;

          try {
            for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
              var other = _step44.value;
              DOMNode.insertBefore(parent, DOMNode.isSame(node, lastNode) ? other : DOMNode.clone(other, true), DOMNode.next(node));
            }
          } catch (err) {
            _iterator44.e(err);
          } finally {
            _iterator44.f();
          }
        }
      } catch (err) {
        _iterator43.e(err);
      } finally {
        _iterator43.f();
      }
    },

    /**
     * Append each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    append: function append(nodes, others) {
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      }); // ShadowRoot nodes can not be moved

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var lastNode = nodes.slice(-1).pop();

      var _iterator45 = _createForOfIteratorHelper(nodes),
          _step45;

      try {
        for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
          var node = _step45.value;

          var _iterator46 = _createForOfIteratorHelper(others),
              _step46;

          try {
            for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
              var other = _step46.value;
              DOMNode.insertBefore(node, DOMNode.isSame(node, lastNode) ? other : DOMNode.clone(other, true));
            }
          } catch (err) {
            _iterator46.e(err);
          } finally {
            _iterator46.f();
          }
        }
      } catch (err) {
        _iterator45.e(err);
      } finally {
        _iterator45.f();
      }
    },

    /**
     * Append each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    appendTo: function appendTo(nodes, others) {
      this.append(others, nodes);
    },

    /**
     * Insert each other node before each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    before: function before(nodes, others) {
      // DocumentFragment and ShadowRoot nodes can not have siblings
      nodes = this.parseNodes(nodes, {
        node: true
      }); // ShadowRoot nodes can not be moved

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var lastNode = nodes.slice(-1).pop();

      var _iterator47 = _createForOfIteratorHelper(nodes),
          _step47;

      try {
        for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
          var node = _step47.value;
          var parent = DOMNode.parent(node);

          if (!parent) {
            continue;
          }

          var _iterator48 = _createForOfIteratorHelper(others),
              _step48;

          try {
            for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
              var other = _step48.value;
              DOMNode.insertBefore(parent, DOMNode.isSame(node, lastNode) ? other : DOMNode.clone(other, true), node);
            }
          } catch (err) {
            _iterator48.e(err);
          } finally {
            _iterator48.f();
          }
        }
      } catch (err) {
        _iterator47.e(err);
      } finally {
        _iterator47.f();
      }
    },

    /**
     * Insert each node after each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    insertAfter: function insertAfter(nodes, others) {
      this.after(others, nodes);
    },

    /**
     * Insert each node before each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    insertBefore: function insertBefore(nodes, others) {
      this.before(others, nodes);
    },

    /**
     * Prepend each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    prepend: function prepend(nodes, others) {
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      }); // ShadowRoot nodes can not be moved

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var lastNode = nodes.slice(-1).pop();

      var _iterator49 = _createForOfIteratorHelper(nodes),
          _step49;

      try {
        for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
          var node = _step49.value;
          var firstChild = DOMNode.firstChild(node);

          var _iterator50 = _createForOfIteratorHelper(others),
              _step50;

          try {
            for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
              var other = _step50.value;
              DOMNode.insertBefore(node, DOMNode.isSame(node, lastNode) ? other : DOMNode.clone(other, true), firstChild);
            }
          } catch (err) {
            _iterator50.e(err);
          } finally {
            _iterator50.f();
          }
        }
      } catch (err) {
        _iterator49.e(err);
      } finally {
        _iterator49.f();
      }
    },

    /**
     * Prepend each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    prependTo: function prependTo(nodes, others) {
      this.prepend(others, nodes);
    }
  });
  /**
   * DOM Wrap
   */

  Object.assign(DOM.prototype, {
    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    unwrap: function unwrap(nodes, filter) {
      // DocumentFragment and ShadowRoot nodes can not be unwrapped
      nodes = this.parseNodes(nodes, {
        node: true
      });
      filter = this.parseFilter(filter);
      var parents = [];

      var _iterator51 = _createForOfIteratorHelper(nodes),
          _step51;

      try {
        for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
          var node = _step51.value;

          var _parent = DOMNode.parent(node);

          if (!_parent) {
            continue;
          }

          if (parents.includes(_parent)) {
            continue;
          }

          if (filter && !filter(_parent)) {
            continue;
          }

          parents.push(_parent);
        }
      } catch (err) {
        _iterator51.e(err);
      } finally {
        _iterator51.f();
      }

      for (var _i = 0, _parents = parents; _i < _parents.length; _i++) {
        var parent = _parents[_i];

        this.constructor._unwrap(parent);
      }
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrap: function wrap(nodes, others) {
      // DocumentFragment and ShadowRoot nodes can not be wrapped
      nodes = this.parseNodes(nodes, {
        node: true
      }); // ShadowRoot nodes can not be cloned

      others = this.parseNodes(others, {
        fragment: true,
        html: true
      });

      var _iterator52 = _createForOfIteratorHelper(nodes),
          _step52;

      try {
        for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
          var node = _step52.value;

          this.constructor._wrap(node, others);
        }
      } catch (err) {
        _iterator52.e(err);
      } finally {
        _iterator52.f();
      }
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrapAll: function wrapAll(nodes, others) {
      // DocumentFragment and ShadowRoot nodes can not be wrapped
      nodes = this.parseNodes(nodes, {
        node: true
      }); // ShadowRoot nodes can not be cloned

      others = this.parseNodes(others, {
        fragment: true,
        html: true
      });
      var clones = this.clone(others, true);

      this.constructor._wrapAll(nodes, clones);
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrapInner: function wrapInner(nodes, others) {
      nodes = this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }); // ShadowRoot nodes can not be cloned

      others = this.parseNodes(others, {
        fragment: true,
        html: true
      });

      var _iterator53 = _createForOfIteratorHelper(nodes),
          _step53;

      try {
        for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
          var node = _step53.value;

          this.constructor._wrapInner(node, others);
        }
      } catch (err) {
        _iterator53.e(err);
      } finally {
        _iterator53.f();
      }
    }
  });
  /**
   * DOM Filter
   */

  Object.assign(DOM.prototype, {
    /**
     * Return all nodes connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    connected: function connected(nodes) {
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).filter(function (node) {
        return DOMNode.isConnected(node);
      });
    },

    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    equal: function equal(nodes, others) {
      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        shadow: true
      });
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).filter(function (node) {
        return others.some(function (other) {
          return DOMNode.isEqual(node, other);
        });
      });
    },

    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    filter: function filter(nodes, _filter) {
      _filter = this.parseFilter(_filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).filter(function (node, index) {
        return !_filter || _filter(node, index);
      });
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    filterOne: function filterOne(nodes, filter) {
      filter = this.parseFilter(filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).find(function (node, index) {
        return !filter || filter(node, index);
      }) || null;
    },

    /**
     * Return all "fixed" nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    fixed: function fixed(nodes) {
      var _this13 = this;

      return this.parseNodes(nodes, {
        node: true
      }).filter(function (node) {
        return Core.isElement(node) && _this13.constructor._css(node, 'position') === 'fixed' || _this13.constructor._parents(node, function (parent) {
          return Core.isElement(parent) && _this13.constructor._css(parent, 'position') === 'fixed';
        }, false, true).length;
      });
    },

    /**
     * Return all hidden nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    hidden: function hidden(nodes) {
      var _this14 = this;

      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).filter(function (node) {
        return !_this14.constructor._isVisible(node);
      });
    },

    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    not: function not(nodes, filter) {
      filter = this.parseFilter(filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).filter(function (node, index) {
        return filter && !filter(node, index);
      });
    },

    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    notOne: function notOne(nodes, filter) {
      filter = this.parseFilter(filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).find(function (node, index) {
        return filter && !filter(node, index);
      }) || null;
    },

    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    same: function same(nodes, others) {
      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        shadow: true
      });
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).filter(function (node) {
        return others.some(function (other) {
          return DOMNode.isSame(node, other);
        });
      });
    },

    /**
     * Return all visible nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    visible: function visible(nodes) {
      var _this15 = this;

      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).filter(function (node) {
        return _this15.constructor._isVisible(node);
      });
    },

    /**
     * Return all nodes with an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withAnimation: function withAnimation(nodes) {
      var _this16 = this;

      return this.parseNodes(nodes).filter(function (node) {
        return _this16.constructor._hasAnimation(node);
      });
    },

    /**
     * Return all nodes with a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {array} The filtered nodes.
     */
    withAttribute: function withAttribute(nodes, attribute) {
      return this.parseNodes(nodes).filter(function (node) {
        return DOMNode.hasAttribute(node, attribute);
      });
    },

    /**
     * Return all nodes with child elements.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withChildren: function withChildren(nodes) {
      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      }).filter(function (node) {
        return DOMNode.hasChildren(node);
      });
    },

    /**
     * Return all nodes with any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {array} The filtered nodes.
     */
    withClass: function withClass(nodes) {
      for (var _len4 = arguments.length, classes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key5 = 1; _key5 < _len4; _key5++) {
        classes[_key5 - 1] = arguments[_key5];
      }

      classes = this.constructor._parseClasses(classes);
      return this.parseNodes(nodes).filter(function (node) {
        return classes.some(function (className) {
          return DOMNode.hasClass(node, className);
        });
      });
    },

    /**
     * Return all nodes with a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withCSSAnimation: function withCSSAnimation(nodes) {
      var _this17 = this;

      return this.parseNodes(nodes).filter(function (node) {
        return _this17.constructor._hasCSSAnimation(node);
      });
    },

    /**
     * Return all nodes with a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withCSSTransition: function withCSSTransition(nodes) {
      var _this18 = this;

      return this.parseNodes(nodes).filter(function (node) {
        return _this18.constructor._hasCSSTransition(node);
      });
    },

    /**
     * Return all nodes with custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {array} The filtered nodes.
     */
    withData: function withData(nodes, key) {
      var _this19 = this;

      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
        window: true
      }).filter(function (node) {
        return _this19.constructor._hasData(node, key);
      });
    },

    /**
     * Return all nodes with a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    withDescendent: function withDescendent(nodes, filter) {
      filter = this.parseFilterContains(filter);
      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      }).filter(function (node, index) {
        return !filter || filter(node, index);
      });
    },

    /**
     * Return all nodes with a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {array} The filtered nodes.
     */
    withProperty: function withProperty(nodes, property) {
      return this.parseNodes(nodes).filter(function (node) {
        return DOMNode.hasProperty(node, property);
      });
    }
  });
  /**
   * DOM Find
   */

  Object.assign(DOM.prototype, {
    /**
     * Return all nodes matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    find: function find(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;
      // fast selector
      var match = selector.match(this.constructor._fastRegExp);

      if (match) {
        if (match[1] === '#') {
          return this.findById(match[2], nodes);
        }

        if (match[1] === '.') {
          return this.findByClass(match[2], nodes);
        }

        return this.findByTag(match[2], nodes);
      } // custom selector


      if (selector.match(this.constructor._complexRegExp)) {
        var selectors = this.constructor._prefixSelectors(selector, "#".concat(this.constructor._tempId, " "));

        if (Core.isElement(nodes)) {
          return this.constructor.__findByCustom(selectors, nodes);
        }

        nodes = this.parseNodes(nodes);
        return this.constructor._findByCustom(selectors, nodes);
      } // standard selector


      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return Core.wrap(DOMNode.findBySelector(selector, nodes));
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      return this.constructor._findBySelector(selector, nodes);
    },

    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByClass: function findByClass(className) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;

      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return Core.wrap(DOMNode.findByClass(className, nodes));
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      var results = [];

      var _iterator54 = _createForOfIteratorHelper(nodes),
          _step54;

      try {
        for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
          var node = _step54.value;
          Core.merge(results, DOMNode.findByClass(className, node));
        }
      } catch (err) {
        _iterator54.e(err);
      } finally {
        _iterator54.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all nodes with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findById: function findById(id) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;
      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      return this.constructor._findBySelector("#".concat(id), nodes);
    },

    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByTag: function findByTag(tagName) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;

      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return Core.wrap(DOMNode.findByTag(tagName, nodes));
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      var results = [];

      var _iterator55 = _createForOfIteratorHelper(nodes),
          _step55;

      try {
        for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
          var node = _step55.value;
          Core.merge(results, DOMNode.findByTag(tagName, node));
        }
      } catch (err) {
        _iterator55.e(err);
      } finally {
        _iterator55.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single node matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOne: function findOne(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;
      // fast selector
      var match = selector.match(this.constructor._fastRegExp);

      if (match) {
        if (match[1] === '#') {
          return this.findOneById(match[2], nodes);
        }

        if (match[1] === '.') {
          return this.findOneByClass(match[2], nodes);
        }

        return this.findOneByTag(match[2], nodes);
      } // custom selector


      if (selector.match(this.constructor._complexRegExp)) {
        var selectors = this.constructor._prefixSelectors(selector, "#".concat(this.constructor._tempId, " "));

        if (Core.isElement(nodes)) {
          return this.constructor.__findOneByCustom(selectors, nodes);
        }

        nodes = this.parseNodes(nodes);

        if (!nodes.length) {
          return;
        }

        return this.constructor._findOneByCustom(selectors, nodes);
      } // standard selector


      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return DOMNode.findOneBySelector(selector, nodes);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      if (!nodes.length) {
        return;
      }

      return this.constructor._findOneBySelector(selector, nodes);
    },

    /**
     * Return a single node with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByClass: function findOneByClass(className) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;

      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return DOMNode.findByClass(className, nodes).item(0);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      if (!nodes.length) {
        return;
      }

      var _iterator56 = _createForOfIteratorHelper(nodes),
          _step56;

      try {
        for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
          var node = _step56.value;
          var result = DOMNode.findByClass(className, node).item(0);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _iterator56.e(err);
      } finally {
        _iterator56.f();
      }

      return null;
    },

    /**
     * Return a single node with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching element.
     */
    findOneById: function findOneById(id) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;

      if (Core.isDocument(nodes)) {
        return DOMNode.findById(id, nodes);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      if (!nodes.length) {
        return;
      }

      return this.constructor._findOneBySelector("#".concat(id), nodes);
    },

    /**
     * Return a single node with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByTag: function findOneByTag(tagName) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;

      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return DOMNode.findByTag(tagName, nodes).item(0);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      if (!nodes.length) {
        return;
      }

      var _iterator57 = _createForOfIteratorHelper(nodes),
          _step57;

      try {
        for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
          var node = _step57.value;
          var result = DOMNode.findByTag(tagName, node).item(0);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _iterator57.e(err);
      } finally {
        _iterator57.f();
      }

      return null;
    }
  });
  /**
   * DOM Traversal
   */

  Object.assign(DOM.prototype, {
    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    child: function child(nodes, filter) {
      return this.children(nodes, filter, true);
    },

    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    children: function children(nodes, filter) {
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elementsOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      filter = this.parseFilter(filter);

      if (Core.isElement(nodes) || Core.isDocument(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return this.constructor._children(nodes, filter, first, elementsOnly);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      var results = [];

      var _iterator58 = _createForOfIteratorHelper(nodes),
          _step58;

      try {
        for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
          var node = _step58.value;
          Core.merge(results, this.constructor._children(node, filter, first, elementsOnly));
        }
      } catch (err) {
        _iterator58.e(err);
      } finally {
        _iterator58.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    closest: function closest(nodes, filter, limit) {
      return this.parents(nodes, filter, limit, true);
    },

    /**
     * Return the common ancestor of all nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The common ancestor.
     */
    commonAncestor: function commonAncestor(nodes) {
      nodes = this.sort(nodes);

      if (!nodes.length) {
        return;
      }

      var range = this.createRange();

      if (nodes.length === 1) {
        DOMNode.select(range, nodes.shift());
      } else {
        DOMNode.setStartBefore(range, nodes.shift());
        DOMNode.setEndAfter(range, nodes.pop());
      }

      return range.commonAncestorContainer;
    },

    /**
     * Return all children of each node (including text and comment nodes).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    contents: function contents(nodes) {
      return this.children(nodes, false, false, false);
    },

    /**
     * Return the DocumentFragment of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {DocumentFragment} The DocumentFragment.
     */
    fragment: function fragment(nodes) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.fragment(node);
    },

    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    next: function next(nodes, filter) {
      filter = this.parseFilter(filter);

      if (Core.isNode(nodes)) {
        return this.constructor._next(nodes, filter);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator59 = _createForOfIteratorHelper(nodes),
          _step59;

      try {
        for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
          var node = _step59.value;
          Core.merge(results, this.constructor._next(node, filter));
        }
      } catch (err) {
        _iterator59.e(err);
      } finally {
        _iterator59.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    nextAll: function nextAll(nodes, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this.parseFilter(filter);
      limit = this.parseFilter(limit);

      if (Core.isNode(nodes)) {
        return this.constructor._nextAll(nodes, filter, limit, first);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator60 = _createForOfIteratorHelper(nodes),
          _step60;

      try {
        for (_iterator60.s(); !(_step60 = _iterator60.n()).done;) {
          var node = _step60.value;
          Core.merge(results, this.constructor._nextAll(node, filter, limit, first));
        }
      } catch (err) {
        _iterator60.e(err);
      } finally {
        _iterator60.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The offset parent.
     */
    offsetParent: function offsetParent(nodes) {
      return this.forceShow(nodes, function (node) {
        return DOMNode.offsetParent(node);
      });
    },

    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    parent: function parent(nodes, filter) {
      filter = this.parseFilter(filter);

      if (Core.isNode(nodes)) {
        return this.constructor._parent(nodes, filter);
      } // DocumentFragment and ShadowRoot nodes have no parent


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator61 = _createForOfIteratorHelper(nodes),
          _step61;

      try {
        for (_iterator61.s(); !(_step61 = _iterator61.n()).done;) {
          var node = _step61.value;
          Core.merge(results, this.constructor._parent(node, filter));
        }
      } catch (err) {
        _iterator61.e(err);
      } finally {
        _iterator61.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    parents: function parents(nodes, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this.parseFilter(filter);
      limit = this.parseFilter(limit);

      if (Core.isNode(nodes)) {
        return this.constructor._parents(nodes, filter, limit, first);
      } // DocumentFragment and ShadowRoot nodes have no parent


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator62 = _createForOfIteratorHelper(nodes),
          _step62;

      try {
        for (_iterator62.s(); !(_step62 = _iterator62.n()).done;) {
          var node = _step62.value;
          Core.merge(results, this.constructor._parents(node, filter, limit, first));
        }
      } catch (err) {
        _iterator62.e(err);
      } finally {
        _iterator62.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    prev: function prev(nodes, filter) {
      filter = this.parseFilter(filter);

      if (Core.isNode(nodes)) {
        return this.constructor._prev(nodes, filter);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator63 = _createForOfIteratorHelper(nodes),
          _step63;

      try {
        for (_iterator63.s(); !(_step63 = _iterator63.n()).done;) {
          var node = _step63.value;
          Core.merge(results, this.constructor._prev(node, filter));
        }
      } catch (err) {
        _iterator63.e(err);
      } finally {
        _iterator63.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    prevAll: function prevAll(nodes, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this.parseFilter(filter);
      limit = this.parseFilter(limit);

      if (Core.isNode(nodes)) {
        return this.constructor._prevAll(nodes, filter, limit, first);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator64 = _createForOfIteratorHelper(nodes),
          _step64;

      try {
        for (_iterator64.s(); !(_step64 = _iterator64.n()).done;) {
          var node = _step64.value;
          Core.merge(results, this.constructor._prevAll(node, filter, limit, first));
        }
      } catch (err) {
        _iterator64.e(err);
      } finally {
        _iterator64.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the ShadowRoot of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {ShadowRoot} The ShadowRoot.
     */
    shadow: function shadow(nodes) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.shadow(node);
    },

    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    siblings: function siblings(nodes, filter) {
      var elementsOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      filter = this.parseFilter(filter);

      if (Core.isNode(nodes)) {
        return this.constructor._siblings(nodes, filter, elementsOnly);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];

      var _iterator65 = _createForOfIteratorHelper(nodes),
          _step65;

      try {
        for (_iterator65.s(); !(_step65 = _iterator65.n()).done;) {
          var node = _step65.value;
          Core.merge(results, this.constructor._siblings(node, filter, elementsOnly));
        }
      } catch (err) {
        _iterator65.e(err);
      } finally {
        _iterator65.f();
      }

      return nodes.length > 1 && results.length > 1 ? this.sort(Core.unique(results)) : results;
    }
  });
  /**
   * DOM Filters
   */

  Object.assign(DOM.prototype, {
    /**
     * Return a node filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The node filter callback.
     */
    parseFilter: function parseFilter(filter) {
      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return DOMNode.is(node, filter);
        };
      }

      if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
        return function (node) {
          return DOMNode.isSame(node, filter);
        };
      }

      filter = this.parseNodes(filter, {
        node: true,
        fragment: true,
        shadow: true
      });

      if (filter.length) {
        return function (node) {
          return filter.includes(node);
        };
      }

      return false;
    },

    /**
     * Return a node contains filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The node contains filter callback.
     */
    parseFilterContains: function parseFilterContains(filter) {
      var _this20 = this;

      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return !!_this20.findOne(filter, node);
        };
      }

      if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
        return function (node) {
          return DOMNode.contains(node, filter);
        };
      }

      filter = this.parseNodes(filter, {
        node: true,
        fragment: true,
        shadow: true
      });

      if (filter.length) {
        return function (node) {
          return filter.some(function (other) {
            return DOMNode.contains(node, other);
          });
        };
      }

      return false;
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=this._context] The Document context.
     * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
     */
    parseNode: function parseNode(nodes) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Core.isString(nodes)) {
        if ('html' in options && options.html && nodes.trim().charAt(0) === '<') {
          return this.parseHTML(nodes).shift();
        }

        var _node = this.findOne(nodes, 'context' in options ? options.context : this._context);

        return _node ? _node : null;
      }

      var nodeFilter = this.constructor.parseNodesFactory(options);

      if (nodeFilter(nodes)) {
        return nodes;
      }

      var node = Core.wrap(nodes).slice().shift();
      return node && nodeFilter(node) ? node : null;
    },

    /**
     * Return a filtered array of nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=this._context] The Document context.
     * @returns {array} The filtered array of nodes.
     */
    parseNodes: function parseNodes(nodes) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Core.isString(nodes)) {
        if ('html' in options && options.html && nodes.trim().charAt(0) === '<') {
          return this.parseHTML(nodes);
        }

        return this.find(nodes, 'context' in options ? options.context : this._context);
      }

      var nodeFilter = this.constructor.parseNodesFactory(options);

      if (nodeFilter(nodes)) {
        return [nodes];
      }

      return Core.wrap(nodes).filter(nodeFilter);
    }
  });
  /**
   * DOM Selection
   */

  Object.assign(DOM.prototype, {
    /**
     * Insert each node after the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    afterSelection: function afterSelection(nodes) {
      // ShadowRoot nodes can not be moved
      nodes = this.parseNodes(nodes, {
        node: true,
        fragment: true,
        html: true
      });
      var selection = DOMNode.getSelection();

      if (!DOMNode.rangeCount(selection)) {
        return;
      }

      var range = DOMNode.getRange(selection);
      DOMNode.removeRanges(selection);
      DOMNode.collapse(range);

      var _iterator66 = _createForOfIteratorHelper(nodes),
          _step66;

      try {
        for (_iterator66.s(); !(_step66 = _iterator66.n()).done;) {
          var node = _step66.value;
          DOMNode.insert(range, node);
        }
      } catch (err) {
        _iterator66.e(err);
      } finally {
        _iterator66.f();
      }
    },

    /**
     * Insert each node before the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    beforeSelection: function beforeSelection(nodes) {
      // ShadowRoot nodes can not be moved
      nodes = this.parseNodes(nodes, {
        node: true,
        fragment: true,
        html: true
      });
      var selection = DOMNode.getSelection();

      if (!DOMNode.rangeCount(selection)) {
        return;
      }

      var range = DOMNode.getRange(selection);
      DOMNode.removeRanges(selection);

      var _iterator67 = _createForOfIteratorHelper(nodes),
          _step67;

      try {
        for (_iterator67.s(); !(_step67 = _iterator67.n()).done;) {
          var node = _step67.value;
          DOMNode.insert(range, node);
        }
      } catch (err) {
        _iterator67.e(err);
      } finally {
        _iterator67.f();
      }
    },

    /**
     * Extract selected nodes from the DOM.
     * @returns {array} The selected nodes.
     */
    extractSelection: function extractSelection() {
      var selection = DOMNode.getSelection();

      if (!DOMNode.rangeCount(selection)) {
        return [];
      }

      var range = DOMNode.getRange(selection);
      DOMNode.removeRanges(selection);
      var fragment = DOMNode.extract(range);
      return Core.wrap(DOMNode.childNodes(fragment));
    },

    /**
     * Return all selected nodes.
     * @returns {array} The selected nodes.
     */
    getSelection: function getSelection() {
      var selection = DOMNode.getSelection();

      if (!DOMNode.rangeCount(selection)) {
        return [];
      }

      var range = DOMNode.getRange(selection),
          nodes = Core.wrap(DOMNode.findBySelector('*', range.commonAncestorContainer));

      if (!nodes.length) {
        return [range.commonAncestorContainer];
      }

      if (nodes.length === 1) {
        return nodes;
      }

      var startContainer = DOMNode.startContainer(range),
          endContainer = DOMNode.endContainer(range),
          start = Core.isElement(startContainer) ? startContainer : DOMNode.parent(startContainer),
          end = Core.isElement(endContainer) ? endContainer : DOMNode.parent(endContainer);
      return nodes.slice(nodes.indexOf(start), nodes.indexOf(end) + 1);
    },

    /**
     * Create a selection on the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    select: function select(nodes) {
      var node = this.parseNode(nodes, {
        node: true,
        fragment: true,
        shadow: true
      });

      if (node && 'select' in node) {
        return node.select();
      }

      var selection = DOMNode.getSelection();

      if (DOMNode.rangeCount(selection) > 0) {
        DOMNode.removeRanges(selection);
      }

      if (!node) {
        return;
      }

      var range = this.createRange();
      DOMNode.select(range, node);
      DOMNode.addRange(selection, range);
    },

    /**
     * Create a selection containing all of the nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    selectAll: function selectAll(nodes) {
      nodes = this.sort(nodes);
      var selection = DOMNode.getSelection();

      if (DOMNode.rangeCount(selection)) {
        DOMNode.removeRanges(selection);
      }

      if (!nodes.length) {
        return;
      }

      var range = this.createRange();

      if (nodes.length == 1) {
        DOMNode.select(range, nodes.shift());
      } else {
        DOMNode.setStartBefore(range, nodes.shift());
        DOMNode.setEndAfter(range, nodes.pop());
      }

      DOMNode.addRange(selection, range);
    },

    /**
     * Wrap selected nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    wrapSelection: function wrapSelection(nodes) {
      // ShadowRoot nodes can not be cloned
      nodes = this.parseNodes(nodes, {
        fragment: true,
        html: true
      });
      var selection = DOMNode.getSelection();

      if (!DOMNode.rangeCount(selection)) {
        return;
      }

      var range = DOMNode.getRange(selection);
      DOMNode.removeRanges(selection);

      var fragment = DOMNode.extract(range),
          deepest = this.constructor._deepest(nodes.slice().shift()),
          children = Core.wrap(DOMNode.childNodes(fragment));

      var _iterator68 = _createForOfIteratorHelper(children),
          _step68;

      try {
        for (_iterator68.s(); !(_step68 = _iterator68.n()).done;) {
          var child = _step68.value;
          DOMNode.insertBefore(deepest, child);
        }
      } catch (err) {
        _iterator68.e(err);
      } finally {
        _iterator68.f();
      }

      var _iterator69 = _createForOfIteratorHelper(nodes),
          _step69;

      try {
        for (_iterator69.s(); !(_step69 = _iterator69.n()).done;) {
          var node = _step69.value;
          DOMNode.insert(range, node);
        }
      } catch (err) {
        _iterator69.e(err);
      } finally {
        _iterator69.f();
      }
    }
  });
  /**
   * DOM Tests
   */

  Object.assign(DOM.prototype, {
    /**
     * Returns true if any of the nodes has an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    hasAnimation: function hasAnimation(nodes) {
      var _this21 = this;

      return this.parseNodes(nodes).some(function (node) {
        return _this21.constructor._hasAnimation(node);
      });
    },

    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    hasAttribute: function hasAttribute(nodes, attribute) {
      return this.parseNodes(nodes).some(function (node) {
        return DOMNode.hasAttribute(node, attribute);
      });
    },

    /**
     * Returns true if any of the nodes has child nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    hasChildren: function hasChildren(nodes) {
      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      }).some(function (node) {
        return DOMNode.hasChildren(node);
      });
    },

    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    hasClass: function hasClass(nodes) {
      for (var _len5 = arguments.length, classes = new Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
        classes[_key6 - 1] = arguments[_key6];
      }

      classes = this.constructor._parseClasses(classes);
      return this.parseNodes(nodes).some(function (node) {
        return classes.some(function (className) {
          return DOMNode.hasClass(node, className);
        });
      });
    },

    /**
     * Returns true if any of the nodes has a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasCSSAnimation: function hasCSSAnimation(nodes) {
      var _this22 = this;

      return this.parseNodes(nodes).some(function (node) {
        return _this22.constructor._hasCSSAnimation(node);
      });
    },

    /**
     * Returns true if any of the nodes has a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasCSSTransition: function hasCSSTransition(nodes) {
      var _this23 = this;

      return this.parseNodes(nodes).some(function (node) {
        return _this23.constructor._hasCSSTransition(node);
      });
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData: function hasData(nodes, key) {
      var _this24 = this;

      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      }).some(function (node) {
        return _this24.constructor._hasData(node, key);
      });
    },

    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    hasDescendent: function hasDescendent(nodes, filter) {
      filter = this.parseFilterContains(filter);
      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      }).some(function (node) {
        return !filter || filter(node);
      });
    },

    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    hasFragment: function hasFragment(nodes) {
      var _this25 = this;

      return this.parseNodes(nodes).some(function (node) {
        return _this25.constructor._hasFragment(node);
      });
    },

    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    hasProperty: function hasProperty(nodes, property) {
      return this.parseNodes(nodes).some(function (node) {
        return DOMNode.hasProperty(node, property);
      });
    },

    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    hasShadow: function hasShadow(nodes) {
      var _this26 = this;

      return this.parseNodes(nodes).some(function (node) {
        return _this26.constructor._hasShadow(node);
      });
    },

    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    is: function is(nodes, filter) {
      filter = this.parseFilter(filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).some(function (node) {
        return !filter || filter(node);
      });
    },

    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    isConnected: function isConnected(nodes) {
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).some(function (node) {
        return DOMNode.isConnected(node);
      });
    },

    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    isEqual: function isEqual(nodes, others) {
      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        shadow: true
      });
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).some(function (node) {
        return others.some(function (other) {
          return DOMNode.isEqual(node, other);
        });
      });
    },

    /**
     * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    isFixed: function isFixed(nodes) {
      var _this27 = this;

      return this.parseNodes(nodes, {
        node: true
      }).some(function (node) {
        return Core.isElement(node) && _this27.constructor._css(node, 'position') === 'fixed' || _this27.constructor._parents(node, function (parent) {
          return Core.isElement(parent) && _this27.constructor._css(parent, 'position') === 'fixed';
        }, false, true).length;
      });
    },

    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    isHidden: function isHidden(nodes) {
      var _this28 = this;

      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).some(function (node) {
        return !_this28.constructor._isVisible(node);
      });
    },

    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    isSame: function isSame(nodes, others) {
      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        shadow: true
      });
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).some(function (node) {
        return others.some(function (other) {
          return DOMNode.isSame(node, other);
        });
      });
    },

    /**
     * Returns true if any of the nodes is visible.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    isVisible: function isVisible(nodes) {
      var _this29 = this;

      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).some(function (node) {
        return _this29.constructor._isVisible(node);
      });
    }
  });
  /**
   * DOM Utility
   */

  Object.assign(DOM.prototype, {
    /**
     * Execute a command in the document context.
     * @param {string} command The command to execute.
     * @param {string} [value] The value to give the command.
     * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
     */
    exec: function exec(command) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this._context.execCommand(command, false, value);
    },

    /**
     * Force a node to be shown, and then execute a callback.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    forceShow: function forceShow(nodes, callback) {
      // DocumentFragment and ShadowRoot nodes have no parent
      var node = this.parseNode(nodes, {
        node: true,
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      return this.constructor._forceShow(node, callback);
    },

    /**
     * Get the index of the first node relative to it's parent.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The index.
     */
    index: function index(nodes) {
      var node = this.parseNode(nodes, {
        node: true
      });

      if (!node) {
        return;
      }

      return Core.wrap(DOMNode.children(DOMNode.parent(node))).indexOf(node);
    },

    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    indexOf: function indexOf(nodes, filter) {
      filter = this.parseFilter(filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).findIndex(function (node) {
        return !filter || filter(node);
      });
    },

    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    normalize: function normalize(nodes) {
      nodes = this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true,
        document: true
      });

      var _iterator70 = _createForOfIteratorHelper(nodes),
          _step70;

      try {
        for (_iterator70.s(); !(_step70 = _iterator70.n()).done;) {
          var node = _step70.value;
          DOMNode.normalize(node);
        }
      } catch (err) {
        _iterator70.e(err);
      } finally {
        _iterator70.f();
      }
    },

    /**
     * Sanitize a HTML string.
     * @param {string} html The input HTML string.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     * @returns {string} The sanitized HTML string.
     */
    sanitize: function sanitize(html) {
      var allowedTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DOM.allowedTags;
      var template = this.create('template', {
        html: html
      }),
          fragment = DOMNode.fragment(template),
          children = DOMNode.children(fragment);

      var _iterator71 = _createForOfIteratorHelper(children),
          _step71;

      try {
        for (_iterator71.s(); !(_step71 = _iterator71.n()).done;) {
          var child = _step71.value;

          this.constructor._sanitize(child, fragment, allowedTags);
        }
      } catch (err) {
        _iterator71.e(err);
      } finally {
        _iterator71.f();
      }

      return this.getHTML(template);
    },

    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize: function serialize(nodes) {
      return AjaxRequest._parseParams(this.serializeArray(nodes));
    },

    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The serialized array.
     */
    serializeArray: function serializeArray(nodes) {
      var _this30 = this;

      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true
      }).reduce(function (values, node) {
        if (DOMNode.is(node, 'form') || Core.isFragment(node) || Core.isShadow(node)) {
          return values.concat(_this30.serializeArray(DOMNode.findBySelector('input, select, textarea', node)));
        }

        if (DOMNode.is(node, '[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
          return values;
        }

        var name = DOMNode.getAttribute(node, 'name');

        if (!name) {
          return values;
        }

        var value = DOMNode.getAttribute(node, 'value') || '';
        values.push({
          name: name,
          value: value
        });
        return values;
      }, []);
    },

    /**
     * Sort nodes by their position in the document.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The sorted array of nodes.
     */
    sort: function sort(nodes) {
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).sort(function (node, other) {
        if (DOMNode.isSame(node, other)) {
          return 0;
        }

        var pos = DOMNode.comparePosition(node, other);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING || pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          return -1;
        }

        if (pos & Node.DOCUMENT_POSITION_PRECEDING || pos & Node.DOCUMENT_POSITION_CONTAINS) {
          return 1;
        }

        return 0;
      });
    },

    /**
     * Return the tag name (lowercase) of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The elements tag name (lowercase).
     */
    tagName: function tagName(nodes) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.tagName(node);
    }
  });
  /**
   * DOM (Static) Animate
   */

  Object.assign(DOM, {
    /**
     * Add an animation to a single node.
     * @param {HTMLElement} node The input node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _animate: function _animate(node, callback, options) {
      var _this31 = this;

      if (!DOM._hasAnimation(node)) {
        this._animations.set(node, []);
      }

      var start = performance.now();
      return new Promise(function (resolve, reject) {
        _this31._animations.get(node).push(function () {
          var stop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (stop && !finish) {
            reject(node);
            return true;
          }

          var progress;

          if (finish) {
            progress = 1;
          } else {
            progress = (performance.now() - start) / options.duration;

            if (options.infinite) {
              progress %= 1;
            } else {
              progress = Core.clamp(progress);
            }

            if (options.type === 'ease-in') {
              progress = Math.pow(progress, 2);
            } else if (options.type === 'ease-out') {
              progress = Math.sqrt(progress);
            } else if (options.type === 'ease-in-out') {
              if (progress <= 0.5) {
                progress = Math.pow(progress, 2) * 2;
              } else {
                progress = 1 - Math.pow(1 - progress, 2) * 2;
              }
            }
          }

          callback(node, progress, options);

          if (progress === 1) {
            resolve(node);
            return true;
          }
        });
      });
    },

    /**
     * Run a single frame of all animations, and then queue up the next frame.
     */
    _animationFrame: function _animationFrame() {
      var _this32 = this;

      var _iterator72 = _createForOfIteratorHelper(this._animations),
          _step72;

      try {
        for (_iterator72.s(); !(_step72 = _iterator72.n()).done;) {
          var _step72$value = _slicedToArray(_step72.value, 2),
              node = _step72$value[0],
              animations = _step72$value[1];

          animations = animations.filter(function (animation) {
            return !animation();
          });

          if (!animations.length) {
            this._animations["delete"](node);
          } else {
            this._animations.set(node, animations);
          }
        }
      } catch (err) {
        _iterator72.e(err);
      } finally {
        _iterator72.f();
      }

      if (this._animations.size) {
        window.requestAnimationFrame(function (_) {
          return _this32._animationFrame();
        });
      } else {
        this._animating = false;
      }
    },

    /**
     * Start the animation loop (if not already started).
     */
    _start: function _start() {
      if (this._animating) {
        return;
      }

      this._animating = true;

      this._animationFrame();
    },

    /**
     * Stop all animations for a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    _stop: function _stop(node) {
      var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!DOM._hasAnimation(node)) {
        return;
      }

      var animations = this._animations.get(node);

      var _iterator73 = _createForOfIteratorHelper(animations),
          _step73;

      try {
        for (_iterator73.s(); !(_step73 = _iterator73.n()).done;) {
          var animation = _step73.value;
          animation(true, finish);
        }
      } catch (err) {
        _iterator73.e(err);
      } finally {
        _iterator73.f();
      }

      this._animations["delete"](node);
    }
  });
  /**
   * DOM (Static) Queue
   */

  Object.assign(DOM, {
    /**
     * Clear the queue of a single node.
     * @param {HTMLElement} node The input node.
     */
    _clearQueue: function _clearQueue(node) {
      if (!this._queues.has(node)) {
        return;
      }

      this._queues["delete"](node);
    },

    /**
     * Run the next callback for a single node.
     * @param {HTMLElement} node The input node.
     */
    _dequeueNode: function _dequeueNode(node) {
      var _this33 = this;

      if (!this._queues.has(node)) {
        return;
      }

      var next = this._queues.get(node).shift();

      if (!next) {
        this._queues["delete"](node);

        return;
      }

      Promise.resolve(next(node))["finally"](function (_) {
        return _this33._dequeueNode(node);
      });
    },

    /**
     * Queue a callback on a single node.
     * @param {HTMLElement} node The input node.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    _queue: function _queue(node, callback) {
      var newQueue = !this._queues.has(node);

      if (newQueue) {
        this._queues.set(node, []);
      }

      this._queues.get(node).push(callback);

      if (newQueue) {
        this._dequeueNode(node);
      }
    }
  });
  /**
   * DOM (Static) Attributes
   */

  Object.assign(DOM, {
    /**
     * Get attribute value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [attribute] The attribute name.
     * @returns {string|object} The attribute value, or an object containing attributes.
     */
    _getAttribute: function _getAttribute(node, attribute) {
      if (attribute) {
        return DOMNode.getAttribute(node, attribute);
      }

      var nodeAttributes = DOMNode.attributes(node),
          attributes = {};

      var _iterator74 = _createForOfIteratorHelper(nodeAttributes),
          _step74;

      try {
        for (_iterator74.s(); !(_step74 = _iterator74.n()).done;) {
          var attr = _step74.value;
          attributes[attr.nodeName] = attr.nodeValue;
        }
      } catch (err) {
        _iterator74.e(err);
      } finally {
        _iterator74.f();
      }

      return attributes;
    },

    /**
     * Get dataset value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [key] The dataset key.
     * @returns {string|object} The dataset value, or an object containing the dataset.
     */
    _getDataset: function _getDataset(node, key) {
      if (key) {
        key = Core.camelCase(key);
        return DOM._parseDataset(DOMNode.getDataset(node, key));
      }

      var dataset = DOMNode.dataset(node);
      var result = {};

      for (var k in dataset) {
        result[k] = DOM._parseDataset(dataset[k]);
      }

      return result;
    },

    /**
     * Remove a dataset value from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     */
    _removeDataset: function _removeDataset(node, key) {
      key = Core.camelCase(key);
      DOMNode.removeDataset(node, key);
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute: function _setAttribute(node, attributes) {
      for (var key in attributes) {
        DOMNode.setAttribute(node, key, attributes[key]);
      }
    },

    /**
     * Set dataset values for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} dataset An object containing dataset values.
     */
    _setDataset: function _setDataset(node, dataset) {
      for (var key in dataset) {
        var realKey = Core.camelCase(key);
        DOMNode.setDataset(node, realKey, dataset[key]);
      }
    }
  });
  /**
   * DOM (Static) Data
   */

  Object.assign(DOM, {
    /**
     * Clone custom data from a single node to each other node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} other The other node.
     */
    _cloneData: function _cloneData(node, other) {
      if (!this._data.has(node)) {
        return;
      }

      this._setData(other, _objectSpread({}, this._data.get(node)));
    },

    /**
     * Get custom data for a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    _getData: function _getData(node, key) {
      if (!this._data.has(node)) {
        return;
      }

      if (!key) {
        return this._data.get(node);
      }

      return this._data.get(node)[key];
    },

    /**
     * Remove custom data from a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} [key] The data key.
     */
    _removeData: function _removeData(node, key) {
      if (!this._data.has(node)) {
        return;
      }

      if (key) {
        var data = this._data.get(node);

        delete data[key];

        if (Object.keys(data).length) {
          return;
        }
      }

      this._data["delete"](node);
    },

    /**
     * Set custom data for a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {object} data An object containing data.
     */
    _setData: function _setData(node, data) {
      if (!this._data.has(node)) {
        this._data.set(node, {});
      }

      Object.assign(this._data.get(node), data);
    }
  });
  /**
   * DOM (Static) Position
   */

  Object.assign(DOM, {
    /**
     * Constrain a single node to a container box.
     * @param {HTMLElement} node The input node.
     * @param {DOMRect} containerBox The container box.
     */
    _constrain: function _constrain(node, containerBox) {
      var nodeBox = this._rect(node);

      var style = {};

      if (nodeBox.height > containerBox.height) {
        style.height = containerBox.height;
      }

      if (nodeBox.width > containerBox.width) {
        style.width = containerBox.width;
      }

      var leftOffset;

      if (nodeBox.left - containerBox.left < 0) {
        leftOffset = nodeBox.left - containerBox.left;
      } else if (nodeBox.right - containerBox.right > 0) {
        leftOffset = nodeBox.right - containerBox.right;
      }

      if (leftOffset) {
        var oldLeft = this._css(node, 'left');

        var trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
        style.left = "".concat(trueLeft - leftOffset, "px");
      }

      var topOffset;

      if (nodeBox.top - containerBox.top < 0) {
        topOffset = nodeBox.top - containerBox.top;
      } else if (nodeBox.bottom - containerBox.bottom > 0) {
        topOffset = nodeBox.bottom - containerBox.bottom;
      }

      if (topOffset) {
        var oldTop = this._css(node, 'top');

        var trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
        style.top = "".concat(trueTop - topOffset, "px");
      }

      if (this._css(node, 'position') === 'static') {
        style.position = 'relative';
      }

      this._setStyle(node, style);
    },

    /**
     * Get the position of the a single node relative to the Window or Document.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the X and Y co-ordinates.
     */
    _position: function _position(node, offset) {
      return this._forceShow(node, function (node) {
        var result = {
          x: DOMNode.offsetLeft(node),
          y: DOMNode.offsetTop(node)
        };

        if (offset) {
          var offsetParent = node;

          while (offsetParent = DOMNode.offsetParent(offsetParent)) {
            result.x += DOMNode.offsetLeft(offsetParent);
            result.y += DOMNode.offsetTop(offsetParent);
          }
        }

        return result;
      });
    },

    /**
     * Get the computed bounding rectangle of a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    _rect: function _rect(node, offset) {
      return this._forceShow(node, function (node) {
        var result = DOMNode.rect(node);

        if (offset) {
          result.x += DOMNode.getScrollXWindow(window);
          result.y += DOMNode.getScrollYWindow(window);
        }

        return result;
      });
    }
  });
  /**
   * DOM (Static) Scroll
   */

  Object.assign(DOM, {
    /**
     * Get the scroll X position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollXDocument: function _getScrollXDocument(node) {
      return DOMNode.getScrollX(DOMNode.scrollingElement(node));
    },

    /**
     * Get the scroll Y position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollYDocument: function _getScrollYDocument(node) {
      return DOMNode.getScrollY(DOMNode.scrollingElement(node));
    },

    /**
     * Scroll a single node to an X,Y position.
     * @param {HTMLElement} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScroll: function _setScroll(node, x, y) {
      DOMNode.setScrollX(node, x);
      DOMNode.setScrollY(node, y);
    },

    /**
     * Scroll a Document to an X,Y position.
     * @param {Document} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScrollDocument: function _setScrollDocument(node, x, y) {
      return this._setScroll(DOMNode.scrollingElement(node), x, y);
    },

    /**
     * Scroll a Document to an X position.
     * @param {Document} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollXDocument: function _setScrollXDocument(node, x) {
      return DOMNode.setScrollX(DOMNode.scrollingElement(node), x);
    },

    /**
     * Scroll a Window to an X position.
     * @param {Window} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollXWindow: function _setScrollXWindow(node, x) {
      return DOMNode.setScrollWindow(node, x, DOMNode.getScrollYWindow(node));
    },

    /**
     * Scroll a single node to a Y position.
     * @param {Document} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYDocument: function _setScrollYDocument(node, y) {
      return DOMNode.setScrollY(DOMNode.scrollingElement(node), y);
    },

    /**
     * Scroll a Window to a Y position.
     * @param {Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYWindow: function _setScrollYWindow(node, y) {
      return DOMNode.setScrollWindow(node, DOMNode.getScrollXWindow(node), y);
    }
  });
  /**
   * DOM (Static) Size
   */

  Object.assign(DOM, {
    /**
     * Get the computed height of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
     * @returns {number} The height.
     */
    _height: function _height(node) {
      var _this34 = this;

      var innerOuter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return this._forceShow(node, function (node) {
        var result = DOMNode.height(node);

        if (innerOuter === _this34.INNER) {
          result -= parseInt(_this34._css(node, 'padding-top')) + parseInt(_this34._css(node, 'padding-bottom'));
        }

        if (innerOuter >= _this34.OUTER) {
          result += parseInt(_this34._css(node, 'border-top-width')) + parseInt(_this34._css(node, 'border-bottom-width'));
        }

        if (innerOuter === _this34.OUTER_MARGIN) {
          result += parseInt(_this34._css(node, 'margin-top')) + parseInt(_this34._css(node, 'margin-bottom'));
        }

        return result;
      });
    },

    /**
     * Get the computed width of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [innerOuter] Whether to include padding, border and margin widths.
     * @returns {number} The width.
     */
    _width: function _width(node) {
      var _this35 = this;

      var innerOuter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return this._forceShow(node, function (node) {
        var result = DOMNode.width(node);

        if (innerOuter === _this35.INNER) {
          result -= parseInt(_this35._css(node, 'padding-left')) + parseInt(_this35._css(node, 'padding-right'));
        }

        if (innerOuter >= _this35.OUTER) {
          result += parseInt(_this35._css(node, 'border-left-width')) + parseInt(_this35._css(node, 'border-right-width'));
        }

        if (innerOuter === _this35.OUTER_MARGIN) {
          result += parseInt(_this35._css(node, 'margin-left')) + parseInt(_this35._css(node, 'margin-right'));
        }

        return result;
      });
    }
  });
  /**
   * DOM (Static) Styles
   */

  Object.assign(DOM, {
    /**
     * Get computed CSS style value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The CSS style name.
     * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    _css: function _css(node, style) {
      if (!this._styles.has(node)) {
        this._styles.set(node, DOMNode.css(node));
      }

      if (!style) {
        return _objectSpread({}, this._styles.get(node));
      }

      style = Core.kebabCase(style);
      return this._styles.get(node).getPropertyValue(style);
    },

    /**
     * Get style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The style name.
     * @returns {string|object} The style value, or an object containing the style properties.
     */
    _getStyle: function _getStyle(node, style) {
      if (style) {
        style = Core.kebabCase(style);
        return DOMNode.getStyle(node, style);
      }

      var nodeStyles = DOMNode.style(node),
          styles = {};

      var _iterator75 = _createForOfIteratorHelper(nodeStyles),
          _step75;

      try {
        for (_iterator75.s(); !(_step75 = _iterator75.n()).done;) {
          var _style = _step75.value;
          styles[_style] = DOMNode.getStyle(node, _style);
        }
      } catch (err) {
        _iterator75.e(err);
      } finally {
        _iterator75.f();
      }

      return styles;
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    _setStyle: function _setStyle(node, styles, important) {
      for (var style in styles) {
        var value = styles[style];
        style = Core.kebabCase(style); // if value is numeric and not a number property, add px

        if (value && Core.isNumeric(value) && !this.cssNumberProperties.includes(style)) {
          value += 'px';
        }

        DOMNode.setStyle(node, style, value, important);
      }
    }
  });
  /**
   * DOM (Static) Event Factory
   */

  Object.assign(DOM, {
    /**
     * Return a wrapped event callback that executes on a delegate selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @param {function} callback The event callback.
     * @returns {DOM~eventCallback} The delegated event callback.
     */
    _delegateFactory: function _delegateFactory(node, selector, callback) {
      var getDelegate = selector.match(DOM._complexRegExp) ? this._getDelegateContainsFactory(node, selector) : this._getDelegateMatchFactory(node, selector);
      return function (e) {
        if (DOMNode.isSame(e.target, node)) {
          return;
        }

        var delegate = getDelegate(e.target);

        if (!delegate) {
          return;
        }

        var event = {};

        var _loop = function _loop(key) {
          event[key] = Core.isFunction(e[key]) ? function () {
            return e[key].apply(e, arguments);
          } : e[key];
        };

        for (var key in e) {
          _loop(key);
        }

        event.currentTarget = delegate;
        event.delegateTarget = node;
        event.originalEvent = e;
        Object.freeze(event);
        return callback(event);
      };
    },

    /**
     * Return a function for matching a delegate target to a custom selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    _getDelegateContainsFactory: function _getDelegateContainsFactory(node, selector) {
      var _this36 = this;

      selector = DOM._prefixSelectors(selector, "#".concat(DOM._tempId));
      return function (target) {
        var matches = _this36.__findByCustom(selector, node);

        if (!matches.length) {
          return false;
        }

        if (matches.includes(target)) {
          return target;
        }

        return _this36._parents(target, function (parent) {
          return matches.includes(parent);
        }, function (parent) {
          return DOMNode.isSame(node, parent);
        }, true).shift();
      };
    },

    /**
     * Return a function for matching a delegate target to a standard selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    _getDelegateMatchFactory: function _getDelegateMatchFactory(node, selector) {
      var _this37 = this;

      return function (target) {
        return DOMNode.is(target, selector) ? target : _this37._parents(target, function (parent) {
          return DOMNode.is(parent, selector);
        }, function (parent) {
          return DOMNode.isSame(node, parent);
        }, true).shift();
      };
    },

    /**
     * Return a wrapped event callback that check for a namespace match.
     * @param {string} event The namespaced event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @returns {DOM~eventCallback} The wrapped event callback.
     */
    _namespaceFactory: function _namespaceFactory(event, callback) {
      return function (e) {
        if ('namespaceRegExp' in e && !e.namespaceRegExp.test(event)) {
          return;
        }

        return callback(e);
      };
    },

    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @returns {DOM~eventCallback} The wrapped event callback.
     */
    _selfDestructFactory: function _selfDestructFactory(node, events, delegate, callback) {
      var _this38 = this;

      return function (e) {
        delegate ? _this38._removeEvent(node, events, callback, delegate) : _this38._removeEvent(node, events, callback);
        return callback(e);
      };
    }
  });
  /**
   * DOM (Static) Event Handlers
   */

  Object.assign(DOM, {
    /**
     * Add an event to a single node.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    _addEvent: function _addEvent(node, event, callback, delegate, selfDestruct) {
      if (!this._events.has(node)) {
        this._events.set(node, {});
      }

      var nodeEvents = this._events.get(node),
          eventData = {
        delegate: delegate,
        callback: callback,
        selfDestruct: selfDestruct
      },
          realEvent = this._parseEvent(event);

      var realCallback = callback;

      if (selfDestruct) {
        realCallback = this._selfDestructFactory(node, event, delegate, realCallback);
      }

      if (delegate) {
        realCallback = this._delegateFactory(node, delegate, realCallback);
      }

      if (event !== realEvent) {
        realCallback = this._namespaceFactory(event, realCallback);
      }

      eventData.realCallback = realCallback;
      eventData.event = event;
      eventData.realEvent = realEvent;

      if (!nodeEvents[realEvent]) {
        nodeEvents[realEvent] = [];
      } else if (nodeEvents[realEvent].includes(eventData)) {
        return;
      }

      nodeEvents[realEvent].push(eventData);
      DOMNode.addEvent(node, realEvent, realCallback);
    },

    /**
     * Clone all events from a single node to other nodes.
     * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
     * @param {HTMLElement|ShadowRoot|Document|Window} other The other node.
     */
    _cloneEvents: function _cloneEvents(node, other) {
      if (!this._events.has(node)) {
        return;
      }

      var nodeEvents = this._events.get(node);

      for (var event in nodeEvents) {
        var _iterator76 = _createForOfIteratorHelper(nodeEvents[event]),
            _step76;

        try {
          for (_iterator76.s(); !(_step76 = _iterator76.n()).done;) {
            var eventData = _step76.value;

            this._addEvent(other, eventData.event, eventData.callback, eventData.delegate, eventData.selfDestruct);
          }
        } catch (err) {
          _iterator76.e(err);
        } finally {
          _iterator76.f();
        }
      }
    },

    /**
     * Remove an event from a single node.
     * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} [event] The event name.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent: function _removeEvent(node, event, callback, delegate) {
      if (!this._events.has(node)) {
        return;
      }

      var nodeEvents = this._events.get(node);

      if (!event) {
        var realEvents = Object.keys(nodeEvents);

        for (var _i2 = 0, _realEvents = realEvents; _i2 < _realEvents.length; _i2++) {
          var _realEvent = _realEvents[_i2];

          this._removeEvent(node, _realEvent, callback, delegate);
        }

        return;
      }

      var realEvent = this._parseEvent(event);

      if (!nodeEvents[realEvent]) {
        return;
      }

      nodeEvents[realEvent] = nodeEvents[realEvent].filter(function (eventData) {
        if (delegate && delegate !== eventData.delegate || callback && callback !== eventData.callback) {
          return true;
        }

        if (realEvent !== event) {
          var regExp = DOM._eventNamespacedRegExp(event);

          if (!eventData.event.match(regExp)) {
            return true;
          }
        }

        DOMNode.removeEvent(node, eventData.realEvent, eventData.realCallback);
        return false;
      });

      if (!nodeEvents[realEvent].length) {
        delete nodeEvents[realEvent];
      }

      if (Object.keys(nodeEvents).length) {
        return;
      }

      this._events["delete"](node);
    },

    /**
     * Trigger an event on a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {object} [data] Additional data to attach to the Event object.
     * @param {object} [options] The options to use for the Event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    _triggerEvent: function _triggerEvent(node, event, data, options) {
      var realEvent = DOM._parseEvent(event),
          eventData = _objectSpread({}, data);

      if (realEvent !== event) {
        eventData.namespace = event.substring(realEvent.length + 1);
        eventData.namespaceRegExp = DOM._eventNamespacedRegExp(event);
      }

      return DOMNode.triggerEvent(node, realEvent, eventData, options);
    }
  });
  /**
   * DOM (Static) Helpers
   */

  Object.assign(DOM, {
    /**
     * Return a RegExp for testing a namespaced event.
     * @param {string} event The namespaced event.
     * @returns {RegExp} The namespaced event RegExp.
     */
    _eventNamespacedRegExp: function _eventNamespacedRegExp(event) {
      return new RegExp("^".concat(Core.escapeRegExp(event), "(?:\\.|$)"), 'i');
    },

    /**
     * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
     * @param {array} classList The classes to parse.
     * @returns {string[]} The parsed classes.
     */
    _parseClasses: function _parseClasses(classList) {
      return classList.flat().flatMap(function (val) {
        return val.split(' ');
      });
    },

    /**
     * Return a data object from a key and value, or a data object.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     * @param {Boolean} [json=false] Whether to JSON encode the values.
     * @returns {object} The data object.
     */
    _parseData: function _parseData(key, value) {
      var json = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var obj = Core.isObject(key) ? key : _defineProperty({}, key, value);
      var result = {};

      for (var k in obj) {
        var v = obj[k];
        result[k] = json && (Core.isObject(v) || Core.isArray(v)) ? JSON.stringify(v) : v;
      }

      return result;
    },

    /**
     * Return a JS primitive from a dataset string.
     * @param {string} value The input value.
     * @return {*} The parsed value.
     */
    _parseDataset: function _parseDataset(value) {
      if (Core.isUndefined(value)) {
        return value;
      }

      var lower = value.toLowerCase().trim();

      if (['true', 'on'].includes(lower)) {
        return true;
      }

      if (['false', 'off'].includes(lower)) {
        return false;
      }

      if (lower === 'null') {
        return null;
      }

      if (Core.isNumeric(lower)) {
        return parseFloat(lower);
      }

      if (['{', '['].includes(lower.charAt(0))) {
        try {
          var result = JSON.parse(value);
          return result;
        } catch (e) {}
      }

      return value;
    },

    /**
     * Return a "real" event from a namespaced event.
     * @param {string} event The namespaced event.
     * @returns {string} The real event.
     */
    _parseEvent: function _parseEvent(event) {
      return event.split('.').shift();
    },

    /**
     * Return an array of events from a space-separated string.
     * @param {string} events The events.
     * @returns {array} The parsed events.
     */
    _parseEvents: function _parseEvents(events) {
      return events.split(' ');
    },

    /**
     * Return a prefixed selector string.
     * @param {string} selectors The input selectors.
     * @param {string} prefix The input prefix.
     * @returns {string} The prefixed selector.
     */
    _prefixSelectors: function _prefixSelectors(selectors, prefix) {
      return selectors.split(this._splitRegExp).filter(function (select) {
        return !!select;
      }).map(function (select) {
        return "".concat(prefix, " ").concat(select);
      });
    }
  });
  /**
   * DOM (Static) Manipulation
   */

  Object.assign(DOM, {
    /**
     * Clone a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
     */
    _clone: function _clone(node) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cloneEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cloneData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var clone = DOMNode.clone(node, deep);

      if (!cloneEvents && !cloneData) {
        return clone;
      }

      if (cloneEvents) {
        this._cloneEvents(node, clone);
      }

      if (cloneData) {
        this._cloneData(node, clone);
      }

      if (deep) {
        this._deepClone(node, clone, cloneEvents, cloneData);
      }

      return clone;
    },

    /**
     * Deep clone a node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     */
    _deepClone: function _deepClone(node, clone) {
      var cloneEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cloneData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var children = Core.wrap(DOMNode.childNodes(node));
      var cloneChildren = Core.wrap(DOMNode.childNodes(clone));

      for (var i = 0; i < children.length; i++) {
        if (cloneEvents) {
          this._cloneEvents(children[i], cloneChildren[i]);
        }

        if (cloneData) {
          this._cloneData(children[i], cloneChildren[i]);
        }

        this._deepClone(children[i], cloneChildren[i]);
      }
    },

    /**
     * Detach a single node from the DOM.
     * @param {Node|HTMLElement} node The input node.
     */
    _detach: function _detach(node) {
      var parent = DOMNode.parent(node);

      if (parent) {
        return;
      }

      DOMNode.removeChild(parent, node);
    },

    /**
     * Remove all children of a single node from the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    _empty: function _empty(node) {
      // Remove descendent elements
      var children = Core.wrap(DOMNode.childNodes(node));

      var _iterator77 = _createForOfIteratorHelper(children),
          _step77;

      try {
        for (_iterator77.s(); !(_step77 = _iterator77.n()).done;) {
          var child = _step77.value;

          this._remove(child);

          DOMNode.removeChild(node, child);
        } // Remove ShadowRoot

      } catch (err) {
        _iterator77.e(err);
      } finally {
        _iterator77.f();
      }

      if (this._hasShadow(node)) {
        var shadow = DOMNode.shadow(node);

        this._remove(shadow);
      } // Remove DocumentFragment


      if (this._hasFragment(node)) {
        var fragment = DOMNode.fragment(node);

        this._remove(fragment);
      }
    },

    /**
     * Remove a single node from the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     */
    _remove: function _remove(node) {
      DOMNode.triggerEvent(node, 'remove');

      this._empty(node);

      if (Core.isElement(node)) {
        this._clearQueue(node);

        this._stop(node);

        if (this._styles.has(node)) {
          this._styles["delete"](node);
        }
      }

      this._removeEvent(node);

      this._removeData(node);
    },

    /**
     * Replace a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {array} others The other node(s).
     */
    _replaceWith: function _replaceWith(node, others) {
      var parent = DOMNode.parent(node);

      if (!parent) {
        return;
      }

      var _iterator78 = _createForOfIteratorHelper(others),
          _step78;

      try {
        for (_iterator78.s(); !(_step78 = _iterator78.n()).done;) {
          var other = _step78.value;

          var clone = this._clone(other, true);

          DOMNode.insertBefore(parent, clone, node);
        }
      } catch (err) {
        _iterator78.e(err);
      } finally {
        _iterator78.f();
      }

      this._remove(node);

      DOMNode.removeChild(parent, node);
    }
  });
  /**
   * DOM (Static) Wrap
   */

  Object.assign(DOM, {
    /**
     * Unwrap a single node.
     * @param {Node|HTMLElement} parent The input node.
     */
    _unwrap: function _unwrap(parent) {
      var outerParent = DOMNode.parent(parent);

      if (!outerParent) {
        return;
      }

      var children = Core.wrap(DOMNode.childNodes(parent));

      var _iterator79 = _createForOfIteratorHelper(children),
          _step79;

      try {
        for (_iterator79.s(); !(_step79 = _iterator79.n()).done;) {
          var child = _step79.value;
          DOMNode.insertBefore(outerParent, child, parent);
        }
      } catch (err) {
        _iterator79.e(err);
      } finally {
        _iterator79.f();
      }

      this._remove(parent);

      DOMNode.removeChild(outerParent, parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {array} others The other node(s).
     */
    _wrap: function _wrap(node, others) {
      var _this39 = this;

      var parent = DOMNode.parent(node);

      if (!parent) {
        return;
      }

      var clones = others.map(function (other) {
        return _this39._clone(other, true);
      });

      var _iterator80 = _createForOfIteratorHelper(clones),
          _step80;

      try {
        for (_iterator80.s(); !(_step80 = _iterator80.n()).done;) {
          var clone = _step80.value;
          DOMNode.insertBefore(parent, clone, node);
        }
      } catch (err) {
        _iterator80.e(err);
      } finally {
        _iterator80.f();
      }

      var deepest = this._deepest(clones.shift());

      DOMNode.insertBefore(deepest, node);
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {array} nodes The input node(s).
     * @param {array} others The other node(s).
     */
    _wrapAll: function _wrapAll(nodes, others) {
      var firstNode = nodes.slice().shift();

      if (!firstNode) {
        return;
      }

      var parent = DOMNode.parent(firstNode);

      if (!parent) {
        return;
      }

      var _iterator81 = _createForOfIteratorHelper(others),
          _step81;

      try {
        for (_iterator81.s(); !(_step81 = _iterator81.n()).done;) {
          var other = _step81.value;
          DOMNode.insertBefore(parent, other, firstNode);
        }
      } catch (err) {
        _iterator81.e(err);
      } finally {
        _iterator81.f();
      }

      var deepest = DOM._deepest(others.shift());

      var _iterator82 = _createForOfIteratorHelper(nodes),
          _step82;

      try {
        for (_iterator82.s(); !(_step82 = _iterator82.n()).done;) {
          var node = _step82.value;
          DOMNode.insertBefore(deepest, node);
        }
      } catch (err) {
        _iterator82.e(err);
      } finally {
        _iterator82.f();
      }
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {array} others The other node(s).
     */
    _wrapInner: function _wrapInner(node, others) {
      var _this40 = this;

      var children = Core.wrap(DOMNode.childNodes(node));
      var clones = others.map(function (other) {
        return _this40._clone(other, true);
      });

      var _iterator83 = _createForOfIteratorHelper(clones),
          _step83;

      try {
        for (_iterator83.s(); !(_step83 = _iterator83.n()).done;) {
          var clone = _step83.value;
          DOMNode.insertBefore(node, clone);
        }
      } catch (err) {
        _iterator83.e(err);
      } finally {
        _iterator83.f();
      }

      var deepest = this._deepest(clones.shift());

      var _iterator84 = _createForOfIteratorHelper(children),
          _step84;

      try {
        for (_iterator84.s(); !(_step84 = _iterator84.n()).done;) {
          var child = _step84.value;
          DOMNode.insertBefore(deepest, child);
        }
      } catch (err) {
        _iterator84.e(err);
      } finally {
        _iterator84.f();
      }
    }
  });
  /**
   * DOM (Static) Parsing
   */

  Object.assign(DOM, {
    /**
     * Create a Document object from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {Document} A new Document object.
     */
    parseHTML: function parseHTML(html) {
      return new DOMParser().parseFromString(html, 'text/html');
    },

    /**
     * Create a Document object from an XML string.
     * @param {string} xml The XML input string.
     * @returns {Document} A new Document object.
     */
    parseXML: function parseXML(xml) {
      return new DOMParser().parseFromString(xml, 'application/xml');
    }
  });
  /**
   * DOM (Static) Find
   */

  Object.assign(DOM, {
    /**
     * Return all nodes matching custom CSS selector(s).
     * @param {array} selectors The custom query selector(s).
     * @param {array} nodes The input nodes.
     * @returns {array} The matching nodes.
     */
    _findByCustom: function _findByCustom(selectors) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._context;
      var results = [];

      var _iterator85 = _createForOfIteratorHelper(nodes),
          _step85;

      try {
        for (_iterator85.s(); !(_step85 = _iterator85.n()).done;) {
          var node = _step85.value;
          Core.merge(results, this.__findByCustom(selectors, node));
        }
      } catch (err) {
        _iterator85.e(err);
      } finally {
        _iterator85.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all nodes matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {array} nodes The input nodes.
     * @returns {array} The matching nodes.
     */
    _findBySelector: function _findBySelector(selector, nodes) {
      var results = [];

      var _iterator86 = _createForOfIteratorHelper(nodes),
          _step86;

      try {
        for (_iterator86.s(); !(_step86 = _iterator86.n()).done;) {
          var node = _step86.value;
          Core.merge(results, DOMNode.findBySelector(selector, node));
        }
      } catch (err) {
        _iterator86.e(err);
      } finally {
        _iterator86.f();
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single node matching custom CSS selector(s).
     * @param {array} selectors The custom query selector(s).
     * @param {array} nodes The input nodes.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom: function _findOneByCustom(selectors, nodes) {
      var _iterator87 = _createForOfIteratorHelper(nodes),
          _step87;

      try {
        for (_iterator87.s(); !(_step87 = _iterator87.n()).done;) {
          var node = _step87.value;

          var result = this.__findOneByCustom(selectors, node);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _iterator87.e(err);
      } finally {
        _iterator87.f();
      }

      return null;
    },

    /**
     * Return a single node matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {array} nodes The input nodes.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector: function _findOneBySelector(selector, nodes) {
      var _iterator88 = _createForOfIteratorHelper(nodes),
          _step88;

      try {
        for (_iterator88.s(); !(_step88 = _iterator88.n()).done;) {
          var node = _step88.value;
          var result = DOMNode.findOneBySelector(selector, node);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _iterator88.e(err);
      } finally {
        _iterator88.f();
      }

      return null;
    },

    /**
     * Return all nodes matching a custom CSS selector.
     * @param {string} selectors The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {NodeList} The matching nodes.
     */
    __findByCustom: function __findByCustom(selectors, node) {
      var nodeId = DOMNode.getAttribute(node, 'id');
      DOMNode.setAttribute(node, 'id', this._tempId);
      var parent = DOMNode.parent(node);
      var results = [];

      var _iterator89 = _createForOfIteratorHelper(selectors),
          _step89;

      try {
        for (_iterator89.s(); !(_step89 = _iterator89.n()).done;) {
          var selector = _step89.value;
          Core.merge(results, DOMNode.findBySelector(selector, parent));
        }
      } catch (err) {
        _iterator89.e(err);
      } finally {
        _iterator89.f();
      }

      if (nodeId) {
        DOMNode.setAttribute(node, 'id', nodeId);
      } else {
        DOMNode.removeAttribute(node, 'id');
      }

      return selectors.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single node matching a custom CSS selector.
     * @param {string} selectors The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    __findOneByCustom: function __findOneByCustom(selectors, node) {
      var nodeId = DOMNode.getAttribute(node, 'id');
      DOMNode.setAttribute(node, 'id', this._tempId);
      var parent = DOMNode.parent(node);

      if (!parent) {
        return null;
      }

      var result = null;

      var _iterator90 = _createForOfIteratorHelper(selectors),
          _step90;

      try {
        for (_iterator90.s(); !(_step90 = _iterator90.n()).done;) {
          var selector = _step90.value;
          result = DOMNode.findOneBySelector(selector, parent);

          if (result) {
            break;
          }
        }
      } catch (err) {
        _iterator90.e(err);
      } finally {
        _iterator90.f();
      }

      if (nodeId) {
        DOMNode.setAttribute(node, 'id', nodeId);
      } else {
        DOMNode.removeAttribute(node, 'id');
      }

      return result;
    }
  });
  /**
   * DOM (Static) Traversal
   */

  Object.assign(DOM, {
    /**
     * Return all children of a single node (optionally matching a filter).
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    _children: function _children(node, filter) {
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elementsOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var children = Core.wrap(elementsOnly ? DOMNode.children(node) : DOMNode.childNodes(node));
      var results = [];
      var child;

      var _iterator91 = _createForOfIteratorHelper(children),
          _step91;

      try {
        for (_iterator91.s(); !(_step91 = _iterator91.n()).done;) {
          child = _step91.value;

          if (filter && !filter(child)) {
            continue;
          }

          results.push(child);

          if (first) {
            break;
          }
        }
      } catch (err) {
        _iterator91.e(err);
      } finally {
        _iterator91.f();
      }

      return results;
    },

    /**
     * Return the deepest child node for a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement} The deepest node.
     */
    _deepest: function _deepest(node) {
      return Core.wrap(DOMNode.findBySelector('*', node)).find(function (node) {
        return !DOMNode.hasChildren(node);
      }) || node;
    },

    /**
     * Return the next sibling for a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _next: function _next(node, filter) {
      var results = [];
      node = DOMNode.next(node);

      if (!node) {
        return results;
      }

      if (filter && !filter(node)) {
        return results;
      }

      results.push(node);
      return results;
    },

    /**
     * Return all next siblings for a single node (optionally matching a filter, and before a limit).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _nextAll: function _nextAll(node, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var results = [];

      while (node = DOMNode.next(node)) {
        if (limit && limit(node)) {
          break;
        }

        if (filter && !filter(node)) {
          continue;
        }

        results.push(node);

        if (first) {
          break;
        }
      }

      return results;
    },

    /**
     * Return the parent of a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _parent: function _parent(node, filter) {
      var results = [];
      var parent = DOMNode.parent(node);

      if (!parent) {
        return results;
      }

      if (filter && !filter(parent)) {
        return results;
      }

      results.push(parent);
      return results;
    },

    /**
     * Return all parents of a single node (optionally matching a filter, and before a limit).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _parents: function _parents(node, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var results = [];

      while (node = DOMNode.parent(node)) {
        if (Core.isDocument(node)) {
          break;
        }

        if (limit && limit(node)) {
          break;
        }

        if (filter && !filter(node)) {
          continue;
        }

        results.unshift(node);

        if (first) {
          break;
        }
      }

      return results;
    },

    /**
     * Return the previous sibling for a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _prev: function _prev(node, filter) {
      var results = [];
      node = DOMNode.prev(node);

      if (!node) {
        return results;
      }

      if (filter && !filter(node)) {
        return results;
      }

      results.push(node);
      return results;
    },

    /**
     * Return all previous siblings for a single node (optionally matching a filter, and before a limit).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _prevAll: function _prevAll(node, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var results = [];

      while (node = DOMNode.prev(node)) {
        if (limit && limit(node)) {
          break;
        }

        if (filter && !filter(node)) {
          continue;
        }

        results.unshift(node);

        if (first) {
          break;
        }
      }

      return results;
    },

    /**
     * Return all siblings for a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    _siblings: function _siblings(node, filter) {
      var elementsOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var results = [];
      var parent = DOMNode.parent(node);

      if (!parent) {
        return results;
      }

      var siblings = elementsOnly ? parent.children : parent.childNodes;
      var sibling;

      var _iterator92 = _createForOfIteratorHelper(siblings),
          _step92;

      try {
        for (_iterator92.s(); !(_step92 = _iterator92.n()).done;) {
          sibling = _step92.value;

          if (DOMNode.isSame(node, sibling)) {
            continue;
          }

          if (filter && !filter(sibling)) {
            continue;
          }

          results.push(sibling);
        }
      } catch (err) {
        _iterator92.e(err);
      } finally {
        _iterator92.f();
      }

      return results;
    }
  });
  /**
   * DOM (Static) Filters
   */

  Object.assign(DOM, {
    /**
     * Return a function for filtering nodes.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @returns {DOM~nodeCallback} The node filter function.
     */
    parseNodesFactory: function parseNodesFactory(options) {
      return options ? function (node) {
        return (options.node ? Core.isNode(node) : Core.isElement(node)) || options.fragment && Core.isFragment(node) || options.shadow && Core.isShadow(node) || options.document && Core.isDocument(node) || options.window && Core.isWindow(node);
      } : Core.isElement;
    }
  });
  /**
   * DOM (Static) Tests
   */

  Object.assign(DOM, {
    /**
     * Returns true if a single node has an animation.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has an animation, otherwise FALSE.
     */
    _hasAnimation: function _hasAnimation(node) {
      return this._animations.has(node);
    },

    /**
     * Returns true if a single node has a CSS animation.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
     */
    _hasCSSAnimation: function _hasCSSAnimation(node) {
      return !!parseFloat(this._css(node, 'animation-duration'));
    },

    /**
     * Returns true if a single node has a CSS transition.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS transition, otherwise FALSE.
     */
    _hasCSSTransition: function _hasCSSTransition(node) {
      return !!parseFloat(this._css(node, 'transition-duration'));
    },

    /**
     * Returns true if a single node has custom data.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if the node has custom data, otherwise FALSE.
     */
    _hasData: function _hasData(node, key) {
      return this._data.has(node) && (!key || this._data.get(node).hasOwnProperty(key));
    },

    /**
     * Returns true if a single node has a DocumentFragment.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a DocumentFragment, otherwise FALSE.
     */
    _hasFragment: function _hasFragment(node) {
      return !!DOMNode.fragment(node);
    },

    /**
     * Returns true if a single node has a ShadowRoot.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a ShadowRoot, otherwise FALSE.
     */
    _hasShadow: function _hasShadow(node) {
      return !!DOMNode.shadow(node);
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    _isVisible: function _isVisible(node) {
      if (Core.isWindow(node)) {
        return DOMNode._isVisibleDocument(DOMNode.document(node));
      }

      if (Core.isDocument(node)) {
        return DOMNode.isVisibleDocument(node);
      }

      return !!DOMNode.offsetParent(node);
    }
  });
  /**
   * DOM (Static) Utility
   */

  Object.assign(DOM, {
    /**
     * Force a single node to be shown, and then execute a callback.
     * @param {Node|HTMLElement|Document|Window} node The input node.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    _forceShow: function _forceShow(node, callback) {
      var _this41 = this;

      if (Core.isDocument(node) || Core.isWindow(node) || this._isVisible(node)) {
        return callback(node);
      }

      var elements = [];

      if (Core.isElement(node) && this._css(node, 'display') === 'none') {
        elements.push(node);
      }

      Core.merge(elements, this._parents(node, function (parent) {
        return Core.isElement(parent) && _this41._css(parent, 'display') === 'none';
      }));
      var hidden = new Map();

      for (var _i3 = 0, _elements = elements; _i3 < _elements.length; _i3++) {
        var element = _elements[_i3];
        hidden.set(element, DOMNode.getAttribute(element, 'style'));
        DOMNode.setStyle(element, 'display', 'initial', true);
      }

      var result = callback(node);

      var _iterator93 = _createForOfIteratorHelper(hidden),
          _step93;

      try {
        for (_iterator93.s(); !(_step93 = _iterator93.n()).done;) {
          var _step93$value = _slicedToArray(_step93.value, 2),
              _element = _step93$value[0],
              style = _step93$value[1];

          if (style) {
            DOMNode.setAttribute(_element, 'style', style);
          } else {
            DOMNode.removeAttribute(_element, 'style');
          }
        }
      } catch (err) {
        _iterator93.e(err);
      } finally {
        _iterator93.f();
      }

      return result;
    },

    /**
     * Sanitize a single node.
     * @param {HTMLElement} node The input node.
     * @param {HTMLElement} parent The parent node.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     */
    _sanitize: function _sanitize(node, parent) {
      var allowedTags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.allowedTags;

      // check node
      var name = this._tagName(node);

      if (!(name in allowedTags)) {
        DOMNode.removeChild(parent, node);
        return;
      } // check node attributes


      var allowedAttributes = [].concat(_toConsumableArray(allowedTags['*']), _toConsumableArray(allowedTags[name]));

      var attributes = this._getAttribute(node);

      var _loop2 = function _loop2(attribute) {
        var valid = !!allowedAttributes.find(function (test) {
          return attribute.match(test);
        });

        if (!valid) {
          DOMNode.removeAttribute(node, attribute);
        }
      };

      for (var attribute in attributes) {
        _loop2(attribute);
      } // check children


      var children = DOMNode.children(node);

      var _iterator94 = _createForOfIteratorHelper(children),
          _step94;

      try {
        for (_iterator94.s(); !(_step94 = _iterator94.n()).done;) {
          var child = _step94.value;

          this._sanitize(child, node, allowedTags);
        }
      } catch (err) {
        _iterator94.e(err);
      } finally {
        _iterator94.f();
      }
    },

    /**
     * Return the tag name (lowercase) of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {string} The elements tag name (lowercase).
     */
    _tagName: function _tagName(node) {
      return DOMNode.tagName(node).toLowerCase();
    }
  });
  /**
   * DOM (Static) Properties
   */

  /**
   * @callback DOM~animationCallback
   * @param {HTMLElement} node The input node.
   * @param {number} progress The animation progress.
   * @param {object} options The options to use for animating.
   */

  /**
   * @callback DOM~delegateCallback
   * @param {HTMLElement} node The input node.
   */

  /**
   * @callback DOM~eventCallback
   * @param {Event} event The event object.
   */

  /**
   * @callback DOM~nodeCallback
   * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
   */

  /**
   * @callback DOM~queueCallback
   * @param {HTMLElement} node The input node.
   */

  Object.assign(DOM, {
    _animating: false,
    _animations: new Map(),
    _queues: new WeakMap(),
    _data: new WeakMap(),
    _events: new WeakMap(),
    _styles: new WeakMap(),
    // Default allowed tags/attributes for sanitizer
    allowedTags: {
      '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    },
    // Default animation options
    animationDefaults: {
      duration: 1000,
      type: 'ease-in-out',
      infinite: false
    },
    // CSS properties that can have number-only values
    cssNumberProperties: ['font-weight', 'line-height', 'opacity', 'orphans', 'widows', 'z-index'],
    INNER: 0,
    OUTER: 2,
    OUTER_MARGIN: 3,
    // Complex selector RegExp
    _complexRegExp: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,
    // Fast selector RegExp
    _fastRegExp: /^([\#\.]?)([\w\-]+)$/,
    // Comma seperated selector RegExp
    _splitRegExp: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,
    // Temporary ID
    _tempId: "frost".concat(Date.now().toString(16))
  });
  /**
   * DOMNode Class
   * @class
   */

  var DOMNode = function DOMNode() {
    _classCallCheck(this, DOMNode);
  };
  /**
   * DOMNode (Static) Attributes
   */


  Object.assign(DOMNode, {
    /**
     * Get attribute values for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {NamedNodeMap} The dataset value.
     */
    attributes: function attributes(node) {
      return node.attributes;
    },

    /**
     * Get dataset values for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DOMStringMap} The dataset value.
     */
    dataset: function dataset(node) {
      return node.dataset;
    },

    /**
     * Get an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    getAttribute: function getAttribute(node, attribute) {
      return node.getAttribute(attribute);
    },

    /**
     * Get a dataset value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [key] The dataset key.
     * @returns {string} The dataset value.
     */
    getDataset: function getDataset(node, key) {
      return this.dataset(node)[key];
    },

    /**
     * Get a property value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty: function getProperty(node, property) {
      return node[property];
    },

    /**
     * Remove an attribute from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     */
    removeAttribute: function removeAttribute(node, attribute) {
      node.removeAttribute(attribute);
    },

    /**
     * Remove a dataset value from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     */
    removeDataset: function removeDataset(node, key) {
      delete node.dataset[key];
    },

    /**
     * Remove a property from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     */
    removeProperty: function removeProperty(node, property) {
      delete node[property];
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @param {string} value The attribute value.
     */
    setAttribute: function setAttribute(node, attribute, value) {
      node.setAttribute(attribute, value);
    },

    /**
     * Set a dataset value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     * @param {string} value The dataset value.
     */
    setDataset: function setDataset(node, key, value) {
      this.dataset(node)[key] = value;
    },

    /**
     * Set a property value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @param {string} value The property value.
     */
    setProperty: function setProperty(node, property, value) {
      node[property] = value;
    }
  });
  /**
   * DOMNode (Static) Position
   */

  Object.assign(DOMNode, {
    /**
     * Get the left offset of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The left offset of the node (in pixels).
     */
    offsetLeft: function offsetLeft(node) {
      return node.offsetLeft;
    },

    /**
     * Get the top offset of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The top offset of the node (in pixels).
     */
    offsetTop: function offsetTop(node) {
      return node.offsetTop;
    },

    /**
     * Get the computed bounding rectangle of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect: function rect(node) {
      return node.getBoundingClientRect();
    }
  });
  /**
   * DOMNode (Static) Scroll
   */

  Object.assign(DOMNode, {
    /**
     * Get the scroll X position of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The scroll X position.
     */
    getScrollX: function getScrollX(node) {
      return node.scrollLeft;
    },

    /**
     * Get the scroll X position of a Window.
     * @param {Window} node The input node.
     * @returns {number} The scroll X position.
     */
    getScrollXWindow: function getScrollXWindow(node) {
      return node.scrollX;
    },

    /**
     * Get the scroll Y position of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The scroll Y position.
     */
    getScrollY: function getScrollY(node) {
      return node.scrollTop;
    },

    /**
     * Get the scroll Y position of a Window.
     * @param {Document} node The input node.
     * @returns {number} The scroll Y position.
     */
    getScrollYWindow: function getScrollYWindow(node) {
      return node.scrollY;
    },

    /**
     * Scroll a Window to an X,Y position.
     * @param {Window} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    setScrollWindow: function setScrollWindow(node, x, y) {
      return node.scroll(x, y);
    },

    /**
     * Scroll a single node to an X position.
     * @param {HTMLElement} node The input node.
     * @param {number} x The scroll X position.
     */
    setScrollX: function setScrollX(node, x) {
      node.scrollLeft = x;
    },

    /**
     * Scroll a single node to a Y position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    setScrollY: function setScrollY(node, y) {
      node.scrollTop = y;
    }
  });
  /**
   * DOMNode (Static) Size
   */

  Object.assign(DOMNode, {
    /**
     * Get the client height of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The height.
     */
    height: function height(node) {
      return node.clientHeight;
    },

    /**
     * Get the height of a Window.
     * @param {Window} node The input node.
     * @param {Boolean} [outer] Whether to use the outer height.
     * @returns {number} The height.
     */
    heightWindow: function heightWindow(node, outer) {
      return outer ? node.outerHeight : node.innerHeight;
    },

    /**
     * Get the client width of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The width.
     */
    width: function width(node) {
      return node.clientWidth;
    },

    /**
     * Get the width of a Window.
     * @param {Window} node The input node.
     * @param {Boolean} [outer] Whether to use the outer width.
     * @returns {number} The width.
     */
    widthWindow: function widthWindow(node, outer) {
      return outer ? node.outerWidth : node.innerWidth;
    }
  });
  /**
   * DOMNode (Static) Styles
   */

  Object.assign(DOMNode, {
    /**
     * Add classes to a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    addClass: function addClass(node) {
      var _node$classList;

      for (var _len6 = arguments.length, classes = new Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
        classes[_key7 - 1] = arguments[_key7];
      }

      (_node$classList = node.classList).add.apply(_node$classList, classes);
    },

    /**
     * Get a CSSStyleDeclaration for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {CSSStyleDeclaration} The CSSStyleDeclaration.
     */
    css: function css(node) {
      return window.getComputedStyle(node);
    },

    /**
     * Get a style property for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The style name.
     * @returns {string} The style value.
     */
    getStyle: function getStyle(node, style) {
      return this.style(node)[style];
    },

    /**
     * Remove classes from a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    removeClass: function removeClass(node) {
      var _node$classList2;

      for (var _len7 = arguments.length, classes = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
        classes[_key8 - 1] = arguments[_key8];
      }

      (_node$classList2 = node.classList).remove.apply(_node$classList2, classes);
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle: function setStyle(node, style, value, important) {
      node.style.setProperty(style, value, important ? 'important' : '');
    },

    /**
     * Get style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {CSSStyleDeclaration} The style value.
     */
    style: function style(node) {
      return node.style;
    },

    /**
     * Toggle classes for a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    toggleClass: function toggleClass(node) {
      var _node$classList3;

      for (var _len8 = arguments.length, classes = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
        classes[_key9 - 1] = arguments[_key9];
      }

      (_node$classList3 = node.classList).toggle.apply(_node$classList3, classes);
    }
  });
  /**
   * DOMNode (Static) Events
   */

  Object.assign(DOMNode, {
    /**
     * Trigger a blur event on a single node.
     * @param {HTMLElement} node The input node.
     */
    blur: function blur(node) {
      node.blur();
    },

    /**
     * Trigger a click event on a single node.
     * @param {HTMLElement} node The input node.
     */
    click: function click(node) {
      node.click();
    },

    /**
     * Trigger a focus event on a single node.
     * @param {HTMLElement} node The input node.
     */
    focus: function focus(node) {
      node.focus();
    }
  });
  /**
   * DOMNode (Static) Event Handlers
   */

  Object.assign(DOMNode, {
    /**
     * Add an event to a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEvent: function addEvent(node, event, callback) {
      node.addEventListener(event, callback);
    },

    /**
     * Remove an event from a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} event The event name.
     * @param {DOM~eventCallback} callback The callback to remove.
     */
    removeEvent: function removeEvent(node, event, callback) {
      node.removeEventListener(event, callback);
    },

    /**
     * Trigger an event on a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {object} [data] Additional data to attach to the Event object.
     * @param {object} [options] The options to use for the Event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    triggerEvent: function triggerEvent(node, event, data, options) {
      var eventData = new Event(event, _objectSpread({
        bubbles: true,
        cancelable: true
      }, options));

      if (data) {
        Object.assign(eventData, data);
      }

      return node.dispatchEvent(eventData);
    }
  });
  /**
   * DOMNode (Static) Create
   */

  Object.assign(DOMNode, {
    /**
     * Attach a shadow DOM tree to a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @returns {ShadowRoot} The new ShadowRoot.
     */
    attachShadow: function attachShadow(node) {
      var open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return node.attachShadow({
        mode: open ? 'open' : 'closed'
      });
    },

    /**
     * Create a new DOM element.
     * @param {Document} context The document context.
     * @param {string} tagName The type of HTML element to create.
     * @returns {HTMLElement} The new element.
     */
    create: function create(context, tagName) {
      return context.createElement(tagName);
    },

    /**
     * Create a new comment node.
     * @param {Document} context The document context.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment: function createComment(context, comment) {
      return context.createComment(comment);
    },

    /**
     * Create a new document fragment.
     * @param {Document} context The document context.
     * @returns {DocumentFragment} The new DocumentFragment.
     */
    createFragment: function createFragment(context) {
      return context.createDocumentFragment();
    },

    /**
     * Create a new range object.
     * @param {Document} context The document context.
     * @returns {Range} The new range.
     */
    createRange: function createRange(context) {
      return context.createRange();
    },

    /**
     * Create a new text node.
     * @param {Document} context The document context.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText: function createText(context, text) {
      return context.createTextNode(text);
    }
  });
  /**
   * DOMNode (Static) Manipulation
   */

  Object.assign(DOMNode, {
    /**
     * Create a clone of a node.
     * @param {Node} node The input node.
     * @param {Boolean} deep Whether to deep clone the node.
     * @returns {Node} The cloned node.
     */
    clone: function clone(node, deep) {
      return node.cloneNode(deep);
    },

    /**
     * Remove a child node from a parent node in the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The parent node.
     * @param {Node} child The child node to remove.
     */
    removeChild: function removeChild(node, child) {
      node.removeChild(child);
    }
  });
  /**
   * DOMNode (Static) Move
   */

  Object.assign(DOMNode, {
    /**
     * Insert a new node into a parent node (optionally before a reference node).
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} parentNode The parent node.
     * @param {Node} newNode The new node to insert.
     * @param {Node} [referenceNode] The node to insert the new node before.
     */
    insertBefore: function insertBefore(parentNode, newNode) {
      var referenceNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      parentNode.insertBefore(newNode, referenceNode);
    }
  });
  /**
   * DOMNode (Static) Find
   */

  Object.assign(DOMNode, {
    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLCollection} The matching nodes.
     */
    findByClass: function findByClass(className, node) {
      return node.getElementsByClassName(className);
    },

    /**
     * Return a single nodes with a specific ID.
     * @param {string} id The id.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    findById: function findById(id, node) {
      return node.getElementById(id);
    },

    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLCollection} The matching nodes.
     */
    findByTag: function findByTag(tagName, node) {
      return node.getElementsByTagName(tagName);
    },

    /**
     * Return all nodes matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {NodeList} The matching nodes.
     */
    findBySelector: function findBySelector(selector, node) {
      return node.querySelectorAll(selector);
    },

    /**
     * Return a single node matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    findOneBySelector: function findOneBySelector(selector, node) {
      return node.querySelector(selector);
    }
  });
  /**
   * DOMNode Traversal
   */

  Object.assign(DOMNode, {
    /**
     * Return all child nodes for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {NodeList} The child nodes.
     */
    childNodes: function childNodes(node) {
      return node.childNodes;
    },

    /**
     * Return all child elements for a single node.
     * @param {ParentNode} node The input node.
     * @returns {HTMLCollection} The child elements.
     */
    children: function children(node) {
      return node.children;
    },

    /**
     * Get the Document from a Window.
     * @param {Window} node The input node.
     * @returns {Document} The Document.
     */
    document: function document(node) {
      return node.document;
    },

    /**
     * Get the document element from a Document.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The document element.
     */
    documentElement: function documentElement(node) {
      return node.documentElement;
    },

    /**
     * Return the first child for a single node.
     * @param {Node} node The input node.
     * @returns {Node} The first child.
     */
    firstChild: function firstChild(node) {
      return node.firstChild;
    },

    /**
     * Return the DocumentFragment for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DocumentFragment} The DocumentFragment.
     */
    fragment: function fragment(node) {
      return node.content;
    },

    /**
     * Return the next sibling node of a single node.
     * @param {Node} node The input node.
     * @returns {Node} The next sibling node.
     */
    next: function next(node) {
      return node.nextSibling;
    },

    /**
     * Return the offset parent node of a single node.
     * @param {Node} node The input node.
     * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The offset parent node.
     */
    offsetParent: function offsetParent(node) {
      return node.offsetParent;
    },

    /**
     * Return the parent node of a single node.
     * @param {Node} node The input node.
     * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The parent node.
     */
    parent: function parent(node) {
      return node.parentNode;
    },

    /**
     * Return the previous sibling node of a single node.
     * @param {Node} node The input node.
     * @returns {Node} The previous sibling node.
     */
    prev: function prev(node) {
      return node.previousSibling;
    },

    /**
     * Get the scrolling element from a Document.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The scrolling element.
     */
    scrollingElement: function scrollingElement(node) {
      return node.scrollingElement;
    },

    /**
     * Return the ShadowRoot for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {ShadowRoot} The ShadowRoot.
     */
    shadow: function shadow(node) {
      return node.shadowRoot;
    }
  });
  /**
   * DOMNode (Static) Selection
   */

  Object.assign(DOMNode, {
    /**
     * Add a range to a selection.
     * @param {Selection} selection The input selection.
     * @param {Range} range The range to add.
     */
    addRange: function addRange(selection, range) {
      selection.addRange(range);
    },

    /**
     * Collapse a range.
     * @param {Range} range The input range.
     */
    collapse: function collapse(range) {
      range.collapse();
    },

    /**
     * Return the end container of a range.
     * @param {Range} range The input range.
     * @returns {HTMLElement} The end container of the range.
     */
    endContainer: function endContainer(range) {
      return range.endContainer;
    },

    /**
     * Extract the contents of a range.
     * @param {Range} range The input range.
     * @returns {DocumentFragment} A DocumentFragment containing the range contents.
     */
    extract: function extract(range) {
      return range.extractContents();
    },

    /**
     * Get a range from a selection.
     * @param {Selection} selection The input selection.
     * @param {number} [index=0] The index of the range to return.
     * @returns {Range} The selected range.
     */
    getRange: function getRange(selection) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return selection.getRangeAt(index);
    },

    /**
     * Get the current selection.
     * @returns {Selection} The current selection.
     */
    getSelection: function getSelection() {
      return window.getSelection();
    },

    /**
     * Insert a node into a range.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement} node The node to insert.
     */
    insert: function insert(range, node) {
      range.insertNode(node);
    },

    /**
     * Return the range count for a selection.
     * @param {Selection} selection The input selection.
     */
    rangeCount: function rangeCount(selection) {
      return selection.rangeCount;
    },

    /**
     * Remove all ranges from a selection.
     * @param {Selection} selection The input selection.
     */
    removeRanges: function removeRanges(selection) {
      selection.removeAllRanges();
    },

    /**
     * Add a node to a range.
     * @param {Range} range The input range. 
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to select.
     */
    select: function select(range, node) {
      range.selectNode(node);
    },

    /**
     * Set the end position of a range after a node.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to end the range after.
     */
    setEndAfter: function setEndAfter(range, node) {
      range.setEndAfter(node);
    },

    /**
     * Set the start position of a range before a node.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to start the range before.
     */
    setStartBefore: function setStartBefore(range, node) {
      range.setStartBefore(node);
    },

    /**
     * Return the start container of a range.
     * @param {Range} range The input range.
     * @returns {HTMLElement} The start container of the range.
     */
    startContainer: function startContainer(range) {
      return range.startContainer;
    }
  });
  /**
   * DOMNode (Static) Tests
   */

  Object.assign(DOMNode, {
    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    contains: function contains(node, other) {
      return node.contains(other);
    },

    /**
     * Returns true if a single node has a specified attribute.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if the node has the attribute, otherwise FALSE.
     */
    hasAttribute: function hasAttribute(node, attribute) {
      return node.hasAttribute(attribute);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    hasChildren: function hasChildren(node) {
      return !!node.childElementCount;
    },

    /**
     * Returns true if a single node has any a specified class.
     * @param {HTMLElement} node The input node.
     * @param {string} className The class name.
     * @returns {Boolean} TRUE if the node has any of the classes, otherwise FALSE.
     */
    hasClass: function hasClass(node, className) {
      return node.classList.contains(className);
    },

    /**
     * Returns true if a single node has a specified property.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if the node has the property, otherwise FALSE.
     */
    hasProperty: function hasProperty(node, property) {
      return node.hasOwnProperty(property);
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    is: function is(node, selector) {
      return Core.isElement(node) && node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    isConnected: function isConnected(node) {
      return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    isEqual: function isEqual(node, other) {
      return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    isSame: function isSame(node, other) {
      return node.isSameNode(other);
    },

    /**
     * Returns true if a Document is visible.
     * @param {Document} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    isVisibleDocument: function isVisibleDocument(node) {
      return node.visibilityState === 'visible';
    }
  });
  /**
   * DOMNode (Static) Utility
   */

  Object.assign(DOMNode, {
    /**
     * Compare the position of two nodes in a Document.
     * @param {Node} node The input node.
     * @param {Node} other The node to compare against.
     * @returns {number} The bitmask representing the relationship of the nodes.
     */
    comparePosition: function comparePosition(node, other) {
      return node.compareDocumentPosition(other);
    },

    /**
     * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    normalize: function normalize(node) {
      node.normalize();
    },

    /**
     * Return the tag name of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {string} The elements tag name.
     */
    tagName: function tagName(node) {
      return node.tagName;
    }
  });
  return {
    AjaxRequest: AjaxRequest,
    DOM: DOM,
    DOMNode: DOMNode,
    dom: new DOM()
  };
});