# FrostDOM

**FrostDOM** is a free, open-source DOM manipulation library for *JavaScript*.

It is a lightweight (~11kb gzipped) and modern library, utilizing ES6 syntax and features including Promises, with a focus on functional style programming.

For an OOP implementation, also check out my [fQuery](https://github.com/elusivecodes/fQuery) library.


## Table Of Contents
- [Installation](#installation)
- [DOM](#dom)
    - [Animation](#animation)
        - [Animations](#animations)
        - [Queue](#queue)
    - [Attributes](#attributes)
        - [Custom Data](#custom-data)
        - [Position](#position)
        - [Scroll](#scroll)
        - [Size](#size)
        - [Styles](#styles)
    - [Events](#events)
        - [Event Handlers](#event-handlers)
        - [Event Factory](#event-factory)
    - [Manipulation](#manipulation)
        - [Create](#create)
        - [Move](#move)
        - [Wrap](#wrap)
    - [Traversal](#traversal)
        - [Filter](#filter)
        - [Find](#find)
    - [Utility](#utility)
        - [Selection](#selection)
        - [Tests](#tests)
- [AJAX](#ajax)
    - [Scripts](#scripts)
    - [Stylesheets](#stylesheets)
- [Cookie](#cookie)
- [Static Methods](#static-methods)
    - [Parsing](#parsing)



## Installation

**Dependencies**

- [FrostCore](https://github.com/elusivecodes/FrostCore)

```html
<script type="text/javascript" src="/path/to/frost-core.min.js"></script>
<script type="text/javascript" src="/path/to/frost-dom.min.js"></script>
```


## DOM

The *DOM* class provides all the base methods for manipulating the DOM, performing AJAX requests, handling cookies and more.

By default, a *DOM* class is created on the `document` context, and is assigned to the lowercase `dom` variable in the global scope.

However, it is possible to create additional instances of the class on any *Document* context.

```javascript
const myDOM = new DOM(context);
```


### Animation

**Animate**

Add an animation to each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `callback` is a function that accepts `node`, `progress` and `options` as arguments, where `node` is a *HTMLElement*, `progress` is a value between *0* and *1* and `options` is the `options` object passed to this method.
- `options` is an object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise* that will resolve after the animation has completed.

```javascript
dom.animate(nodes, callback, options);
```

**Stop Animations**

Stop all animations for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
dom.stop(nodes, finish);
```

#### Animations

**Drop In**

Drop each node into place.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of node.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.dropIn(nodes, options);
```

**Drop Out**

Drop each node out of place.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.dropOut(nodes, options);
```

**Fade In**

Fade the opacity of each node in.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.fadeIn(nodes, options);
```

**Fade Out**

Fade the opacity of each node out.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.fadeOut(nodes, options);
```

**Rotate In**

Rotate each node in on an X,Y.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.rotateIn(nodes, options);
```

**Rotate Out**

Rotate each node out on an X,Y.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.rotateOut(nodes, options);
```

**Slide In**

Slide each node into place to a direction.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.slideIn(nodes, options);
```

**Slide Out**

Slide each node out of place from a direction.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.slideOut(nodes, options);
```

**Squeeze In**

Squeeze each node into place to a direction.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.squeezeIn(nodes, options);
```

**Squeeze Out**

Squeeze each node out of place from a direction.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This method returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.squeezeOut(nodes, options);
```

#### Queue

**Clear Queue**

Clear the queue of each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.clearQueue(nodes);
```

**Queue**

Queue a callback on each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `callback` is a function that accepts `node` as an argument, where node is a *HTMLElement*.

```javascript
dom.queue(nodes, callback);
```


### Attributes

**Get Attribute**

Get an attribute value for the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `attribute` is a string indicating the attribute value to return.

```javascript
const attr = dom.getAttribute(nodes, attribute);
```

If the `attribute` argument is omitted, an object containing all attribute values will be returned instead.

```javascript
const attributes = dom.getAttribute(nodes);
```

**Get Dataset**

Get a dataset value for the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the dataset value to return.

```javascript
const value = dom.getDataset(nodes, key);
```

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```javascript
const dataset = dom.getDataset(nodes);
```

**Get HTML**

Get the HTML contents of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const html = dom.getHTML(nodes);
```

**Get Property**

Get a property value for the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `property` is a string indicating the property value to return.

```javascript
const property = dom.getProperty(nodes, property);
```

**Get Text**

Get the text contents of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const text = dom.getText(nodes);
```

**Get Value**

Get the value property of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const value = dom.getValue(nodes);
```

**Remove Attribute**

Remove an attribute from each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `attribute` is a string indicating the attribute value to remove.

```javascript
dom.removeAttribute(nodes, attribute);
```

**Remove Property**

Remove a property from each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `property` is a string indicating the property value to remove.

```javascript
dom.removeProperty(nodes, property);
```

**Set Attribute**

Set attributes for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `attribute` is a string indicating the attribute value to set.
- `value` is the value you want to set the attribute to.

```javascript
dom.setAttribute(nodes, attribute, value);
```

Alternatively, you can set multiple attributes by passing a single `attributes` object as the argument with key/value pairs of the attributes to set.

```javascript
dom.setAttribute(nodes, attributes);
```

**Set Dataset**

Set dataset values for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the dataset value to set.
- `value` is the value you want to set the dataset to.

```javascript
dom.setDataset(nodes, key, value);
```

Alternatively, you can set multiple dataset properties by passing a single `dataset` object as the argument with key/value pairs of the properties to set.

```javascript
dom.setDataset(nodes, dataset);
```

**Set HTML**

Set the HTML contents for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of node.
- `html` is a string that will become the HTML contents of the node.

```javascript
dom.setHTML(nodes, html);
```

**Set Property**

Set property values for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `property` is a string indicating the property value to set.
- `value` is the value you want to set the property to.

```javascript
dom.setProperty(nodes, property, value);
```

Alternatively, you can set multiple properties by passing a single `properties` object as the argument with key/value pairs of the properties to set.

```javascript
dom.setProperty(nodes, properties);
```

**Set Text**

Set the text contents for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `text` is a string that will become the text contents of the node.

```javascript
dom.setText(nodes, text);
```

**Set Value**

Set the value property for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `value` is a string that will become the value of the node.

```javascript
dom.setValue(nodes, value);
```

##### Custom Data

**Clone Data**

Clone custom data from each node to each other node.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.cloneData(nodes, others);
```

**Get Data**

Get custom data for the first node.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the custom data value to return.

```javascript
const value = dom.getData(nodes, key);
```

If the `key` argument is omitted, an object containing all custom data values will be returned instead.

```javascript
const data = dom.getData(nodes);
```

**Remove Data**

Remove custom data for each node.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the custom data value to remove.

```javascript
dom.removeData(nodes, key);
```

**Set Data**

Set custom data for each node.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the custom data value to set.
- `value` is the value you want to set the attribute to.

```javascript
dom.setData(nodes, key, value);
```

Alternatively, you can set multiple data values by passing a single `data` object as the argument with key/value pairs of the data to set.

```javascript
dom.setData(nodes, data);
```

##### Position

**Center**

Get the X,Y co-ordinates for the center of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const center = dom.center(nodes, offset);
```

**Constrain**

Constrain each node to a container node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `container` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.constrain(nodes, container);
```

**Distance To**

Get the distance of the first node to an X,Y position.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const dist = dom.distTo(nodes, x, y, offset);
```

**Distance To Node**

Get the distance between two nodes.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const dist = dom.distToNode(nodes, others);
```

**Nearest To**

Get the nearest node to an X,Y position.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const nearest = dom.nearestTo(nodes, x, y, offset);
```

**Nearest To Node**

Get the nearest node to another node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const nearest = dom.nearestToNode(nodes, others);
```

**Percent X**

Get the percentage of an X co-ordinate relative to the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `x` is a distance (in pixels) along the X axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.
- `clamp` is a boolean indicating whether to clamp the percent betwen *0* and *100*, and will default to *true*.

```javascript
const pX = dom.percentX(nodes, x, offset, clamp);
```

**Percent Y**

Get the percentage of a Y co-ordinate relative to the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.
- `clamp` is a boolean indicating whether to clamp the percent betwen *0* and *100*, and will default to *true*.

```javascript
const pY = dom.percentY(nodes, y, offset, clamp);
```

**Position**

Get the X,Y position for the top/left of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pos = dom.position(nodes, offset);
```

**Rectangle**

Get the computed bounding rectangle of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```javascript
const rect = dom.rect(nodes, offset);
```

##### Scroll

**Get Scroll X**

Get the scroll X position of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const scrollX = dom.getScrollX(nodes);
```

**Get Scroll Y**

Get the scroll Y position of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const scrollY = dom.getScrollY(nodes);
```

**Set Scroll**

Scroll each node to an X,Y position.

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
dom.setScroll(nodes, x, y);
```

**Set Scroll X**

Scroll each node to an X position.

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `x` is a distance (in pixels) along the X axis to scroll to.

```javascript
dom.setScrollX(nodes, x);
```

**Set Scroll Y**

Scroll each node to a Y position.

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
dom.setScrollY(nodes, y);
```

##### Size

**Height**

Get the computed height of the first node (and optionally padding, border or margin).

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *true*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const height = dom.height(nodes, padding, border, margin);
```

**Width**

Get the computed width of the first node (and optionally padding, border or margin).

- `nodes` is a query selector string, a *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *true*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const width = dom.width(nodes, padding, border, margin);
```

##### Styles

**Add Class**

Add a class or classes to each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
dom.addClass(nodes, ...classes);
```

**Computed Style**

Get a computed CSS style value for the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `style` is a string indicating the computed style property value to return.

```javascript
const value = dom.css(nodes, style);
```

If the `style` argument is omitted, an object containing all computed style values will be returned instead.

```javascript
const css = dom.css(nodes);
```

**Get Style**

Get a style property for the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `style` is a string indicating the style property value to return.

```javascript
const value = dom.getStyle(nodes, style);
```

If the `style` argument is omitted, an object containing all style values will be returned instead.

```javascript
const styles = dom.getStyle(nodes);
```

**Hide**

Hide each node from display.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.hide(nodes);
```

**Remove Class**

Remove a class or classes from each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
dom.removeClass(nodes, ...classes);
```

**Set Style**

Set style properties for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `style` is a string indicating the style property value to set.
- `value` is the value you wish to set the style property to.
- `important` is a boolean indicating the style should be set as important, and will default to *false*.

```javascript
dom.setStyle(nodes, style, value, important);
```

Alternatively, you can set multiple style properties by passing a single `styles` object as the argument with key/value pairs of the styles to set.

```javascript
dom.setStyle(nodes, styles);
```

**Show**

Display each hidden node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.show(nodes);
```

**Toggle**

Toggle the visibility of each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.toggle(nodes);
```

**Toggle Class**

Toggle a class or classes for each node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
dom.toggleClass(nodes, ...classes);
```


#### Events

**Blur**

Trigger a blur event on the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.blur(nodes);
```

**Click**

Trigger a click event on the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.click(nodes);
```

**Focus**

Trigger a focus event on the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.focus(nodes);
```

**Ready**

Add a function to the ready queue.

- `callback` is a function that will execute once the DOM has finished loading.

If the DOM is already loaded, `callback` will execute immediately.

```javascript
dom.ready(callback);
```

##### Event Handlers

**Add Event**

Add events to each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEvent(nodes, events, callback);
```

**Add Event Delegate**

Add delegated events to each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEventDelegate(nodes, events, delegate, callback);
```

**Add Event Delegate Once**

Add self-destructing delegated events to each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEventDelegateOnce(nodes, events, delegate, callback);
```

**Add Event Once**

Add self-destructing events to each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to attach to the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEventOnce(nodes, events, callback);
```

**Clone Events**

Clone all events from each node to other nodes.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.cloneEvents(nodes, others);
```

**Remove Event**

Remove events from each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to remove from the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.removeEvent(nodes, events, callback);
```

**Remove Event Delegate**

Remove delegated events from each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to remove from the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.removeEventDelegate(nodes, events, delegate, callback);
```

**Trigger Event**

Trigger events on each node.

- `nodes` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `events` is a space-separated string of events to trigger on the nodes.
- `data` is an object containing custom data to add to the `event` object.
- `options` is an object containing properties to define the new Event.
    - `bubbles` is a boolean indicating whether the event should bubble, and will default to *true*.
    - `cancelable` is a boolean indicating whether the event is cancelable, and will default to *true*.

```javascript
dom.triggerEvent(nodes, events, data, options);
```

##### Event Factory

**Mouse Drag Event Factory**

Create a mouse drag event (optionally limited by animation frame).

- `down` is a function that accepts an *event* argument, which will be called when the event is started.
- `move` is a function that accepts an *event* argument, which will be called when the mouse is moved during the event.
- `up` is a function that accepts an *event* argument, which will be called when the event has ended (mouse button has been released).
- `animated` is a boolean indicating whether to limit the move event to once per animation frame, and will default to *true*.

```javascript
const event = dom.mouseDragFactory(down, move, up, animated);
```


#### Manipulation

**Clone**

Clone each node (optionally deep, and with events and data).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `deep` is a boolean indicating whether you wish to clone all descendent nodes, and will default to *true*.
- `cloneEvents` is a boolean indicating whether you wish to clone all events to the new nodes, and will default to *false*.
- `cloneData` is a boolean indicating whether you wish to clone all custom data to the new nodes, and will default to *false*.

```javascript
const clones = dom.clone(nodes, deep, cloneEvents, cloneData);
```

**Detach**

Detach each node from the DOM.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.detach(nodes);
```

**Empty**

Remove all children of each node from the DOM.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.empty(nodes);
```

**Remove**

Remove each node from the DOM.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.remove(nodes);
```

**Replace All**

Replace each other node with nodes.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement* *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.replaceAll(nodes, others);
```

If a node you are replacing with is a *DocumentFragment*, the fragment contents will be used as a replacement.

**Replace With**

Replace each node with other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.replaceWith(nodes, others);
```

If a node you are replacing with is a *DocumentFragment*, the fragment contents will be used as a replacement.

##### Create

**Attach Shadow**

Attach a shadow DOM tree to the first node.

- `nodes` is a query selector string, a*HTMLElement*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `open` is a boolean indicating whether the nodes are accessible from JavaScript outside the root, and will default to *true*.

```javascript
const shadow = dom.attachShadow(nodes, open);
```

**Create**

Create a new DOM element.

- `tagName` is a string indicating the type of element you wish to create, and will default to "*div*".
- `options` is an object containing properties to define the new node.
    - `html` is a string that will become the HTML contents of the node.
    - `text` is a string that will become the text contents of the node.
    - `class` is an array of classes, or a space seperated string of class names.
    - `styles` is an object containing style values to set.
    - `value` is a string that will become the value of the node.
    - `attribute` is an object containing attribute values to set.
    - `properties` is an object containing property values to set.
    - `dataset` is an object containing dataset values to set.

```javascript
const element = dom.create(tagName, options);
```

**Create Comment**

Create a new comment node.

- `comment` is a string indicating the comment.

```javascript
const node = dom.createComment(comment);
```

**Create Fragment**

Create a new document fragment.

```javascript
const fragment = dom.createFragment();
```

**Create Range**

Create a new range object.

```javascript
const range = dom.createRange();
```

**Create Text**

Create a new text node.

- `text` is a string indicating the text.

```javascript
const node = dom.createText(text);
```

**Parse HTML**

Return an array containing nodes parsed from a HTML string.

- `html` is a string containing the HTML data to parse.

```javascript
const nodes = dom.parseHTML(html);
```

##### Move

**After**

Insert each other node after the first node.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.after(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Append**

Append each other node to the first node.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.append(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Append To**

Append each node to the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.appendTo(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Before**

Insert each other node before the first node.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.before(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Insert After**

Insert each node after the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.insertAfter(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Insert Before**

Insert each node before the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.insertBefore(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Prepend**

Prepend each other node to the first node.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.prepend(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Prepend To**

Prepend each node to the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.prependTo(nodes, others);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

##### Wrap

**Unwrap**

Unwrap each node.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that must match the parent of each node for it to be unwrapped.

```javascript
dom.unwrap(nodes, filter);
```

**Wrap**

Wrap each nodes with other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.wrap(nodes, others);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.

**Wrap All**

Wrap all nodes with other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.wrapAll(nodes, others);
```

**Wrap Inner**

Wrap the contents of each node with other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.wrapInner(nodes, others);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.


#### Traversal

**Child**

Find the first child of each node (optionally matching a filter).

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const child = dom.child(nodes, filter);
```

**Children**

Find all children of each node (optionally matching a filter).

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.
- `elementsOnly` is a boolean indicating whether to only return elements, and will default to *true*.

```javascript
const children = dom.children(nodes, filter, first, elementsOnly);
```

**Closest**

Find the closest ancestor to each node (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that when matched will stop the search, and will default to *false*.

```javascript
const closest = dom.closest(nodes, filter, limit);
```

**Common Ancestor**

Find the common ancestor of all nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const commonAncestor = dom.commonAncestor(nodes);
```

**Contents**

Find all children of each node (including text and comment nodes).

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const contents = dom.contents(nodes);
```

**Fragment**

Return the *DocumentFragment* of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const fragment = dom.fragment(nodes);
```

**Next**

Find the next sibling for each node (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const next = dom.next(nodes, filter);
```

**Next All**

Find all next siblings for each node (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that when matched will stop the search, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const nextAll = dom.nextAll(nodes, filter, limit, first);
```

**Offset Parent**

Find the offset parent (relatively positioned) of the first node.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const offsetParent = dom.offsetParent(nodes);
```

**Parent**

Find the parent of each node (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const parent = dom.parent(nodes, filter);
```

**Parents**

Find all parents of each node (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that when matched will stop the search, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const parents = dom.parents(nodes, filter, limit, first);
```

**Previous**

Find the previous sibling for each node (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const prev = dom.prev(nodes, filter);
```

**Previous All**

Find all previous siblings for each node (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that when matched will stop the search, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const prevAll = dom.prevAll(nodes, filter, limit, first);
```

**Shadow**

Return the *ShadowRoot* of the first node.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const shadow = dom.shadow(nodes);
```

**Siblings**

Find all siblings for each node (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `elementsOnly` is a boolean indicating whether to only return elements, and will default to *true*.

```javascript
const siblings = dom.siblings(nodes, filter, elementsOnly);
```

##### Filter

**Connected**

Return all nodes connected to the DOM.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const connected = dom.connected(nodes);
```

**Equal**

Return all nodes considered equal to any of the other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const equal = dom.equal(nodes, others);
```

**Filter**

Return all nodes matching a filter.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by.

```javascript
const filter = dom.filter(nodes, filter);
```

**Filter One**

Return the first node matching a filter.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by.

```javascript
const filterOne = dom.filterOne(nodes, filter);
```

**Fixed**

Return all "fixed" nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const fixed = dom.fixed(nodes);
```

**Hidden**

Return all hidden nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hidden = dom.hidden(nodes);
```

**Not**

Return all nodes not matching a filter.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by.

```javascript
const notOne = dom.notOne(nodes, filter);
```

**Not One**

Return the first node not matching a filter.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by.

```javascript
const not = dom.not(nodes, filter);
```

**Same**

Return all nodes considered identical to any of the other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const same = dom.same(nodes, others);
```

**Visible**

Return all visible nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const visible = dom.visible(nodes);
```

**With Animation**

Return all nodes with an animation.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const withAnimation = dom.withAnimation(nodes);
```

**With Attribute**

Return all nodes with a specified attribute.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `attribute` is a string indicating the attribute value to test for.

```javascript
const withAttribute = dom.withAttribute(nodes, attribute);
```

**With Children**

Return all nodes with child elements.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const withChildren = dom.withChildren(nodes);
```

**With Class**

Return all nodes with any of the specified classes.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const withClass = dom.withClass(nodes, classes);
```

**With CSS Animation**

Return all nodes with a CSS animation.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const withCSSAnimation = dom.withCSSAnimation(nodes);
```

**With CSS Transition**

Return all nodes with a CSS transition.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const withCSSTransition = dom.withCSSTransition(nodes);
```

**With Data**

Return all nodes with custom data.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the custom data value to test for.

```javascript
const withData = dom.withData(nodes, key);
```

If the `key` argument is omitted, this method will return all nodes with any custom data.

```javascript
const withData = dom.withData(nodes);
```

**With Descendent**

Return all nodes with a descendent matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be filtered by.

```javascript
const withDescendent = dom.withDescendent(nodes, filter);
```

**With Property**

Return all nodes with a specified property.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `property` is a string indicating the property value to test for.

```javascript
const withProperty = dom.withProperty(nodes, property);
```

##### Find

**Find**

Find all nodes matching a selector.

- `selector` is a query selector string to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = dom.find(selector, nodes);
```

**Find By Class**

Find all nodes with a specific class.

- `className` is a string indicating the class name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = dom.findByClass(className, nodes);
```

**Find By ID**

Find all nodes with a specific ID.

- `id` is a string indicating the id to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = dom.findById(id, nodes);
```

**Find By Tag**

Find all nodes with a specific tag.

- `tagName` is a string indicating the tag name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const elements = dom.findByTag(tagName, nodes);
```

**Find One**

Find a single node matching a selector.

- `selector` is a query selector string to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const element = dom.findOne(selectors, nodes);
```

**Find One By Class**

Find the first node with a specific class.

- `className` is a string indicating the class name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const element = dom.findOneByClass(className, nodes);
```

**Find One By ID**

Find the first node with a specific ID.

- `id` is a string indicating the id to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const element = dom.findOneById(id, nodes);
```

**Find One By Tag**

Find the first node with a specific tag.

- `tagName` is a string indicating the tag name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes, and will default to the *Document* context.

```javascript
const element = dom.findOneByTag(tagName, nodes);
```


#### Utility

**Execute**

Execute a command in the current `document` context.

- `command` is the command you are executing.
- `value` is the value to use as the input for commands which require an argument, and will default to *null*.

```javascript
dom.exec(command, value);
```

**Force Show**

Force a node to be temporarily shown, and then execute a callback.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `callback` is a function that accepts a `node` as a parameter.

```javascript
dom.forceShow(nodes, callback);
```

**Index**

Get the index of the first node relative to it's parent node.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const index = dom.index(nodes);
```

**Index Of**

Get the index of the first node matching a filter.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be tested for.

```javascript
const indexOf = dom.indexOf(nodes, filter);
```

**Normalize**

Normalize nodes (remove empty text nodes, and join adjacent text nodes).

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery)  or an array of nodes.

```javascript
dom.normalize(nodes);
```

**Sanitize**

Sanitize a HTML string.

- `html` is the HTML string.
- `allowedTags` is an object containing allowed tags and attributes.

```javascript
const sanitized = dom.sanitize(html, allowedTags);
```

**Serialize**

Return a serialized string containing names and values of all form nodes.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const serialized = dom.serialize(nodes);
```

**Serialize Array**

Return a serialized array containing names and values of all form nodes.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const serializedArray = dom.serializeArray(nodes);
```

**Sort**

Sort nodes by their position in the document

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const sorted = dom.sort(nodes);
```

##### Selection

**After Selection**

Insert each node after the selection.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.afterSelection(nodes);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Before Selection**

Insert each node before the selection.

- `nodes` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.beforeSelection(nodes);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Extract Selection**

Extract selected nodes from the DOM.

```javascript
const extracted = dom.extractSelection();
```

**Get Selection**

Return all selected nodes.

```javascript
const selected = dom.getSelection();
```

**Select**

Create a selection on the first node.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.select(nodes);
```

**Select All**

Create a selection on all nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.selectAll(nodes);
```

**Wrap Selection**

Wrap selected nodes with other nodes.

- `nodes` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
dom.wrapSelection(nodes);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.

##### Tests

**Has Animation**

Returns *true* if any of the nodes has an animation.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hasAnimation = dom.hasAnimation(nodes);
```

**Has Attribute**

Returns *true* if any of the nodes has a specified attribute.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `attribute` is a string indicating the attribute value to test for.

```javascript
const hasAttribute = dom.hasAttribute(nodes, attribute);
```

**Has Children**

Returns *true* if any of the nodes has child elements.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hasChildren = dom.hasChildren(nodes);
```

**Has Class**

Returns *true* if any of the nodes has any of the specified classes.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const hasClass = dom.hasClass(nodes, ...classes);
```

**Has CSS Animation**

Returns *true* if any of the nodes has a CSS animation.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hasCSSAnimation = dom.hasCSSAnimation(nodes);
```

**Has CSS Transition**

Returns *true* if any of the nodes has a CSS transition.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hasCSSTransition = dom.hasCSSTransition(nodes);
```

**Has Data**

Returns *true* if any of the nodes has custom data.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `key` is a string indicating the custom data value to test for.

```javascript
const hasData = dom.hasData(nodes, key);
```

If the `key` argument is omitted, this method will return *true* if any of the nodes has any custom data.

```javascript
dom.hasData(nodes);
```

**Has Descendent**

Returns *true* if any of the nodes contains a descendent matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be tested for.

```javascript
const hasDescendent = dom.hasDescendent(nodes, filter);
```

**Has Fragment**

Returns *true* if any of the nodes has a *DocumentFragment*.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hasFragment = dom.hasFragment(nodes);
```

**Has Property**

Returns *true* if any of the nodes has a specified property.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `property` is a string indicating the property value to test for.

```javascript
const hasProperty = dom.hasProperty(nodes, property);
```

**Has Shadow**

Returns *true* if any of the nodes has a *ShadowRoot*.

- `nodes` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const hasShadow = dom.hasShadow(nodes);
```

**Is**

Returns *true* if any of the nodes matches a filter.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes that the nodes will be tested for.

```javascript
const is = dom.is(nodes, filter);
```

**Is Connected**

Returns *true* if any of the nodes is connected to the DOM.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const isConnected = dom.isConnected(nodes);
```

**Is Equal**

Returns *true* if any of the nodes is considered equal to any of the other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const isEqual = dom.isEqual(nodes, others);
```

**Is Fixed**

Returns *true* if any of the nodes or a parent of any of the nodes is "fixed".

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const isFixed = dom.isFixed(nodes);
```

**Is Hidden**

Returns *true* if any of the nodes is hidden.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const isHidden = dom.isHidden(nodes);
```

**Is Same**

Returns *true* if any of the nodes is considered identical to any of the other nodes.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.
- `others` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const isSame = dom.isSame(nodes, others);
```

**Is Visible**

Returns *true* if any of the nodes is visible.

- `nodes` is a query selector string, a *Node*, *HTMLElement*, *Document*, *Window*, *NodeList*, *HTMLCollection*, [*QuerySet*](https://github.com/elusivecodes/fQuery) or an array of nodes.

```javascript
const isVisible = dom.isVisible(nodes);
```


## AJAX

**AJAX**

Perform an XHR request.

- `options` is an object containing options for the request.
    - `url` is a string containing the URL for the request, and will default to the current window location.
    - `method` is a string containing the method to use for the request, and will default to "*GET*".
    - `data` is an object containing data to send with the request, and will default to *false*.
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `beforeSend` is a function that accepts an `xhr` argument, will be called before the request is sent.
    - `uploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.ajax(options);
```

**Get**

Perform an XHR GET request.

- `url` is a string containing the URL for the request.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*GET*".
    - `data` is an object containing data to send with the request, and will default to *false*.
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `beforeSend` is a function that accepts an `xhr` argument, will be called before the request is sent.
    - `uploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.get(url, options);
```

**Post**

Perform an XHR POST request.

- `url` is a string containing the URL for the request.
- `data` is an object containing data to send with the request, and will default to *false*.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*POST*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to "*application/x-www-form-urlencoded*".
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `beforeSend` is a function that accepts an `xhr` argument, will be called before the request is sent.
    - `uploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.post(url, data, options);
```

**Upload**

Perform an XHR request for a file upload.

- `url` is a string containing the URL for the request.
- `data` is a *FormData* object to send with the request.
- `options` is an object containing options for the request.
    - `method` is a string containing the method to use for the request, and will default to "*POST*".
    - `contentType` is a string containing the Content-Type header to send with the request, and will default to *false*.
    - `responseType` is a string containing the expected Content-Type header of the response.
    - `cache` is a boolean indicating whether to cache the request, and will default to *true*.
    - `processData` is a boolean indicating whether to process the data depending on the `contentType`, and will default to *true*.
    - `headers` is an object containing additional headers to send with the request.
    - `beforeSend` is a function that accepts an `xhr` argument, will be called before the request is sent.
    - `uploadProgress` is a function that accepts `progress`, `xhr` and `event` as arguments and will be called on XHR upload progress.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.upload(url, data, options);
```

### Scripts

**Load Script**

Load and execute a JavaScript file.

- `script` is a string containing the URL for the script to load.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.loadScript(script);
```

**Load Scripts**

Load and execute multiple JavaScript files (in order).

- `scripts` is a array of strings containing the URLs for the scripts to load.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.loadScripts(scripts);
```

### Stylesheets

**Load Stylesheet**

Import A CSS Stylesheet file.

- `stylesheet` is a string containing the URL for the stylesheet to load.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.loadStyle(stylesheet);
```

**Load Stylesheets**

Import multiple CSS Stylesheet files.

- `stylesheets` is a array of strings containing the URLs for the stylesheets to load.

This method returns a *Promise* that resolves when the request is completed, or rejects on failure.

```javascript
dom.loadStyles(stylesheets);
```


## Cookie

**Get Cookie**

Get a cookie value (optionally json encoded).

- `name` is a string containing the name of the cookie value to retrieve.
- `json` is a boolean indicating whether the cookie contains a JSON value, and will default to *false*.

```javascript
const value = dom.getCookie(name, json);
```

**Remove Cookie**

Remove a cookie.

- `name` is a string containing the name of the cookie value to remove.
- `options` is an object containing configuration options for the cookie.
    - `expires` is a number indicating the number of seconds until the cookie will expire, and will default to *-1*.
    - `path` is a string indicating the path to use for the cookie.
    - `secure` is a boolean indicating whether only set the cookie for secure requests, and will default to *false*.

```javascript
dom.removeCookie(name, options);
```

**Set Cookie**

Set a cookie (optionally json encoded).

- `name` is a string containing the name of the cookie value to set.
- `value` is the value you wish to set the cookie to.
- `options` is an object containing configuration options for the cookie.
    - `expires` is a number indicating the number of seconds until the cookie will expire.
    - `path` is a string indicating the path to use for the cookie.
    - `secure` is a boolean indicating whether only set the cookie for secure requests, and will default to *false*.
- `json` is a boolean indicating whether to JSON encode the cookie value, and will default to *false*.

```javascript
dom.setCookie(name, value, options, json);
```


## Static Methods

### Parsing

**Parse HTML**

Create a *Document* object from a HTML string.

- `html` is the HTML string.

```javascript
const doc = DOM.parseHTML(html);
```

**Parse XML**

Create a *Document* object from an XML string.

- `xml` is the XML string.

```javascript
const doc = DOM.parseXML(xml);
```
