# FrostDOM

**FrostDOM** is a free, open-source DOM manipulation library for *JavaScript*.

It is heavily inspired by jQuery, but utilizes ES6 syntax and features including Promises, with a focus on functional style programming.


## Table Of Contents
- [Installation](#installation)
- [DOM](#dom)
    - [Animation](#animation)
    - [Attributes](#attributes)
    - [Events](#events)
    - [Manipulation](#manipulation)
    - [Traversal](#traversal)
    - [Utility](#utility)
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

The `DOM` class provides all the base methods for manipulating the DOM, performing AJAX requests, handling Cookies and more.

By default, a `DOM` class is created on the document context, and is assigned to the lowercase `dom` variable in the global scope.

However, it is possible to create additional instances of the class on any Document context.

```javascript
const myDOM = new DOM(context);
```


### Animation

**Animate**

Add an animation to each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `callback` is a function that accepts `node`, `progress` and `options` as arguments, where `node` is a *HTMLElement*, `progress` is a value between *0* and *1* and `options` is the `options` object passed to this method.
- `options` is an object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a *Promise* that will resolve after the animation has completed.

```javascript
dom.animate(nodes, callback, options);
```

**Stop Animations**

Stop all animations for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
dom.stop(nodes, finish);
```

#### Animations

**Drop In/Out**

Drop each element in or out of place.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.dropIn(nodes, options);
dom.dropOut(nodes, options);
```

**Fade In/Out**

Fade the opacity of each element in or out.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `options` is an object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.fadeIn(nodes, options);
dom.fadeOut(nodes, options);
```

**Rotate In/Out**

Rotate each element in or out on an X,Y.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `options` is an object containing properties to define how the animation should be handled.
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.rotateIn(nodes, options);
dom.rotateOut(nodes, options);
```

**Slide In/Out**

Slide each element into or out of place to a direction.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.slideIn(nodes, options);
dom.slideOut(nodes, options);
```

**Squeeze In/Out**

Squeeze each element into or out of place to a direction.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `options` is an object containing properties to define how the animation should be handled.
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a *Promise*, that will resolve after the animation has completed.

```javascript
dom.squeezeIn(nodes, options);
dom.squeezeOut(nodes, options);
```

#### Queue

**Clear Queue**

Clear the queue of each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.clearQueue(nodes);
```

**Queue**

Queue a callback on each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `callback` is a function that accepts `node` as an argument, where node is a *HTMLElement*.

```javascript
dom.queue(nodes, callback);
```


### Attributes

**Get Attribute**

Get an attribute value for the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `attribute` is a string indicating the attribute value to return.

```javascript
const attr = dom.getAttribute(nodes, attribute);
```

**Get Dataset**

Get a dataset value for the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `key` is a string indicating the dataset value to return.

```javascript
const value = dom.getDataset(nodes, key);
```

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```javascript
const dataset = dom.getDataset(nodes);
```

**Get HTML**

Get the HTML contents of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const html = dom.getHTML(nodes);
```

**Get Property**

Get a property value for the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `property` is a string indicating the property value to return.

```javascript
const property = dom.getProperty(nodes, property);
```

**Get Text**

Get the text contents of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const text = dom.getText(nodes);
```

**Get Value**

Get the value property of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const value = dom.getValue(nodes);
```

**Remove Attribute**

Remove an attribute from each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `attribute` is a string indicating the attribute value to remove.

```javascript
dom.removeAttribute(nodes, attribute);
```

**Remove Property**

Remove a property from each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `property` is a string indicating the property value to remove.

```javascript
dom.removeProperty(nodes, property);
```

**Set Attribute**

Set attributes for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
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

Set dataset values for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
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

Set the HTML contents for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `html` is a string that will become the HTML contents of the element.

```javascript
dom.setHTML(nodes, html);
```

**Set Property**

Set property values for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
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

Set the text contents for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `text` is a string that will become the text contents of the element.

```javascript
dom.setText(nodes, text);
```

**Set Value**

Set the value property for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `value` is a string that will become the value of the element.

```javascript
dom.setValue(nodes, value);
```

##### Custom Data

**Clone Data**

Clone custom data from each node to each other node.

- `nodes` is a query selector string, an array of elements, a *Node*, *NodeList*, *HTMLCollection* or *Window* object.
- `others` is a query selector string, an array of elements, a *Node*, *NodeList*, *HTMLCollection* or *Window* object.

```javascript
dom.cloneData(nodes, others);
```

**Get Data**

Get custom data for the first node.

- `nodes` is a query selector string, an array of elements, a *Node*, *NodeList*, *HTMLCollection* or *Window* object.
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

- `nodes` is a query selector string, an array of elements, a *Node*, *NodeList*, *HTMLCollection* or *Window* object.
- `key` is a string indicating the custom data value to remove.

```javascript
dom.removeData(nodes, key);
```

**Set Data**

Set custom data for each node.

- `nodes` is a query selector string, an array of elements, a *Node*, *NodeList*, *HTMLCollection* or *Window* object.
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

Get the X,Y co-ordinates for the center of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const center = dom.center(nodes, offset);
```

**Constrain**

Constrain each element to a container element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `container` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.constrain(nodes, container);
```

**Distance To**

Get the distance of the first element to an X,Y position.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const dist = dom.distTo(nodes, x, y, offset);
```

**Distance To Node**

Get the distance between two elements.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const dist = dom.distToNode(nodes, others);
```

**Nearest To**

Get the nearest element to an X,Y position.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const nearest = dom.nearestTo(nodes, x, y, offset);
```

**Nearest To Node**

Get the nearest element to another element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const nearest = dom.nearestToNode(nodes, others);
```

**Percent X**

Get the percentage of an X co-ordinate relative to the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `x` is a distance (in pixels) along the X axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pX = dom.percentX(nodes, x, offset);
```

**Percent Y**

Get the percentage of a Y co-ordinate relative to the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pY = dom.percentY(nodes, y, offset);
```

**Position**

Get the X,Y position for the top/left of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pos = dom.position(nodes, offset);
```

**Rectangle**

Get the computed bounding rectangle of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```javascript
const rect = dom.rect(nodes, offset);
```

##### Scroll

**Get Scroll X**

Get the scroll X position of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.

```javascript
const scrollX = dom.getScrollX(nodes);
```

**Get Scroll Y**

Get the scroll Y position of the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.

```javascript
const scrollY = dom.getScrollY(nodes);
```

**Set Scroll**

Scroll each element to an X,Y position.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
dom.setScroll(nodes, x, y);
```

**Set Scroll X**

Scroll each element to an X position.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `x` is a distance (in pixels) along the X axis to scroll to.

```javascript
dom.setScrollX(nodes, x);
```

**Set Scroll Y**

Scroll each element to a Y position.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
dom.setScrollY(nodes, y);
```

##### Size

**Height**

Get the computed height of the first element (and optionally padding, border or margin).

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *true*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const height = dom.height(nodes, padding, border, margin);
```

**Width**

Get the computed width of the first element (and optionally padding, border or margin).

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *true*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const width = dom.width(nodes, padding, border, margin);
```

##### Styles

**Add Class**

Add a class or classes to each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
dom.addClass(nodes, ...classes);
```

**Computed Style**

Get the computed style for the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `style` is a string indicating the computed style property value to return.

```javascript
const css = dom.css(nodes, style);
```

**Get Style**

Get a style property for the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `style` is a string indicating the style property value to return.

```javascript
const style = dom.getStyle(nodes, style);
```

**Hide**

Hide each element from display.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.hide(nodes);
```

**Remove Class**

Remove a class or classes from each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
dom.removeClass(nodes, ...classes);
```

**Set Style**

Set style properties for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
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

Display each hidden element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.show(nodes);
```

**Toggle**

Toggle the visibility of each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.toggle(nodes);
```

**Toggle Class**

Toggle a class or classes for each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `classes` is an array of classes, or a space seperated string of class names.

```javascript
dom.toggleClass(nodes, ...classes);
```


#### Events

**Blur**

Trigger a blur event on the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.blur(nodes);
```

**Click**

Trigger a click event on the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.click(nodes);
```

**Focus**

Trigger a focus event on the first element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

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

**Trigger Event**

Trigger an event on each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to trigger on the elements.
- `data` is an object containing custom data to add to the `event` object.

```javascript
dom.triggerEvent(nodes, events, data);
```

##### Event Handlers

**Add Event**

Add an event to each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEvent(nodes, events, callback);
```

**Add Event Delegate**

Add a delegated event to each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to attach to the elements.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEventDelegate(nodes, events, delegate, callback);
```

**Add Event Delegate Once**

Add a delegated event to each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to attach to the elements.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEventDelegateOnce(nodes, events, delegate, callback);
```

**Add Event Once**

Add a self-destructing event to each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.addEventOnce(nodes, events, callback);
```

**Clone Events**

Clone all events from each element to other elements.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `others` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.

```javascript
dom.cloneEvents(nodes, others);
```

**Remove Event**

Remove events from each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to remove from the elements.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.removeEvent(nodes, events, callback);
```

**Remove Event Delegate**

Remove delegated events from each element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `events` is a space-separated string of events to remove from the elements.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.

```javascript
dom.removeEventDelegate(nodes, events, delegate, callback);
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

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `deep` is a boolean indicating whether you wish to clone all descendent elements, and will default to *true*.
- `cloneEvents` is a boolean indicating whether you wish to clone all events to the new nodes, and will default to *false*.
- `cloneData` is a boolean indicating whether you wish to clone all custom data to the new nodes, and will default to *false*.

```javascript
const clones = dom.clone(nodes, deep, cloneEvents, cloneData);
```

**Detach**

Detach an element from the DOM.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
dom.detach(nodes);
```

**Empty**

Remove all children of each node from the DOM.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
dom.empty(nodes);
```

**Remove**

Remove each node from the DOM.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.remove(nodes);
```

**Replace All**

Replace each other node with nodes.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.replaceAll(nodes, others);
```

**Replace With**

Replace each node with other nodes.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.replaceWith(nodes, others);
```

##### Create

**Create**

Create a new DOM element.

- `tagName` is a string indicating the type of element you wish to create.
- `options` is an object containing properties to define the new element.
    - `html` is a string that will become the HTML contents of the element.
    - `text` is a string that will become the text contents of the element.
    - `class` is an array of classes, or a space seperated string of class names.
    - `styles` is an object containing style values to set.
    - `value` is a string that will become the value of the element.
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

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.after(nodes, others);
```

**Append**

Append each other node to the first node.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.append(nodes, others);
```

**Append To**

Append each node to the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.appendTo(nodes, others);
```

**Before**

Insert each other node before the first node.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.before(nodes, others);
```

**Insert After**

Insert each node after the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.insertAfter(nodes, others);
```

**Insert Before**

Insert each node before the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.insertBefore(nodes, others);
```

**Prepend**

Prepend each other node to the first node.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.prepend(nodes, others);
```

**Prepend To**

Prepend each node to the first other node.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.prependTo(nodes, others);
```

##### Wrap

**Unwrap**

Unwrap each node.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that must match the parent of each node for it to be unwrapped.

```javascript
dom.unwrap(nodes, filter);
```

**Wrap**

Wrap each nodes with other nodes.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a HTML string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.wrap(nodes, others);
```

**Wrap All**

Wrap all nodes with other nodes.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `others` is a query selector string, a HTML string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.wrapAll(nodes, others);
```

**Wrap Inner**

Wrap the contents of each node with other nodes.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a HTML string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.wrapInner(nodes, others);
```


#### Traversal

##### Filter

**Filter**

Return all elements matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = dom.filter(nodes, filter);
```

**Filter One**

Return the first element matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = dom.filterOne(nodes, filter);
```

**Has**

Return all elements with a descendent matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = dom.has(nodes, filter);
```

**Has One**

Return the first element with a descendent matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = dom.hasOne(nodes, filter);
```

**Hidden**

Return all hidden elements.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const filtered = dom.hidden(nodes);
```

**Hidden One**

Return the first hidden element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const filtered = dom.hiddenOne(nodes);
```

**Not**

Return all elements not matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = dom.not(nodes, filter);
```

**Not One**

Return the first element not matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by.

```javascript
const filtered = dom.notOne(nodes, filter);
```

**Visible**

Return all visible elements.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const filtered = dom.visible(nodes);
```

**Visible One**

Return the first visible element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const filtered = dom.visibleOne(nodes);
```

##### Find

**Find**

Find all elements matching a selector.

- `selector` is a query selector string to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const elements = dom.find(selector, nodes);
```

**Find By Class**

Find all elements with a specific class.

- `className` is a string indicating the class name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const elements = dom.findByClass(className, nodes);
```

**Find By ID**

Find all elements with a specific ID.

- `id` is a string indicating the id to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const elements = dom.findById(id, nodes);
```

**Find By Tag**

Find all elements with a specific tag.

- `tagName` is a string indicating the tag name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const elements = dom.findByTag(tagName, nodes);
```

**Find One**

Find a single element matching a selector.

- `selector` is a query selector string to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const element = dom.findOne(selectors, nodes);
```

**Find One By Class**

Find the first element with a specific class.

- `className` is a string indicating the class name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const element = dom.findOneByClass(className, nodes);
```

**Find One By ID**

Find the first element with a specific ID.

- `id` is a string indicating the id to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const element = dom.findOneById(id, nodes);
```

**Find One By Tag**

Find the first element with a specific tag.

- `tagName` is a string indicating the tag name to search for.
- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements, and will default to the *Document* context.

```javascript
const element = dom.findOneByTag(tagName, nodes);
```


##### Traversal

**Child**

Find the first child of each element (optionally matching a filter).

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const child = dom.child(nodes, filter);
```

**Children**

Find all children of each element (optionally matching a filter).

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.
- `elementsOnly` is a boolean indicating whether to only return elements, and will default to *true*.

```javascript
const children = dom.children(nodes, filter, first, elementsOnly);
```

**Closest**

Find the closest ancestor to each element (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that when matched will stop the search, and will default to *false*.

```javascript
const closest = dom.closest(nodes, filter, limit);
```

**Common Ancestor**

Find the common ancestor of all elements.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
const commonAncestor = dom.commonAncestor(nodes);
```

**Contents**

Find all children of each element (including text and comment nodes).

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const contents = dom.contents(nodes);
```

**Next**

Find the next sibling for each element (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const next = dom.next(nodes, filter);
```

**Next All**

Find all next siblings for each element (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that when matched will stop the search, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const nextAll = dom.nextAll(nodes, filter, limit, first);
```

**Offset Parent**

Find the offset parent (relatively positioned) of the first element.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
const offsetParent = dom.offsetParent(nodes);
```

**Parent**

Find the parent of each element (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const parent = dom.parent(nodes, filter);
```

**Parents**

Find all parents of each element (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that when matched will stop the search, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const parents = dom.parents(nodes, filter, limit, first);
```

**Previous**

Find the previous sibling for each element (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const prev = dom.prev(nodes, filter);
```

**Previous All**

Find all previous siblings for each element (optionally matching a filter, and before a limit).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limit` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that when matched will stop the search, and will default to *false*.
- `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const prevAll = dom.prevAll(nodes, filter, limit, first);
```

**Siblings**

Find all siblings for each element (optionally matching a filter).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `elementsOnly` is a boolean indicating whether to only return elements, and will default to *true*.

```javascript
const siblings = dom.siblings(nodes, filter, elementsOnly);
```


#### Utility

##### Tests

**Contains**

Returns *true* if any of the elements contains a descendent matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection*, *Document* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be tested for.

```javascript
const contains = dom.contains(nodes, filter);
```

**Has Animation**

Returns *true* if any of the elements has a CSS animation.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const hasAnimation = dom.hasAnimation(nodes);
```

**Has Attribute**

Returns *true* if any of the elements has a specified attribute.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `attribute` is a string indicating the attribute value to test for.

```javascript
const hasAttribute = dom.hasAttribute(nodes, attribute);
```

**Has Class**

Returns *true* if any of the elements has any of the specified classes.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const hasClass = dom.hasClass(nodes, ...classes);
```

**Has Data**

Returns *true* if any of the nodes has custom data.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `key` is a string indicating the custom data value to test for.

```javascript
const hasData = dom.hasData(nodes, key);
```

If the `key` argument is omitted, this method will return *true* if any of the nodes has any custom data.

```javascript
dom.hasData(nodes);
```

**Has Property**

Returns *true* if any of the elements has a specified property.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `property` is a string indicating the property value to test for.

```javascript
const hasProperty = dom.hasProperty(nodes, property);
```

**Has Transition**

Returns *true* if any of the elements has a CSS transition.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const hasTransition = dom.hasTransition(nodes);
```

**Is**

Returns *true* if any of the elements matches a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be tested for.

```javascript
const is = dom.is(nodes, filter);
```

**Is Connected**

Returns *true* if any of the nodes is connected to the DOM.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
const isConnected = dom.isConnected(nodes);
```

**Is Equal**

Returns *true* if any of the nodes is considered equal to any of the other nodes.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
const isEqual = dom.isEqual(nodes, others);
```

**Is Fixed**

Returns *true* if any of the elements or a parent of any of the elements is "fixed".

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const isFixed = dom.isFixed(nodes);
```

**Is Hidden**

Returns *true* if any of the elements is hidden.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection*, *Document*, *Window* or an array of elements.

```javascript
const isHidden = dom.isHidden(nodes);
```

**Is Same**

Returns *true* if any of the nodes is considered identical to any of the other nodes.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.
- `others` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
const isSame = dom.isSame(nodes, others);
```

**Is Visible**

Returns *true* if any of the elements is visible.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection*, *Document*, *Window* or an array of elements.

```javascript
const isVisible = dom.isVisible(nodes);
```

##### Selection

**After Selection**

Insert each node after the selection.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.afterSelection(nodes);
```

**Before Selection**

Insert each node before the selection.

- `nodes` is a query selector string, a HTML string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes.

```javascript
dom.beforeSelection(nodes);
```

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

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
dom.select(nodes);
```

**Select All**

Create a selection on all nodes.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
dom.selectAll(nodes);
```

**Wrap Selection**

Wrap selected nodes with other nodes.

- `nodes` is a query selector string, a HTML string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
dom.wrapSelection(nodes);
```

##### Utility

**Execute**

Execute a command in the current context.

- `command` is the command you are executing.
- `value` is the value to use as the input for commands which require an argument, and will default to *null*.

```javascript
dom.exec(command, value);
```

**Force Show**

Force an element to be temporarily shown, and then execute a callback.

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection*, *Document*, *Window* or an array of elements.
- `callback` is a function that accepts a `node` as a parameter.

```javascript
dom.forceShow(nodes, callback);
```

**Index**

Get the index of the first element matching a filter.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.
- `filter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of nodes that the nodes will be tested for.

```javascript
const index = dom.index(nodes, filter);
```

**Index Of**

Get the index of the first element relative to it's parent element.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const indexOf = dom.indexOf(nodes);
```

**Normalize**

Normalize nodes (remove empty text nodes, and join neighbouring text nodes).

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
dom.normalize(nodes);
```

**Serialize**

Returns a serialized string containing names and values of all form elements.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const serialize = dom.serialize(nodes);
```

**Serialize Array**

Returns a serialized array containing names and values of all form elements.

- `nodes` is a query selector string, a *HTMLElement*, *HTMLCollection* or an array of elements.

```javascript
const serialArray = dom.serializeArray(nodes);
```

**Sort**

Sort nodes by their position in the document

- `nodes` is a query selector string, a *Node*, *NodeList*, *HTMLCollection* or an array of elements.

```javascript
const sorted = dom.sort(nodes);
```


## AJAX

**AJAX**

Perform an XHR request.

- `options` is an object containing containing options for the request.
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
- `options` is an object containing containing options for the request.
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

**Get**

Perform an XHR POST request.

- `url` is a string containing the URL for the request.
- `data` is an object containing data to send with the request, and will default to *false*.
- `options` is an object containing containing options for the request.
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
- `data` is an object containing Key/Value pairs of configuration for the request.
- `options` is an object containing containing options for the request.
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

Create a Document object from a HTML string.

- `html` is the HTML string.

```javascript
const doc = DOM.parseHTML(html);
```

**Parse XML**

Create a Document object from an XML string.

- `xml` is the XML string.

```javascript
const doc = DOM.parseXML(xml);
```
