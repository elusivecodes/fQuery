# fQuery

**fQuery** is a free, open-source DOM manipulation library for *JavaScript*.

It is a lightweight (~16kb gzipped) and modern library, utilizing ES6 syntax and features including Promises.


## Table Of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
     - [Core Methods](#core-methods)
- [Ajax](#ajax)
- [Animation](#animation)
    - [Animations](#animations)
- [Attributes](#attributes)
    - [Custom Data](#custom-data)
    - [Position](#position)
    - [Scroll](#scroll)
    - [Size](#size)
    - [Styles](#styles)
- [Cookie](#cookie)
- [Events](#events)
    - [Event Handlers](#event-handlers)
    - [Event Factory](#event-factory)
- [Manipulation](#manipulation)
    - [Create](#create)
    - [Move](#move)
    - [Wrap](#wrap)
- [Parsing](#parsing)
- [Queue](#queue)
- [Scripts](#scripts)
- [Stylesheets](#stylesheets)
- [Traversal](#traversal)
    - [Filter](#filter)
    - [Find](#find)
- [Utility](#utility)
    - [Sanitize](#sanitize)
    - [Selection](#selection)
    - [Tests](#tests)



## Installation

**In Browser**

```html
<script type="text/javascript" src="/path/to/fquery.min.js"></script>
```

**Using NPM**

```
npm i @fr0st/query
```

In Node.js:

```javascript
import { JSDOM } from 'jsdom';
import registerGlobals from '@fr0st/query';

const window = new JSDOM('');
const $ = registerGlobals(window);
```


## Basic Usage

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, *QuerySet*, an array of nodes or a function to execute when the DOM is ready.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *HTMLCollection*, *QuerySet* or an array of nodes, and will default to the *Document* context of the `dom`.

```javascript
const query = $(selector, context);
```

This method returns a [*QuerySet*](docs/QuerySet.md).

**Query One**

You can also query for a single node using the `queryOne` method.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, *QuerySet*, or an array of nodes.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *HTMLCollection*, *QuerySet* or an array of nodes, and will default to the *Document* context of the `dom`.

```javascript
const query = $.queryOne(selector, context);
```

This method returns a [*QuerySet*](docs/QuerySet.md).

**No Conflict**

Reset the global `$` variable.

```javascript
$.noConflict();
```

You can continue to use this library by using the global `fQuery` variable.

### Core Methods

This library also includes all functions from the [*FrostCore*](https://github.com/elusivecodes/FrostCore) library, accessible from the `$` global variable (with an underscore prefix).

```javascript
const random = $._random();
```


## Ajax

**Ajax**

Perform an XHR request.

- `options` is an object containing options for the request.
    - `url` is a string containing the URL for the request, and will default to the current window location.
    - `method` is a string containing the method to use for the request, and will default to "*GET*".
    - `data` can be an object, array, string or *FormData* containing data to send with the request, and will default to *null*.
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `mimeType` is a string containing the MIME type to use for the server response.
    - `username` is a string containing the username to authenticate with.
    - `password` is a string containing the password to authenticate with.
    - `timeout` is a number indicating the number of milliseconds before the request will be terminated, and will default to *0*.
    - `isLocal` is a boolean indicating whether the request will be treated as local.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns an [*AjaxRequest*](docs/AjaxRequest.md) that resolves when the request is completed, or rejects on failure.

```javascript
const request = $.ajax(options);
```

**Delete**

Perform an XHR DELETE request.

- `url` is a string containing the URL for the request.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*DELETE*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `mimeType` is a string containing the MIME type to use for the server response.
    - `username` is a string containing the username to authenticate with.
    - `password` is a string containing the password to authenticate with.
    - `timeout` is a number indicating the number of milliseconds before the request will be terminated, and will default to *0*.
    - `isLocal` is a boolean indicating whether the request will be treated as local.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns an [*AjaxRequest*](docs/AjaxRequest.md) that resolves when the request is completed, or rejects on failure.

```javascript
const request = $.delete(url, options);
```

**Get**

Perform an XHR GET request.

- `url` is a string containing the URL for the request.
- `data` can be an object, array, string containing data to send with the request, and will default to *null*.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*GET*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `mimeType` is a string containing the MIME type to use for the server response.
    - `username` is a string containing the username to authenticate with.
    - `password` is a string containing the password to authenticate with.
    - `timeout` is a number indicating the number of milliseconds before the request will be terminated, and will default to *0*.
    - `isLocal` is a boolean indicating whether the request will be treated as local.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns an [*AjaxRequest*](docs/AjaxRequest.md) that resolves when the request is completed, or rejects on failure.

```javascript
const request = $.get(url, data, options);
```

**Patch**

Perform an XHR PATCH request.

- `url` is a string containing the URL for the request.
- `data` can be an object, array, string or *FormData* containing data to send with the request, and will default to *null*.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*PATCH*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `mimeType` is a string containing the MIME type to use for the server response.
    - `username` is a string containing the username to authenticate with.
    - `password` is a string containing the password to authenticate with.
    - `timeout` is a number indicating the number of milliseconds before the request will be terminated, and will default to *0*.
    - `isLocal` is a boolean indicating whether the request will be treated as local.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns an [*AjaxRequest*](docs/AjaxRequest.md) that resolves when the request is completed, or rejects on failure.

```javascript
const request = $.patch(url, data, options);
```

**Post**

Perform an XHR POST request.

- `url` is a string containing the URL for the request.
- `data` can be an object, array, string or *FormData* containing data to send with the request, and will default to *null*.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*POST*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `mimeType` is a string containing the MIME type to use for the server response.
    - `username` is a string containing the username to authenticate with.
    - `password` is a string containing the password to authenticate with.
    - `timeout` is a number indicating the number of milliseconds before the request will be terminated, and will default to *0*.
    - `isLocal` is a boolean indicating whether the request will be treated as local.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns an [*AjaxRequest*](docs/AjaxRequest.md) that resolves when the request is completed, or rejects on failure.

```javascript
const request = $.post(url, data, options);
```

**Put**

Perform an XHR PUT request.

- `url` is a string containing the URL for the request.
- `data` can be an object, array, string or *FormData* containing data to send with the request, and will default to *null*.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*PUT*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `mimeType` is a string containing the MIME type to use for the server response.
    - `username` is a string containing the username to authenticate with.
    - `password` is a string containing the password to authenticate with.
    - `timeout` is a number indicating the number of milliseconds before the request will be terminated, and will default to *0*.
    - `isLocal` is a boolean indicating whether the request will be treated as local.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `rejectOnCancel` is a boolean indicating whether to reject the promise if the request is cancelled, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `afterSend` is a function that accepts an `xhr` argument, and will be called after the request is sent.
    - `beforeSend` is a function that accepts an `xhr` argument, and will be called before the request is sent.
    - `onProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR download progress.
    - `onUploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns an [*AjaxRequest*](docs/AjaxRequest.md) that resolves when the request is completed, or rejects on failure.

```javascript
const request = $.put(url, data, options);
```


## Animation

**Animate**

Add an animation to each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `callback` is a function that accepts `node`, `progress` and `options` as arguments, where `node` is a *HTMLElement*, `progress` is a value between *0* and *1* and `options` is the `options` object passed to this method.
- `options` is an object containing options for how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.animate(selector, callback, options);
```

**Stop Animations**

Stop all animations for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animations should be stopped.
    - `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
$.stop(selector, options);
```

### Animations

**Drop In**

Drop each node into place.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of node.
- `options` is an object containing options for how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.dropIn(selector, options);
```

**Drop Out**

Drop each node out of place.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.dropOut(selector, options);
```

**Fade In**

Fade the opacity of each node in.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.fadeIn(selector, options);
```

**Fade Out**

Fade the opacity of each node out.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.fadeOut(selector, options);
```

**Rotate In**

Rotate each node in on an X, Y or Z.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `z` is the amount of rotation to apply to the Z axis, and will default to *0*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.rotateIn(selector, options);
```

**Rotate Out**

Rotate each node out on an X, Y or Z.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `z` is the amount of rotation to apply to the Z axis, and will default to *0*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.rotateOut(selector, options);
```

**Slide In**

Slide each node into place to a direction.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to slide from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.slideIn(selector, options);
```

**Slide Out**

Slide each node out of place from a direction.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to slide from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.slideOut(selector, options);
```

**Squeeze In**

Squeeze each node into place to a direction.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to squeeze from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.squeezeIn(selector, options);
```

**Squeeze Out**

Squeeze each node out of place from a direction.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to squeeze from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

This method returns an [*AnimationSet*](docs/Animation.md) that will resolve after the animation has completed.

```javascript
const animation = $.squeezeOut(selector, options);
```


## Attributes

**Get Attribute**

Get an attribute value for the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `attribute` is a string indicating the attribute value to return.

```javascript
const value = $.getAttribute(selector, attribute);
```

If the `attribute` argument is omitted, an object containing all attribute values will be returned instead.

```javascript
const attributes = $.getAttribute(selector);
```

**Get Dataset**

Get a dataset value for the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the dataset value to return.

```javascript
const value = $.getDataset(selector, key);
```

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```javascript
const dataset = $.getDataset(selector);
```

This method will attempt to convert string values to JS primitives (including booleans, numbers, objects, arrays and null).

**Get HTML**

Get the HTML contents of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const html = $.getHTML(selector);
```

**Get Property**

Get a property value for the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `property` is a string indicating the property value to return.

```javascript
const value = $.getProperty(selector, property);
```

**Get Text**

Get the text contents of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const text = $.getText(selector);
```

**Get Value**

Get the value property of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const value = $.getValue(selector);
```

**Remove Attribute**

Remove an attribute from each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `attribute` is a string indicating the attribute value to remove.

```javascript
$.removeAttribute(selector, attribute);
```

**Remove Dataset**

Remove a dataset value from each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the dataset value to remove.

```javascript
$.removeDataset(selector, key);
```

**Remove Property**

Remove a property from each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `property` is a string indicating the property value to remove.

```javascript
$.removeProperty(selector, property);
```

**Set Attribute**

Set attributes for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `attribute` is a string indicating the attribute value to set.
- `value` is the value you want to set the attribute to.

```javascript
$.setAttribute(selector, attribute, value);
```

Alternatively, you can set multiple attributes by passing a single `attributes` object as the argument with key/value pairs of the attributes to set.

```javascript
$.setAttribute(selector, attributes);
```

**Set Dataset**

Set dataset values for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the dataset value to set.
- `value` is the value you want to set the dataset to.

```javascript
$.setDataset(selector, key, value);
```

Alternatively, you can set multiple dataset properties by passing a single `dataset` object as the argument with key/value pairs of the properties to set.

```javascript
$.setDataset(selector, dataset);
```

This method will convert object and array values to JSON strings.

**Set HTML**

Set the HTML contents for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of node.
- `html` is a string that will become the HTML contents of the node.

```javascript
$.setHTML(selector, html);
```

**Set Property**

Set property values for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `property` is a string indicating the property value to set.
- `value` is the value you want to set the property to.

```javascript
$.setProperty(selector, property, value);
```

Alternatively, you can set multiple properties by passing a single `properties` object as the argument with key/value pairs of the properties to set.

```javascript
$.setProperty(selector, properties);
```

**Set Text**

Set the text contents for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `text` is a string that will become the text contents of the node.

```javascript
$.setText(selector, text);
```

**Set Value**

Set the value property for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `value` is a string that will become the value of the node.

```javascript
$.setValue(selector, value);
```

### Custom Data

**Clone Data**

Clone custom data from each node to each other node.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.cloneData(selector, otherSelector);
```

**Get Data**

Get custom data for the first node.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the custom data value to return.

```javascript
const value = $.getData(selector, key);
```

If the `key` argument is omitted, an object containing all custom data values will be returned instead.

```javascript
const data = $.getData(selector);
```

**Remove Data**

Remove custom data for each node.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the custom data value to remove.

```javascript
$.removeData(selector, key);
```

**Set Data**

Set custom data for each node.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the custom data value to set.
- `value` is the value you want to set the attribute to.

```javascript
$.setData(selector, key, value);
```

Alternatively, you can set multiple data values by passing a single `data` object as the argument with key/value pairs of the data to set.

```javascript
$.setData(selector, data);
```

### Position

**Center**

Get the X,Y co-ordinates for the center of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the position should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const center = $.center(selector, options);
```

**Constrain**

Constrain each node to a container node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `containerSelector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.constrain(selector, containerSelector);
```

**Distance To**

Get the distance of the first node to an X,Y position.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `options` is an object containing options for how the distance should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const dist = $.distTo(selector, x, y, options);
```

**Distance To Node**

Get the distance between two nodes.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const dist = $.distToNode(selector, otherSelector);
```

**Nearest To**

Get the nearest node to an X,Y position.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `options` is an object containing options for how the distance should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const nearest = $.nearestTo(selector, x, y, options);
```

**Nearest To Node**

Get the nearest node to another node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const nearest = $.nearestToNode(selector, otherSelector);
```

**Percent X**

Get the percentage of an X co-ordinate relative to the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `x` is a distance (in pixels) along the X axis.
- `options` is an object containing options for how the percent should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.
    - `clamp` is a boolean indicating whether to clamp the percent betwen *0* and *100*, and will default to *true*.

```javascript
const percentX = $.percentX(selector, x, options);
```

**Percent Y**

Get the percentage of a Y co-ordinate relative to the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `y` is a distance (in pixels) along the Y axis.
- `options` is an object containing options for how the percent should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.
    - `clamp` is a boolean indicating whether to clamp the percent betwen *0* and *100*, and will default to *true*.

```javascript
const percentY = $.percentY(selector, y, options);
```

**Position**

Get the X,Y position for the top/left of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the position should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const position = $.position(selector, options);
```

**Rectangle**

Get the computed bounding rectangle of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the bounding rectangle should be calculated.
    - `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```javascript
const rect = $.rect(selector, options);
```

### Scroll

**Get Scroll X**

Get the scroll X position of the first node.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const scrollX = $.getScrollX(selector);
```

**Get Scroll Y**

Get the scroll Y position of the first node.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const scrollY = $.getScrollY(selector);
```

**Set Scroll**

Scroll each node to an X,Y position.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
$.setScroll(selector, x, y);
```

**Set Scroll X**

Scroll each node to an X position.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `x` is a distance (in pixels) along the X axis to scroll to.

```javascript
$.setScrollX(selector, x);
```

**Set Scroll Y**

Scroll each node to a Y position.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
$.setScrollY(selector, y);
```

### Size

**Height**

Get the computed height of the first node.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the height should be calculated.
    - `boxSize` is a number indicating the box sizing to calculate. Allowed values are *0* (no padding), *1* (padding), *2* (padding and border), *3* (padding, border and margin) and *4* (scroll area), and will default to *1*.
    - `outer` is a boolean indicating whether to use the window outer height, and will default to *false*.

```javascript
const height = $.height(selector, options);
```

The following constants can also be used as the `boxSize` for brevity.
- `$.CONTENT_BOX`
- `$.PADDING_BOX`
- `$.BORDER_BOX`
- `$.MARGIN_BOX`
- `$.SCROLL_BOX`

**Width**

Get the computed width of the first node.

- `selector` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the height should be calculated.
    - `boxSize` is a number indicating the box sizing to calculate. Allowed values are *0* (no padding), *1* (padding), *2* (padding and border), *3* (padding, border and margin) and *4* (scroll area), and will default to *1*.
    - `outer` is a boolean indicating whether to use the window outer width, and will default to *false*.

```javascript
const width = $.width(selector, options);
```

The following constants can also be used as the `boxSize` for brevity.
- `$.CONTENT_BOX`
- `$.PADDING_BOX`
- `$.BORDER_BOX`
- `$.MARGIN_BOX`
- `$.SCROLL_BOX`

### Styles

**Add Class**

Add a class or classes to each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
$.addClass(selector, ...classes);
```

**Computed Style**

Get a computed CSS style value for the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `style` is a string indicating the computed style property value to return.

```javascript
const value = $.css(selector, style);
```

If the `style` argument is omitted, an object containing all computed style values will be returned instead.

```javascript
const css = $.css(selector);
```

**Get Style**

Get a style property for the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `style` is a string indicating the style property value to return.

```javascript
const value = $.getStyle(selector, style);
```

If the `style` argument is omitted, an object containing all style values will be returned instead.

```javascript
const styles = $.getStyle(selector);
```

**Hide**

Hide each node from display.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.hide(selector);
```

**Remove Class**

Remove a class or classes from each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
$.removeClass(selector, ...classes);
```

**Remove Style**

Remove a style property from each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `style` is a string indicating the style property to remove.

```javascript
$.removeStyle(selector, style);
```

**Set Style**

Set style properties for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `style` is a string indicating the style property value to set.
- `value` is the value you wish to set the style property to.
- `options` is an object containing options for how the style should be applied.
    - `important` is a boolean indicating the style should be set as important, and will default to *false*.

```javascript
$.setStyle(selector, style, value, options);
```

Alternatively, you can set multiple style properties by passing a single `styles` object as the argument with key/value pairs of the styles to set.

```javascript
$.setStyle(selector, styles);
```

**Show**

Display each hidden node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.show(selector);
```

**Toggle**

Toggle the visibility of each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.toggle(selector);
```

**Toggle Class**

Toggle a class or classes for each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
$.toggleClass(selector, ...classes);
```


## Cookie

**Get Cookie**

Get a cookie value.

- `name` is a string containing the name of the cookie value to retrieve.

```javascript
const value = $.getCookie(name);
```

**Remove Cookie**

Remove a cookie.

- `name` is a string containing the name of the cookie value to remove.
- `options` is an object containing configuration options for the cookie.
    - `expires` is a number indicating the number of seconds until the cookie will expire, and will default to *-1*.
    - `path` is a string indicating the path to use for the cookie.
    - `secure` is a boolean indicating whether only set the cookie for secure requests, and will default to *false*.

```javascript
$.removeCookie(name, options);
```

**Set Cookie**

Set a cookie value.

- `name` is a string containing the name of the cookie value to set.
- `value` is the value you wish to set the cookie to.
- `options` is an object containing configuration options for the cookie.
    - `expires` is a number indicating the number of seconds until the cookie will expire.
    - `path` is a string indicating the path to use for the cookie.
    - `secure` is a boolean indicating whether only set the cookie for secure requests, and will default to *false*.

```javascript
$.setCookie(name, value, options);
```


## Events

**Blur**

Trigger a blur event on the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.blur(selector);
```

**Click**

Trigger a click event on the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.click(selector);
```

**Focus**

Trigger a focus event on the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.focus(selector);
```

**Ready**

Add a function to the ready queue.

- `callback` is a function that will execute once the DOM has finished loading.

If the DOM is already loaded, `callback` will execute immediately.

```javascript
$.ready(callback);
```

### Event Handlers

**Add Event**

Add events to each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
$.addEvent(selector, events, callback, options);
```

**Add Event Delegate**

Add delegated events to each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
$.addEventDelegate(selector, events, delegate, callback, options);
```

**Add Event Delegate Once**

Add self-destructing delegated events to each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
$.addEventDelegateOnce(selector, events, delegate, callback, options);
```

**Add Event Once**

Add self-destructing events to each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
$.addEventOnce(selector, events, callback, options);
```

**Clone Events**

Clone all events from each node to other nodes.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.cloneEvents(selector, otherSelector);
```

**Remove Event**

Remove events from each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to remove from the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be removed.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *null*.

```javascript
$.removeEvent(selector, events, callback, options);
```

If the `events`, `callback` or `capture` arguments are omitted, this method will remove all matching events from each node.

**Remove Event Delegate**

Remove delegated events from each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to remove from the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be removed.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *null*.

```javascript
$.removeEventDelegate(selector, events, delegate, callback, options);
```

**Trigger Event**

Trigger events on each node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `events` is a space-separated string of events to trigger on the nodes.
- `options` is an object containing options for creating the new event.
    - `data` can be used to attach additional data to the event.
    - `detail` can be used to attach additional details to the event.
    - `bubbles` is a boolean indicating whether the event should bubble, and will default to *true*.
    - `cancelable` is a boolean indicating whether the event is cancelable, and will default to *true*.

```javascript
$.triggerEvent(selector, events, options);
```

**Trigger One**

Trigger an event on the first node.

- `selector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `event` is an event to trigger on the nodes.
- `options` is an object containing options for creating the new event.
    - `data` can be used to attach additional data to the event.
    - `detail` can be used to attach additional details to the event.
    - `bubbles` is a boolean indicating whether the event should bubble, and will default to *true*.
    - `cancelable` is a boolean indicating whether the event is cancelable, and will default to *true*.

```javascript
const cancelled = !$.triggerOne(selector, event, options);
```

This method returns *false* if the event was cancelled, otherwise returns *true*.

### Event Factory

**Mouse Drag Event Factory**

Create a mouse drag event (optionally limited by animation frame).

- `down` is a function that accepts an *event* argument, which will be called when the event is started.
- `move` is a function that accepts an *event* argument, which will be called when the mouse is moved during the event.
- `up` is a function that accepts an *event* argument, which will be called when the event has ended (mouse button has been released).
- `options` is an object containing configuration options for the drag event.
    - `debounce` is a boolean indicating whether to debounce the move event, and will default to *true*.
    - `passive` is a boolean indicating whether to use passive event listeners, and will default to *true*.
    - `preventDefault` is a boolean indicating whether to prevent the default events, and will default to *true*.
    - `touches` is a number indicating the number of touches to trigger the event for, and will default to *1*.

```javascript
const drag = $.mouseDragFactory(down, move, up, options);
```

This method also works with touch events.


## Manipulation

**Clone**

Clone each node (optionally deep, and with events and data).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how to clone the nodes.
    - `deep` is a boolean indicating whether to also clone child nodes, and will default to *true*.
    - `events` is a boolean indicating whether to also clone events, and will default to *false*.
    - `data` is a boolean indicating whether to also clone data, and will default to *false*.
    - `animations` is a boolean indicating whether to also clone animations, and will default to *false*.

```javascript
const clones = $.clone(selector, options);
```

**Detach**

Detach each node from the DOM.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const detached = $.detach(selector);
```

**Empty**

Remove all children of each node from the DOM.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.empty(selector);
```

**Remove**

Remove each node from the DOM.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.remove(selector);
```

**Replace All**

Replace each other node with nodes.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement* *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.replaceAll(selector, otherSelector);
```

If a node you are replacing with is a *DocumentFragment*, the fragment contents will be used as a replacement.

If multiple nodes are being replaced, cloned nodes will be created for each except for the last one.

All events, data and animations will be removed from each node that is replaced.

**Replace With**

Replace each node with other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.replaceWith(selector, otherSelector);
```

If a node you are replacing with is a *DocumentFragment*, the fragment contents will be used as a replacement.

If multiple nodes are being replaced, cloned nodes will be created for each except for the last one.

All events, data and animations will be removed from each node that is replaced.

### Create

**Attach Shadow**

Attach a shadow DOM tree to the first node.

- `selector` is a query selector string, a*HTMLElement*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the shadow should be attached.
    - `open` is a boolean indicating whether the nodes are accessible from JavaScript outside the root, and will default to *true*.

```javascript
const shadow = $.attachShadow(selector, options);
```

**Create**

Create a new DOM element.

- `tagName` is a string indicating the type of element you wish to create, and will default to "*div*".
- `options` is an object containing options for creating the new node.
    - `html` is a string that will become the HTML contents of the node.
    - `text` is a string that will become the text contents of the node.
    - `class` is an array of classes, or a space seperated string of class names.
    - `style` is an object containing style values to set.
    - `value` is a string that will become the value of the node.
    - `attributes` is an object containing attribute values to set.
    - `properties` is an object containing property values to set.
    - `dataset` is an object containing dataset values to set.

```javascript
const element = $.create(tagName, options);
```

**Create Comment**

Create a new comment node.

- `comment` is a string indicating the comment.

```javascript
const commentNode = $.createComment(comment);
```

**Create Fragment**

Create a new document fragment.

```javascript
const fragment = $.createFragment();
```

**Create Range**

Create a new range object.

```javascript
const range = $.createRange();
```

**Create Text**

Create a new text node.

- `text` is a string indicating the text.

```javascript
const textNode = $.createText(text);
```

### Move

**After**

Insert each other node after each node.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.after(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Append**

Append each other node to each node.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.append(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Append To**

Append each node to each other node.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.appendTo(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Before**

Insert each other node before each node.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.before(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Insert After**

Insert each node after each other node.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.insertAfter(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Insert Before**

Insert each node before each other node.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.insertBefore(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Prepend**

Prepend each other node to each node.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.prepend(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Prepend To**

Prepend each node to each other node.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.prependTo(selector, otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

### Wrap

**Unwrap**

Unwrap each node.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that must match the parent of each node for it to be unwrapped.

```javascript
$.unwrap(selector, nodeFilter);
```

**Wrap**

Wrap each node with other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.wrap(selector, otherSelector);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.

**Wrap All**

Wrap all nodes with other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.wrapAll(selector, otherSelector);
```

**Wrap Inner**

Wrap the contents of each node with other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.wrapInner(selector, otherSelector);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.


## Parsing

**Parse Document**

Create a *Document* object from a string.

- `input` is the input string.
- `options` is an object containing options for how to parse the string.
    - `contentType` is a string representing the content type, and will default to "*text/html*".

```javascript
const doc = $.parseDocument(input, options);
```

**Parse HTML**

Return an array containing nodes parsed from a HTML string.

- `html` is a string containing the HTML data to parse.

```javascript
const nodes = $.parseHTML(html);
```


## Queue

**Clear Queue**

Clear a queue of each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how the queue should be cleared.
    - `queueName` is a string indicating the name of the queue to clear, and will default to "*null*".

```javascript
$.clearQueue(selector, options);
```

If the `queueName` is set to *null*, then all queues will be cleared.

**Queue**

Queue a callback on each node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `callback` is a function that accepts `node` as an argument, where node is a *HTMLElement*. The callback can return a *Promise* which will pause the queue until the promise is resolved.
- `options` is an object containing options for how the queue should be added.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".

```javascript
$.queue(selector, callback, options);
```

If an item in the queue returns a *Promise* that rejects, the queue will be cleared.


## Scripts

**Load Script**

Load and execute a JavaScript file.

- `script` is a string containing the URL for the script to load.
- `attributes` is an object containing additional attributes on the `script` tag.
- `options` is an object containing options for how the script should be loaded.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.

This method returns a *Promise* that resolves when the script is loaded, or rejects on failure.

```javascript
const promise = $.loadScript(script, attributes, options);
```

**Load Scripts**

Load and execute multiple JavaScript files (in order).

- `scripts` is a array of strings containing the URLs for the scripts to load, or an array of script attribute objects.
- `options` is an object containing options for how the scripts should be loaded.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.

This method returns a *Promise* that resolves when the scripts are loaded, or rejects on failure.

```javascript
const promise = $.loadScripts(scripts, options);
```


## Stylesheets

**Load Stylesheet**

Import A CSS Stylesheet file.

- `stylesheet` is a string containing the URL for the stylesheet to load.
- `attributes` is an object containing additional attributes on the `link` tag.
- `options` is an object containing options for how the stylesheet should be loaded.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.

This method returns a *Promise* that resolves when the stylesheet is loaded, or rejects on failure.

```javascript
const promise = $.loadStyle(stylesheet, attributes, options);
```

**Load Stylesheets**

Import multiple CSS Stylesheet files.

- `stylesheets` is a array of strings containing the URLs for the stylesheets to load, or an array of link attribute objects.
- `options` is an object containing options for how the stylesheets should be loaded.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.

This method returns a *Promise* that resolves when the stylesheets are loaded, or rejects on failure.

```javascript
const promise = $.loadStyles(stylesheets, options);
```


## Traversal

**Child**

Find the first child of each node (optionally matching a filter).

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const child = $.child(selector, nodeFilter);
```

**Children**

Find all children of each node (optionally matching a filter).

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const children = $.children(selector, nodeFilter);
```

**Closest**

Find the closest ancestor to each node (optionally matching a filter, and before a limit).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that when matched will stop the search, and will default to *false*.

```javascript
const closest = $.closest(selector, nodeFilter, limitFilter);
```

**Common Ancestor**

Find the common ancestor of all nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const commonAncestor = $.commonAncestor(selector);
```

**Contents**

Find all children of each node (including text and comment nodes).

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const contents = $.contents(selector);
```

**Fragment**

Return the *DocumentFragment* of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const fragment = $.fragment(selector);
```

**Next**

Find the next sibling for each node (optionally matching a filter).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const next = $.next(selector, nodeFilter);
```

**Next All**

Find all next siblings for each node (optionally matching a filter, and before a limit).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that when matched will stop the search, and will default to *false*.
- `options` is an object containing options for how the siblings should be traversed.
    - `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const nextAll = $.nextAll(selector, nodeFilter, limitFilter, options);
```

**Offset Parent**

Find the offset parent (relatively positioned) of the first node.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const offsetParent = $.offsetParent(selector);
```

**Parent**

Find the parent of each node (optionally matching a filter).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const parent = $.parent(selector, nodeFilter);
```

**Parents**

Find all parents of each node (optionally matching a filter, and before a limit).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that when matched will stop the search, and will default to *false*.
- `options` is an object containing options for how the parents should be traversed.
    - `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const parents = $.parents(selector, nodeFilter, limitFilter, options);
```

**Previous**

Find the previous sibling for each node (optionally matching a filter).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const prev = $.prev(selector, nodeFilter);
```

**Previous All**

Find all previous siblings for each node (optionally matching a filter, and before a limit).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that when matched will stop the search, and will default to *false*.
- `options` is an object containing options for how the siblings should be traversed.
    - `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const prevAll = $.prevAll(selector, nodeFilter, limitFilter, options);
```

**Shadow**

Return the *ShadowRoot* of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const shadow = $.shadow(selector);
```

**Siblings**

Find all siblings for each node (optionally matching a filter).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `options` is an object containing options for how the siblings should be traversed.
-    `elementsOnly` is a boolean indicating whether to only return elements, and will default to *true*.

```javascript
const siblings = $.siblings(selector, nodeFilter, options);
```

### Filter

**Connected**

Return all nodes connected to the DOM.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const connected = $.connected(selector);
```

**Equal**

Return all nodes considered equal to any of the other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const equal = $.equal(selector, otherSelector);
```

**Filter**

Return all nodes matching a filter.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = $.filter(selector, nodeFilter);
```

**Filter One**

Return the first node matching a filter.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by.

```javascript
const filteredOne = $.filterOne(selector, nodeFilter);
```

**Fixed**

Return all "fixed" nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const fixed = $.fixed(selector);
```

**Hidden**

Return all hidden nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hidden = $.hidden(selector);
```

**Not**

Return all nodes not matching a filter.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by.

```javascript
const not = $.not(selector, nodeFilter);
```

**Not One**

Return the first node not matching a filter.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by.

```javascript
const notOne = $.notOne(selector, nodeFilter);
```

**Same**

Return all nodes considered identical to any of the other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const same = $.same(selector, otherSelector);
```

**Visible**

Return all visible nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const visible = $.visible(selector);
```

**With Animation**

Return all nodes with an animation.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const withAnimation = $.withAnimation(selector);
```

**With Attribute**

Return all nodes with a specified attribute.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `attribute` is a string indicating the attribute value to test for.

```javascript
const withAttribute = $.withAttribute(selector, attribute);
```

**With Children**

Return all nodes with child elements.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const withChildren = $.withChildren(selector);
```

**With Class**

Return all nodes with any of the specified classes.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const withClass = $.withClass(selector, classes);
```

**With CSS Animation**

Return all nodes with a CSS animation.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const withCSSAnimation = $.withCSSAnimation(selector);
```

**With CSS Transition**

Return all nodes with a CSS transition.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const withCSSTransition = $.withCSSTransition(selector);
```

**With Data**

Return all nodes with custom data.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the custom data value to test for.

```javascript
const withData = $.withData(selector, key);
```

If the `key` argument is omitted, this method will return all nodes with any custom data.

```javascript
const withData = $.withData(selector);
```

**With Descendent**

Return all nodes with a descendent matching a filter.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be filtered by.

```javascript
const withDescendent = $.withDescendent(selector, nodeFilter);
```

**With Property**

Return all nodes with a specified property.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `property` is a string indicating the property value to test for.

```javascript
const withProperty = $.withProperty(selector, property);
```

### Find

**Find**

Find all nodes matching a selector.

- `selector` is a query selector string to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = $.find(selector, context);
```

**Find By Class**

Find all nodes with a specific class.

- `className` is a string indicating the class name to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = $.findByClass(className, context);
```

**Find By ID**

Find all nodes with a specific ID.

- `id` is a string indicating the id to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = $.findById(id, context);
```

**Find By Tag**

Find all nodes with a specific tag.

- `tagName` is a string indicating the tag name to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = $.findByTag(tagName, context);
```

**Find One**

Find the first node matching a selector.

- `selector` is a query selector string to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const element = $.findOne(selector, context);
```

**Find One By Class**

Find the first node with a specific class.

- `className` is a string indicating the class name to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const element = $.findOneByClass(className, context);
```

**Find One By ID**

Find the first node with a specific ID.

- `id` is a string indicating the id to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const element = $.findOneById(id, context);
```

**Find One By Tag**

Find the first node with a specific tag.

- `tagName` is a string indicating the tag name to search for.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes, and will default to the *Document* context.

```javascript
const element = $.findOneByTag(tagName, context);
```


## Utility

**Index**

Get the index of the first node relative to it's parent node.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const index = $.index(selector);
```

**Index Of**

Get the index of the first node matching a filter.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be tested for.

```javascript
const indexOf = $.indexOf(selector, nodeFilter);
```

**Normalize**

Normalize nodes (remove empty text nodes, and join adjacent text nodes).

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md)  or an array of nodes.

```javascript
$.normalize(selector);
```

**Serialize**

Return a serialized string containing names and values of all form nodes.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const serialized = $.serialize(selector);
```

**Serialize Array**

Return a serialized array containing names and values of all form nodes.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const serializedArray = $.serializeArray(selector);
```

**Sort**

Sort nodes by their position in the document

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const sorted = $.sort(selector);
```

**Tag Name**

Return the tag name (lowercase) of the first node.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const tagName = $.tagName(selector);
```

### Sanitize

Sanitize a HTML string.

- `html` is the HTML string.
- `allowedTags` is an object containing allowed tags and attributes.

```javascript
const sanitized = $.sanitize(html, allowedTags);
```

### Selection

**After Selection**

Insert each node after the selection.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.afterSelection(selector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Before Selection**

Insert each node before the selection.

- `selector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.beforeSelection(selector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Extract Selection**

Extract selected nodes from the DOM.

```javascript
const extracted = $.extractSelection();
```

**Get Selection**

Return all selected nodes.

```javascript
const selected = $.getSelection();
```

**Select**

Create a selection on the first node.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.select(selector);
```

**Select All**

Create a selection on all nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.selectAll(selector);
```

**Wrap Selection**

Wrap selected nodes with other nodes.

- `selector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
$.wrapSelection(selector);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.

### Tests

**Has Animation**

Returns *true* if any of the nodes has an animation.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hasAnimation = $.hasAnimation(selector);
```

**Has Attribute**

Returns *true* if any of the nodes has a specified attribute.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `attribute` is a string indicating the attribute value to test for.

```javascript
const hasAttribute = $.hasAttribute(selector, attribute);
```

**Has Children**

Returns *true* if any of the nodes has child nodes.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hasChildren = $.hasChildren(selector);
```

**Has Class**

Returns *true* if any of the nodes has any of the specified classes.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const hasClass = $.hasClass(selector, ...classes);
```

**Has CSS Animation**

Returns *true* if any of the nodes has a CSS animation.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hasCSSAnimation = $.hasCSSAnimation(selector);
```

**Has CSS Transition**

Returns *true* if any of the nodes has a CSS transition.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hasCSSTransition = $.hasCSSTransition(selector);
```

**Has Data**

Returns *true* if any of the nodes has custom data.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the custom data value to test for.

```javascript
const hasData = $.hasData(selector, key);
```

If the `key` argument is omitted, this method will return *true* if any of the nodes has any custom data.

```javascript
$.hasData(selector);
```

**Has Dataset**

Returns *true* if any of the nodes has a specified dataset value.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `key` is a string indicating the custom dataset value to test for.

```javascript
const hasDataset = $.hasDataset(selector, key);
```

**Has Descendent**

Returns *true* if any of the nodes contains a descendent matching a filter.

- `selector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be tested for.

```javascript
const hasDescendent = $.hasDescendent(selector, nodeFilter);
```

**Has Fragment**

Returns *true* if any of the nodes has a *DocumentFragment*.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hasFragment = $.hasFragment(selector);
```

**Has Property**

Returns *true* if any of the nodes has a specified property.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `property` is a string indicating the property value to test for.

```javascript
const hasProperty = $.hasProperty(selector, property);
```

**Has Shadow**

Returns *true* if any of the nodes has a *ShadowRoot*.

- `selector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const hasShadow = $.hasShadow(selector);
```

**Is**

Returns *true* if any of the nodes matches a filter.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes that the nodes will be tested for.

```javascript
const is = $.is(selector, nodeFilter);
```

**Is Connected**

Returns *true* if any of the nodes is connected to the DOM.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const isConnected = $.isConnected(selector);
```

**Is Equal**

Returns *true* if any of the nodes is considered equal to any of the other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `options` is an object containing options for how to perform the comparison.
    - `shallow` is a boolean indicating whether to perform a shallow comparison, and will default to *false*.

```javascript
const isEqual = $.isEqual(selector, otherSelector, options);
```

**Is Fixed**

Returns *true* if any of the nodes or a parent of any of the nodes is "fixed".

- `selector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const isFixed = $.isFixed(selector);
```

**Is Hidden**

Returns *true* if any of the nodes is hidden.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const isHidden = $.isHidden(selector);
```

**Is Same**

Returns *true* if any of the nodes is considered identical to any of the other nodes.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.
- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const isSame = $.isSame(selector, otherSelector);
```

**Is Visible**

Returns *true* if any of the nodes is visible.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](docs/QuerySet.md) or an array of nodes.

```javascript
const isVisible = $.isVisible(selector);
```