"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
     * Perform an XHR request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=GET] The HTTP method of the request.
     * @param {Boolean|string|array|object|FormData} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    ajax: function ajax(options) {
      options = _objectSpread({
        url: window.location,
        headers: {}
      }, DOM.ajaxDefaults, options);
      var isLocal = DOM.localRegex.test(location.protocol);

      if (!options.cache) {
        var url = new URL(options.url);
        url.searchParams.append('_', Date.now());
        options.url = url.toString();
      }

      if ('Content-Type' in options.headers && !options.headers['Content-Type']) {
        options.headers['Content-Type'] = options.contentType;
      }

      if (!isLocal && !('X-Requested-With' in options.headers)) {
        options.headers['X-Requested-With'] = 'XMLHttpRequest';
      }

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);

        for (var key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key]);
        }

        if (options.responseType) {
          xhr.responseType = options.responseType;
        }

        xhr.onload = function (e) {
          if (xhr.status > 400) {
            reject({
              status: xhr.status,
              xhr: xhr,
              event: e
            });
          } else {
            resolve({
              response: xhr.response,
              xhr: xhr,
              event: e
            });
          }
        };

        if (!isLocal) {
          xhr.onerror = function (e) {
            return reject({
              status: xhr.status,
              xhr: xhr,
              event: e
            });
          };
        }

        if (options.uploadProgress) {
          xhr.upload.onprogress = function (e) {
            return options.uploadProgress(e.loaded / e.total, xhr, e);
          };
        }

        if (options.beforeSend) {
          options.beforeSend(xhr);
        }

        if (options.data && options.processData) {
          if (options.contentType === 'application/json') {
            options.data = JSON.stringify(options.data);
          } else if (options.contentType === 'application/x-www-form-urlencoded') {
            options.data = DOM._parseParams(options.data);
          } else {
            options.data = DOM._parseFormData(options.data);
          }
        }

        xhr.send(options.data);
      });
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
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    get: function get(url, options) {
      return this.ajax(_objectSpread({
        url: url
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
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    post: function post(url, data, options) {
      return this.ajax(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
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
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    upload: function upload(url, data, options) {
      return this.ajax(_objectSpread({
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
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScript: function loadScript(url) {
      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.ajax({
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
      var _this = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return Promise.all(urls.map(function (url) {
        return _this.ajax({
          url: url,
          cache: cache
        });
      })).then(function (responses) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = responses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var response = _step.value;
            eval.call(window, response.response);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyle: function loadStyle(url) {
      var _this2 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.ajax({
        url: url,
        cache: cache
      }).then(function (response) {
        return DOMNode.insertBefore(_this2._context.head, _this2.create('style', {
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
      var _this3 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return Promise.all(urls.map(function (url) {
        return _this3.ajax({
          url: url,
          cache: cache
        });
      })).then(function (responses) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = responses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var response = _step2.value;
            DOMNode.insertBefore(_this3._context.head, _this3.create('style', {
              html: response.response
            }));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
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
      nodes = this.parseNodes(nodes);
      options = _objectSpread({}, DOM.animationDefaults, options);
      var promises = nodes.map(function (node) {
        return DOM._animate(node, callback, options);
      });

      DOM._start();

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
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var node = _step3.value;

          DOM._stop(node, finish);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
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
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideIn: function slideIn(nodes, options) {
      return this.animate(nodes, function (node, progress, options) {
        var transform;

        if (progress < 1) {
          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var axis, size, inverse;

          if (dir === 'top' || dir === 'bottom') {
            axis = 'Y';
            size = DOM._height(node);
            inverse = dir === 'top';
          } else {
            axis = 'X';
            size = DOM._width(node);
            inverse = dir === 'left';
          }

          transform = "translate".concat(axis, "(").concat(Math.round(size - size * progress) * (inverse ? -1 : 1), "px)");
        } else {
          transform = '';
        }

        DOMNode.setStyle(node, 'transform', transform);
      }, _objectSpread({
        direction: 'bottom'
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
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideOut: function slideOut(nodes, options) {
      return this.animate(nodes, function (node, progress, options) {
        var transform;

        if (progress < 1) {
          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var axis, size, inverse;

          if (dir === 'top' || dir === 'bottom') {
            axis = 'Y';
            size = DOM._height(node);
            inverse = dir === 'top';
          } else {
            axis = 'X';
            size = DOM._width(node);
            inverse = dir === 'left';
          }

          transform = "translate".concat(axis, "(").concat(Math.round(size * progress) * (inverse ? -1 : 1), "px)");
        } else {
          transform = '';
        }

        DOMNode.setStyle(node, 'transform', transform);
      }, _objectSpread({
        direction: 'bottom'
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
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeIn: function squeezeIn(nodes, options) {
      var _this4 = this;

      nodes = this.parseNodes(nodes);
      options = _objectSpread({}, DOM.animationDefaults, {
        direction: 'bottom'
      }, options);
      var promises = nodes.map(function (node) {
        var wrapper = _this4.create('div', {
          style: {
            overflow: 'hidden',
            position: 'relative'
          }
        });

        DOM._wrap(node, [wrapper]);

        var parent = DOMNode.parent(node);
        return DOM._animate(node, function (node, progress, options) {
          if (progress === 1) {
            var children = DOMNode.childNodes(parent);
            var child = children.item(0);

            DOM._unwrap(child);

            return;
          }

          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var sizeStyle, translateStyle;

          if (dir === 'top' || dir === 'bottom') {
            sizeStyle = 'height';

            if (dir === 'top') {
              translateStyle = 'Y';
            }
          } else if (dir === 'left' || dir === 'right') {
            sizeStyle = 'width';

            if (dir === 'left') {
              translateStyle = 'X';
            }
          }

          var size = Math.round(DOM["_".concat(sizeStyle)](node)),
              amount = Math.round(size * progress);
          DOMNode.setStyle(parent, sizeStyle, "".concat(amount, "px"));

          if (translateStyle) {
            DOMNode.setStyle(parent, 'transform', "translate".concat(translateStyle, "(").concat(size - amount, "px)"));
          }
        }, options);
      });

      DOM._start();

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
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeOut: function squeezeOut(nodes, options) {
      var _this5 = this;

      nodes = this.parseNodes(nodes);
      options = _objectSpread({}, DOM.animationDefaults, {
        direction: 'bottom'
      }, options);
      var promises = nodes.map(function (node) {
        var wrapper = _this5.create('div', {
          style: {
            overflow: 'hidden',
            position: 'relative'
          }
        });

        DOM._wrap(node, [wrapper]);

        var parent = DOMNode.parent(node);
        return DOM._animate(node, function (node, progress, options) {
          if (progress === 1) {
            var children = DOMNode.childNodes(parent);
            var child = children.item(0);

            DOM._unwrap(child);

            return;
          }

          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var sizeStyle, translateStyle;

          if (dir === 'top' || dir === 'bottom') {
            sizeStyle = 'height';

            if (dir === 'top') {
              translateStyle = 'Y';
            }
          } else if (dir === 'left' || dir === 'right') {
            sizeStyle = 'width';

            if (dir === 'left') {
              translateStyle = 'X';
            }
          }

          var size = Math.round(DOM["_".concat(sizeStyle)](node)),
              amount = Math.round(size - size * progress);
          DOMNode.setStyle(parent, sizeStyle, "".concat(amount, "px"));

          if (translateStyle) {
            DOMNode.setStyle(parent, 'transform', "translate".concat(translateStyle, "(").concat(size - amount, "px)"));
          }
        }, options);
      });

      DOM._start();

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
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var node = _step4.value;

          DOM._clearQueue(node);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    },

    /**
     * Queue a callback on each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    queue: function queue(nodes, callback) {
      nodes = this.parseNodes(nodes);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var node = _step5.value;

          DOM._queue(node, callback);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  });
  /**
   * DOM Attributes
   */

  Object.assign(DOM.prototype, {
    /**
     * Get an attribute value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    getAttribute: function getAttribute(nodes, attribute) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.getAttribute(node, attribute);
    },

    /**
     * Get a dataset value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @returns {string|DOMStringMap} The dataset value.
     */
    getDataset: function getDataset(nodes, key) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOMNode.getDataset(node, key);
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
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var node = _step6.value;
          DOMNode.removeAttribute(node, attribute);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    },

    /**
     * Remove a property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    removeProperty: function removeProperty(nodes, property) {
      nodes = this.parseNodes(nodes);
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = nodes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var node = _step7.value;
          DOMNode.removeProperty(node, property);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
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

      var attributes = DOM._parseData(attribute, value);

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = nodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var node = _step8.value;

          DOM._setAttribute(node, attributes);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    },

    /**
     * Set a dataset value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {string} [value] The dataset value.
     */
    setDataset: function setDataset(nodes, key, value) {
      nodes = this.parseNodes(nodes);

      var dataset = DOM._parseData(key, value);

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = nodes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var node = _step9.value;
          DOMNode.setDataset(node, dataset);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
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

      var properties = DOM._parseData(property, value);

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = nodes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var node = _step10.value;
          DOMNode.setProperty(node, properties);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
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
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = nodes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var node = _step11.value;
          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = others[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var other = _step12.value;

              DOM._cloneData(node, other);
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
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

      return DOM._getData(node, key);
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
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = nodes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var node = _step13.value;

          DOM._removeData(node, key);
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
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

      var data = DOM._parseData(key, value);

      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = nodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var node = _step14.value;

          DOM._setData(node, data);
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
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
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = nodes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var node = _step15.value;

          DOM._constrain(node, containerBox);
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
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
      var closest = null,
          closestDistance = Number.MAX_VALUE;
      nodes = this.parseNodes(nodes);
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = nodes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var node = _step16.value;
          var dist = this.distTo(node, x, y, offset);

          if (dist && dist < closestDistance) {
            closestDistance = dist;
            closest = node;
          }
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
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
     * @returns {number} The percent.
     */
    percentX: function percentX(nodes, x, offset) {
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      return Core.clampPercent((x - nodeBox.left) / nodeBox.width * 100);
    },

    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {number} The percent.
     */
    percentY: function percentY(nodes, y, offset) {
      var nodeBox = this.rect(nodes, offset);

      if (!nodeBox) {
        return;
      }

      return Core.clampPercent((y - nodeBox.top) / nodeBox.height * 100);
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

      return DOM._position(node, offset);
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

      return DOM._rect(node, offset);
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
        return DOM._getScrollXDocument(node);
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
        return DOM._getScrollYDocument(node);
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
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = nodes[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var node = _step17.value;

          if (Core.isWindow(node)) {
            DOMNode.setScrollWindow(node, x, y);
          } else if (Core.isDocument(node)) {
            DOM._setScrollDocument(node, x, y);
          } else {
            DOM._setScroll(node, x, y);
          }
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
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
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = nodes[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var node = _step18.value;

          if (Core.isWindow(node)) {
            DOM._setScrollXWindow(node, x);
          } else if (Core.isDocument(node)) {
            DOM._setScrollXDocument(node, x);
          } else {
            DOMNode.setScrollX(node, x);
          }
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
            _iterator18["return"]();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
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
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = nodes[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var node = _step19.value;

          if (Core.isWindow(node)) {
            DOM._setScrollYWindow(node, y);
          } else if (Core.isDocument(node)) {
            DOM._setScrollYDocument(node, y);
          } else {
            DOMNode.setScrollY(node, y);
          }
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
            _iterator19["return"]();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
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
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    height: function height(nodes) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;
      var node = this.parseNode(nodes, {
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return DOMNode.heightWindow(node, padding);
      }

      if (Core.isDocument(node)) {
        return DOM._height(DOMNode.documentElement(node), padding, border, margin);
      }

      return DOM._height(node, padding, border, margin);
    },

    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    width: function width(nodes) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;
      var node = this.parseNode(nodes, {
        document: true,
        window: true
      });

      if (!node) {
        return;
      }

      if (Core.isWindow(node)) {
        return DOMNode.widthWindow(node, padding);
      }

      if (Core.isDocument(node)) {
        return DOM._width(DOMNode.documentElement(node), padding, border, margin);
      }

      return DOM._width(node, padding, border, margin);
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
      for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        classes[_key - 1] = arguments[_key];
      }

      nodes = this.parseNodes(nodes);
      classes = DOM._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = nodes[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var node = _step20.value;
          DOMNode.addClass.apply(DOMNode, [node].concat(_toConsumableArray(classes)));
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
            _iterator20["return"]();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }
    },

    /**
     * Get a computed CSS style value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [style] The CSS style name.
     * @returns {string|CSSStyleDeclaration} The CSS style value.
     */
    css: function css(nodes, style) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      return DOM._css(node, style);
    },

    /**
     * Get a style property for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [style] The style name.
     * @returns {string|CSSStyleDeclaration} The style value.
     */
    getStyle: function getStyle(nodes, style) {
      var node = this.parseNode(nodes);

      if (!node) {
        return;
      }

      style = Core.snakeCase(style);
      return DOMNode.getStyle(node, style);
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
      for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        classes[_key2 - 1] = arguments[_key2];
      }

      nodes = this.parseNodes(nodes);
      classes = DOM._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = nodes[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var node = _step21.value;
          DOMNode.removeClass.apply(DOMNode, [node].concat(_toConsumableArray(classes)));
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
            _iterator21["return"]();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
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

      var styles = DOM._parseData(style, value);

      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = nodes[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var node = _step22.value;

          DOM._setStyle(node, styles, important);
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
            _iterator22["return"]();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
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
      var _iteratorNormalCompletion23 = true;
      var _didIteratorError23 = false;
      var _iteratorError23 = undefined;

      try {
        for (var _iterator23 = nodes[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
          var node = _step23.value;
          DOMNode.getStyle(node, 'display') === 'none' ? DOMNode.setStyle(node, 'display', '') : DOMNode.setStyle(node, 'display', 'none');
        }
      } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
            _iterator23["return"]();
          }
        } finally {
          if (_didIteratorError23) {
            throw _iteratorError23;
          }
        }
      }
    },

    /**
     * Toggle classes for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    toggleClass: function toggleClass(nodes) {
      for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        classes[_key3 - 1] = arguments[_key3];
      }

      nodes = this.parseNodes(nodes);
      classes = DOM._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      var _iteratorNormalCompletion24 = true;
      var _didIteratorError24 = false;
      var _iteratorError24 = undefined;

      try {
        for (var _iterator24 = nodes[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
          var node = _step24.value;
          DOMNode.toggleClass.apply(DOMNode, [node].concat(_toConsumableArray(classes)));
        }
      } catch (err) {
        _didIteratorError24 = true;
        _iteratorError24 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
            _iterator24["return"]();
          }
        } finally {
          if (_didIteratorError24) {
            throw _iteratorError24;
          }
        }
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
          DOM._addEvent(window, 'mousemove', move);
        }

        if (move || up) {
          DOM._addEvent(window, 'mouseup', function (e) {
            if (move) {
              DOM._removeEvent(window, 'mousemove', move);
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

      DOM._addEvent(window, 'DOMContentLoaded', callback);
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
     */
    addEvent: function addEvent(nodes, events, callback) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      var _iteratorNormalCompletion25 = true;
      var _didIteratorError25 = false;
      var _iteratorError25 = undefined;

      try {
        for (var _iterator25 = nodes[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
          var node = _step25.value;

          DOM._addEvent(node, events, callback);
        }
      } catch (err) {
        _didIteratorError25 = true;
        _iteratorError25 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
            _iterator25["return"]();
          }
        } finally {
          if (_didIteratorError25) {
            throw _iteratorError25;
          }
        }
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
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      var _iteratorNormalCompletion26 = true;
      var _didIteratorError26 = false;
      var _iteratorError26 = undefined;

      try {
        for (var _iterator26 = nodes[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
          var node = _step26.value;

          DOM._addEvent(node, events, callback, delegate);
        }
      } catch (err) {
        _didIteratorError26 = true;
        _iteratorError26 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
            _iterator26["return"]();
          }
        } finally {
          if (_didIteratorError26) {
            throw _iteratorError26;
          }
        }
      }
    },

    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce: function addEventDelegateOnce(nodes, events, delegate, callback) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      var _iteratorNormalCompletion27 = true;
      var _didIteratorError27 = false;
      var _iteratorError27 = undefined;

      try {
        for (var _iterator27 = nodes[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
          var node = _step27.value;

          DOM._addEvent(node, events, callback, delegate, true);
        }
      } catch (err) {
        _didIteratorError27 = true;
        _iteratorError27 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
            _iterator27["return"]();
          }
        } finally {
          if (_didIteratorError27) {
            throw _iteratorError27;
          }
        }
      }
    },

    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce: function addEventOnce(nodes, events, callback) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      var _iteratorNormalCompletion28 = true;
      var _didIteratorError28 = false;
      var _iteratorError28 = undefined;

      try {
        for (var _iterator28 = nodes[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
          var node = _step28.value;

          DOM._addEvent(node, events, callback, null, true);
        }
      } catch (err) {
        _didIteratorError28 = true;
        _iteratorError28 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
            _iterator28["return"]();
          }
        } finally {
          if (_didIteratorError28) {
            throw _iteratorError28;
          }
        }
      }
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
      var _iteratorNormalCompletion29 = true;
      var _didIteratorError29 = false;
      var _iteratorError29 = undefined;

      try {
        for (var _iterator29 = nodes[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
          var node = _step29.value;
          var _iteratorNormalCompletion30 = true;
          var _didIteratorError30 = false;
          var _iteratorError30 = undefined;

          try {
            for (var _iterator30 = others[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
              var other = _step30.value;

              DOM._cloneEvents(node, other);
            }
          } catch (err) {
            _didIteratorError30 = true;
            _iteratorError30 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
                _iterator30["return"]();
              }
            } finally {
              if (_didIteratorError30) {
                throw _iteratorError30;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError29 = true;
        _iteratorError29 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
            _iterator29["return"]();
          }
        } finally {
          if (_didIteratorError29) {
            throw _iteratorError29;
          }
        }
      }
    },

    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEvent: function removeEvent(nodes, events, callback) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      var _iteratorNormalCompletion31 = true;
      var _didIteratorError31 = false;
      var _iteratorError31 = undefined;

      try {
        for (var _iterator31 = nodes[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
          var node = _step31.value;

          DOM._removeEvent(node, events, callback);
        }
      } catch (err) {
        _didIteratorError31 = true;
        _iteratorError31 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
            _iterator31["return"]();
          }
        } finally {
          if (_didIteratorError31) {
            throw _iteratorError31;
          }
        }
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
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      var _iteratorNormalCompletion32 = true;
      var _didIteratorError32 = false;
      var _iteratorError32 = undefined;

      try {
        for (var _iterator32 = nodes[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
          var node = _step32.value;

          DOM._removeEvent(node, events, callback, delegate);
        }
      } catch (err) {
        _didIteratorError32 = true;
        _iteratorError32 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
            _iterator32["return"]();
          }
        } finally {
          if (_didIteratorError32) {
            throw _iteratorError32;
          }
        }
      }
    },

    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     */
    triggerEvent: function triggerEvent(nodes, events, data) {
      nodes = this.parseNodes(nodes, {
        shadow: true,
        document: true,
        window: true
      });
      events = DOM._parseEvents(events).map(function (event) {
        return DOM._parseEvent(event);
      });
      var _iteratorNormalCompletion33 = true;
      var _didIteratorError33 = false;
      var _iteratorError33 = undefined;

      try {
        for (var _iterator33 = nodes[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
          var node = _step33.value;
          var _iteratorNormalCompletion34 = true;
          var _didIteratorError34 = false;
          var _iteratorError34 = undefined;

          try {
            for (var _iterator34 = events[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
              var event = _step34.value;
              DOMNode.triggerEvent(node, event, data);
            }
          } catch (err) {
            _didIteratorError34 = true;
            _iteratorError34 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
                _iterator34["return"]();
              }
            } finally {
              if (_didIteratorError34) {
                throw _iteratorError34;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError33 = true;
        _iteratorError33 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
            _iterator33["return"]();
          }
        } finally {
          if (_didIteratorError33) {
            throw _iteratorError33;
          }
        }
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
        DOMNode.setProperty(node, {
          innerHTML: options.html
        });
      } else if ('text' in options) {
        DOMNode.setProperty(node, {
          innerText: options.text
        });
      }

      if ('class' in options) {
        DOMNode.addClass.apply(DOMNode, [node].concat(_toConsumableArray(DOM._parseClasses(Core.wrap(options["class"])))));
      }

      if ('style' in options) {
        DOM._setStyle(node, options.style);
      }

      if ('value' in options) {
        DOMNode.setProperty(node, {
          value: options.value
        });
      }

      if ('attributes' in options) {
        DOM._setAttribute(node, options.attributes);
      }

      if ('properties' in options) {
        DOMNode.setProperty(node, options.properties);
      }

      if ('dataset' in options) {
        DOMNode.setDataset(node, options.dataset);
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
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cloneEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cloneData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // ShadowRoot nodes can not be cloned
      nodes = this.parseNodes(nodes, {
        node: true,
        fragment: true
      });
      return nodes.map(function (node) {
        return DOM._clone(node, deep, cloneEvents, cloneData);
      });
    },

    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    detach: function detach(nodes) {
      // DocumentFragment and ShadowRoot nodes can not be detached
      nodes = this.parseNodes(nodes, {
        node: true
      });
      var _iteratorNormalCompletion35 = true;
      var _didIteratorError35 = false;
      var _iteratorError35 = undefined;

      try {
        for (var _iterator35 = nodes[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
          var node = _step35.value;
          var parent = DOMNode.parent(node);

          if (!parent) {
            continue;
          }

          DOMNode.removeChild(parent, node);
        }
      } catch (err) {
        _didIteratorError35 = true;
        _iteratorError35 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
            _iterator35["return"]();
          }
        } finally {
          if (_didIteratorError35) {
            throw _iteratorError35;
          }
        }
      }
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
      var _iteratorNormalCompletion36 = true;
      var _didIteratorError36 = false;
      var _iteratorError36 = undefined;

      try {
        for (var _iterator36 = nodes[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
          var node = _step36.value;

          DOM._empty(node);
        }
      } catch (err) {
        _didIteratorError36 = true;
        _iteratorError36 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
            _iterator36["return"]();
          }
        } finally {
          if (_didIteratorError36) {
            throw _iteratorError36;
          }
        }
      }
    },

    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    remove: function remove(nodes) {
      // DocumentFragment and ShadowRoot nodes can not be removed
      nodes = this.parseNodes(nodes, {
        node: true
      });
      var _iteratorNormalCompletion37 = true;
      var _didIteratorError37 = false;
      var _iteratorError37 = undefined;

      try {
        for (var _iterator37 = nodes[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
          var node = _step37.value;
          var parent = DOMNode.parent(node);

          if (!parent) {
            continue;
          }

          DOM._empty(node);

          DOM._remove(node);

          DOMNode.removeChild(parent, node);
        }
      } catch (err) {
        _didIteratorError37 = true;
        _iteratorError37 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion37 && _iterator37["return"] != null) {
            _iterator37["return"]();
          }
        } finally {
          if (_didIteratorError37) {
            throw _iteratorError37;
          }
        }
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
      // DocumentFragment and ShadowRoot nodes can not be removed
      nodes = this.parseNodes(nodes, {
        node: true
      }); // ShadowRoot nodes can not be cloned

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var _iteratorNormalCompletion38 = true;
      var _didIteratorError38 = false;
      var _iteratorError38 = undefined;

      try {
        for (var _iterator38 = nodes[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
          var node = _step38.value;

          DOM._replaceWith(node, others);
        }
      } catch (err) {
        _didIteratorError38 = true;
        _iteratorError38 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion38 && _iterator38["return"] != null) {
            _iterator38["return"]();
          }
        } finally {
          if (_didIteratorError38) {
            throw _iteratorError38;
          }
        }
      }
    }
  });
  /**
   * DOM Move
   */

  Object.assign(DOM.prototype, {
    /**
     * Insert each other node after the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    after: function after(nodes, others) {
      // DocumentFragment and ShadowRoot nodes can not have siblings
      var node = this.parseNode(nodes, {
        node: true
      });

      if (!node) {
        return;
      }

      var parent = DOMNode.parent(node);

      if (!parent) {
        return;
      } // ShadowRoot nodes can not be moved


      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var _iteratorNormalCompletion39 = true;
      var _didIteratorError39 = false;
      var _iteratorError39 = undefined;

      try {
        for (var _iterator39 = others.reverse()[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
          var other = _step39.value;
          DOMNode.insertBefore(parent, other, DOMNode.next(node));
        }
      } catch (err) {
        _didIteratorError39 = true;
        _iteratorError39 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion39 && _iterator39["return"] != null) {
            _iterator39["return"]();
          }
        } finally {
          if (_didIteratorError39) {
            throw _iteratorError39;
          }
        }
      }
    },

    /**
     * Append each other node to the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    append: function append(nodes, others) {
      var node = this.parseNode(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      if (!node) {
        return;
      } // ShadowRoot nodes can not be moved


      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var _iteratorNormalCompletion40 = true;
      var _didIteratorError40 = false;
      var _iteratorError40 = undefined;

      try {
        for (var _iterator40 = others[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
          var other = _step40.value;
          DOMNode.insertBefore(node, other);
        }
      } catch (err) {
        _didIteratorError40 = true;
        _iteratorError40 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion40 && _iterator40["return"] != null) {
            _iterator40["return"]();
          }
        } finally {
          if (_didIteratorError40) {
            throw _iteratorError40;
          }
        }
      }
    },

    /**
     * Append each node to the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    appendTo: function appendTo(nodes, others) {
      this.append(others, nodes);
    },

    /**
     * Insert each other node before the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    before: function before(nodes, others) {
      // DocumentFragment and ShadowRoot nodes can not have siblings
      var node = this.parseNode(nodes, {
        node: true
      });

      if (!node) {
        return;
      }

      var parent = DOMNode.parent(node);

      if (!parent) {
        return;
      } // ShadowRoot nodes can not be moved


      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var _iteratorNormalCompletion41 = true;
      var _didIteratorError41 = false;
      var _iteratorError41 = undefined;

      try {
        for (var _iterator41 = others[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
          var other = _step41.value;
          DOMNode.insertBefore(parent, other, node);
        }
      } catch (err) {
        _didIteratorError41 = true;
        _iteratorError41 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion41 && _iterator41["return"] != null) {
            _iterator41["return"]();
          }
        } finally {
          if (_didIteratorError41) {
            throw _iteratorError41;
          }
        }
      }
    },

    /**
     * Insert each node after the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    insertAfter: function insertAfter(nodes, others) {
      this.after(others, nodes);
    },

    /**
     * Insert each node before the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    insertBefore: function insertBefore(nodes, others) {
      this.before(others, nodes);
    },

    /**
     * Prepend each other node to the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    prepend: function prepend(nodes, others) {
      var node = this.parseNode(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });

      if (!node) {
        return;
      }

      var firstChild = DOMNode.firstChild(node); // ShadowRoot nodes can not be moved

      others = this.parseNodes(others, {
        node: true,
        fragment: true,
        html: true
      });
      var _iteratorNormalCompletion42 = true;
      var _didIteratorError42 = false;
      var _iteratorError42 = undefined;

      try {
        for (var _iterator42 = others.reverse()[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
          var other = _step42.value;
          DOMNode.insertBefore(node, other, firstChild);
        }
      } catch (err) {
        _didIteratorError42 = true;
        _iteratorError42 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion42 && _iterator42["return"] != null) {
            _iterator42["return"]();
          }
        } finally {
          if (_didIteratorError42) {
            throw _iteratorError42;
          }
        }
      }
    },

    /**
     * Prepend each node to the first other node.
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
      var _iteratorNormalCompletion43 = true;
      var _didIteratorError43 = false;
      var _iteratorError43 = undefined;

      try {
        for (var _iterator43 = nodes[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
          var node = _step43.value;

          DOM._unwrap(node, filter);
        }
      } catch (err) {
        _didIteratorError43 = true;
        _iteratorError43 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion43 && _iterator43["return"] != null) {
            _iterator43["return"]();
          }
        } finally {
          if (_didIteratorError43) {
            throw _iteratorError43;
          }
        }
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
      var _iteratorNormalCompletion44 = true;
      var _didIteratorError44 = false;
      var _iteratorError44 = undefined;

      try {
        for (var _iterator44 = nodes[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
          var node = _step44.value;

          DOM._wrap(node, others);
        }
      } catch (err) {
        _didIteratorError44 = true;
        _iteratorError44 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion44 && _iterator44["return"] != null) {
            _iterator44["return"]();
          }
        } finally {
          if (_didIteratorError44) {
            throw _iteratorError44;
          }
        }
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
      });
      var firstNode = nodes.slice().shift();

      if (!firstNode) {
        return;
      }

      var parent = DOMNode.parent(firstNode);

      if (!parent) {
        return;
      } // ShadowRoot nodes can not be cloned


      others = this.parseNodes(others, {
        fragment: true,
        html: true
      });
      var clones = this.clone(others, true);
      var _iteratorNormalCompletion45 = true;
      var _didIteratorError45 = false;
      var _iteratorError45 = undefined;

      try {
        for (var _iterator45 = clones[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
          var clone = _step45.value;
          DOMNode.insertBefore(parent, clone, firstNode);
        }
      } catch (err) {
        _didIteratorError45 = true;
        _iteratorError45 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion45 && _iterator45["return"] != null) {
            _iterator45["return"]();
          }
        } finally {
          if (_didIteratorError45) {
            throw _iteratorError45;
          }
        }
      }

      var deepest = DOM._deepest(clones.shift());

      var _iteratorNormalCompletion46 = true;
      var _didIteratorError46 = false;
      var _iteratorError46 = undefined;

      try {
        for (var _iterator46 = nodes[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
          var node = _step46.value;
          DOMNode.insertBefore(deepest, node);
        }
      } catch (err) {
        _didIteratorError46 = true;
        _iteratorError46 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion46 && _iterator46["return"] != null) {
            _iterator46["return"]();
          }
        } finally {
          if (_didIteratorError46) {
            throw _iteratorError46;
          }
        }
      }
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
      var _iteratorNormalCompletion47 = true;
      var _didIteratorError47 = false;
      var _iteratorError47 = undefined;

      try {
        for (var _iterator47 = nodes[Symbol.iterator](), _step47; !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
          var node = _step47.value;

          DOM._wrapInner(node, others);
        }
      } catch (err) {
        _didIteratorError47 = true;
        _iteratorError47 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion47 && _iterator47["return"] != null) {
            _iterator47["return"]();
          }
        } finally {
          if (_didIteratorError47) {
            throw _iteratorError47;
          }
        }
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
      return this.parseNodes(nodes, {
        node: true
      }).filter(function (node) {
        return Core.isElement(node) && DOM._css(node, 'position') === 'fixed' || DOM._parents(node, function (parent) {
          return Core.isElement(parent) && DOM._css(parent, 'position') === 'fixed';
        }, false, true).length;
      });
    },

    /**
     * Return all hidden nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    hidden: function hidden(nodes) {
      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).filter(function (node) {
        return !DOM._isVisible(node);
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
     * @returns {array} The filtered nodes.
     */
    notOne: function notOne(nodes, filter) {
      filter = this.parseFilter(filter);
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true
      }).find(function (node, index) {
        return filter && !filter(node, index);
      });
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
      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).filter(function (node) {
        return DOM._isVisible(node);
      });
    },

    /**
     * Return all nodes with a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withAnimation: function withAnimation(nodes) {
      return this.parseNodes(nodes).filter(function (node) {
        return DOM._hasAnimation(node);
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
      for (var _len4 = arguments.length, classes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        classes[_key4 - 1] = arguments[_key4];
      }

      classes = DOM._parseClasses(classes);
      return this.parseNodes(nodes).filter(function (node) {
        return classes.some(function (className) {
          return DOMNode.hasClass(node, className);
        });
      });
    },

    /**
     * Return all nodes with custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {array} The filtered nodes.
     */
    withData: function withData(nodes, key) {
      return this.parseNodes(nodes, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
        window: true
      }).filter(function (node) {
        return DOM._hasData(node, key);
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
    },

    /**
     * Return all nodes with a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withTransition: function withTransition(nodes) {
      return this.parseNodes(nodes).filter(function (node) {
        return DOM._hasTransition(node);
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
      var match = selector.match(DOM.fastRegex);

      if (match) {
        if (match[1] === '#') {
          return this.findById(match[2], nodes);
        }

        if (match[1] === '.') {
          return this.findByClass(match[2], nodes);
        }

        return this.findByTag(match[2], nodes);
      } // custom selector


      if (selector.match(DOM.complexRegex)) {
        var _selectors = DOM._prefixSelectors(selector, "#".concat(DOM.tempId, " "));

        if (Core.isElement(nodes)) {
          return DOM.__findByCustom(_selectors, nodes);
        }

        nodes = this.parseNodes(nodes);
        return DOM._findByCustom(_selectors, nodes);
      } // standard selector


      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return Core.wrap(DOMNode.findBySelector(selector, nodes));
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      return DOM._findBySelector(selector, nodes);
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
      var _iteratorNormalCompletion48 = true;
      var _didIteratorError48 = false;
      var _iteratorError48 = undefined;

      try {
        for (var _iterator48 = nodes[Symbol.iterator](), _step48; !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
          var node = _step48.value;
          Core.merge(results, DOMNode.findByClass(className, node));
        }
      } catch (err) {
        _didIteratorError48 = true;
        _iteratorError48 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion48 && _iterator48["return"] != null) {
            _iterator48["return"]();
          }
        } finally {
          if (_didIteratorError48) {
            throw _iteratorError48;
          }
        }
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
      var result = this.findOneById(id, nodes);

      if (result) {
        return [result];
      }

      return [];
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
      var _iteratorNormalCompletion49 = true;
      var _didIteratorError49 = false;
      var _iteratorError49 = undefined;

      try {
        for (var _iterator49 = nodes[Symbol.iterator](), _step49; !(_iteratorNormalCompletion49 = (_step49 = _iterator49.next()).done); _iteratorNormalCompletion49 = true) {
          var node = _step49.value;
          Core.merge(results, DOMNode.findByTag(tagName, node));
        }
      } catch (err) {
        _didIteratorError49 = true;
        _iteratorError49 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion49 && _iterator49["return"] != null) {
            _iterator49["return"]();
          }
        } finally {
          if (_didIteratorError49) {
            throw _iteratorError49;
          }
        }
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
      var match = selector.match(DOM.fastRegex);

      if (match) {
        if (match[1] === '#') {
          return this.findOneById(match[2], nodes);
        }

        if (match[1] === '.') {
          return this.findOneByClass(match[2], nodes);
        }

        return this.findOneByTag(match[2], nodes);
      } // custom selector


      if (selector.match(DOM.complexRegex)) {
        var _selectors2 = DOM._prefixSelectors(selector, "#".concat(DOM.tempId, " "));

        if (Core.isElement(nodes)) {
          return DOM.__findOneByCustom(_selectors2, nodes);
        }

        nodes = this.parseNodes(nodes);
        return DOM._findOneByCustom(_selectors2, nodes);
      } // standard selector


      if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
        return DOMNode.findOneBySelector(selector, nodes);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      return DOM._findOneBySelector(selector, nodes);
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
      var _iteratorNormalCompletion50 = true;
      var _didIteratorError50 = false;
      var _iteratorError50 = undefined;

      try {
        for (var _iterator50 = nodes[Symbol.iterator](), _step50; !(_iteratorNormalCompletion50 = (_step50 = _iterator50.next()).done); _iteratorNormalCompletion50 = true) {
          var node = _step50.value;
          var result = DOMNode.findByClass(className, node).item(0);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _didIteratorError50 = true;
        _iteratorError50 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion50 && _iterator50["return"] != null) {
            _iterator50["return"]();
          }
        } finally {
          if (_didIteratorError50) {
            throw _iteratorError50;
          }
        }
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
      var result = DOMNode.findById(id, this._context);

      if (!result) {
        return null;
      }

      if (Core.isDocument(nodes)) {
        return result;
      }

      if (Core.isElement(nodes)) {
        if (DOMNode.contains(nodes, result)) {
          return result;
        }

        return null;
      }

      nodes = this.parseNodes(nodes);

      if (nodes.some(function (node) {
        return DOMNode.contains(node, result);
      })) {
        return result;
      }

      return null;
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
      var _iteratorNormalCompletion51 = true;
      var _didIteratorError51 = false;
      var _iteratorError51 = undefined;

      try {
        for (var _iterator51 = nodes[Symbol.iterator](), _step51; !(_iteratorNormalCompletion51 = (_step51 = _iterator51.next()).done); _iteratorNormalCompletion51 = true) {
          var node = _step51.value;
          var result = DOMNode.findByTag(tagName, node).item(0);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _didIteratorError51 = true;
        _iteratorError51 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion51 && _iterator51["return"] != null) {
            _iterator51["return"]();
          }
        } finally {
          if (_didIteratorError51) {
            throw _iteratorError51;
          }
        }
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
        return DOM._children(nodes, filter, first, elementsOnly);
      }

      nodes = this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true
      });
      var results = [];
      var _iteratorNormalCompletion52 = true;
      var _didIteratorError52 = false;
      var _iteratorError52 = undefined;

      try {
        for (var _iterator52 = nodes[Symbol.iterator](), _step52; !(_iteratorNormalCompletion52 = (_step52 = _iterator52.next()).done); _iteratorNormalCompletion52 = true) {
          var node = _step52.value;
          Core.merge(results, DOM._children(node, filter, first, elementsOnly));
        }
      } catch (err) {
        _didIteratorError52 = true;
        _iteratorError52 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion52 && _iterator52["return"] != null) {
            _iterator52["return"]();
          }
        } finally {
          if (_didIteratorError52) {
            throw _iteratorError52;
          }
        }
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
        return DOM._next(nodes, filter);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion53 = true;
      var _didIteratorError53 = false;
      var _iteratorError53 = undefined;

      try {
        for (var _iterator53 = nodes[Symbol.iterator](), _step53; !(_iteratorNormalCompletion53 = (_step53 = _iterator53.next()).done); _iteratorNormalCompletion53 = true) {
          var node = _step53.value;
          Core.merge(results, DOM._next(node, filter));
        }
      } catch (err) {
        _didIteratorError53 = true;
        _iteratorError53 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion53 && _iterator53["return"] != null) {
            _iterator53["return"]();
          }
        } finally {
          if (_didIteratorError53) {
            throw _iteratorError53;
          }
        }
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
        return DOM._nextAll(nodes, filter, limit, first);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion54 = true;
      var _didIteratorError54 = false;
      var _iteratorError54 = undefined;

      try {
        for (var _iterator54 = nodes[Symbol.iterator](), _step54; !(_iteratorNormalCompletion54 = (_step54 = _iterator54.next()).done); _iteratorNormalCompletion54 = true) {
          var node = _step54.value;
          Core.merge(results, DOM._nextAll(node, filter, limit, first));
        }
      } catch (err) {
        _didIteratorError54 = true;
        _iteratorError54 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion54 && _iterator54["return"] != null) {
            _iterator54["return"]();
          }
        } finally {
          if (_didIteratorError54) {
            throw _iteratorError54;
          }
        }
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
        return DOM._parent(nodes, filter);
      } // DocumentFragment and ShadowRoot nodes have no parent


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion55 = true;
      var _didIteratorError55 = false;
      var _iteratorError55 = undefined;

      try {
        for (var _iterator55 = nodes[Symbol.iterator](), _step55; !(_iteratorNormalCompletion55 = (_step55 = _iterator55.next()).done); _iteratorNormalCompletion55 = true) {
          var node = _step55.value;
          Core.merge(results, DOM._parent(node, filter));
        }
      } catch (err) {
        _didIteratorError55 = true;
        _iteratorError55 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion55 && _iterator55["return"] != null) {
            _iterator55["return"]();
          }
        } finally {
          if (_didIteratorError55) {
            throw _iteratorError55;
          }
        }
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
        return DOM._parents(nodes, filter, limit, first);
      } // DocumentFragment and ShadowRoot nodes have no parent


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion56 = true;
      var _didIteratorError56 = false;
      var _iteratorError56 = undefined;

      try {
        for (var _iterator56 = nodes[Symbol.iterator](), _step56; !(_iteratorNormalCompletion56 = (_step56 = _iterator56.next()).done); _iteratorNormalCompletion56 = true) {
          var node = _step56.value;
          Core.merge(results, DOM._parents(node, filter, limit, first));
        }
      } catch (err) {
        _didIteratorError56 = true;
        _iteratorError56 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion56 && _iterator56["return"] != null) {
            _iterator56["return"]();
          }
        } finally {
          if (_didIteratorError56) {
            throw _iteratorError56;
          }
        }
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
        return DOM._prev(nodes, filter);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion57 = true;
      var _didIteratorError57 = false;
      var _iteratorError57 = undefined;

      try {
        for (var _iterator57 = nodes[Symbol.iterator](), _step57; !(_iteratorNormalCompletion57 = (_step57 = _iterator57.next()).done); _iteratorNormalCompletion57 = true) {
          var node = _step57.value;
          Core.merge(results, DOM._prev(node, filter));
        }
      } catch (err) {
        _didIteratorError57 = true;
        _iteratorError57 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion57 && _iterator57["return"] != null) {
            _iterator57["return"]();
          }
        } finally {
          if (_didIteratorError57) {
            throw _iteratorError57;
          }
        }
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
        return DOM._prevAll(nodes, filter, limit, first);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion58 = true;
      var _didIteratorError58 = false;
      var _iteratorError58 = undefined;

      try {
        for (var _iterator58 = nodes[Symbol.iterator](), _step58; !(_iteratorNormalCompletion58 = (_step58 = _iterator58.next()).done); _iteratorNormalCompletion58 = true) {
          var node = _step58.value;
          Core.merge(results, DOM._prevAll(node, filter, limit, first));
        }
      } catch (err) {
        _didIteratorError58 = true;
        _iteratorError58 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion58 && _iterator58["return"] != null) {
            _iterator58["return"]();
          }
        } finally {
          if (_didIteratorError58) {
            throw _iteratorError58;
          }
        }
      }

      return nodes.length > 1 && results.length ? Core.unique(results) : results;
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
        return DOM._siblings(nodes, filter, elementsOnly);
      } // DocumentFragment and ShadowRoot nodes can not have siblings


      nodes = this.parseNodes(nodes, {
        node: true
      });
      var results = [];
      var _iteratorNormalCompletion59 = true;
      var _didIteratorError59 = false;
      var _iteratorError59 = undefined;

      try {
        for (var _iterator59 = nodes[Symbol.iterator](), _step59; !(_iteratorNormalCompletion59 = (_step59 = _iterator59.next()).done); _iteratorNormalCompletion59 = true) {
          var node = _step59.value;
          Core.merge(results, DOM._siblings(node, filter, elementsOnly));
        }
      } catch (err) {
        _didIteratorError59 = true;
        _iteratorError59 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion59 && _iterator59["return"] != null) {
            _iterator59["return"]();
          }
        } finally {
          if (_didIteratorError59) {
            throw _iteratorError59;
          }
        }
      }

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
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
      var _this6 = this;

      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return !!_this6.findOne(filter, node);
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

      var nodeFilter = DOM.parseNodesFactory(options);

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

      var nodeFilter = DOM.parseNodesFactory(options);

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
      var _iteratorNormalCompletion60 = true;
      var _didIteratorError60 = false;
      var _iteratorError60 = undefined;

      try {
        for (var _iterator60 = nodes[Symbol.iterator](), _step60; !(_iteratorNormalCompletion60 = (_step60 = _iterator60.next()).done); _iteratorNormalCompletion60 = true) {
          var node = _step60.value;
          DOMNode.insert(range, node);
        }
      } catch (err) {
        _didIteratorError60 = true;
        _iteratorError60 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion60 && _iterator60["return"] != null) {
            _iterator60["return"]();
          }
        } finally {
          if (_didIteratorError60) {
            throw _iteratorError60;
          }
        }
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
      var _iteratorNormalCompletion61 = true;
      var _didIteratorError61 = false;
      var _iteratorError61 = undefined;

      try {
        for (var _iterator61 = nodes[Symbol.iterator](), _step61; !(_iteratorNormalCompletion61 = (_step61 = _iterator61.next()).done); _iteratorNormalCompletion61 = true) {
          var node = _step61.value;
          DOMNode.insert(range, node);
        }
      } catch (err) {
        _didIteratorError61 = true;
        _iteratorError61 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion61 && _iterator61["return"] != null) {
            _iterator61["return"]();
          }
        } finally {
          if (_didIteratorError61) {
            throw _iteratorError61;
          }
        }
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
          deepest = DOM._deepest(nodes.slice().shift()),
          children = Core.wrap(DOMNode.childNodes(fragment));

      var _iteratorNormalCompletion62 = true;
      var _didIteratorError62 = false;
      var _iteratorError62 = undefined;

      try {
        for (var _iterator62 = children[Symbol.iterator](), _step62; !(_iteratorNormalCompletion62 = (_step62 = _iterator62.next()).done); _iteratorNormalCompletion62 = true) {
          var child = _step62.value;
          DOMNode.insertBefore(deepest, child);
        }
      } catch (err) {
        _didIteratorError62 = true;
        _iteratorError62 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion62 && _iterator62["return"] != null) {
            _iterator62["return"]();
          }
        } finally {
          if (_didIteratorError62) {
            throw _iteratorError62;
          }
        }
      }

      var _iteratorNormalCompletion63 = true;
      var _didIteratorError63 = false;
      var _iteratorError63 = undefined;

      try {
        for (var _iterator63 = nodes[Symbol.iterator](), _step63; !(_iteratorNormalCompletion63 = (_step63 = _iterator63.next()).done); _iteratorNormalCompletion63 = true) {
          var node = _step63.value;
          DOMNode.insert(range, node);
        }
      } catch (err) {
        _didIteratorError63 = true;
        _iteratorError63 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion63 && _iterator63["return"] != null) {
            _iterator63["return"]();
          }
        } finally {
          if (_didIteratorError63) {
            throw _iteratorError63;
          }
        }
      }
    }
  });
  /**
   * DOM Tests
   */

  Object.assign(DOM.prototype, {
    /**
     * Returns true if any of the nodes has a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasAnimation: function hasAnimation(nodes) {
      return this.parseNodes(nodes).some(function (node) {
        return DOM._hasAnimation(node);
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
      for (var _len5 = arguments.length, classes = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        classes[_key5 - 1] = arguments[_key5];
      }

      classes = DOM._parseClasses(classes);
      return this.parseNodes(nodes).some(function (node) {
        return classes.some(function (className) {
          return DOMNode.hasClass(node, className);
        });
      });
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData: function hasData(nodes, key) {
      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true,
        document: true,
        window: true
      }).some(function (node) {
        return DOM._hasData(node, key);
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
      return this.parseNodes(nodes).some(function (node) {
        return DOM._hasFragment(node);
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
      return this.parseNodes(nodes).some(function (node) {
        return DOM._hasShadow(node);
      });
    },

    /**
     * Returns true if any of the nodes has a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasTransition: function hasTransition(nodes) {
      return this.parseNodes(nodes).some(function (node) {
        return DOM._hasTransition(node);
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
      return this.parseNodes(nodes, {
        node: true
      }).some(function (node) {
        return Core.isElement(node) && DOM._css(node, 'position') === 'fixed' || DOM._parents(node, function (parent) {
          return Core.isElement(parent) && DOM._css(parent, 'position') === 'fixed';
        }, false, true).length;
      });
    },

    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    isHidden: function isHidden(nodes) {
      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).some(function (node) {
        return !DOM._isVisible(node);
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
      return this.parseNodes(nodes, {
        node: true,
        document: true,
        window: true
      }).some(function (node) {
        return DOM._isVisible(node);
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

      return DOM._forceShow(node, callback);
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
      var _iteratorNormalCompletion64 = true;
      var _didIteratorError64 = false;
      var _iteratorError64 = undefined;

      try {
        for (var _iterator64 = nodes[Symbol.iterator](), _step64; !(_iteratorNormalCompletion64 = (_step64 = _iterator64.next()).done); _iteratorNormalCompletion64 = true) {
          var node = _step64.value;
          DOMNode.normalize(node);
        }
      } catch (err) {
        _didIteratorError64 = true;
        _iteratorError64 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion64 && _iterator64["return"] != null) {
            _iterator64["return"]();
          }
        } finally {
          if (_didIteratorError64) {
            throw _iteratorError64;
          }
        }
      }
    },

    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize: function serialize(nodes) {
      return DOM._parseParams(this.serializeArray(nodes));
    },

    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The serialized array.
     */
    serializeArray: function serializeArray(nodes) {
      var _this7 = this;

      return this.parseNodes(nodes, {
        fragment: true,
        shadow: true
      }).reduce(function (values, node) {
        if (DOMNode.is(node, 'form') || Core.isFragment(node) || Core.isShadow(node)) {
          return values.concat(_this7.serializeArray(DOMNode.findBySelector('input, select, textarea', node)));
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
      var _this8 = this;

      if (!this._animations.has(node)) {
        this._animations.set(node, []);
      }

      var start = performance.now();
      return new Promise(function (resolve, reject) {
        _this8._animations.get(node).push(function () {
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
      var _this9 = this;

      var _iteratorNormalCompletion65 = true;
      var _didIteratorError65 = false;
      var _iteratorError65 = undefined;

      try {
        for (var _iterator65 = this._animations[Symbol.iterator](), _step65; !(_iteratorNormalCompletion65 = (_step65 = _iterator65.next()).done); _iteratorNormalCompletion65 = true) {
          var _step65$value = _slicedToArray(_step65.value, 2),
              node = _step65$value[0],
              animations = _step65$value[1];

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
        _didIteratorError65 = true;
        _iteratorError65 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion65 && _iterator65["return"] != null) {
            _iterator65["return"]();
          }
        } finally {
          if (_didIteratorError65) {
            throw _iteratorError65;
          }
        }
      }

      if (this._animations.size) {
        window.requestAnimationFrame(function (_) {
          return _this9._animationFrame();
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

      if (!this._animations.has(node)) {
        return;
      }

      var animations = this._animations.get(node);

      var _iteratorNormalCompletion66 = true;
      var _didIteratorError66 = false;
      var _iteratorError66 = undefined;

      try {
        for (var _iterator66 = animations[Symbol.iterator](), _step66; !(_iteratorNormalCompletion66 = (_step66 = _iterator66.next()).done); _iteratorNormalCompletion66 = true) {
          var animation = _step66.value;
          animation(true, finish);
        }
      } catch (err) {
        _didIteratorError66 = true;
        _iteratorError66 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion66 && _iterator66["return"] != null) {
            _iterator66["return"]();
          }
        } finally {
          if (_didIteratorError66) {
            throw _iteratorError66;
          }
        }
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
      var _this10 = this;

      if (!this._queues.has(node)) {
        return;
      }

      var next = this._queues.get(node).shift();

      if (!next) {
        this._queues["delete"](node);

        return;
      }

      Promise.resolve(next(node))["finally"](function (_) {
        return _this10._dequeueNode(node);
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
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute: function _setAttribute(node, attributes) {
      for (var key in attributes) {
        DOMNode.setAttribute(node, key, attributes[key]);
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
      if (!DOM._data.has(node)) {
        return;
      }

      this._setData(other, _objectSpread({}, DOM._data.get(node)));
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
        style.left = "".concat(parseFloat(this._css(node, 'left')) - leftOffset, "px");
      }

      var topOffset;

      if (nodeBox.top - containerBox.top < 0) {
        topOffset = nodeBox.top - containerBox.top;
      } else if (nodeBox.bottom - containerBox.bottom > 0) {
        topOffset = nodeBox.bottom - containerBox.bottom;
      }

      if (topOffset) {
        style.top = "".concat(parseFloat(this._css(node, 'top')) - topOffset, "px");
      }

      DOM._setStyle(node, style);
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
          result.x += DOMNode.getScrollX(window);
          result.y += DOMNode.getScrollY(window);
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
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    _height: function _height(node) {
      var _this11 = this;

      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;
      return this._forceShow(node, function (node) {
        var result = DOMNode.height(node);

        if (!padding) {
          result -= parseInt(_this11._css(node, 'padding-top')) + parseInt(_this11._css(node, 'padding-bottom'));
        }

        if (border) {
          result += parseInt(_this11._css(node, 'border-top-width')) + parseInt(_this11._css(node, 'border-bottom-width'));
        }

        if (margin) {
          result += parseInt(_this11._css(node, 'margin-top')) + parseInt(_this11._css(node, 'margin-bottom'));
        }

        return result;
      });
    },

    /**
     * Get the computed width of a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    _width: function _width(node) {
      var _this12 = this;

      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;
      return this._forceShow(node, function (node) {
        var result = DOMNode.width(node);

        if (!padding) {
          result -= parseInt(_this12._css(node, 'padding-left')) + parseInt(_this12._css(node, 'padding-right'));
        }

        if (border) {
          result += parseInt(_this12._css(node, 'border-left-width')) + parseInt(_this12._css(node, 'border-right-width'));
        }

        if (margin) {
          result += parseInt(_this12._css(node, 'margin-left')) + parseInt(_this12._css(node, 'margin-right'));
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
     * Get a computed CSS style value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The CSS style name.
     * @returns {string|CSSStyleDeclaration} The CSS style value.
     */
    _css: function _css(node, style) {
      if (!this._styles.has(node)) {
        this._styles.set(node, DOMNode.css(node));
      }

      if (!style) {
        return this._styles.get(node);
      }

      return this._styles.get(node).getPropertyValue(style);
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
        style = Core.snakeCase(style); // if value is numeric and not a number property, add px

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
      var getDelegate = selector.match(DOM.complexRegex) ? this._getDelegateContainsFactory(node, selector) : this._getDelegateMatchFactory(node, selector);
      return function (e) {
        if (DOMNode.isSame(e.target, node)) {
          return;
        }

        var delegate = getDelegate(e.target);

        if (!delegate) {
          return;
        }

        e.delegateTarget = delegate;
        return callback(e);
      };
    },

    /**
     * Return a function for matching a delegate target to a custom selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    _getDelegateContainsFactory: function _getDelegateContainsFactory(node, selector) {
      var _this13 = this;

      selector = DOM._prefixSelectors(selectors, "#".concat(DOM._tempId));
      return function (target) {
        var matches = _this13.__findByCustom(selector, node);

        if (!matches.length) {
          return false;
        }

        if (matches.includes(target)) {
          return target;
        }

        return _this13._parents(target, function (parent) {
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
      var _this14 = this;

      return function (target) {
        return DOMNode.is(target, selector) ? target : _this14._parents(target, function (parent) {
          return DOMNode.is(parent, selector);
        }, function (parent) {
          return DOMNode.isSame(node, parent);
        }, true).shift();
      };
    },

    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    _selfDestructFactory: function _selfDestructFactory(node, events, delegate, callback) {
      var _this15 = this;

      var realCallback = function realCallback(e) {
        delegate ? _this15._removeEvent(node, events, callback, delegate) : _this15._removeEvent(node, events, realCallback);
        return callback(e);
      };

      return realCallback;
    }
  });
  /**
   * DOM (Static) Event Handlers
   */

  Object.assign(DOM, {
    /**
     * Add events to a single node.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    _addEvent: function _addEvent(node, events, callback, delegate, selfDestruct) {
      var realCallback = callback;

      if (selfDestruct) {
        realCallback = this._selfDestructFactory(node, events, delegate, realCallback);
      }

      if (delegate) {
        realCallback = this._delegateFactory(node, delegate, realCallback);
      }

      if (!this._events.has(node)) {
        this._events.set(node, {});
      }

      var nodeEvents = this._events.get(node),
          eventData = {
        delegate: delegate,
        callback: callback,
        realCallback: realCallback,
        selfDestruct: selfDestruct
      };

      var _iteratorNormalCompletion67 = true;
      var _didIteratorError67 = false;
      var _iteratorError67 = undefined;

      try {
        for (var _iterator67 = DOM._parseEvents(events)[Symbol.iterator](), _step67; !(_iteratorNormalCompletion67 = (_step67 = _iterator67.next()).done); _iteratorNormalCompletion67 = true) {
          var event = _step67.value;

          var realEvent = DOM._parseEvent(event);

          eventData.event = event;
          eventData.realEvent = realEvent;

          if (!nodeEvents[realEvent]) {
            nodeEvents[realEvent] = [];
          } else if (nodeEvents[realEvent].includes(eventData)) {
            return;
          }

          DOMNode.addEvent(node, realEvent, realCallback);
          nodeEvents[realEvent].push(eventData);
        }
      } catch (err) {
        _didIteratorError67 = true;
        _iteratorError67 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion67 && _iterator67["return"] != null) {
            _iterator67["return"]();
          }
        } finally {
          if (_didIteratorError67) {
            throw _iteratorError67;
          }
        }
      }
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
        var _iteratorNormalCompletion68 = true;
        var _didIteratorError68 = false;
        var _iteratorError68 = undefined;

        try {
          for (var _iterator68 = nodeEvents[event][Symbol.iterator](), _step68; !(_iteratorNormalCompletion68 = (_step68 = _iterator68.next()).done); _iteratorNormalCompletion68 = true) {
            var eventData = _step68.value;

            this._addEvent(other, eventData.event, eventData.callback, eventData.delegate, eventData.selfDestruct);
          }
        } catch (err) {
          _didIteratorError68 = true;
          _iteratorError68 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion68 && _iterator68["return"] != null) {
              _iterator68["return"]();
            }
          } finally {
            if (_didIteratorError68) {
              throw _iteratorError68;
            }
          }
        }
      }
    },

    /**
     * Remove events from a single node.
     * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent: function _removeEvent(node, events, callback, delegate) {
      if (!this._events.has(node)) {
        return;
      }

      var nodeEvents = this._events.get(node),
          eventArray = events ? DOM._parseEvents(events) : Object.keys(nodeEvents);

      var _iteratorNormalCompletion69 = true;
      var _didIteratorError69 = false;
      var _iteratorError69 = undefined;

      try {
        var _loop = function _loop() {
          var event = _step69.value;

          var realEvent = DOM._parseEvent(event);

          if (!nodeEvents[realEvent]) {
            return {
              v: void 0
            };
          }

          nodeEvents[realEvent] = nodeEvents[realEvent].filter(function (eventData) {
            if (realEvent === event && realEvent !== eventData.realEvent || realEvent !== event && event !== eventData.event || delegate && (delegate !== eventData.delegate || callback && callback !== eventData.callback) || !delegate && callback && callback !== eventData.realCallback) {
              return true;
            }

            DOMNode.removeEvent(node, eventData.realEvent, eventData.realCallback);
            return false;
          });

          if (!nodeEvents[realEvent].length) {
            delete nodeEvents[realEvent];
          }
        };

        for (var _iterator69 = eventArray[Symbol.iterator](), _step69; !(_iteratorNormalCompletion69 = (_step69 = _iterator69.next()).done); _iteratorNormalCompletion69 = true) {
          var _ret = _loop();

          if (_typeof(_ret) === "object") return _ret.v;
        }
      } catch (err) {
        _didIteratorError69 = true;
        _iteratorError69 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion69 && _iterator69["return"] != null) {
            _iterator69["return"]();
          }
        } finally {
          if (_didIteratorError69) {
            throw _iteratorError69;
          }
        }
      }

      if (Object.keys(nodeEvents).length) {
        return;
      }

      this._events["delete"](node);
    }
  });
  /**
   * DOM (Static) Helpers
   */

  Object.assign(DOM, {
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
     * @returns {object} The data object.
     */
    _parseData: function _parseData(key, value) {
      return Core.isObject(key) ? key : _defineProperty({}, key, value);
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
     * Return a FormData object from an array or object.
     * @param {array|object} data The input data.
     * @returns {FormData} The FormData object.
     */
    _parseFormData: function _parseFormData(data) {
      var formData = new FormData();

      if (Core.isArray(data)) {
        var obj = {};
        var _iteratorNormalCompletion70 = true;
        var _didIteratorError70 = false;
        var _iteratorError70 = undefined;

        try {
          for (var _iterator70 = data[Symbol.iterator](), _step70; !(_iteratorNormalCompletion70 = (_step70 = _iterator70.next()).done); _iteratorNormalCompletion70 = true) {
            var value = _step70.value;
            obj[value.name] = value.value;
          }
        } catch (err) {
          _didIteratorError70 = true;
          _iteratorError70 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion70 && _iterator70["return"] != null) {
              _iterator70["return"]();
            }
          } finally {
            if (_didIteratorError70) {
              throw _iteratorError70;
            }
          }
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
          var _iteratorNormalCompletion71 = true;
          var _didIteratorError71 = false;
          var _iteratorError71 = undefined;

          try {
            for (var _iterator71 = value[Symbol.iterator](), _step71; !(_iteratorNormalCompletion71 = (_step71 = _iterator71.next()).done); _iteratorNormalCompletion71 = true) {
              var val = _step71.value;
              formData.append(key, val);
            }
          } catch (err) {
            _didIteratorError71 = true;
            _iteratorError71 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion71 && _iterator71["return"] != null) {
                _iterator71["return"]();
              }
            } finally {
              if (_didIteratorError71) {
                throw _iteratorError71;
              }
            }
          }
        }
      }
    },

    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @returns {string} The URI-encoded attribute string.
     */
    _parseParams: function _parseParams(data) {
      var _this16 = this;

      var values = [];

      if (Core.isArray(data)) {
        values = data.map(function (value) {
          return _this16._parseParam(value.name, value.value);
        });
      } else if (Core.isObject(data)) {
        values = Object.keys(data).map(function (key) {
          return _this16._parseParam(key, data[key]);
        });
      }

      return values.flatMap(encodeURI).join('&');
    },

    /**
     * Return a string attribute, or a flat array of attributes from a key and value.
     * @param {string} key The input key.
     * @param {array|object|string} value The input value.
     * @returns {string|array} The parsed attributes.
     */
    _parseParam: function _parseParam(key, value) {
      var _this17 = this;

      if (Core.isArray(value)) {
        return value.map(function (val) {
          return _this17._parseParam(key, val);
        }).flat();
      }

      if (Core.isObject(value)) {
        return Object.keys(value).map(function (subKey) {
          return _this17._parseParam(key + '[' + subKey + ']', value[subKey]);
        }).flat();
      }

      return key + '=' + value;
    },

    /**
     * Return a prefixed selector string.
     * @param {string} selectors The input selectors.
     * @param {string} prefix The input prefix.
     * @returns {string} The prefixed selector.
     */
    _prefixSelectors: function _prefixSelectors(selectors, prefix) {
      return selectors.split(this.splitRegex).filter(function (select) {
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
      var _iteratorNormalCompletion72 = true;
      var _didIteratorError72 = false;
      var _iteratorError72 = undefined;

      try {
        for (var _iterator72 = children[Symbol.iterator](), _step72; !(_iteratorNormalCompletion72 = (_step72 = _iterator72.next()).done); _iteratorNormalCompletion72 = true) {
          var child = _step72.value;

          this._empty(child);

          this._remove(child);

          DOMNode.removeChild(node, child);
        } // Remove ShadowRoot

      } catch (err) {
        _didIteratorError72 = true;
        _iteratorError72 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion72 && _iterator72["return"] != null) {
            _iterator72["return"]();
          }
        } finally {
          if (_didIteratorError72) {
            throw _iteratorError72;
          }
        }
      }

      if (DOM._hasShadow(node)) {
        var shadow = DOMNode.shadow(node);

        this._empty(shadow);

        this._remove(shadow);
      } // Remove DocumentFragment


      if (DOM._hasFragment(node)) {
        var fragment = DOMNode.fragment(node);

        this._empty(fragment);

        this._remove(fragment);
      }
    },

    /**
     * Remove a single node from the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     */
    _remove: function _remove(node) {
      DOMNode.triggerEvent(node, 'remove');

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

      var _iteratorNormalCompletion73 = true;
      var _didIteratorError73 = false;
      var _iteratorError73 = undefined;

      try {
        for (var _iterator73 = others[Symbol.iterator](), _step73; !(_iteratorNormalCompletion73 = (_step73 = _iterator73.next()).done); _iteratorNormalCompletion73 = true) {
          var other = _step73.value;

          var clone = this._clone(other, true);

          DOMNode.insertBefore(parent, clone, node);
        }
      } catch (err) {
        _didIteratorError73 = true;
        _iteratorError73 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion73 && _iterator73["return"] != null) {
            _iterator73["return"]();
          }
        } finally {
          if (_didIteratorError73) {
            throw _iteratorError73;
          }
        }
      }

      this._empty(node);

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
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     */
    _unwrap: function _unwrap(node, filter) {
      var parent = DOMNode.parent(node, filter);

      if (!parent) {
        return;
      }

      var outerParent = DOMNode.parent(parent);

      if (!parent) {
        return;
      }

      var children = Core.wrap(DOMNode.childNodes(parent));
      var _iteratorNormalCompletion74 = true;
      var _didIteratorError74 = false;
      var _iteratorError74 = undefined;

      try {
        for (var _iterator74 = children[Symbol.iterator](), _step74; !(_iteratorNormalCompletion74 = (_step74 = _iterator74.next()).done); _iteratorNormalCompletion74 = true) {
          var child = _step74.value;
          DOMNode.insertBefore(outerParent, child, parent);
        }
      } catch (err) {
        _didIteratorError74 = true;
        _iteratorError74 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion74 && _iterator74["return"] != null) {
            _iterator74["return"]();
          }
        } finally {
          if (_didIteratorError74) {
            throw _iteratorError74;
          }
        }
      }

      this._remove(parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {array} others The other node(s).
     */
    _wrap: function _wrap(node, others) {
      var _this18 = this;

      var parent = DOMNode.parent(node);

      if (!parent) {
        return;
      }

      var clones = others.map(function (other) {
        return _this18._clone(other, true);
      });
      var _iteratorNormalCompletion75 = true;
      var _didIteratorError75 = false;
      var _iteratorError75 = undefined;

      try {
        for (var _iterator75 = clones[Symbol.iterator](), _step75; !(_iteratorNormalCompletion75 = (_step75 = _iterator75.next()).done); _iteratorNormalCompletion75 = true) {
          var clone = _step75.value;
          DOMNode.insertBefore(parent, clone, node);
        }
      } catch (err) {
        _didIteratorError75 = true;
        _iteratorError75 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion75 && _iterator75["return"] != null) {
            _iterator75["return"]();
          }
        } finally {
          if (_didIteratorError75) {
            throw _iteratorError75;
          }
        }
      }

      var deepest = this._deepest(clones.shift());

      DOMNode.insertBefore(deepest, node);
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {array} others The other node(s).
     */
    _wrapInner: function _wrapInner(node, others) {
      var _this19 = this;

      var children = Core.wrap(DOMNode.childNodes(node));
      var clones = others.map(function (other) {
        return _this19._clone(other, true);
      });
      var _iteratorNormalCompletion76 = true;
      var _didIteratorError76 = false;
      var _iteratorError76 = undefined;

      try {
        for (var _iterator76 = clones[Symbol.iterator](), _step76; !(_iteratorNormalCompletion76 = (_step76 = _iterator76.next()).done); _iteratorNormalCompletion76 = true) {
          var clone = _step76.value;
          DOMNode.insertBefore(node, clone);
        }
      } catch (err) {
        _didIteratorError76 = true;
        _iteratorError76 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion76 && _iterator76["return"] != null) {
            _iterator76["return"]();
          }
        } finally {
          if (_didIteratorError76) {
            throw _iteratorError76;
          }
        }
      }

      var deepest = this._deepest(clones.shift());

      var _iteratorNormalCompletion77 = true;
      var _didIteratorError77 = false;
      var _iteratorError77 = undefined;

      try {
        for (var _iterator77 = children[Symbol.iterator](), _step77; !(_iteratorNormalCompletion77 = (_step77 = _iterator77.next()).done); _iteratorNormalCompletion77 = true) {
          var child = _step77.value;
          DOMNode.insertBefore(deepest, child);
        }
      } catch (err) {
        _didIteratorError77 = true;
        _iteratorError77 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion77 && _iterator77["return"] != null) {
            _iterator77["return"]();
          }
        } finally {
          if (_didIteratorError77) {
            throw _iteratorError77;
          }
        }
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
      var _iteratorNormalCompletion78 = true;
      var _didIteratorError78 = false;
      var _iteratorError78 = undefined;

      try {
        for (var _iterator78 = nodes[Symbol.iterator](), _step78; !(_iteratorNormalCompletion78 = (_step78 = _iterator78.next()).done); _iteratorNormalCompletion78 = true) {
          var node = _step78.value;
          Core.merge(results, this.__findByCustom(selectors, node));
        }
      } catch (err) {
        _didIteratorError78 = true;
        _iteratorError78 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion78 && _iterator78["return"] != null) {
            _iterator78["return"]();
          }
        } finally {
          if (_didIteratorError78) {
            throw _iteratorError78;
          }
        }
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
      var _iteratorNormalCompletion79 = true;
      var _didIteratorError79 = false;
      var _iteratorError79 = undefined;

      try {
        for (var _iterator79 = nodes[Symbol.iterator](), _step79; !(_iteratorNormalCompletion79 = (_step79 = _iterator79.next()).done); _iteratorNormalCompletion79 = true) {
          var node = _step79.value;
          Core.merge(results, DOMNode.findBySelector(selector, node));
        }
      } catch (err) {
        _didIteratorError79 = true;
        _iteratorError79 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion79 && _iterator79["return"] != null) {
            _iterator79["return"]();
          }
        } finally {
          if (_didIteratorError79) {
            throw _iteratorError79;
          }
        }
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
      var _iteratorNormalCompletion80 = true;
      var _didIteratorError80 = false;
      var _iteratorError80 = undefined;

      try {
        for (var _iterator80 = nodes[Symbol.iterator](), _step80; !(_iteratorNormalCompletion80 = (_step80 = _iterator80.next()).done); _iteratorNormalCompletion80 = true) {
          var node = _step80.value;

          var result = this.__findOneByCustom(selectors, node);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _didIteratorError80 = true;
        _iteratorError80 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion80 && _iterator80["return"] != null) {
            _iterator80["return"]();
          }
        } finally {
          if (_didIteratorError80) {
            throw _iteratorError80;
          }
        }
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
      var _iteratorNormalCompletion81 = true;
      var _didIteratorError81 = false;
      var _iteratorError81 = undefined;

      try {
        for (var _iterator81 = nodes[Symbol.iterator](), _step81; !(_iteratorNormalCompletion81 = (_step81 = _iterator81.next()).done); _iteratorNormalCompletion81 = true) {
          var node = _step81.value;
          var result = DOMNode.findOneBySelector(selector, node);

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _didIteratorError81 = true;
        _iteratorError81 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion81 && _iterator81["return"] != null) {
            _iterator81["return"]();
          }
        } finally {
          if (_didIteratorError81) {
            throw _iteratorError81;
          }
        }
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
      DOMNode.setAttribute(node, 'id', this.tempId);
      var parent = DOMNode.parent(node);
      var results = [];
      var _iteratorNormalCompletion82 = true;
      var _didIteratorError82 = false;
      var _iteratorError82 = undefined;

      try {
        for (var _iterator82 = selectors[Symbol.iterator](), _step82; !(_iteratorNormalCompletion82 = (_step82 = _iterator82.next()).done); _iteratorNormalCompletion82 = true) {
          var selector = _step82.value;
          Core.merge(results, DOMNode.findBySelector(selector, parent));
        }
      } catch (err) {
        _didIteratorError82 = true;
        _iteratorError82 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion82 && _iterator82["return"] != null) {
            _iterator82["return"]();
          }
        } finally {
          if (_didIteratorError82) {
            throw _iteratorError82;
          }
        }
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
      DOMNode.setAttribute(node, 'id', this.tempId);
      var parent = DOMNode.parent(node);

      if (!parent) {
        return null;
      }

      var result = null;
      var _iteratorNormalCompletion83 = true;
      var _didIteratorError83 = false;
      var _iteratorError83 = undefined;

      try {
        for (var _iterator83 = selectors[Symbol.iterator](), _step83; !(_iteratorNormalCompletion83 = (_step83 = _iterator83.next()).done); _iteratorNormalCompletion83 = true) {
          var selector = _step83.value;
          result = DOMNode.findOneBySelector(selector, parent);

          if (result) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError83 = true;
        _iteratorError83 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion83 && _iterator83["return"] != null) {
            _iterator83["return"]();
          }
        } finally {
          if (_didIteratorError83) {
            throw _iteratorError83;
          }
        }
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
      var _iteratorNormalCompletion84 = true;
      var _didIteratorError84 = false;
      var _iteratorError84 = undefined;

      try {
        for (var _iterator84 = children[Symbol.iterator](), _step84; !(_iteratorNormalCompletion84 = (_step84 = _iterator84.next()).done); _iteratorNormalCompletion84 = true) {
          child = _step84.value;

          if (filter && !filter(child)) {
            continue;
          }

          results.push(child);

          if (first) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError84 = true;
        _iteratorError84 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion84 && _iterator84["return"] != null) {
            _iterator84["return"]();
          }
        } finally {
          if (_didIteratorError84) {
            throw _iteratorError84;
          }
        }
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

        results.push(node);

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

        results.push(node);

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
      var _iteratorNormalCompletion85 = true;
      var _didIteratorError85 = false;
      var _iteratorError85 = undefined;

      try {
        for (var _iterator85 = siblings[Symbol.iterator](), _step85; !(_iteratorNormalCompletion85 = (_step85 = _iterator85.next()).done); _iteratorNormalCompletion85 = true) {
          sibling = _step85.value;

          if (DOMNode.isSame(node, sibling)) {
            continue;
          }

          if (filter && !filter(sibling)) {
            continue;
          }

          results.push(sibling);
        }
      } catch (err) {
        _didIteratorError85 = true;
        _iteratorError85 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion85 && _iterator85["return"] != null) {
            _iterator85["return"]();
          }
        } finally {
          if (_didIteratorError85) {
            throw _iteratorError85;
          }
        }
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
     * Returns true if a single node has a CSS animation.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
     */
    _hasAnimation: function _hasAnimation(node) {
      return !!parseFloat(this._css(node, 'animation-duration'));
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
     * Returns true if a single node has a CSS transition.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS transition, otherwise FALSE.
     */
    _hasTransition: function _hasTransition(node) {
      return !!parseFloat(this._css(node, 'transition-duration'));
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
      var _this20 = this;

      if (Core.isDocument(node) || Core.isWindow(node) || DOM._isVisible(node)) {
        return callback(node);
      }

      var elements = [];

      if (Core.isElement(node) && this._css(node, 'display') === 'none') {
        elements.push(node);
      }

      Core.merge(elements, this._parents(node, function (parent) {
        return Core.isElement(parent) && _this20._css(parent, 'display') === 'none';
      }));
      var hidden = new Map();

      for (var _i2 = 0, _elements = elements; _i2 < _elements.length; _i2++) {
        var element = _elements[_i2];
        hidden.set(element, DOMNode.getAttribute(element, 'style'));
        DOMNode.setStyle(element, 'display', 'initial', true);
      }

      var result = callback(node);
      var _iteratorNormalCompletion86 = true;
      var _didIteratorError86 = false;
      var _iteratorError86 = undefined;

      try {
        for (var _iterator86 = hidden[Symbol.iterator](), _step86; !(_iteratorNormalCompletion86 = (_step86 = _iterator86.next()).done); _iteratorNormalCompletion86 = true) {
          var _step86$value = _slicedToArray(_step86.value, 2),
              _element = _step86$value[0],
              style = _step86$value[1];

          if (style) {
            DOMNode.setAttribute(_element, 'style', style);
          } else {
            DOMNode.removeAttribute(_element, 'style');
          }
        }
      } catch (err) {
        _didIteratorError86 = true;
        _iteratorError86 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion86 && _iterator86["return"] != null) {
            _iterator86["return"]();
          }
        } finally {
          if (_didIteratorError86) {
            throw _iteratorError86;
          }
        }
      }

      return result;
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
    // Default AJAX options
    ajaxDefaults: {
      beforeSend: false,
      cache: true,
      contentType: 'application/x-www-form-urlencoded',
      data: false,
      method: 'GET',
      processData: true
    },
    // Default animation options
    animationDefaults: {
      duration: 1000,
      type: 'ease-in-out',
      infinite: false
    },
    // CSS properties that can have number-only values
    cssNumberProperties: ['font-weight', 'line-height', 'opacity', 'orphans', 'widows', 'z-index'],
    // Complex selector RegEX
    complexRegex: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,
    // Fast selector RegEx
    fastRegex: /^([\#\.]?)([\w\-]+)$/,
    // Local protocol RegEx
    localRegex: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    // Comma seperated selector RegEx
    splitRegex: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,
    // Temporary ID
    tempId: 'frost' + Date.now().toString(16)
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
     * @returns {string|DOMStringMap} The dataset value.
     */
    getDataset: function getDataset(node, key) {
      if (!key) {
        return node.dataset;
      }

      return node.dataset[key];
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
     * @param {object} attributes An object containing attributes.
     */
    setAttribute: function setAttribute(node, attribute, value) {
      node.setAttribute(attribute, value);
    },

    /**
     * Set a dataset value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} dataset An object containing dataset values.
     */
    setDataset: function setDataset(node, dataset) {
      Object.assign(node.dataset, dataset);
    },

    /**
     * Set a property value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} properties An object containing properties.
     */
    setProperty: function setProperty(node, properties) {
      Object.assign(node, properties);
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
      return outer ? node.outerWeight : node.innerWidth;
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

      for (var _len6 = arguments.length, classes = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        classes[_key6 - 1] = arguments[_key6];
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
     * Remove classes from a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    removeClass: function removeClass(node) {
      var _node$classList2;

      for (var _len7 = arguments.length, classes = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        classes[_key7 - 1] = arguments[_key7];
      }

      (_node$classList2 = node.classList).remove.apply(_node$classList2, classes);
    },

    /**
     * Toggle classes for a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    toggleClass: function toggleClass(node) {
      var _node$classList3;

      for (var _len8 = arguments.length, classes = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        classes[_key8 - 1] = arguments[_key8];
      }

      (_node$classList3 = node.classList).toggle.apply(_node$classList3, classes);
    },

    /**
     * Get a style property for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The style name.
     * @returns {string|CSSStyleDeclaration} The style value.
     */
    getStyle: function getStyle(node, style) {
      if (!style) {
        return node.style;
      }

      return node.style[style];
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle: function setStyle(node, style, value, important) {
      node.style.setProperty(style, value, important ? 'important' : '');
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
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} event The event name.
     * @param {object} [data] Additional data to attach to the Event object.
     */
    triggerEvent: function triggerEvent(node, event, data) {
      var eventData = new Event(event);

      if (data) {
        Object.assign(eventData, data);
      }

      node.dispatchEvent(eventData);
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
     * Create a clone of a node.
     * @param {Node} node The input node.
     * @param {Boolean} deep Whether to deep clone the node.
     * @returns {Node} The cloned node.
     */
    clone: function clone(node, deep) {
      return node.cloneNode(deep);
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
      return context.createCommentNode(comment);
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
    }
  });
  return {
    DOM: DOM,
    DOMNode: DOMNode,
    dom: new DOM()
  };
});