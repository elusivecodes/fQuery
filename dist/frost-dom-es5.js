"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
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

  if (!window.Core.isWindow(window)) {
    throw new Error('FrostDOM requires a valid Window object.');
  }

  var Core = window.Core;
  var document = window.document;
  /**
   * DOM Class
   * @class
   */

  var DOM =
  /*#__PURE__*/
  function () {
    /**
     * New DOM constructor.
     * @param {Document} [context=document] The document context.
     * @returns {DOM} A new DOM object.
     */
    function DOM() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      _classCallCheck(this, DOM);

      this.context = context;
      this.animating = false;
      this.animations = new Map();
      this.queues = new WeakMap();
      this.nodeData = new WeakMap();
      this.nodeEvents = new WeakMap();
      this.nodeStyles = new WeakMap();
    }
    /**
     * Execute a command in the document context.
     * @param {string} command The command to execute.
     * @param {string} [value] The value to give the command.
     * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
     */


    _createClass(DOM, [{
      key: "exec",
      value: function exec(command) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return this.context.execCommand(command, false, value);
      }
    }]);

    return DOM;
  }();
  /**
   * DOM Animate
   */


  Object.assign(DOM.prototype, {
    /**
     * @callback DOM~animationCallback
     * @param {HTMLElement} node The input node.
     * @param {number} progress The animation progress.
     */

    /**
     * Add an animation to each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    animate: function animate(nodes, callback, options) {
      var _this = this;

      // set default options
      options = _objectSpread({}, DOM.animationDefaults, options); // handle multiple element argument

      var promises = this._nodeFilter(nodes).map(function (node) {
        return _this._animate(node, callback, options);
      });

      this._start();

      return Promise.all(promises);
    },

    /**
     * Stop all animations for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    stop: function stop(nodes) {
      var _this2 = this;

      var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._nodeFilter(nodes).forEach(function (node) {
        return _this2._stop(node, finish);
      });
    },

    /**
     * Add an animation to a single element.
     * @param {HTMLElement} node The input node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _animate: function _animate(node, callback, options) {
      var _this3 = this;

      if (!this.animations.has(node)) {
        this.animations.set(node, []);
      }

      var start = performance.now();
      return new Promise(function (resolve, reject) {
        _this3.animations.get(node).push(function () {
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
      var _this4 = this;

      this.animations.forEach(function (animations, node) {
        animations = animations.filter(function (animation) {
          return !animation();
        });

        if (!animations.length) {
          _this4.animations["delete"](node);
        } else {
          _this4.animations.set(node, animations);
        }
      });

      if (this.animations.size) {
        window.requestAnimationFrame(function (_) {
          return _this4._animationFrame();
        });
      } else {
        this.animating = false;
      }
    },

    /**
     * Start the animation loop (if not already started).
     */
    _start: function _start() {
      if (this.animating) {
        return;
      }

      this.animating = true;

      this._animationFrame();
    },

    /**
     * Stop all animations for a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    _stop: function _stop(node) {
      var finish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.animations.has(node)) {
        return;
      }

      this.animations.get(node).forEach(function (animation) {
        return animation(true, finish);
      });
      this.animations["delete"](node);
    }
  });
  /**
   * DOM Animations
   */

  Object.assign(DOM.prototype, {
    /**
     * Drop each element into place.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=top] The direction to drop the node from.
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
     * Drop each element out of place.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=top] The direction to drop the node to.
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
     * Fade the opacity of each element in.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    fadeIn: function fadeIn(nodes, options) {
      return this.animate(nodes, function (node, progress) {
        return DOM._setStyle(node, {
          opacity: progress < 1 ? progress : ''
        });
      }, options);
    },

    /**
     * Fade the opacity of each element out.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    fadeOut: function fadeOut(nodes, options) {
      return this.animate(nodes, function (node, progress) {
        return DOM._setStyle(node, {
          opacity: progress < 1 ? 1 - progress : ''
        });
      }, options);
    },

    /**
     * Rotate each element in on an X,Y.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
        return DOM._setStyle(node, {
          transform: progress < 1 ? "rotate3d(".concat(options.x, ", ").concat(options.y, ", 0, ").concat((90 - progress * 90) * (options.inverse ? -1 : 1), "deg)") : ''
        });
      }, _objectSpread({
        x: 0,
        y: 1
      }, options));
    },

    /**
     * Rotate each element out on an X,Y.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
        return DOM._setStyle(node, {
          transform: progress < 1 ? "rotate3d(".concat(options.x, ", ").concat(options.y, ", 0, ").concat(progress * 90 * (options.inverse ? -1 : 1), "deg)") : ''
        });
      }, _objectSpread({
        x: 0,
        y: 1
      }, options));
    },

    /**
     * Slide each element in from a direction.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideIn: function slideIn(nodes, options) {
      var _this5 = this;

      return this.animate(nodes, function (node, progress, options) {
        var transform;

        if (progress < 1) {
          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var axis, size, inverse;

          if (dir === 'top' || dir === 'bottom') {
            axis = 'Y';
            size = _this5._height(node);
            inverse = dir === 'top';
          } else {
            axis = 'X';
            size = _this5._width(node);
            inverse = dir === 'left';
          }

          transform = "translate".concat(axis, "(").concat(Math.round(size - size * progress) * (inverse ? -1 : 1), "px)");
        } else {
          transform = '';
        }

        DOM._setStyle(node, {
          transform: transform
        });
      }, _objectSpread({
        direction: 'bottom'
      }, options));
    },

    /**
     * Slide each element out from a direction.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideOut: function slideOut(nodes, options) {
      var _this6 = this;

      return this.animate(nodes, function (node, progress, options) {
        var transform;

        if (progress < 1) {
          var dir = Core.isFunction(options.direction) ? options.direction() : options.direction;
          var axis, size, inverse;

          if (dir === 'top' || dir === 'bottom') {
            axis = 'Y';
            size = _this6._height(node);
            inverse = dir === 'top';
          } else {
            axis = 'X';
            size = _this6._width(node);
            inverse = dir === 'left';
          }

          transform = "translate".concat(axis, "(").concat(Math.round(size * progress) * (inverse ? -1 : 1), "px)");
        } else {
          transform = '';
        }

        DOM._setStyle(node, {
          transform: transform
        });
      }, _objectSpread({
        direction: 'bottom'
      }, options));
    },

    /**
     * Squeeze each element in from a direction.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeIn: function squeezeIn(nodes, options) {
      var _this7 = this;

      options = _objectSpread({
        direction: 'bottom'
      }, options);
      return Promise.all(this._nodeFilter(nodes).map(function (node) {
        return _this7._squeezeIn(node, options);
      }));
    },

    /**
     * Squeeze each element out from a direction.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeOut: function squeezeOut(nodes, options) {
      var _this8 = this;

      options = _objectSpread({
        direction: 'bottom'
      }, options);
      return Promise.all(this._nodeFilter(nodes).map(function (node) {
        return _this8._squeezeOut(node, options);
      }));
    },

    /**
     * Squeeze each element in from a direction.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _squeezeIn: function _squeezeIn(node, options) {
      var _this9 = this;

      var wrapper = this.create('div', {
        style: {
          overflow: 'hidden',
          position: 'relative'
        }
      });

      this._wrap(node, wrapper);

      var parent = DOM._parent(node).shift();

      return this.animate(node, function (node, progress, options) {
        if (progress === 1) {
          DOM._before(parent, DOM._children(parent, false, false, false));

          _this9._remove(parent);

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

        var size = Math.round(_this9["_".concat(sizeStyle)](node)),
            amount = Math.round(size * progress),
            styles = _defineProperty({}, sizeStyle, amount + 'px');

        if (translateStyle) {
          styles.transform = "translate".concat(translateStyle, "(").concat(size - amount, "px)");
        }

        DOM._setStyle(parent, styles);
      }, options);
    },

    /**
     * Squeeze a single element out from a direction.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _squeezeOut: function _squeezeOut(node, options) {
      var _this10 = this;

      var wrapper = this.create('div', {
        style: {
          overflow: 'hidden',
          position: 'relative'
        }
      });

      this._wrap(node, wrapper);

      var parent = DOM._parent(node).shift();

      return this.animate(node, function (node, progress, options) {
        if (progress === 1) {
          DOM._before(parent, DOM._children(parent, false, false, false));

          _this10._remove(parent);

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

        var size = Math.round(_this10["_".concat(sizeStyle)](node)),
            amount = Math.round(size - size * progress),
            styles = _defineProperty({}, sizeStyle, amount + 'px');

        if (translateStyle) {
          styles.transform = "translate".concat(translateStyle, "(").concat(size - amount, "px)");
        }

        DOM._setStyle(parent, styles);
      }, options);
    }
  });
  /**
   * DOM Queue
   */

  Object.assign(DOM.prototype, {
    /**
     * @callback DOM~queueCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * Queue a callback on each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    queue: function queue(nodes, callback) {
      var _this11 = this;

      this._nodeFilter(nodes).forEach(function (node) {
        return _this11._queue(node, callback);
      });
    },

    /**
     * Clear the queue of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    clearQueue: function clearQueue(nodes) {
      var _this12 = this;

      this._nodeFilter(nodes).forEach(function (node) {
        return _this12._clearQueue(node);
      });
    },

    /**
     * Clear the queue of a single element.
     * @param {HTMLElement} node The input node.
     */
    _clearQueue: function _clearQueue(node) {
      if (!this.queues.has(node)) {
        return;
      }

      this.queues["delete"](node);
    },

    /**
     * Run the next callback for a single element.
     * @param {HTMLElement} node The input node.
     */
    _dequeueNode: function _dequeueNode(node) {
      var _this13 = this;

      if (!this.queues.has(node)) {
        return;
      }

      var next = this.queues.get(node).shift();

      if (!next) {
        this.queues["delete"](node);
        return;
      }

      Promise.resolve(next(node))["finally"](function (_) {
        return _this13._dequeueNode(node);
      });
    },

    /**
     * Queue a callback on a single element.
     * @param {HTMLElement} node The input node.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    _queue: function _queue(node, callback) {
      var newQueue = !this.queues.has(node);
      var queue;

      if (newQueue) {
        queue = [];
        this.queues.set(node, queue);
      } else {
        queue = this.queues.get(node);
      }

      queue.push(callback);

      if (newQueue) {
        this._dequeueNode(node);
      }
    }
  });
  /**
   * DOM Attributes
   */

  Object.assign(DOM.prototype, {
    /**
     * Get an attribute value for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    getAttribute: function getAttribute(nodes, attribute) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return DOM._getAttribute(node, attribute);
    },

    /**
     * Get a dataset value for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @returns {string|object} The dataset value.
     */
    getDataset: function getDataset(nodes, key) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return DOM._getDataset(node, key);
    },

    /**
     * Get the HTML contents of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {string} The HTML contents.
     */
    getHTML: function getHTML(nodes) {
      return this.getProperty(nodes, 'innerHTML');
    },

    /**
     * Get a property value for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty: function getProperty(nodes, property) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return DOM._getProperty(node, property);
    },

    /**
     * Get the text contents of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {string} The text contents.
     */
    getText: function getText(nodes) {
      return this.getProperty(nodes, 'innerText');
    },

    /**
     * Get the value property of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {string} The value.
     */
    getValue: function getValue(nodes) {
      return this.getProperty(nodes, 'value');
    },

    /**
     * Remove an attribute from each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     */
    removeAttribute: function removeAttribute(nodes, attribute) {
      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._removeAttribute(node, attribute);
      });
    },

    /**
     * Remove a property from each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    removeProperty: function removeProperty(nodes, property) {
      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._removeProperty(node, property);
      });
    },

    /**
     * Set an attribute value for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     */
    setAttribute: function setAttribute(nodes, attribute, value) {
      var attributes = DOM._parseData(attribute, value);

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._setAttribute(node, attributes);
      });
    },

    /**
     * Set a dataset value for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {string} [value] The dataset value.
     */
    setDataset: function setDataset(nodes, key, value) {
      var dataset = DOM._parseData(key, value);

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._setDataset(node, dataset);
      });
    },

    /**
     * Set the HTML contents of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} html The HTML contents.
     */
    setHTML: function setHTML(nodes, html) {
      this.empty(nodes);
      this.setProperty(nodes, 'innerHTML', html);
    },

    /**
     * Set a property value for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     */
    setProperty: function setProperty(nodes, property, value) {
      var properties = DOM._parseData(property, value);

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._setProperty(node, properties);
      });
    },

    /**
     * Set the text contents of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} text The text contents.
     */
    setText: function setText(nodes, text) {
      this.empty(nodes);
      this.setProperty(nodes, 'innerText', text);
    },

    /**
     * Set the value property of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} others The other node(s), or a query selector string.
     */
    cloneData: function cloneData(nodes, others) {
      var _this14 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this14._cloneData(node, others);
      });
    },

    /**
     * Get custom data for the first node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    getData: function getData(nodes, key) {
      var node = this._nodeFind(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
      });

      if (!node) {
        return;
      }

      return this._getData(node, key);
    },

    /**
     * Remove custom data from each node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     */
    removeData: function removeData(nodes, key) {
      var _this15 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this15._removeData(node, key);
      });
    },

    /**
     * Set custom data for each node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     */
    setData: function setData(nodes, key, value) {
      var _this16 = this;

      var data = DOM._parseData(key, value);

      this._nodeFilter(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this16._setData(node, data);
      });
    },

    /**
     * Clone custom data from a single node to each other node.
     * @param {Node|Window} node The input node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} others The other node(s), or a query selector string.
     */
    _cloneData: function _cloneData(node, others) {
      if (!this.nodeData.has(node)) {
        return;
      }

      this.setData(others, _objectSpread({}, this.nodeData.get(node)));
    },

    /**
     * Get custom data for a single node.
     * @param {Node|Window} node The input node.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    _getData: function _getData(node, key) {
      if (!this.nodeData.has(node)) {
        return;
      }

      if (!key) {
        return this.nodeData.get(node);
      }

      return this.nodeData.get(node)[key];
    },

    /**
     * Remove custom data from a single node.
     * @param {Node|Window} node The input node.
     * @param {string} [key] The data key.
     */
    _removeData: function _removeData(node, key) {
      if (!this.nodeData.has(node)) {
        return;
      }

      if (key) {
        var nodeData = this.nodeData.get(node);
        delete nodeData[key];

        if (Object.keys(nodeData).length) {
          return;
        }
      }

      this.nodeData["delete"](node);
    },

    /**
     * Set custom data for a single node.
     * @param {Node|Window} node The input node.
     * @param {object} data An object containing data.
     */
    _setData: function _setData(node, data) {
      if (!this.nodeData.has(node)) {
        this.nodeData.set(node, {});
      }

      Object.assign(this.nodeData.get(node), data);
    }
  });
  /**
   * DOM Position
   */

  Object.assign(DOM.prototype, {
    /**
     * Get the X,Y co-ordinates for the center of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
     * Contrain each element to a container element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} container The container node, or a query selector string.
     */
    constrain: function constrain(nodes, container) {
      var _this17 = this;

      var containerBox = this.rect(container);

      if (!containerBox) {
        return;
      }

      this._nodeFilter(nodes).forEach(function (node) {
        return _this17._constrain(node, containerBox);
      });
    },

    /**
     * Get the distance of an element to an X,Y position in the Window.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
     * Get the distance between two elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The node to compare, or a query selector string.
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
     * Get the nearest element to an X,Y position in the Window.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {HTMLElement} The nearest node.
     */
    nearestTo: function nearestTo(nodes, x, y, offset) {
      var _this18 = this;

      var closest = null;
      var closestDistance = Number.MAX_VALUE;

      this._nodeFilter(nodes).forEach(function (node) {
        var dist = _this18.distTo(node, x, y, offset);

        if (dist && dist < closestDistance) {
          closestDistance = dist;
          closest = node;
        }
      });

      return closest;
    },

    /**
     * Get the nearest element to another element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The node to compare, or a query selector string.
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
     * Get the percentage of an X co-ordinate relative to an element's width.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
     * Get the percentage of a Y co-ordinate relative to an element's height.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
     * Get the position of the first element relative to the Window or Document.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    position: function position(nodes, offset) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return this._position(node, offset);
    },

    /**
     * Get the computed bounding rectangle of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect: function rect(nodes, offset) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return this._rect(node, offset);
    },

    /**
     * Contrain a single element to a container box.
     * @param {HTMLElement} node The input node.
     * @param {DOMRect} containerBox The container box.
     */
    _constrain: function _constrain(node, containerBox) {
      var nodeBox = this._rect(node);

      if (nodeBox.height > containerBox.height) {
        DOM._setStyle(node, {
          height: containerBox.height
        });
      }

      if (nodeBox.width > containerBox.width) {
        DOM._setStyle(node, {
          width: containerBox.width
        });
      }

      if (nodeBox.top < containerBox.top) {
        DOM._setStyle(node, {
          top: containerBox.top
        });
      }

      if (nodeBox.right > containerBox.right) {
        DOM._setStyle(node, {
          right: containerBox.right - nodeBox.width
        });
      }

      if (nodeBox.bottom > containerBox.bottom) {
        DOM._setStyle(node, {
          top: containerBox.bottom - nodeBox.height
        });
      }

      if (nodeBox.left < containerBox.left) {
        DOM._setStyle(node, {
          left: containerBox.left
        });
      }
    },

    /**
     * Get the position of the a single element relative to the Window or Document.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    _position: function _position(node, offset) {
      return this.forceShow(node, function (node) {
        var result = {
          x: node.offsetLeft,
          y: node.offsetTop
        };

        if (offset) {
          var offsetParent = node;

          while (offsetParent = offsetParent.offsetParent) {
            result.x += offsetParent.offsetLeft;
            result.y += offsetParent.offsetTop;
          }
        }

        return result;
      });
    },

    /**
     * Get the computed bounding rectangle of a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    _rect: function _rect(node, offset) {
      return this.forceShow(node, function (node) {
        var result = node.getBoundingClientRect();

        if (offset) {
          result.x += DOM._getScrollX(window);
          result.y += DOM._getScrollY(window);
        }

        return result;
      });
    }
  });
  /**
   * DOM Scroll
   */

  Object.assign(DOM.prototype, {
    /**
     * Get the scroll X position of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll X position.
     */
    getScrollX: function getScrollX(nodes) {
      var node = this._nodeFind(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      });

      if (!node) {
        return;
      }

      return DOM._getScrollX(node);
    },

    /**
     * Get the scroll Y position of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll Y position.
     */
    getScrollY: function getScrollY(nodes) {
      var node = this._nodeFind(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      });

      if (!node) {
        return;
      }

      return DOM._getScrollY(node);
    },

    /**
     * Scroll each element to an X,Y position.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    setScroll: function setScroll(nodes, x, y) {
      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return DOM._setScroll(node, x, y);
      });
    },

    /**
     * Scroll each element to an X position.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    setScrollX: function setScrollX(nodes, x) {
      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return DOM._setScrollX(node, x);
      });
    },

    /**
     * Scroll each element to a Y position.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    setScrollY: function setScrollY(nodes, y) {
      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return DOM._setScrollY(node, y);
      });
    }
  });
  /**
   * DOM Size
   */

  Object.assign(DOM.prototype, {
    /**
     * Get the computed height of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    height: function height(nodes) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;

      var node = this._nodeFind(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      });

      if (!node) {
        return;
      }

      return this._height(node, padding, border, margin);
    },

    /**
     * Get the computed width of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    width: function width(nodes) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;

      var node = this._nodeFind(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      });

      if (!node) {
        return;
      }

      return this._width(node, padding, border, margin);
    },

    /**
     * Get the computed height of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    _height: function _height(node) {
      var _this19 = this;

      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;

      if (Core.isWindow(node)) {
        return padding ? node.outerHeight : node.innerHeight;
      }

      if (DOM.isDocument(node)) {
        node = node.documentElement;
      }

      return this.forceShow(node, function (node) {
        var result = node.clientHeight;

        if (!padding) {
          result -= parseInt(_this19._css(node, 'padding-top')) + parseInt(_this19._css(node, 'padding-bottom'));
        }

        if (border) {
          result += parseInt(_this19._css(node, 'border-top-width')) + parseInt(_this19._css(node, 'border-bottom-width'));
        }

        if (margin) {
          result += parseInt(_this19._css(node, 'margin-top')) + parseInt(_this19._css(node, 'margin-bottom'));
        }

        return result;
      });
    },

    /**
     * Get the computed width of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    _width: function _width(node) {
      var _this20 = this;

      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var border = arguments.length > 2 ? arguments[2] : undefined;
      var margin = arguments.length > 3 ? arguments[3] : undefined;

      if (Core.isWindow(node)) {
        return padding ? node.outerWidth : node.innerWidth;
      }

      if (DOM.isDocument(node)) {
        node = node.documentElement;
      }

      return this.forceShow(node, function (node) {
        var result = node.clientWidth;

        if (!padding) {
          result -= parseInt(_this20._css(node, 'padding-left')) + parseInt(_this20._css(node, 'padding-right'));
        }

        if (border) {
          result += parseInt(_this20._css(node, 'border-left-width')) + parseInt(_this20._css(node, 'border-right-width'));
        }

        if (margin) {
          result += parseInt(_this20._css(node, 'margin-left')) + parseInt(_this20._css(node, 'margin-right'));
        }

        return result;
      });
    }
  });
  /**
   * DOM Styles
   */

  Object.assign(DOM.prototype, {
    /**
     * Add classes to each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    addClass: function addClass(nodes) {
      for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        classes[_key - 1] = arguments[_key];
      }

      classes = DOM._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._addClass(node, classes);
      });
    },

    /**
     * Remove classes from each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    removeClass: function removeClass(nodes) {
      for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        classes[_key2 - 1] = arguments[_key2];
      }

      classes = DOM._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._removeClass(node, classes);
      });
    },

    /**
     * Toggle classes for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    toggleClass: function toggleClass(nodes) {
      for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        classes[_key3 - 1] = arguments[_key3];
      }

      classes = DOM._parseClasses(classes);

      if (!classes.length) {
        return;
      }

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._toggleClass(node, classes);
      });
    },

    /**
     * Get a style property for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} style The style name.
     * @returns {string} The style value.
     */
    getStyle: function getStyle(nodes, style) {
      // camelize style property
      style = Core.snakeCase(style);

      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return DOM._getStyle(node, style);
    },

    /**
     * Set style properties for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle: function setStyle(nodes, style, value, important) {
      var styles = DOM._parseData(style, value),
          realStyles = {};

      Object.keys(styles).forEach(function (key) {
        var value = '' + styles[key];
        key = Core.snakeCase(key); // if value is numeric and not a number property, add px

        if (value && Core.isNumeric(value) && !DOM.cssNumberProperties.includes(key)) {
          value = value + 'px';
        }

        realStyles[key] = value;
      });

      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._setStyle(node, realStyles, important);
      });
    },

    /**
     * Get a computed CSS style value for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} style The CSS style name.
     * @returns {string} The CSS style value.
     */
    css: function css(nodes, style) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return this._css(node, style);
    },

    /**
     * Hide each element from display.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    hide: function hide(nodes) {
      this.setStyle(nodes, 'display', 'none');
    },

    /**
     * Display each hidden element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    show: function show(nodes) {
      this.setStyle(nodes, 'display', '');
    },

    /**
     * Toggle the visibility of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    toggle: function toggle(nodes) {
      this._nodeFilter(nodes).forEach(function (node) {
        return DOM._toggle(node);
      });
    },

    /**
     * Get a computed CSS style value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} style The CSS style name.
     * @returns {string} The CSS style value.
     */
    _css: function _css(node, style) {
      if (!this.nodeStyles.has(node)) {
        this.nodeStyles.set(node, window.getComputedStyle(node));
      }

      return this.nodeStyles.get(node).getPropertyValue(style);
    }
  });
  /**
   * DOM Events
   */

  Object.assign(DOM.prototype, {
    /**
     * Trigger a blur event on the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    blur: function blur(nodes) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      DOM._blur(node);
    },

    /**
     * Trigger a click event on the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    click: function click(nodes) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      DOM._click(node);
    },

    /**
     * Trigger a focus event on the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    focus: function focus(nodes) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      DOM._focus(node);
    },

    /**
     * Add a function to the ready queue.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    ready: function ready(callback) {
      if (this.context.readyState === 'complete') {
        return callback();
      }

      this.addEvent(window, 'DOMContentLoaded', callback);
    }
  });
  /**
   * DOM Event Handlers
   */

  Object.assign(DOM.prototype, {
    /**
     * @callback DOM~eventCallback
     * @param {Event} event The event object.
     */

    /**
     * Add an event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    addEvent: function addEvent(nodes, events, callback, delegate, selfDestruct) {
      var _this21 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this21._addEvent(node, events, callback, delegate, selfDestruct);
      });
    },

    /**
     * Add a delegated event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate: function addEventDelegate(nodes, events, delegate, callback) {
      return this.addEvent(nodes, events, callback, delegate);
    },

    /**
     * Add a self-destructing delegated event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce: function addEventDelegateOnce(nodes, events, delegate, callback) {
      return this.addEvent(nodes, events, callback, delegate, true);
    },

    /**
     * Add a self-destructing event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce: function addEventOnce(nodes, events, callback) {
      return this.addEvent(nodes, events, callback, null, true);
    },

    /**
     * Clone all events from each element to other elements.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
     */
    cloneEvents: function cloneEvents(nodes, others) {
      var _this22 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this22._cloneEvents(node, others);
      });
    },

    /**
     * Remove events from each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    removeEvent: function removeEvent(nodes, events, callback, delegate) {
      var _this23 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this23._removeEvent(node, events, callback, delegate);
      });
    },

    /**
     * Remove delegated events from each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate: function removeEventDelegate(nodes, events, delegate, callback) {
      return this.removeEvent(nodes, events, callback, delegate);
    },

    /**
     * Trigger an event on each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     */
    triggerEvent: function triggerEvent(nodes, events, data) {
      var _this24 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).forEach(function (node) {
        return _this24._triggerEvent(node, events, data);
      });
    },

    /**
     * Add an event to a single element.
     * @param {HTMLElement|Document|Window} node The input node.
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

      if (!this.nodeEvents.has(node)) {
        this.nodeEvents.set(node, {});
      }

      var nodeEvents = this.nodeEvents.get(node);
      var eventData = {
        delegate: delegate,
        callback: callback,
        realCallback: realCallback,
        selfDestruct: selfDestruct
      };

      DOM._parseEvents(events).forEach(function (event) {
        var realEvent = DOM._parseEvent(event);

        eventData.event = event;
        eventData.realEvent = realEvent;

        if (!nodeEvents[realEvent]) {
          nodeEvents[realEvent] = [];
        } else if (nodeEvents[realEvent].includes(eventData)) {
          return;
        }

        node.addEventListener(realEvent, realCallback);
        nodeEvents[realEvent].push(eventData);
      });
    },

    /**
     * Clone all events from a single element to other elements.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
     */
    _cloneEvents: function _cloneEvents(node, others) {
      var _this25 = this;

      if (!this.nodeEvents.has(node)) {
        return;
      }

      var nodeEvents = this.nodeEvents.get(node);
      Object.keys(nodeEvents).forEach(function (event) {
        var realEvent = DOM._parseEvent(event);

        nodeEvents[realEvent].forEach(function (eventData) {
          _this25.addEvent(others, eventData.event, eventData.callback, eventData.delegate, eventData.selfDestruct);
        });
      });
    },

    /**
     * Remove events from a single element.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent: function _removeEvent(node, events, callback, delegate) {
      if (!this.nodeEvents.has(node)) {
        return;
      }

      var nodeEvents = this.nodeEvents.get(node);
      var eventArray = events ? DOM._parseEvents(events) : Object.keys(nodeEvents);
      eventArray.forEach(function (event) {
        var realEvent = DOM._parseEvent(event);

        if (!nodeEvents[realEvent]) {
          return;
        }

        nodeEvents[realEvent] = nodeEvents[realEvent].filter(function (eventData) {
          if (realEvent === event && realEvent !== eventData.realEvent || realEvent !== event && event !== eventData.event || delegate && (delegate !== eventData.delegate || callback && callback !== eventData.callback) || !delegate && callback && callback !== eventData.realCallback) {
            return true;
          }

          node.removeEventListener(eventData.realEvent, eventData.realCallback);
          return false;
        });

        if (!nodeEvents[realEvent].length) {
          delete nodeEvents[realEvent];
        }
      });

      if (!Object.keys(nodeEvents).length) {
        this.nodeEvents["delete"](node);
      }
    },

    /**
     * Trigger an event on a single element.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the Event object.
     */
    _triggerEvent: function _triggerEvent(node, events, data) {
      DOM._parseEvents(events).forEach(function (event) {
        var realEvent = DOM._parseEvent(event);

        var eventData = new Event(realEvent);

        if (data) {
          Object.assign(eventData, data);
        }

        node.dispatchEvent(eventData);
      });
    }
  });
  /**
   * DOM Create
   */

  Object.assign(DOM.prototype, {
    /**
     * Create a new DOM element.
     * @param {string} tagName The type of HTML element to create.
     * @param {object} options The options to use for creating the element.
     * @param {string} [options.html] The HTML contents.
     * @param {string} [options.text] The text contents.
     * @param {string|array} [options.class] The classes.
     * @param {object} [options.style] An object containing style properties.
     * @param {string} [options.value] The value.
     * @param {object} [options.attributes] An object containing attributes.
     * @param {object} [options.properties] An object containing properties.
     * @param {object} [options.dataset] An object containing dataset values.
     * @returns {HTMLElement} The new element.
     */
    create: function create(tagName, options) {
      var node = this.context.createElement(tagName);

      if (!options) {
        return node;
      }

      if (options.html) {
        this.setHTML(node, options.html);
      } else if (options.text) {
        this.setText(node, options.text);
      }

      if (options["class"]) {
        this.addClass(node, options["class"]);
      }

      if (options.style) {
        this.setStyle(node, options.style);
      }

      if (options.value) {
        this.setValue(node, options.value);
      }

      if (options.attributes) {
        this.setAttribute(node, options.attributes);
      }

      if (options.properties) {
        this.setProperty(node, options.properties);
      }

      if (options.dataset) {
        this.setDataset(node, options.dataset);
      }

      return node;
    },

    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment: function createComment(comment) {
      return this.context.createComment(comment);
    },

    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText: function createText(text) {
      return this.context.createTextNode(text);
    }
  });
  /**
   * DOM Manipulation
   */

  Object.assign(DOM.prototype, {
    /**
     * Clone each node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node[]} The cloned nodes.
     */
    clone: function clone(nodes) {
      var _this26 = this;

      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cloneEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var cloneData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return this._nodeFilter(nodes, DOM.isNode).map(function (node) {
        return _this26._clone(node, deep, cloneEvents, cloneData);
      });
    },

    /**
     * Detach each node from the DOM.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    detach: function detach(nodes) {
      this._nodeFilter(nodes, DOM.isNode).forEach(function (node) {
        return DOM._detach(node);
      });
    },

    /**
     * Remove all children of each node from the DOM.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    empty: function empty(nodes) {
      var _this27 = this;

      this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      }).forEach(function (node) {
        return _this27._empty(node);
      });
    },

    /**
     * Extract selected nodes from the DOM.
     * @returns {Node[]} The selected nodes.
     */
    extractSelection: function extractSelection() {
      var selection = window.getSelection();

      if (!selection.rangeCount) {
        return [];
      }

      var range = selection.getRangeAt(0);
      selection.removeAllRanges();
      return _toConsumableArray(range.extractContents().childNodes);
    },

    /**
     * Remove each node from the DOM.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    remove: function remove(nodes) {
      var _this28 = this;

      this._nodeFilter(nodes, DOM.isNode).forEach(function (node) {
        return _this28._remove(node);
      });
    },

    /**
     * Replace each other node with nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     */
    replaceAll: function replaceAll(nodes, others) {
      this.replaceWith(others, nodes);
    },

    /**
     * Replace each node with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    replaceWith: function replaceWith(nodes, others) {
      var _this29 = this;

      others = this._parseQuery(others, DOM.isNode);

      this._nodeFilter(nodes, DOM.isNode).forEach(function (node) {
        return _this29._replaceWith(node, others);
      });
    },

    /**
     * Clone a single node.
     * @param {Node} node The input node.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node} The cloned node.
     */
    _clone: function _clone(node, deep, cloneEvents, cloneData) {
      var clone = node.cloneNode(deep);

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
     * @param {Node} node The input node.
     * @param {Node} clone The cloned node.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     */
    _deepClone: function _deepClone(node, clone, cloneEvents, cloneData) {
      var _this30 = this;

      var cloneChildren = DOM._contents(clone);

      DOM._children(node, false, false, false).forEach(function (child, index) {
        if (cloneEvents) {
          _this30._cloneEvents(cloneChildren[index], child);
        }

        if (cloneData) {
          _this30._cloneData(cloneChildren[index], child);
        }

        _this30._cloneDeep(child, cloneChildren[index]);
      });
    },

    /**
     * Remove all children of a single node from the DOM.
     * @param {HTMLElement} node The input node.
     */
    _empty: function _empty(node) {
      var _this31 = this;

      DOM._children(node, false, false, false).forEach(function (child) {
        return _this31._remove(child);
      });
    },

    /**
     * Remove a single node from the DOM.
     * @param {Node} node The input node.
     */
    _remove: function _remove(node) {
      if (DOM.isElement(node)) {
        this._empty(node);
      }

      this._clearQueue(node);

      this._stop(node);

      this._removeEvent(node);

      this._removeData(node);

      if (this.nodeStyles.has(node)) {
        this.nodeStyles["delete"](node);
      }

      DOM._detach(node);

      this._triggerEvent(node, 'remove');
    },

    /**
     * Replace a single node with other nodes.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _replaceWith: function _replaceWith(node, others) {
      DOM._before(node, this.clone(others, true));

      this._remove(node);
    }
  });
  /**
   * DOM Move
   */

  Object.assign(DOM.prototype, {
    /**
     * Insert each other node after the first node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    after: function after(nodes, others) {
      var node = this._nodeFind(nodes, DOM.isNode);

      if (!node) {
        return;
      }

      DOM._after(node, this._parseQuery(others, DOM.isNode));
    },

    /**
     * Insert each node after the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    afterSelection: function afterSelection(nodes) {
      var selection = window.getSelection();

      if (!selection.rangeCount) {
        return;
      }

      nodes = this._parseQuery(nodes);
      var range = selection.getRangeAt(0);
      selection.removeAllRanges();
      range.collapse();
      nodes.forEach(function (node) {
        return range.insertNode(node);
      });
    },

    /**
     * Append each other node to the first node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    append: function append(nodes, others) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      DOM._append(node, this._parseQuery(others, DOM.isNode));
    },

    /**
     * Append each node to the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector string.
     */
    appendTo: function appendTo(nodes, others) {
      this.append(others, nodes);
    },

    /**
     * Insert each other node before the first node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    before: function before(nodes, others) {
      var node = this._nodeFind(nodes, DOM.isNode);

      if (!node) {
        return;
      }

      DOM._before(node, this._parseQuery(others, DOM.isNode));
    },

    /**
     * Insert each node before the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    beforeSelection: function beforeSelection(nodes) {
      var selection = window.getSelection();

      if (!selection.rangeCount) {
        return;
      }

      nodes = this._parseQuery(nodes);
      var range = selection.getRangeAt(0);
      selection.removeAllRanges();
      nodes.forEach(function (node) {
        return range.insertNode(node);
      });
    },

    /**
     * Insert each node after the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     */
    insertAfter: function insertAfter(nodes, others) {
      this.after(others, nodes);
    },

    /**
     * Insert each node before the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     */
    insertBefore: function insertBefore(nodes, others) {
      this.before(others, nodes);
    },

    /**
     * Prepend each other node to the first node.
     * @param {string|HTMLElement|HTMLElement|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    prepend: function prepend(nodes, others) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      DOM._prepend(node, this._parseQuery(others, DOM.isNode));
    },

    /**
     * Prepend each node to the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|HTMLElement|HTMLElement|HTMLElement[]} others The other node(s), or a query selector string.
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
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    unwrap: function unwrap(nodes, filter) {
      var _this32 = this;

      this._nodeFilter(nodes, DOM.isNode).forEach(function (node) {
        return _this32._unwrap(node, filter);
      });
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrap: function wrap(nodes, others) {
      var _this33 = this;

      others = this._parseQuery(others);

      this._nodeFilter(nodes, DOM.isNode).forEach(function (node) {
        return _this33._wrap(node, others);
      });
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrapAll: function wrapAll(nodes, others) {
      others = this._parseQuery(others);
      var clone = this.clone(others, true);

      DOM._before(nodes, clone);

      var first = clone.shift();

      DOM._append(Core.merge([], DOM._findBySelector('*', first)).find(function (node) {
        return !DOM._hasChildren(node);
      }) || first, nodes);
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrapInner: function wrapInner(nodes, others) {
      var _this34 = this;

      others = this._parseQuery(others);

      this._nodeFilter(nodes, DOM.isNode).forEach(function (node) {
        return _this34._wrapInner(node, others);
      });
    },

    /**
     * Wrap selected nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    wrapSelection: function wrapSelection(nodes) {
      var selection = window.getSelection();

      if (!selection.rangeCount) {
        return;
      }

      nodes = this._parseQuery(nodes);
      var range = selection.getRangeAt(0);
      selection.removeAllRanges();
      var first = nodes.slice().shift();

      DOM._append(Core.merge([], DOM._findBySelector('*', first)).find(function (node) {
        return !DOM._hasChildren(node);
      }) || first, Core.merge([], range.extractContents().childNodes));

      nodes.forEach(function (node) {
        return range.insertNode(node);
      });
    },

    /**
     * Unwrap a single node.
     * @param {Node} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    _unwrap: function _unwrap(node, filter) {
      var parent = DOM._parent(node, filter).shift();

      if (!parent) {
        return;
      }

      DOM._before(parent, DOM._children(parent, false, false, false));

      this._remove(parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    _wrap: function _wrap(node, others) {
      var clone = this.clone(others, true);

      DOM._before(node, clone);

      var first = clone.shift();

      DOM._append(Core.merge([], DOM._findBySelector('*', first)).find(function (node) {
        return !DOM._hasChildren(node);
      }) || first, [node]);
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    _wrapInner: function _wrapInner(node, others) {
      var clone = this.clone(others, true);

      var children = DOM._children(node, false, false, false);

      DOM._append(node, clone);

      var first = clone.shift();

      DOM._append(Core.merge([], DOM._findBySelector('*', first)).find(function (node) {
        return !DOM._hasChildren(node);
      }) || first, children);
    }
  });
  /**
   * DOM Filter
   */

  Object.assign(DOM.prototype, {
    /**
     * Return all elements matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    filter: function filter(nodes, _filter) {
      _filter = this._parseFilter(_filter);
      return this._nodeFilter(nodes, function (node, index) {
        return DOM.isElement(node) && (!_filter || _filter(node, index));
      });
    },

    /**
     * Return the first element matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement} The filtered node.
     */
    filterOne: function filterOne(nodes, filter) {
      filter = this._parseFilter(filter);
      return this._nodeFind(nodes, function (node, index) {
        return DOM.isElement(node) && (!filter || filter(node, index));
      }) || null;
    },

    /**
     * Return all elements not matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    not: function not(nodes, filter) {
      filter = this._parseFilter(filter);

      if (!filter) {
        return [];
      }

      return this._nodeFilter(nodes, function (node, index) {
        return DOM.isElement(node) && !filter(node, index);
      });
    },

    /**
     * Return the first element not matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement} The filtered node.
     */
    notOne: function notOne(nodes, filter) {
      filter = this._parseFilter(filter);

      if (!filter) {
        return null;
      }

      return this._nodeFind(nodes, function (node, index) {
        return DOM.isElement(node) && !filter(node, index);
      }) || null;
    },

    /**
     * Return all elements with a descendent matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    has: function has(nodes, filter) {
      filter = this._parseFilterContains(filter);
      return this._nodeFilter(nodes, function (node, index) {
        return (DOM.isElement(node) || DOM.isDocument(node)) && (!filter || filter(node, index));
      });
    },

    /**
     * Return the first element with a descendent matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement} The filtered node.
     */
    hasOne: function hasOne(nodes, filter) {
      filter = this._parseFilterContains(filter);
      return this._nodeFind(nodes, function (node, index) {
        return (DOM.isElement(node) || DOM.isDocument(node)) && (!filter || filter(node, index));
      }) || null;
    },

    /**
     * Return all hidden elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    hidden: function hidden(nodes) {
      var _this35 = this;

      return this._nodeFilter(nodes, function (node) {
        return (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && _this35.isHidden(node);
      });
    },

    /**
     * Return the first hidden element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The filtered node.
     */
    hiddenOne: function hiddenOne(nodes) {
      var _this36 = this;

      return this._nodeFind(nodes, function (node) {
        return (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && _this36.isHidden(node);
      }) || null;
    },

    /**
     * Return all visible elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    visible: function visible(nodes) {
      var _this37 = this;

      return this._nodeFilter(nodes, function (node) {
        return (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && _this37.isVisible(node);
      });
    },

    /**
     * Return the first visible element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The filtered node.
     */
    visibleOne: function visibleOne(nodes) {
      var _this38 = this;

      return this._nodeFind(nodes, function (node) {
        return (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && _this38.isVisible(node);
      }) || null;
    }
  });
  /**
   * DOM Find
   */

  Object.assign(DOM.prototype, {
    /**
     * Return all elements matching a selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    find: function find(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
      // fast selector
      var match = selector.match(DOM.fastRegex);

      if (match) {
        if (match[1] === '#') {
          return this.findById(match[2]);
        }

        if (match[1] === '.') {
          return this.findByClass(match[2], nodes);
        }

        return this.findByTag(match[2], nodes);
      } // custom selector


      if (selector.match(DOM.complexRegex)) {
        return this._findByCustom(selector, nodes);
      } // standard selector


      return this.findBySelector(selector, nodes);
    },

    /**
     * Return a single element matching a selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOne: function findOne(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
      // fast selector
      var match = selector.match(DOM.fastRegex);

      if (match) {
        if (match[1] === '#') {
          return this.findOneById(match[2]);
        }

        if (match[1] === '.') {
          return this.findOneByClass(match[2], nodes);
        }

        return this.findOneByTag(match[2], nodes);
      } // custom selector


      if (selector.match(DOM.complexRegex)) {
        return this._findOneByCustom(selector, nodes);
      } // standard selector


      return this.findOneBySelector(selector, nodes);
    },

    /**
     * Return all elements with a specific class.
     * @param {string} className The class name.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findByClass: function findByClass(className) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // single node case
      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return Core.merge([], DOM._findByClass(className, nodes));
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var results = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          Core.merge(results, DOM._findByClass(className, node));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single element with a specific class.
     * @param {string} className The class name.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByClass: function findOneByClass(className) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // single node case
      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return DOM._findByClass(className, nodes).item(0);
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

          var result = DOM._findByClass(className, node).item(0);

          if (result) {
            return result;
          }
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

      return null;
    },

    /**
     * Return all elements with a specific ID.
     * @param {string} id The id.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findById: function findById(id) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      var result = DOM._findById(id, this.context);

      if (!result || nodes !== this.context && !this.hasOne(nodes, result)) {
        return [];
      }

      return [result];
    },

    /**
     * Return a single element with a specific ID.
     * @param {string} id The id.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching element.
     */
    findOneById: function findOneById(id) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      var result = DOM._findById(id, this.context);

      if (!result || nodes !== this.context && !this.hasOne(nodes, result)) {
        return null;
      }

      return result;
    },

    /**
     * Return all elements with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findByTag: function findByTag(tagName) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // single node case
      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return Core.merge([], DOM._findByTag(tagName, nodes));
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var results = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var node = _step3.value;
          Core.merge(results, DOM._findByTag(tagName, node));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single element with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByTag: function findOneByTag(tagName) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // single node case
      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return DOM._findByTag(tagName, nodes).item(0);
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var node = _step4.value;

          var result = DOM._findByTag(tagName, node).item(0);

          if (result) {
            return result;
          }
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

      return null;
    },

    /**
     * Return all elements matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findBySelector: function findBySelector(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // single node case
      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return Core.merge([], DOM._findBySelector(selector, nodes));
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var results = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var node = _step5.value;
          Core.merge(results, DOM._findBySelector(selector, node));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single element matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneBySelector: function findOneBySelector(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // single node case
      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return DOM._findOneBySelector(selector, nodes);
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var node = _step6.value;

          var result = DOM._findOneBySelector(selector, node);

          if (result) {
            return result;
          }
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

      return null;
    },

    /**
     * Return all elements matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByCustom: function _findByCustom(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // string case
      if (Core.isString(nodes)) {
        return DOM._findBySelector(DOM._prefixSelectors(selector, "".concat(nodes, " ")), this.context);
      }

      var selectors = DOM._prefixSelectors(selector, "#".concat(DOM.tempId, " ")); // single node case


      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return Core.merge([], DOM._findByCustom(selectors, nodes));
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var results = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = nodes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var node = _step7.value;
          Core.merge(results, DOM._findByCustom(selectors, node));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return a single element matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom: function _findOneByCustom(selector) {
      var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      // string case
      if (Core.isString(nodes)) {
        return DOM._findOneBySelector(DOM._prefixSelectors(selector, "".concat(nodes, " ")), this.context);
      }

      var selectors = DOM._prefixSelectors(selector, "#".concat(DOM.tempId, " ")); // single node case


      if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
        return DOM._findOneByCustom(selectors, nodes);
      }

      nodes = this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      });
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = nodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var node = _step8.value;

          var result = DOM._findOneByCustom(selectors, node);

          if (result) {
            return result;
          }
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

      return null;
    }
  });
  /**
   * DOM Traversal
   */

  Object.assign(DOM.prototype, {
    /**
     * Return the first child of each element (optionally matching a filter).
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    child: function child(nodes, filter) {
      return this.children(nodes, filter, true);
    },

    /**
     * Return all children of each element (optionally matching a filter).
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    children: function children(nodes, filter) {
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elementsOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      filter = this._parseFilter(filter);

      if (DOM.isElement(nodes)) {
        return DOM._children(nodes, filter, first, elementsOnly);
      }

      nodes = this._nodeFilter(nodes);
      var results = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = nodes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var node = _step9.value;
          Core.merge(results, DOM._children(node, filter, first, elementsOnly));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the common ancestor of all elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The common ancestor.
     */
    commonAncestor: function commonAncestor(nodes) {
      nodes = this.sortNodes(nodes);

      if (!nodes.length) {
        return;
      }

      var range = this.context.createRange();

      if (nodes.length == 1) {
        range.selectNode(nodes.shift());
      } else {
        range.setStartBefore(nodes.shift());
        range.setEndAfter(nodes.pop());
      }

      return range.commonAncestorContainer;
    },

    /**
     * Return all children of each element (including text and comment nodes).
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Node[]} The matching nodes.
     */
    contents: function contents(nodes) {
      return this.children(nodes, false, false, false);
    },

    /**
     * Return the closest ancestor to each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    closest: function closest(nodes, filter, until) {
      return this.parents(nodes, filter, until, true);
    },

    /**
     * Return the parent of each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    parent: function parent(nodes, filter) {
      filter = this._parseFilter(filter);

      if (DOM.isNode(nodes)) {
        return DOM._parent(nodes, filter);
      }

      nodes = this._nodeFilter(nodes, DOM.isNode);
      var results = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = nodes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var node = _step10.value;
          Core.merge(results, DOM._parent(node, filter));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all parents of each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Array|Node|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Array|Node|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    parents: function parents(nodes, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this._parseFilter(filter);
      limit = this._parseFilter(limit);

      if (DOM.isNode(nodes)) {
        return DOM._parent(nodes, filter, limit, first);
      }

      nodes = this._nodeFilter(nodes, DOM.isNode);
      var results = [];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = nodes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var node = _step11.value;
          Core.merge(results, DOM._parents(node, filter, limit, first));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the offset parent (relatively positioned) of the first element.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The offset parent.
     */
    offsetParent: function offsetParent(nodes) {
      return this.forceShow(nodes, function (node) {
        return node.offsetParent;
      });
    },

    /**
     * Return the next sibling for each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node[]} The matching nodes.
     */
    next: function next(nodes, filter) {
      filter = this._parseFilter(filter);

      if (DOM.isElement(nodes)) {
        return DOM._next(nodes, filter);
      }

      nodes = this._nodeFilter(nodes);
      var results = [];
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = nodes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var node = _step12.value;
          Core.merge(results, DOM._next(node, filter));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all next siblings for each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    nextAll: function nextAll(nodes, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this._parseFilter(filter);
      limit = this._parseFilter(limit);

      if (DOM.isElement(nodes)) {
        return DOM._nextAll(nodes, filter, limit, first);
      }

      nodes = this._nodeFilter(nodes);
      var results = [];
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = nodes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var node = _step13.value;
          Core.merge(results, DOM._nextAll(node, filter, limit, first));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return the previous sibling for each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node[]} The matching nodes.
     */
    prev: function prev(nodes, filter) {
      filter = this._parseFilter(filter);

      if (DOM.isElement(nodes)) {
        return DOM._prev(nodes, filter);
      }

      nodes = this._nodeFilter(nodes);
      var results = [];
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = nodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var node = _step14.value;
          Core.merge(results, DOM._prev(node, filter));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    },

    /**
     * Return all previous siblings for each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    prevAll: function prevAll(nodes, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      filter = this._parseFilter(filter);
      limit = this._parseFilter(limit);

      if (DOM.isElement(nodes)) {
        return DOM._prevAll(nodes, filter, limit, first);
      }

      nodes = this._nodeFilter(nodes);
      var results = [];
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = nodes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var node = _step15.value;
          Core.merge(results, DOM._prevAll(node, filter, limit, first));
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

      return nodes.length > 1 && results.length ? Core.unique(results) : results;
    },

    /**
     * Return all siblings for each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    siblings: function siblings(nodes, filter) {
      var elementsOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      filter = this._parseFilter(filter);

      if (DOM.isElement(nodes)) {
        return DOM._siblings(nodes, filter, elementsOnly);
      }

      nodes = this._nodeFilter(nodes);
      var results = [];
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = nodes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var node = _step16.value;
          Core.merge(results, DOM._siblings(node, filter, elementsOnlyt));
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

      return nodes.length > 1 && results.length > 1 ? Core.unique(results) : results;
    }
  });
  /**
   * DOM Selection
   */

  Object.assign(DOM.prototype, {
    /**
     * Return all selected nodes.
     * @returns {Node[]} The selected nodes.
     */
    getSelection: function getSelection() {
      var selection = window.getSelection();

      if (!selection.rangeCount) {
        return [];
      }

      var range = selection.getRangeAt(0);
      var nodes = Core.merge([], DOM._findBySelector('*', range.commonAncestorContainer));

      if (!nodes.length) {
        return [range.commonAncestorContainer];
      }

      if (nodes.length === 1) {
        return nodes;
      }

      var start = DOM.isElement(range.startContainer) ? range.startContainer : DOM._parent(range.startContainer).shift();
      var end = DOM.isElement(range.endContainer) ? range.endContainer : DOM._parent(range.endContainer).shift();
      return nodes.slice(nodes.indexOf(start), nodes.indexOf(end) + 1);
    },

    /**
     * Create a selection on the first node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    select: function select(nodes) {
      var node = this._nodeFind(nodes, DOM.isNode);

      if (node && node.select) {
        return node.select();
      }

      var selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      if (!node) {
        return;
      }

      var range = this.context.createRange();
      range.selectNode(node);
      selection.addRange(range);
    },

    /**
     * Create a selection containing all of the nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    selectAll: function selectAll(nodes) {
      var selection = window.getSelection();

      if (selection.rangeCount) {
        selection.removeAllRanges();
      }

      nodes = this.sortNodes(nodes);

      if (!nodes.length) {
        return;
      }

      var range = this.context.createRange();

      if (nodes.length == 1) {
        range.selectNode(nodes.shift());
      } else {
        range.setStartBefore(nodes.shift());
        range.setEndAfter(nodes.pop());
      }

      selection.addRange(range);
    }
  });
  /**
   * DOM Tests
   */

  Object.assign(DOM.prototype, {
    /**
     * Returns true if any of the elements has a CSS animation.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasAnimation: function hasAnimation(nodes) {
      var _this39 = this;

      return this._nodeFilter(nodes).some(function (node) {
        return !!parseFloat(_this39._css(node, 'animation-duration'));
      });
    },

    /**
     * Returns true if any of the elements has a specified attribute.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    hasAttribute: function hasAttribute(nodes, attribute) {
      return this._nodeFilter(nodes).some(function (node) {
        return node.hasAttribute(attribute);
      });
    },

    /**
     * Returns true if any of the elements has any of the specified classes.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    hasClass: function hasClass(nodes) {
      for (var _len4 = arguments.length, classes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        classes[_key4 - 1] = arguments[_key4];
      }

      classes = DOM._parseClasses(classes);
      return this._nodeFilter(nodes).some(function (node) {
        return classes.find(function (className) {
          return node.classList.contains(className);
        });
      });
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|Node|NodeList|HTMLCollection|Window|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData: function hasData(nodes, key) {
      var _this40 = this;

      return this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).some(function (node) {
        return _this40.nodeData.has(node) && (!key || _this40.nodeData.get(node).hasOwnProperty(key));
      });
    },

    /**
     * Returns true if any of the elements has a specified property.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    hasProperty: function hasProperty(nodes, property) {
      return this._nodeFilter(nodes).some(function (node) {
        return node.hasOwnProperty(property);
      });
    },

    /**
     * Returns true if any of the elements has a CSS transition.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasTransition: function hasTransition(nodes) {
      var _this41 = this;

      return this._nodeFilter(nodes).some(function (node) {
        return !!parseFloat(_this41._css(node, 'transition-duration'));
      });
    },

    /**
     * Returns true if any of the elements contains a descendent matching a filter.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    contains: function contains(nodes, filter) {
      filter = this._parseFilterContains(filter);
      return this._nodeFilter(nodes, function (node) {
        return DOM.isElement(node) || DOM.isDocument(node);
      }).some(function (node) {
        return !filter || filter(node);
      });
    },

    /**
     * Returns true if any of the elements matches a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    is: function is(nodes, filter) {
      filter = this._parseFilter(filter);
      return this._nodeFilter(nodes).some(function (node) {
        return !filter || filter(node);
      });
    },

    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    isConnected: function isConnected(nodes) {
      return this._nodeFilter(nodes, DOM.isNode).some(function (node) {
        return DOM._isConnected(node);
      });
    },

    /**
     * Returns true if any of the elements or a parent of any of the elements is "fixed".
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    isFixed: function isFixed(nodes) {
      var _this42 = this;

      return this._nodeFilter(nodes).some(function (node) {
        return _this42._css(node, 'position') === 'fixed' || _this42._parents(node, function (parent) {
          return _this42._css(parent, 'position') === 'fixed';
        }, false, true).length;
      });
    },

    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|Node|NodeList|HTMLCollection|Document|Window|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    isHidden: function isHidden(nodes) {
      return this._nodeFilter(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
      }).some(function (node) {
        return !DOM._isVisible(node);
      });
    },

    /**
     * Returns true if any of the nodes is visible.
     * @param {string|Node|NodeList|HTMLCollection|Document|Window|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    isVisible: function isVisible(nodes) {
      return this._nodeFilter(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
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
     * @callback DOM~nodeCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * Force an element to be shown, and then execute a callback.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    forceShow: function forceShow(nodes, callback) {
      var _this43 = this;

      var node = this._nodeFind(nodes, function (node) {
        return DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node);
      });

      if (!node) {
        return;
      }

      if (this.isVisible(node)) {
        return callback(node);
      }

      var elements = [];
      var styles = [];

      if (this._css(node, 'display') === 'none') {
        elements.push(node);
        styles.push(DOM._getAttribute(node, 'style'));
      }

      this._parents(node, function (parent) {
        return _this43._css(parent, 'display') === 'none';
      }).forEach(function (parent) {
        elements.push(parent);
        styles.push(DOM._getAttribute(parent, 'style'));
      });

      DOM._setStyle(elements, {
        display: 'initial'
      }, true);

      var result = callback(node);
      elements.forEach(function (node, index) {
        return styles[index] ? DOM._setStyle(node, {
          display: styles[index]
        }) : DOM._removeAttribute(node, 'style');
      });
      return result;
    },

    /**
     * Get the index of the first element matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    index: function index(nodes, filter) {
      filter = this._parseFilter(filter);
      return this._nodeFilter(nodes).findIndex(function (node) {
        return !filter || filter(node);
      });
    },

    /**
     * Get the index of the first element relative to it's parent element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {number} The index.
     */
    indexOf: function indexOf(nodes) {
      var node = this._nodeFind(nodes);

      if (!node) {
        return;
      }

      return this.children(this.parent(node)).indexOf(node);
    },

    /**
     * Return a serialized string containing names and values of all form elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize: function serialize(nodes) {
      return DOM._parseParams(this.serializeArray(nodes));
    },

    /**
     * Return a serialized array containing names and values of all form elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Array} The serialized array.
     */
    serializeArray: function serializeArray(nodes) {
      var _this44 = this;

      return this._nodeFilter(nodes).reduce(function (values, node) {
        if (DOM._is(node, 'form')) {
          return values.concat(_this44.serializeArray(DOM._findBySelector('input, select, textarea', node)));
        }

        if (DOM._is(node, '[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
          return values;
        }

        var name = DOM._getAttribute(node, 'name');

        if (!name) {
          return values;
        }

        var value = DOM._getAttribute(node, 'value') || '';
        values.push({
          name: name,
          value: value
        });
        return values;
      }, []);
    }
  });
  /**
   * DOM (Static) Attributes
   */

  Object.assign(DOM, {
    /**
     * Get an attribute value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    _getAttribute: function _getAttribute(node, attribute) {
      return node.getAttribute(attribute);
    },

    /**
     * Get a dataset value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} [key] The dataset key.
     * @returns {string|object} The dataset value.
     */
    _getDataset: function _getDataset(node, key) {
      if (!key) {
        return node.dataset;
      }

      return node.dataset[key];
    },

    /**
     * Get a property value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    _getProperty: function _getProperty(node, property) {
      return node[property];
    },

    /**
     * Remove an attribute from a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     */
    _removeAttribute: function _removeAttribute(node, attribute) {
      node.removeAttribute(attribute);
    },

    /**
     * Remove a property from a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     */
    _removeProperty: function _removeProperty(node, property) {
      delete node[property];
    },

    /**
     * Set an attribute value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute: function _setAttribute(node, attributes) {
      for (var key in attributes) {
        node.setAttribute(key, attributes[key]);
      }
    },

    /**
     * Set a dataset value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} dataset An object containing dataset values.
     */
    _setDataset: function _setDataset(node, dataset) {
      Object.assign(node.dataset, dataset);
    },

    /**
     * Set a property value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} properties An object containing properties.
     */
    _setProperty: function _setProperty(node, properties) {
      Object.assign(node, properties);
    }
  });
  /**
   * DOM (Static) Scroll
   */

  Object.assign(DOM, {
    /**
     * Get the scroll X position of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollX: function _getScrollX(node) {
      if (Core.isWindow(node)) {
        return node.scrollX;
      }

      if (this.isDocument(node)) {
        return node.scrollingElement.scrollLeft;
      }

      return node.scrollLeft;
    },

    /**
     * Get the scroll Y position of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollY: function _getScrollY(node) {
      if (Core.isWindow(node)) {
        return node.scrollY;
      }

      if (this.isDocument(node)) {
        return node.scrollingElement.scrollTop;
      }

      return node.scrollTop;
    },

    /**
     * Scroll a single element to an X,Y position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScroll: function _setScroll(node, x, y) {
      if (Core.isWindow(node)) {
        return node.scroll(x, y);
      }

      if (this.isDocument(node)) {
        node.scrollingElement.scrollLeft = x;
        node.scrollingElement.scrollTop = y;
        return;
      }

      node.scrollLeft = x;
      node.scrollTop = y;
    },

    /**
     * Scroll a single element to an X position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollX: function _setScrollX(node, x) {
      if (Core.isWindow(node)) {
        return node.scroll(x, node.scrollY);
      }

      if (this.isDocument(node)) {
        node.scrollingElement.scrollLeft = x;
        return;
      }

      node.scrollLeft = x;
    },

    /**
     * Scroll a single element to a Y position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollY: function _setScrollY(node, y) {
      if (Core.isWindow(node)) {
        return node.scroll(node.scrollX, y);
      }

      if (this.isDocument(node)) {
        node.scrollingElement.scrollTop = y;
        return;
      }

      node.scrollTop = y;
    }
  });
  /**
   * DOM (Static) Styles
   */

  Object.assign(DOM, {
    /**
     * Add classes to a single element.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _addClass: function _addClass(node, classes) {
      var _node$classList;

      (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(classes));
    },

    /**
     * Remove classes from a single element.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _removeClass: function _removeClass(node, classes) {
      var _node$classList2;

      (_node$classList2 = node.classList).remove.apply(_node$classList2, _toConsumableArray(classes));
    },

    /**
     * Toggle classes for a single element.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _toggleClass: function _toggleClass(node, classes) {
      var _node$classList3;

      (_node$classList3 = node.classList).toggle.apply(_node$classList3, _toConsumableArray(classes));
    },

    /**
     * Get a style property for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} style The style name.
     * @returns {string} The style value.
     */
    _getStyle: function _getStyle(node, style) {
      return node.style[style];
    },

    /**
     * Set style properties for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    _setStyle: function _setStyle(node, styles) {
      var important = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      for (var style in styles) {
        node.style.setProperty(style, styles[style], important ? 'important' : '');
      }
    },

    /**
     * Toggle the visibility of a single element.
     * @param {HTMLElement} node The input node.
     */
    _toggle: function _toggle(node) {
      this._getStyle(node, 'display') === 'none' ? this._setStyle(node, {
        display: ''
      }) : this._setStyle(node, {
        display: 'none'
      });
    }
  });
  /**
   * DOM (Static) Events
   */

  Object.assign(DOM, {
    /**
     * Trigger a blur event on a single element.
     * @param {HTMLElement} node The input node.
     */
    _blur: function _blur(node) {
      node.blur();
    },

    /**
     * Trigger a click event on a single element.
     * @param {HTMLElement} node The input node.
     */
    _click: function _click(node) {
      node.click();
    },

    /**
     * Trigger a focus event on a single element.
     * @param {HTMLElement} node The input node.
     */
    _focus: function _focus(node) {
      node.focus();
    }
  });
  /**
   * DOM (Static) Manipulation
   */

  Object.assign(DOM, {
    /**
     * Detach a single node from the DOM.
     * @param {Node} node The input node.
     */
    _detach: function _detach(node) {
      if (!node.parentNode) {
        return;
      }

      node.parentNode.removeChild(node);
    }
  });
  /**
   * DOM (Static) Move
   */

  Object.assign(DOM, {
    /**
     * Insert each other node after the first node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _after: function _after(node, others) {
      if (!node.parentNode) {
        return;
      }

      others.reverse().forEach(function (other) {
        return node.parentNode.insertBefore(other, node.nextSibling);
      });
    },

    /**
     * Append each other node to a single node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _append: function _append(node, others) {
      others.forEach(function (other) {
        return node.insertBefore(other, null);
      });
    },

    /**
     * Insert each other node before a single node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _before: function _before(node, others) {
      if (!node.parentNode) {
        return;
      }

      others.forEach(function (other) {
        return node.parentNode.insertBefore(other, node);
      });
    },

    /**
     * Prepend each other node to a single node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _prepend: function _prepend(node, others) {
      others.reverse().forEach(function (other) {
        return node.insertBefore(other, node.firstChild);
      });
    }
  });
  /**
   * DOM (Static) Nodes
   */

  Object.assign(DOM, {
    /**
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    isDocument: function isDocument(node) {
      return Core.isObject(node) && 'nodeType' in node && node.nodeType === Node.DOCUMENT_NODE;
    },

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    isElement: function isElement(node) {
      return Core.isObject(node) && 'nodeType' in node && node.nodeType === Node.ELEMENT_NODE;
    },

    /**
     * Returns true if the value is a Node.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
     */
    isNode: function isNode(node) {
      return Core.isObject(node) && 'nodeType' in node && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE);
    },
    _compareNodes: function _compareNodes(a, b) {
      if (DOM._isSame(a, b)) {
        return 0;
      }

      var pos = a.compareDocumentPosition(b);

      if (pos & Node.DOCUMENT_POSITION_FOLLOWING || pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
      }

      if (pos & Node.DOCUMENT_POSITION_PRECEDING || pos & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
      }

      return 0;
    },

    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    _has: function _has(node, other) {
      return node.contains(other);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    _hasChildren: function _hasChildren(node) {
      return !!node.childElementCount;
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    _is: function _is(node, selector) {
      return node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    _isConnected: function _isConnected(node) {
      return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    _isEqual: function _isEqual(node, other) {
      return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    _isSame: function _isSame(node, other) {
      return node.isSameNode(other);
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    _isVisible: function _isVisible(node) {
      if (Core.isWindow(node)) {
        return dom.context.visibilityState === 'visible';
      }

      if (DOM.isDocument(node)) {
        return node.visibilityState === 'visible';
      }

      return !!node.offsetParent;
    },

    /**
     * Normalize a single node (remove empty Text nodes, and join neighbouring Text nodes).
     * @param {HTMLElement} node The input node.
     */
    _normalize: function _normalize(node) {
      node.normalize();
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
     * Return all elements with a specific class.
     * @param {string} className The class name.
     * @param {HTMLElement|Document} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByClass: function _findByClass(className, node) {
      return node.getElementsByClassName(className);
    },

    /**
     * Return a single elements with a specific ID.
     * @param {string} id The id.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findById: function _findById(id, node) {
      return node.getElementById(id);
    },

    /**
     * Return all elements with a specific tag.
     * @param {string} tagName The tag name.
     * @param {HTMLElement|Document} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByTag: function _findByTag(tagName, node) {
      return node.getElementsByTagName(tagName);
    },

    /**
     * Return all elements matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|Document} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findBySelector: function _findBySelector(selector, node) {
      return node.querySelectorAll(selector);
    },

    /**
     * Return a single element matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector: function _findOneBySelector(selector, node) {
      return node.querySelector(selector);
    },

    /**
     * Return all elements matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByCustom: function _findByCustom(selector, node) {
      var nodeId = this._getAttribute(node, 'id');

      this._setAttribute(node, {
        id: this.tempId
      });

      var results = this._findBySelector(selector, node);

      if (nodeId) {
        this._setAttribute(node, {
          id: nodeId
        });
      } else {
        this._removeAttribute(node, 'id');
      }

      return results;
    },

    /**
     * Return a single element matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom: function _findOneByCustom(selector, node) {
      var nodeId = this._getAttribute(node, 'id');

      this._setAttribute(node, {
        id: this.tempId
      });

      var result = this._findOneBySelector(selector, node);

      if (nodeId) {
        this._setAttribute(node, {
          id: nodeId
        });
      } else {
        this._removeAttribute(node, 'id');
      }

      return result;
    }
  });
  /**
   * DOM Traversal
   */

  Object.assign(DOM, {
    /**
     * Return all children of a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    _children: function _children(node, filter) {
      var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elementsOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var children = elementsOnly ? node.children : node.childNodes,
          results = [];
      var child;
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = children[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          child = _step17.value;

          if (filter && !filter(child)) {
            continue;
          }

          results.push(child);

          if (first) {
            break;
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

      return results;
    },

    /**
     * Return the parent of a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _parent: function _parent(node, filter) {
      var results = [];

      if (!node.parentNode) {
        return results;
      }

      if (filter && !filter(node.parentNode)) {
        return results;
      }

      results.push(node.parentNode);
      return results;
    },

    /**
     * Return all parents of a single element (optionally matching a filter, and before a limit).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _parents: function _parents(node, filter, limit) {
      var closest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var results = [];

      while (node = node.parentNode) {
        if (limit && limit(node)) {
          break;
        }

        if (filter && !filter(node)) {
          continue;
        }

        results.push(node);

        if (closest) {
          break;
        }
      }

      return results;
    },

    /**
     * Return the next sibling for a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {Node[]} The matching nodes.
     */
    _next: function _next(node, filter) {
      var results = [];

      while (node = node.nextSibling) {
        if (this.isElement(node)) {
          break;
        }
      }

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
     * Return all next siblings for a single element (optionally matching a filter, and before a limit).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    _nextAll: function _nextAll(node, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var results = [];

      while (node = node.nextSibling) {
        if (!this.isElement(node)) {
          continue;
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
     * Return the previous sibling for a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {Node[]} The matching nodes.
     */
    _prev: function _prev(node, filter) {
      var results = [];

      while (node = node.previousSibling) {
        if (this.isElement(node)) {
          break;
        }
      }

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
     * Return all previous siblings for a single element (optionally matching a filter, and before a limit).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    _prevAll: function _prevAll(node, filter, limit) {
      var first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var results = [];

      while (node = node.previousSibling) {
        if (!this.isElement(node)) {
          continue;
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
     * Return all siblings for a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    _siblings: function _siblings(node, filter) {
      var elementsOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var results = [];

      if (!node.parentNode) {
        return results;
      }

      var siblings = elementsOnly ? node.parentNode.children : node.parentNode.childNodes;
      var sibling;
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = siblings[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          sibling = _step18.value;

          if (DOM._isSame(node, sibling)) {
            continue;
          }

          if (filter && !filter(sibling)) {
            continue;
          }

          results.push(sibling);
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

      return results;
    }
  });
  /**
   * DOM (Static) Utility
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

      if (Array.isArray(data)) {
        var obj = {};
        data.forEach(function (value) {
          return obj[value.name] = value.value;
        });
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
        } else if (!Array.isArray(value)) {
          formData.set(key, value);
        } else {
          value.forEach(function (val) {
            return formData.append(key, val);
          });
        }
      }
    },

    /**
     * Return a URI-encoded attribute string from an array or object.
     * @param {array|object} data The input data.
     * @returns {string} The URI-encoded attribute string.
     */
    _parseParams: function _parseParams(data) {
      var _this45 = this;

      var values = [];

      if (Array.isArray(data)) {
        values = data.map(function (value) {
          return _this45._parseParam(value.name, value.value);
        });
      } else if (Core.isObject(data)) {
        values = Object.keys(data).map(function (key) {
          return _this45._parseParam(key, data[key]);
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
      var _this46 = this;

      if (Array.isArray(value)) {
        return value.map(function (val) {
          return _this46._parseParam(key, val);
        }).flat();
      }

      if (Core.isObject(value)) {
        return Object.keys(value).map(function (subKey) {
          return _this46._parseParam(key + '[' + subKey + ']', value[subKey]);
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
      }).join(', ');
    }
  });
  /**
   * DOM AJAX
   */

  Object.assign(DOM.prototype, {
    /**
     * Perform an XHR request.
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
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
    ajax: function ajax(options) {
      var settings = _objectSpread({
        url: window.location,
        headers: {}
      }, DOM.ajaxDefaults, options);

      if (!settings.cache) {
        var url = new URL(settings.url);
        url.searchParams.append('_', Date.now());
        settings.url = url.toString();
      }

      if (settings.contentType && !settings.headers['Content-Type']) {
        settings.headers['Content-Type'] = settings.contentType;
      }

      if (!settings.headers['X-Requested-With']) {
        settings.headers['X-Requested-With'] = 'XMLHttpRequest';
      }

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(settings.method, settings.url, true);
        Object.keys(settings.headers).forEach(function (key) {
          return xhr.setRequestHeader(key, settings.headers[key]);
        });

        if (settings.responseType) {
          xhr.responseType = settings.responseType;
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

        xhr.onerror = function (e) {
          return reject({
            status: xhr.status,
            xhr: xhr,
            event: e
          });
        };

        if (settings.uploadProgress) {
          xhr.upload.onprogress = function (e) {
            return settings.uploadProgress(e.loaded / e.total, xhr, e);
          };
        }

        if (settings.beforeSend) {
          settings.beforeSend(xhr);
        }

        if (settings.data && settings.processData) {
          if (settings.contentType === 'application/json') {
            settings.data = JSON.stringify(settings.data);
          } else if (settings.contentType === 'application/x-www-form-urlencoded') {
            settings.data = DOM._parseParams(settings.data);
          } else {
            options.data = DOM._parseFormData(options.data);
          }
        }

        xhr.send(settings.data);
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
     * @param {Boolean|string|array|object} data The data to send with the request.
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
     * @param {object} [options] The options to use for the request.
     * @param {string} [options.url=window.location] The URL of the request.
     * @param {string} [options.method=POST] The HTTP method of the request.
     * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
     * @param {Boolean|string} [options.contentType=false] The content type of the request.
     * @param {Boolean|string} [options.responseType] The content type of the response.
     * @param {Boolean} [options.cache=true] Whether to cache the request.
     * @param {Boolean} [options.processData=false] Whether to process the data based on the content type.
     * @param {object} [options.headers] Additional headers to send with the request.
     * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
     * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    upload: function upload(options) {
      return this.ajax(_objectSpread({
        method: 'POST',
        contentType: false
      }, options));
    },

    /**
     * Load and executes a JavaScript file.
     * @param {string} script The URL of the script.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScript: function loadScript(script) {
      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.ajax(script, {
        cache: cache
      }).then(function (response) {
        return eval.apply(window, response.response);
      });
    },

    /**
     * Load and executes multiple JavaScript files (in order).
     * @param {string[]} scripts An array of script URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadScripts: function loadScripts(scripts) {
      var _this47 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return Promise.all(scripts.map(function (script) {
        return _this47.ajax(script, {
          cache: cache
        });
      })).then(function (responses) {
        return responses.forEach(function (response) {
          return eval.apply(window, response.response);
        });
      });
    },

    /**
     * Import a CSS Stylesheet file.
     * @param {string} stylesheet The URL of the stylesheet.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyle: function loadStyle(stylesheet) {
      var _this48 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.ajax(stylesheet, {
        cache: cache
      }).then(function (response) {
        return _this48.append(_this48.findOne('head'), _this48.create('style', {
          text: response.response
        }));
      });
    },

    /**
     * Import multiple CSS Stylesheet files.
     * @param {string[]} stylesheets An array of stylesheet URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyles: function loadStyles(stylesheets) {
      var _this49 = this;

      var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return Promise.all(stylesheets.map(function (stylesheet) {
        return _this49.ajax(stylesheet, {
          cache: cache
        });
      })).then(function (responses) {
        return _this49.append(_this49.findOne('head'), _this49.create('style', {
          text: responses.map(function (response) {
            return response.response;
          }).join("\r\n")
        }));
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
      var cookie = decodeURIComponent(this.context.cookie).split(';').find(function (cookie) {
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

      this.context.cookie = cookie;
    }
  });
  /**
   * DOM Event Factory
   */

  Object.assign(DOM.prototype, {
    /** 
     * Return a wrapped mouse drag event (optionally limited by animation frame).
     * @param {function} down The callback to execute on mousedown.
     * @param {function} move The callback to execute on mousemove.
     * @param {function} up The callback to execute on mouseup.
     * @param {Boolean} [animated=true] Whether to limit the move event by animation frame.
     * @returns {DOM~eventCallback} The mouse drag event callback.
     */
    mouseDragFactory: function mouseDragFactory(down, move, up) {
      var _this50 = this;

      var animated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (move && animated) {
        move = Core.animationFactory(move); // needed to make sure up callback executes after final move callback

        if (up) {
          up = Core.animationFactory(up);
        }
      }

      return function (e) {
        if (down && down(e) === false) {
          return false;
        }

        if (move) {
          _this50._addEvent(window, 'mousemove', move);
        }

        if (move || up) {
          _this50._addEventOnce(window, 'mouseup', function (e) {
            if (move) {
              _this50._removeEvent(window, 'mousemove', move);
            }

            if (up) {
              up(e);
            }
          });
        }
      };
    },

    /**
     * Return a wrapped event callback that executes on a delegate selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The delegate query selector.
     * @param {function} callback The event callback.
     * @returns {DOM~eventCallback} The delegated event callback.
     */
    _delegateFactory: function _delegateFactory(node, selector, callback) {
      var getDelegate = selector.match(DOM.complexRegex) ? this._getDelegateContainsFactory(node, selector) : this._getDelegateMatchFactory(node, selector);
      return function (e) {
        if (DOM._isSame(e.target, node)) {
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
     * Return a function for matching a delegate target to a complex selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {function} The callback for finding the matching delegate.
     */
    _getDelegateContainsFactory: function _getDelegateContainsFactory(node, selector) {
      selector = DOM._prefixSelectors(selectors, "#".concat(DOM._tempId));
      return function (target) {
        var matches = Core.merge([], DOM._findByCustom(selector, node));

        if (!matches.length) {
          return false;
        }

        if (matches.includes(target)) {
          return target;
        }

        return DOM._parents(target, function (parent) {
          return matches.contains(parent);
        }, function (parent) {
          return DOM._isSame(node, parent);
        }, true).shift();
      };
    },

    /**
     * Return a function for matching a delegate target to a standard selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {function} The callback for finding the matching delegate.
     */
    _getDelegateMatchFactory: function _getDelegateMatchFactory(node, selector) {
      return function (target) {
        return DOM._is(target, selector) ? target : DOM._parents(target, function (parent) {
          return DOM._is(parent, selector);
        }, function (parent) {
          return DOM._isSame(node, parent);
        }, true).shift();
      };
    },

    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    _selfDestructFactory: function _selfDestructFactory(node, events, delegate, callback) {
      var _this51 = this;

      var realCallback = function realCallback(e) {
        delegate ? _this51._removeEvent(node, events, callback, delegate) : _this51._removeEvent(node, events, realCallback);
        return callback(e);
      };

      return realCallback;
    }
  });
  /**
   * DOM Filters
   */

  Object.assign(DOM.prototype, {
    /**
     * Return an element filter callback.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The element filter callback.
     */
    _parseFilter: function _parseFilter(filter) {
      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return DOM.isElement(node) && DOM._is(node, filter);
        };
      }

      if (DOM.isNode(filter)) {
        return function (node) {
          return DOM._isSame(node, filter);
        };
      }

      filter = this._nodeFilter(filter);

      if (filter.length) {
        return function (node) {
          return filter.includes(node);
        };
      }

      return false;
    },

    /**
     * Return an element contains filter callback.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The element contains filter callback.
     */
    _parseFilterContains: function _parseFilterContains(filter) {
      var _this52 = this;

      if (!filter) {
        return false;
      }

      if (Core.isFunction(filter)) {
        return filter;
      }

      if (Core.isString(filter)) {
        return function (node) {
          return !!_this52.findOne(filter, node);
        };
      }

      if (DOM.isElement(filter)) {
        return function (node) {
          return DOM._has(node, filter);
        };
      }

      filter = this._nodeFilter(filter);

      if (filter.length) {
        return function (node) {
          return !!filter.find(function (other) {
            return DOM._has(node, other);
          });
        };
      }

      return false;
    }
  });
  /**
   * DOM Nodes
   */

  Object.assign(DOM.prototype, {
    /**
     * Sorts nodes by their position in the document
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Node[]} The sorted array of nodes.
     */
    sortNodes: function sortNodes(nodes) {
      return this._nodeFilter(nodes, DOM.isNode).sort(DOM._compareNodes);
    },

    /**
     * Return a filtered array of nodes.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
     * @returns {Node[]} The filtered array of nodes.
     */
    _nodeFilter: function _nodeFilter(nodes) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DOM.isElement;

      if (Core.isString(nodes)) {
        return this.find(nodes).filter(filter);
      }

      if (filter(nodes)) {
        return [nodes];
      }

      return Core.wrap(nodes).filter(filter);
    },

    /**
     * Return the first node matching a filter.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
     * @returns {Node} The matching node.
     */
    _nodeFind: function _nodeFind(nodes) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DOM.isElement;

      if (Core.isString(nodes)) {
        var _node = this.findOne(nodes);

        if (filter(_node)) {
          return _node;
        }

        return null;
      }

      var node = Core.wrap(nodes).shift();

      if (filter(node)) {
        return node;
      }

      return null;
    },

    /**
     * Return a filtered array of nodes from a query.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
     * @returns {Node[]} The filtered array of nodes.
     */
    _parseQuery: function _parseQuery() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DOM.isElement;

      if (Core.isString(query) && query.trim().charAt(0) === '<') {
        return this.parseHTML(query);
      }

      return this._nodeFilter(query, filter);
    }
  });
  /**
   * DOM Parsers
   */

  Object.assign(DOM.prototype, {
    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {array} An array of nodes.
     */
    parseHTML: function parseHTML(html) {
      return Core.merge([], this.context.createRange().createContextualFragment(html).childNodes);
    }
  });
  /**
   * DOM (Static) Properties
   */

  Object.assign(DOM, {
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
    // Comma seperated selector RegEx
    splitRegex: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,
    // Temporary ID
    tempId: 'frost' + Date.now().toString(16)
  });
  return {
    DOM: DOM,
    dom: new DOM()
  };
});