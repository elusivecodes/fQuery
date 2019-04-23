# FrostDOM

**FrostDOM** is a free, open-source DOM manipulation library for *JavaScript*.

It is heavily inspired by jQuery, but utilizes ES6 syntax and features including Promises, with a focus on functional style programming.


## Table of contents
- [DOM](#dom)
    - [Animation](#animation)
    - [Attributes](#attributes)
    - [Events](#events)
    - [Manipulation](#manipulation)
    - [Traversal](#traversal)
    - [Utility](#utility)
- [AJAX](#ajax)
- [Cookie](#cookie)
- [Event Factory](#event-factory)
- [Parsers](#parsers)



## DOM

The `DOM` class provides all the base methods for manipulating the DOM, performing AJAX requests, handling Cookies and more.

By default, a `DOM` class is created on the document context, and is assigned to the lowercase `dom` variable in the global scope.

However, it is possible to create additional instances of the class on any Document context.

```javascript
const context = DOM.parseHTML(html);
const myDOM = new DOM(context);
```


### Animation

**Animate**

Add an animation to each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `callback` is a function that accepts `node` and `progress` as arguments, where node is a HTMLElement and progress is a value between *0* and *1*.
- `options` is an Object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a Promise that will resolve after the animation has completed.

```javascript
dom.animate(nodes, callback, options);
```

**Stop Animations**

Stop all animations for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
dom.stop(nodes, finish);
```

#### Animations

**Drop In/Out**

Drop each element in or out of place.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `options` is an Object containing properties to define how the animation should be handled.
    - `direction` is a string of either *top*, *right*, *bottom* or *left* indicating the direction to drop from, and will default to *top*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
dom.dropIn(nodes, options);
dom.dropOut(nodes, options);
```

**Fade In/Out**

Fade the opacity of each element in or out.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `options` is an Object containing properties to define how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
dom.fadeIn(nodes, options);
dom.fadeOut(nodes, options);
```

**Rotate In/Out**

Rotate each element in or out on an X,Y.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `options` is an Object containing properties to define how the animation should be handled.
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
dom.rotateIn(nodes, options);
dom.rotateOut(nodes, options);
```

**Slide In/Out**

Slide each element into or out of place to a direction.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `options` is an Object containing properties to define how the animation should be handled.
    - `direction` is a string of either *top*, *right*, *bottom* or *left* indicating the direction to drop from, and will default to *top*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
dom.slideIn(nodes, options);
dom.slideOut(nodes, options);
```

**Squeeze In/Out**

Squeeze each element into or out of place to a direction.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `options` is an Object containing properties to define how the animation should be handled.
    - `direction` is a string of either *top*, *right*, *bottom* or *left* indicating the direction to drop from, and will default to *top*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
dom.squeezeIn(nodes, options);
dom.squeezeOut(nodes, options);
```

#### Queue

**Queue**

Queue a callback on each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `callback` is a function that accepts `node` as an argument, where node is a HTMLElement.

```javascript
dom.queue(nodes, callback);
```

**Clear Queue**

Clear the queue of each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.clearQueue(nodes);
```

### Attributes

**Get Attribute**

Get an attribute value for the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `attribute` is a string indicating the attribute value to return.

```javascript
const attr = dom.getAttribute(nodes, attribute);
```

**Set Attribute**

Set attributes for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `attribute` is a string indicating the attribute value to set.
- `value` is the value you want to set the attribute to.

Alternatively, you can set multiple attributes by passing a single `attributes` Object as the argument with Key/Value pairs of the attributes to set.

```javascript
dom.setAttribute(nodes, attributes);
dom.setAttribute(nodes, attribute, value);
```

**Remove Attribute**

Remove an attribute from each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `attribute` is a string indicating the attribute value to remove.

```javascript
dom.removeAttribute(nodes, attribute);
```

**Get Dataset**

Get a dataset value for the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `key` is a string indicating the dataset value to return.

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```javascript
const dataset = dom.getDataset(nodes);
const value = dom.getDataset(nodes, key);
```

**Set Dataset**

Set dataset values for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `key` is a string indicating the dataset value to set.
- `value` is the value you want to set the dataset to.

Alternatively, you can set multiple dataset properties by passing a single `dataset` Object as the argument with Key/Value pairs of the properties to set.

```javascript
dom.setDataset(nodes, dataset);
dom.setDataset(nodes, key, value);
```

**Get HTML**

Get the HTML contents of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
const html = dom.getHTML(nodes);
```

**Set HTML**

Set the HTML contents for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `html` is a string that will become the HTML contents of the element.

```javascript
dom.setHTML(nodes, html);
```

**Get Property**

Get a property value for the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `property` is a string indicating the property value to return.

```javascript
const prop = dom.getProperty(nodes, property);
```

**Set Property**

Set property values for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `property` is a string indicating the property value to set.
- `value` is the value you want to set the property to.

Alternatively, you can set multiple properties by passing a single `properties` Object as the argument with Key/Value pairs of the properties to set.

```javascript
dom.setProperty(nodes, properties);
dom.setProperty(nodes, property, value);
```

**Remove Property**

Remove a property from each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `property` is a string indicating the property value to remove.

```javascript
dom.removeProperty(nodes, property);
```

**Get Text**

Get the text contents of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
const text = dom.getText(nodes);
```

**Set Text**

Set the text contents for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `text` is a string that will become the text contents of the element.

```javascript
dom.setText(nodes, text);
```

**Get Value**

Get the value property of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
const val = dom.getValue(nodes);
```

**Set Value**

Set the value property for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `value` is a string that will become the value of the element.

```javascript
dom.setValue(nodes, value);
```

##### Custom Data

**Get Data**

Get custom data for the first node.

- `nodes` is a Query Selector string, an Array of elements, a Node, NodeList, HTMLCollection or Window object.
- `key` is a string indicating the custom data value to return.

If the `key` argument is omitted, an object containing all custom data values will be returned instead.

```javascript
const data = dom.getData(nodes);
const value = dom.getData(nodes, key);
```

**Set Data**

Set custom data for each node.

- `nodes` is a Query Selector string, an Array of elements, a Node, NodeList, HTMLCollection or Window object.
- `key` is a string indicating the custom data value to set.
- `value` is the value you want to set the attribute to.

Alternatively, you can set multiple data values by passing a single `data` Object as the argument with Key/Value pairs of the data to set.

```javascript
dom.setData(nodes, data);
dom.setData(nodes, key, value);
```

**Remove Data**

Remove custom data for each node.

- `nodes` is a Query Selector string, an Array of elements, a Node, NodeList, HTMLCollection or Window object.
- `key` is a string indicating the custom data value to remove.

```javascript
dom.removeData(nodes, key);
```

##### Position

**Center**

Get the X,Y co-ordinates for the center of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const center = dom.center(nodes, offset);
```

**Position**

Get the X,Y position for the top/left of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pos = dom.position(nodes, offset);
```

**Rectangle**

Get the computed bounding rectangle of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```javascript
const rect = dom.rect(nodes, offset);
```

**Constrain**

Constrain each element to a container element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `container` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.constrain(nodes, container);
```

**Distance To**

Get the distance of the first element to an X,Y position.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const dist = dom.distTo(nodes, x, y, offset);
```

**Distance To Node**

Get the distance between two elements.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `others` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
const dist = dom.distToNode(nodes, others);
```

**Nearest To**

Get the nearest element to an X,Y position.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const nearest = dom.nearestTo(nodes, x, y, offset);
```

**Nearest To Node**

Get the nearest element to another element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `others` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
const nearest = dom.nearestToNode(nodes, others);
```

**Percent X**

Get the percentage of an X co-ordinate relative to the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `x` is a distance (in pixels) along the X axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pX = dom.percentX(nodes, x, offset);
```

**Percent Y**

Get the percentage of a Y co-ordinate relative to the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pY = dom.percentY(nodes, y, offset);
```

##### Scroll

**Set Scroll**

Scroll each element to an X,Y position.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
dom.setScroll(nodes, x, y);
```

**Set Scroll X**

Scroll each element to an X position.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `x` is a distance (in pixels) along the X axis to scroll to.

```javascript
dom.setScrollX(nodes, x);
```

**Set Scroll Y**

Scroll each element to a Y position.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
dom.setScrollY(nodes, y);
```

**Get Scroll X**

Get the scroll X position of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.

```javascript
const scrollX = dom.getScrollX(nodes);
```

**Get Scroll Y**

Get the scroll Y position of the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.

```javascript
const scrollY = dom.getScrollY(nodes);
```

##### Size

**Height**

Get the computed height of the first element (and optionally padding, border or margin).

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *false*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const height = dom.height(nodes, padding, border, margin);
```

**Width**

Get the computed width of the first element (and optionally padding, border or margin).

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *false*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const width = dom.width(nodes, padding, border, margin);
```

##### Styles

**Add Class**

Add a class or classes to each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `classes` is an Array of classes, or a space seperated string of class names.

```javascript
dom.addClass(nodes, ...classes);
```

**Remove Class**

Remove a class or classes from each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `classes` is an Array of classes, or a space seperated string of class names.

```javascript
dom.removeClass(nodes, ...classes);
```

**Toggle Class**

Toggle a class or classes for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `classes` is an Array of classes, or a space seperated string of class names.

```javascript
dom.toggleClass(nodes, ...classes);
```

**Get Style**

Get a style property for the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `style` is a string indicating the style property value to return.

```javascript
const style = dom.getStyle(nodes, style);
```

**Set Style**

Set style properties for each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `style` is a string indicating the style property value to set.
- `value` is the value you wish to set the style property to.
- `important` is a boolean indicating the style should be set as important, and will default to *false*.

```javascript
dom.setStyle(nodes, styles);
dom.setStyle(nodes, style, value, important);
```

**Computed Style**

Get the computed style for the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `style` is a string indicating the computed style property value to return.

```javascript
const css = dom.css(nodes, style);
```

**Hide**

Hide each element from display.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.hide(nodes);
```

**Show**

Display each hidden element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.show(nodes);
```

**Toggle**

Toggle the visibility of each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.toggle(nodes);
```

#### Events

**Add Event**

Add an event to each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```javascript
dom.addEvent(nodes, events, callback);
dom.addEvent(nodes, events, delegate, callback);
```

**Add Event Once**

Add a self-destructing event to each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```javascript
dom.addEventOnce(nodes, events, callback);
dom.addEventOnce(nodes, events, delegate, callback);
```

**Remove Event**

Remove an event from each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `events` is a space-separated string of events to remove from the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

```javascript
dom.removeEvent(nodes, events, callback);
dom.removeEvent(nodes, events, delegate, callback);
```

**Trigger Event**

Trigger an event on each element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `events` is a space-separated string of events to trigger on the elements.

```javascript
dom.triggerEvent(nodes, events, data);
```

**Clone Events**

Clone all events from each element to other elements.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.
- `others` is a Query Selector string, an Array of elements, a HTMLElement, HTMLCollection, Document or Window object.

```javascript
dom.cloneEvents(nodes, others);
```

**Blur**

Trigger a blur event on the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.blur(nodes);
```

**Click**

Trigger a click event on the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.click(nodes);
```

**Focus**

Trigger a focus event on the first element.

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.

```javascript
dom.focus(nodes);
```

#### Manipulation

**Create**

Create a new DOM element.

- `tagName` is a string indicating the type of element you wish to create.

```javascript
const element = dom.create(tagName);
```

**Create Comment**

Create a new comment node.

- `comment` is a string indicating the comment.

```javascript
const node = dom.createComment(comment);
```

**Create Text**

Create a new text node.

- `text` is a string indicating the text.

```javascript
const node = dom.createText(text);
```

**Clone**

Clone each node (optionally deep, and with events and data).

- `nodes` is a Query Selector string, an Array of elements, a HTMLElement or HTMLCollection.
- `deep` is a boolean indicating whether you wish to clone all descendent elements, and will default to *true*.
- `eventsDate` is a boolean indicating whether you wish to clone all events and data to the new nodes, and will default to *false*.

```javascript
const clones = dom.clone(nodes, deep, eventsData);
```

**Detach**

Detach an element from the DOM.

- `nodes` is a Query Selector string, an Array of elements, a Node, NodeList or HTMLCollection.

```javascript
dom.detach(nodes);
```

**Empty**

Remove all children of each node from the DOM.

- `nodes` is a Query Selector string, an Array of elements, a Node, NodeList or HTMLCollection.

```javascript
dom.empty(nodes);
```

**Remove**

Remove each node from the DOM.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `deep` is a boolean indicating whether to also remove all descendent elements, and will default to *true*.

```javascript
dom.remove(nodes, deep);
```

**Replace**

Replace each other node with nodes.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.replaceAll(nodes, others);
```

**Replace All**

Replace each node with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.replaceWith(nodes, others);
```

##### Move

**After**

Insert each other node after the first node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.after(nodes, others);
```

**Before**

Insert each other node before the first node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.before(nodes, others);
```

**Insert After**

Insert each node after the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.insertAfter(nodes, others);
```

**Insert Before**

Insert each node before the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.insertBefore(nodes, others);
```

**Append**

Append each other node to the first node.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.append(nodes, others);
```

**Prepend**

Prepend each other node to the first node.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.prepend(nodes, others);
```

**Append To**

Append each node to the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
dom.appendTo(nodes, others);
```

**Prepend To**

Prepend each node to the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
dom.prependTo(nodes, others);
```

##### Wrap

**Unwrap**

Unwrap each node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that must match the parent of each node for it to be unwrapped.

```javascript
dom.unwrap(nodes, filter);
```

**Wrap**

Wrap each nodes with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
dom.wrap(nodes, others);
```

**Wrap All**

Wrap all nodes with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
dom.wrapAll(nodes, others);
```

**Wrap Inner**

Wrap the contents of each node with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
dom.wrapInner(nodes, others);
```

#### Traversal

##### Filter

**Filter**

Return all elements matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = dom.filter(nodes, filter);
```

**Filter One**

Return the first element matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = dom.filterOne(nodes, filter);
```

**Not**

Return all elements not matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = dom.not(nodes, filter);
```

**Has**

Return all elements with a descendent matching a filter.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = dom.has(nodes, filter);
```

**Hidden**

Return all hidden elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const filtered = dom.hidden(nodes);
```

**Visible**

Return all visible elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const filtered = dom.visible(nodes);
```

##### Find

**Find**

Find all elements matching a selector.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `selectors` is an Array or comma-seperated list of standard CSS selectors to search for.

```javascript
const elements = dom.find(selectors);
const descendents = dom.find(nodes, selectors);
```

**Find One**

Find a single element matching a selector.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `selectors` is an Array or comma-seperated list of standard CSS selectors to search for.

```javascript
const element = dom.findOne(selectors);
const descendent = dom.findOne(nodes, selectors);
```

**Find By Class**

Find all elements with a specific class.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `className` is a string indicating the class name to search for.

```javascript
const elements = dom.findByClass(className);
const descendents = dom.findByClass(nodes, className);
```

**Find One By Class**

Find the first element with a specific class.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `className` is a string indicating the class name to search for.

```javascript
const element = dom.findOneByClass(className);
const descendent = dom.findOneByClass(nodes, className);
```

**Find By ID**

Find all elements with a specific ID.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `id` is a string indicating the id to search for.

```javascript
const elements = dom.findById(id);
const descendents = dom.findById(nodes, id);
```

**Find One By ID**

Find the first element with a specific ID.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `id` is a string indicating the id to search for.

```javascript
const element = dom.findOneById(id);
const descendent = dom.findOneById(nodes, id);
```

**Find By Tag**

Find all elements with a specific tag.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `tagName` is a string indicating the tag name to search for.

```javascript
const elements = dom.findByTag(tagName);
const descendents = dom.findByTag(nodes, tagName);
```

**Find One By Tag**

Find the first element with a specific tag.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `tagName` is a string indicating the tag name to search for.

```javascript
const element = dom.findOneByTag(tagName);
const descendent = dom.findOneByTag(nodes, tagName);
```


##### Traversal

**Child**

Find the first child of each element matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const child = dom.child(nodes);
const child = dom.child(nodes, filter);
```

**Children**

Find all children of each element, and optionally matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const children = dom.children(nodes);
const children = dom.children(nodes, filter);
```

**Contents**

Find all child nodes for each element, (including text and comment nodes).

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const contents = dom.contents(nodes);
```

**Closest**

Find the closest ancestor to each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const closest = dom.closest(nodes, filter, until);
```

**Parent**

Find the parent of each element matching a filter.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const parent = dom.parent(nodes, filter);
```

**Parents**

Find all parents of each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const parents = dom.parents(nodes, filter, until);
```

**Offset Parent**

Find the offset parent (relatively positioned) of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const offsetParent = dom.offsetParent(nodes);
```

**Next**

Find the next sibling for each element matching a filter.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const next = dom.next(nodes, filter);
```

**Next All**

Find all next siblings for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const nextAll = dom.nextAll(nodes, filter, until);
```

**Previous**

Find the previous sibling for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const prev = dom.prev(nodes, filter);
```

**Previous All**

Find all previous siblings for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const prevAll = dom.prevAll(nodes, filter, until);
```

**Siblings**

Find all siblings for each element matching a filter.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const siblings = dom.siblings(nodes, filter);
```


#### Utility

##### Tests

**Has Attribute**

Returns true if any of the elements has a specified attribute.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `attribute` is a string indicating the attribute value to test for.

```javascript
dom.hasAttribute(nodes, attribute);
```

**Has Class**

Returns *true* if any of the elements has any of the specified classes.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names to test for.

```javascript
dom.hasClass(nodes, ...classes);
```

**Has Data**

Returns *true* if any of the nodes has custom data.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to test for.

```javascript
dom.hasData(nodes);
dom.hasData(nodes, key);
```

**Has Property**

Returns *true* if any of the elements has a specified property.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `property` is a string indicating the property value to test for.

```javascript
dom.hasProperty(nodes, property);
```

**Contains**

Returns *true* if any of the elements contains a descendent matching a filter.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be tested for.

```javascript
dom.contains(nodes, filter);
```

**Is**

Returns *true* if any of the elements matches a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be tested for.

```javascript
dom.is(nodes, filter);
```

**Is Fixed**

Returns *true* if any of the elements or a parent of any of the elements is "fixed".

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
dom.isFixed(nodes);
```

**Is Hidden**

Returns *true* if any of the elements is hidden.

- `nodes` is a Query Selector string, a Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.isHidden(nodes);
```

**Is Visible**

Returns *true* if any of the elements is visible.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.isVisible(nodes);
```


##### Utility

**Execute**

Execute a command in the current context.

- `command` is the command you are executing.
- `showDefaultUI` is a boolean indicating whether the default user interface be shown.
- `value` is the value to use as the input for commands which require an argument.

```javascript
dom.exec(command, showDefaultUI, value);
```

**Force Show**

Force an element to be temporarily shown, and then execute a callback.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `callback` is a function that accepts a node as a parameter.

```javascript
dom.forceShow(nodes, callback);
```

**Index**

Get the index of the first element matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const index = dom.index(nodes, filter);
```

**Index Of**

Get the index of the first element relative to it's parent element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const indexOf = dom.indexOf(nodes);
```

**Select**

Create a selection on the first node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.select(nodes);
```

**Select All**

Create a selection on all nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
dom.selectAll(nodes);
```

**Serialize**

Returns a serialized string containing names and values of all form elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const serialize = dom.serialize(nodes);
```

**Serialize Array**

Returns a serialized array containing names and values of all form elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const serialArray = dom.serializeArray(nodes);
```

**Serialize Object**

Returns an object containing Key/Value pairs of all form elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const serialObject = dom.serializeObject(nodes);
```


### AJAX

**Ajax**

Perform an XHR request.

- `url` is a string containing the destination URL for the request.
- `data` is an object containing Key/Value pairs of configuration for the request.

If the `url` argument is omitted, and the `data` object does not contain a `url` property, the current Window location will be used by default.

```javascript
dom.ajax(data);
dom.ajax(url, data);
```

**Upload**

Perform an XHR request for a file upload.

- `url` is a string containing the destination URL for the request.
- `data` is an object containing Key/Value pairs of configuration for the request.

If the `url` argument is omitted, and the `data` object does not contain a `url` property, the current Window location will be used by default.

```javascript
dom.upload(data);
dom.upload(url, data);
```

**Load Script**

Load and executes a JavaScript file.

- `script` is a string containing the destination URL for the script to load.

```javascript
dom.loadScript(script);
```

**Load Scripts**

Load and execute multiple JavaScript files (in order).

- `scripts` is a Array of strings containing the destination URLs for the scripts to load.

```javascript
dom.loadScripts(scripts);
```

**Load Stylesheet**

Import A CSS Stylesheet file.

- `stylesheet` is a string containing the destination URL for the stylesheet to load.

```javascript
dom.loadStyle(stylesheet);
```

**Load Stylesheets**

Import multiple CSS Stylesheet files.

- `stylesheets` is a Array of strings containing the destination URLs for the stylesheets to load.

```javascript
dom.loadStyles(stylesheets);
```


### Cookie

**Get Cookie**

Get a cookie value (optionally json encoded).

- `name` is a string containing the name of the cookie value to retrieve.
- `json` is a boolean indicating whether the cookie contains a JSON value, and will default to *false*.

```javascript
const value = dom.getCookie(name, json);
```

**Set Cookie**

Set a cookie (optionally json encoded).

- `name` is a string containing the name of the cookie value to set.
- `value` is the value you wish to set the cookie to.
- `options` is an object containing configuration options for the cookie.
- `json` is a boolean indicating whether to JSON encode the cookie value, and will default to *false*.

```javascript
dom.setCookie(name, value, options, json);
```

**Remove Cookie**

Remove a cookie.

- `name` is a string containing the name of the cookie value to remove.
- `options` is an object containing configuration options for the cookie.

```javascript
dom.removeCookie(name, options);
```


### Event Factory

**Mouse Drag Event Factory**

Create a mouse drag event (optionally limited by animation frame).

- `down` is a function that accepts an event argument, which will be called when the event is started.
- `move` is a function that accepts an event argument, which will be called when the mouse is moved during the event.
- `up` is a function that accepts an event argument, which will be called when the event has ended (mouse button has been released).
- `animated` is a boolean indicating whether to limit the move event to once per animation frame, and will default to *true*.

```javascript
const event = dom.mouseDragFactory(down, move, up, animated);
```


### Parsers

**Parse HTML**

Returns an array containing nodes parsed from a HTML string.

- `html` is a string containing the HTML data to parse.

```javascript
const nodes = dom.parseHTML(html);
```
