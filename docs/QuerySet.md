# QuerySet

The *QuerySet* class provides an immutable jQuery-like wrapper for manipulating DOM elements.


## Table Of Contents
- [Usage](#usage)
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



## Usage

- `nodes` is an array of nodes.

```javascript
const query = new $.QuerySet(nodes);
```


## Animation

**Animate**

Add an animation to the queue for each node.

- `callback` is a function that accepts `node`, `progress` and `options` as arguments, where `node` is a *HTMLElement*, `progress` is a value between *0* and *1* and `options` is the `options` object passed to this method.
- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

```javascript
query.animate(callback, options);
```

**Stop Animations**

Stop all animations and clear the queue of each node.

- `options` is an object containing options for how the animations should be stopped.
    - `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
query.stop(options);
```

### Animations

**Drop In**

Add a drop in animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

```javascript
query.dropIn(options);
```

**Drop Out**

Add a drop out animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

```javascript
query.dropOut(options);
```

**Fade In**

Add a fade in animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

```javascript
query.fadeIn(options);
```

**Fade Out**

Add a fade out animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

```javascript
query.fadeOut(options);
```

**Rotate In**

Add a rotate in animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `z` is the amount of rotation to apply to the Z axis, and will default to *0*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

```javascript
query.rotateIn(options);
```

**Rotate Out**

Add a rotate out animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `x` is the amount of rotation to apply to the X axis, and will default to *0*.
    - `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
    - `z` is the amount of rotation to apply to the Z axis, and will default to *0*.
    - `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

```javascript
query.rotateOut(options);
```

**Slide In**

Add a slide in animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

```javascript
query.slideIn(options);
```

**Slide Out**

Add a slide out animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

```javascript
query.slideOut(options);
```

**Squeeze In**

Add a squeeze in animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

```javascript
query.squeezeIn(options);
```

**Squeeze Out**

Add a squeeze out animation to the queue for each node.

- `options` is an object containing options for how the animation should be handled.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".
    - `direction` is a string or function that returns either "*top*", "*right*", "*bottom*" or "*left*" indicating the direction to drop from, and will default to "*top*".
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either "*ease-in*", "*ease-out*", "*ease-in-out*" or "*linear*" indicating the type of animation to run, and will default to "*ease-in-out*".
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.
    - `useGpu` is a boolean indicating whether the animation should use GPU acceleration (CSS transform) and will default to *true*.

```javascript
query.squeezeOut(options);
```

### Queue

**Clear Queue**

Clear a queue of each node.

- `options` is an object containing options for how the queue should be cleared.
    - `queueName` is a string indicating the name of the queue to clear, and will default to "*null*".

```javascript
query.clearQueue(options);
```

**Delay**

Delay execution of subsequent items in the queue.

- `duration` is the number of milliseconds to delay execution by.
- `options` is an object containing options for how the queue should be added.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".

```javascript
query.delay(duration, options);
```

**Queue**

Queue a callback on each node.

- `callback` is a function that accepts `node` as an argument, where node is a *HTMLElement*. The callback can return a *Promise* which will pause the queue until the promise is resolved.
- `options` is an object containing options for how the queue should be added.
    - `queueName` is a string indicating the name of the queue to use, and will default to "*default*".

```javascript
query.queue(callback, options);
```

If an item in the queue returns a *Promise* that rejects, the queue will be cleared.


## Attributes

**Get Attribute**

Get an attribute value for the first node.

- `attribute` is a string indicating the attribute value to return.

```javascript
const value = query.getAttribute(attribute);
```

If the `attribute` argument is omitted, an object containing all attribute values will be returned instead.

```javascript
const attributes = query.getAttribute();
```

**Get Dataset**

Get a dataset value for the first node.

- `key` is a string indicating the dataset value to return.

```javascript
const value = query.getDataset(key);
```

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```javascript
const dataset = query.getDataset();
```

This method will attempt to convert string values to JS primitives (including booleans, numbers, objects, arrays and null).

**Get HTML**

Get the HTML contents of the first node.

```javascript
const html = query.getHTML();
```

**Get Property**

Get a property value for the first node.

- `property` is a string indicating the property value to return.

```javascript
const value = query.getProperty(property);
```

**Get Text**

Get the text contents of the first node.

```javascript
const text = query.getText();
```

**Get Value**

Get the value property of the first node.

```javascript
const value = query.getValue();
```

**Remove Attribute**

Remove an attribute from each node.

- `attribute` is a string indicating the attribute value to remove.

```javascript
query.removeAttribute(attribute);
```

**Remove Dataset**

Remove a dataset value from each node.

- `key` is a string indicating the dataset value to remove.

```javascript
query.removeDataset(key);
```

**Remove Property**

Remove a property from each node.

- `property` is a string indicating the property value to remove.

```javascript
query.removeProperty(property);
```

**Set Attribute**

Set attributes for each node.

- `attribute` is a string indicating the attribute value to set.
- `value` is the value you want to set the attribute to.

```javascript
query.setAttribute(attribute, value);
```

Alternatively, you can set multiple attributes by passing a single `attributes` object as the argument with key/value pairs of the attributes to set.

```javascript
query.setAttribute(attributes);
```

**Set Dataset**

Set dataset values for each node.

- `key` is a string indicating the dataset value to set.
- `value` is the value you want to set the dataset to.

```javascript
query.setDataset(key, value);
```

Alternatively, you can set multiple dataset properties by passing a single `dataset` object as the argument with key/value pairs of the properties to set.

```javascript
query.setDataset(dataset);
```

This method will convert object and array values to JSON strings.

**Set HTML**

Set the HTML contents for each node.

- `html` is a string that will become the HTML contents of the node.

```javascript
query.setHTML(html);
```

**Set Property**

Set property values for each node.

- `property` is a string indicating the property value to set.
- `value` is the value you want to set the property to.

```javascript
query.setProperty(property, value);
```

Alternatively, you can set multiple properties by passing a single `properties` object as the argument with key/value pairs of the properties to set.

```javascript
query.setProperty(properties);
```

**Set Text**

Set the text contents for each node.

- `text` is a string that will become the text contents of the node.

```javascript
query.setText(text);
```

**Set Value**

Set the value property for each node.

- `value` is a string that will become the value of the node.

```javascript
query.setValue(value);
```

#### Custom Data

**Clone Data**

Clone custom data from each node to each other node.

- `otherSelector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.cloneData(otherSelector);
```

**Get Data**

Get custom data for the first node.

- `key` is a string indicating the custom data value to return.

```javascript
const value = query.getData(key);
```

If the `key` argument is omitted, an object containing all custom data values will be returned instead.

```javascript
const data = query.getData();
```

**Remove Data**

Remove custom data for each node.

- `key` is a string indicating the custom data value to remove.

```javascript
query.removeData(key);
```

**Set Data**

Set custom data for each node.

- `key` is a string indicating the custom data value to set.
- `value` is the value you want to set the attribute to.

```javascript
query.setData(key, value);
```

Alternatively, you can set multiple data values by passing a single `data` object as the argument with key/value pairs of the data to set.

```javascript
query.setData(data);
```

#### Position

**Center**

Get the X,Y co-ordinates for the center of the first node.

- `options` is an object containing options for how the position should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const center = query.center(options);
```

**Constrain**

Constrain each node to a container node.

- `containerSelector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.constrain(containerSelector);
```

**Distance To**

Get the distance of the first node to an X,Y position.

- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `options` is an object containing options for how the distance should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const dist = query.distTo(x, y, options);
```

**Distance To Node**

Get the distance between two nodes.

- `otherSelector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
const dist = query.distToNode(otherSelector);
```

**Nearest To**

Get the nearest node to an X,Y position.

- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `options` is an object containing options for how the distance should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const nearest = query.nearestTo(x, y, options);
```

This method returns a new *QuerySet* containing the nearest node.

**Nearest To Node**

Get the nearest node to another node.

- `otherSelector` is a query selector string, a *HTMLElement*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
const nearest = query.nearestToNode(otherSelector);
```

This method returns a new *QuerySet* containing the nearest node.

**Percent X**

Get the percentage of an X co-ordinate relative to the first node.

- `x` is a distance (in pixels) along the X axis.
- `options` is an object containing options for how the percent should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.
    - `clamp` is a boolean indicating whether to clamp the percent betwen *0* and *100*, and will default to *true*.

```javascript
const percentX = query.percentX(x, options);
```

**Percent Y**

Get the percentage of a Y co-ordinate relative to the first node.

- `y` is a distance (in pixels) along the Y axis.
- `options` is an object containing options for how the percent should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.
    - `clamp` is a boolean indicating whether to clamp the percent betwen *0* and *100*, and will default to *true*.

```javascript
const percentY = query.percentY(y, options);
```

**Position**

Get the X,Y position for the top/left of the first node.

- `options` is an object containing options for how the position should be calculated.
    - `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const position = query.position(options);
```

**Rectangle**

Get the computed bounding rectangle of the first node.

- `options` is an object containing options for how the bounding rectangle should be calculated.
    - `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```javascript
const rect = query.rect(options);
```

#### Scroll

**Get Scroll X**

Get the scroll X position of the first node.

```javascript
const scrollX = query.getScrollX();
```

**Get Scroll Y**

Get the scroll Y position of the first node.

```javascript
const scrollY = query.getScrollY();
```

**Set Scroll**

Scroll each node to an X,Y position.

- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
query.setScroll(x, y);
```

**Set Scroll X**

Scroll each element to an X node.

- `x` is a distance (in pixels) along the X axis to scroll to.

```javascript
query.setScrollX(x);
```

**Set Scroll Y**

Scroll each element to a Y node.

- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
query.setScrollY(y);
```

#### Size

**Height**

Get the computed height of the first node.

- `options` is an object containing options for how the height should be calculated.
    - `boxSize` is a number indicating the box sizing to calculate. Allowed values are *0* (no padding), *1* (padding), *2* (padding and border), *3* (padding, border and margin) and *4* (scroll area), and will default to *1*.
    - `outer` is a boolean indicating whether to use the window outer height, and will default to *false*.

```javascript
const height = query.height(options);
```

The following constants can also be used as the `boxSize` for brevity.
- `$.CONTENT_BOX`
- `$.PADDING_BOX`
- `$.BORDER_BOX`
- `$.MARGIN_BOX`
- `$.SCROLL_BOX`

**Width**

Get the computed width of the first node.

- `options` is an object containing options for how the width should be calculated.
    - `boxSize` is a number indicating the box sizing to calculate. Allowed values are *0* (no padding), *1* (padding), *2* (padding and border), *3* (padding, border and margin) and *4* (scroll area), and will default to *1*.
    - `outer` is a boolean indicating whether to use the window outer height, and will default to *false*.

```javascript
const width = query.width(options);
```

The following constants can also be used as the `boxSize` for brevity.
- `$.CONTENT_BOX`
- `$.PADDING_BOX`
- `$.BORDER_BOX`
- `$.MARGIN_BOX`
- `$.SCROLL_BOX`

##### Styles

**Add Class**

Add a class or classes to each node.

- `classes` is an array of classes, or a space seperated string of class names.

```javascript
query.addClass(...classes);
```

**Computed Style**

Get the computed style for the first node.

- `style` is a string indicating the computed style property value to return.

```javascript
const value = query.css(style);
```

If the `style` argument is omitted, an object containing all computed style values will be returned instead.

```javascript
const css = query.css();
```

**Get Style**

Get a style property for the first node.

- `style` is a string indicating the style property value to return.

```javascript
const value = query.getStyle(style);
```

If the `style` argument is omitted, an object containing all style values will be returned instead.

```javascript
const styles = query.getStyle();
```

**Hide**

Hide each element from display.

```javascript
query.hide();
```

**Remove Class**

Remove a class or classes from each node.

- `classes` is an array of classes, or a space seperated string of class names.

```javascript
query.removeClass(...classes);
```

**Remove Style**

Remove a style property from each node.

- `style` is a string indicating the style property to remove.

```javascript
query.removeStyle(style);
```

**Set Style**

Set style properties for each node.

- `style` is a string indicating the style property value to set.
- `value` is the value you wish to set the style property to.
- `options` is an object containing options for how the style should be applied.
    - `important` is a boolean indicating the style should be set as important, and will default to *false*.

```javascript
query.setStyle(style, value, options);
```

Alternatively, you can set multiple style properties by passing a single `styles` object as the argument with key/value pairs of the styles to set.

```javascript
query.setStyle(styles);
```

**Show**

Display each hidden node.

```javascript
query.show();
```

**Toggle**

Toggle the visibility of each node.

```javascript
query.toggle();
```

**Toggle Class**

Toggle a class or classes for each node.

- `classes` is an array of classes, or a space seperated string of class names.

```javascript
query.toggleClass(...classes);
```


### Events

**Blur**

Trigger a blur event on the first node.

```javascript
query.blur();
```

**Click**

Trigger a click event on the first node.

```javascript
query.click();
```

**Focus**

Trigger a focus event on the first node.

```javascript
query.focus();
```

#### Event Handlers

**Add Event**

Add events to each node.

- `events` is a space-separated string of events to attach to the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
query.addEvent(events, options);
```

**Add Event Delegate**

Add delegated events to each node.

- `events` is a space-separated string of events to attach to the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
query.addEventDelegate(events, delegate, callback, options);
```

**Add Event Delegate Once**

Add self-destructing delegated events to each node.

- `events` is a space-separated string of events to attach to the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
query.addEventDelegateOnce(events, delegate, callback, options);
```

**Add Event Once**

Add self-destructing events to each node.

- `events` is a space-separated string of events to attach to the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be added.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *false*.
    - `passive` is a boolean indicating whether to use a passive event, and will default to *false*.

```javascript
query.addEventOnce(events, callback, options);
```

**Clone Events**

Clone all events from each node to other nodes.

- `otherSelector` is a query selector string, a *HTMLElement*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.cloneEvents(otherSelector);
```

**Remove Event**

Remove events from each node.

- `events` is a space-separated string of events to remove from the nodes.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be removed.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *null*.

```javascript
query.removeEvent(events, callback, options);
```

If the `events`, `callback` or `capture` arguments are omitted, this method will remove all matching events from each node.

**Remove Event Delegate**

Remove delegated events from each node.

- `events` is a space-separated string of events to remove from the nodes.
- `delegate` is a query selector string which will only trigger the event if it is propagated by a target matching the selector.
- `callback` is a function that accepts an `event` argument, which will be called when the event is triggered.
- `options` is an object containing options for how the event should be removed.
    - `capture` is a boolean indicating whether to use a capture event, and will default to *null*.

```javascript
query.removeEventDelegate(events, delegate, callback, options);
```

**Trigger Event**

Trigger events on each node.

- `events` is a space-separated string of events to trigger on the nodes.
- `options` is an object containing creating the new event.
    - `data` can be used to attach additional data to the event.
    - `detail` can be used to attach additional details to the event.
    - `bubbles` is a boolean indicating whether the event should bubble, and will default to *true*.
    - `cancelable` is a boolean indicating whether the event is cancelable, and will default to *true*.

```javascript
query.triggerEvent(events, options);
```

**Trigger One**

Trigger an event on the first node.

- `event` is an event to trigger on the nodes.
- `options` is an object containing creating the new event.
    - `data` can be used to attach additional data to the event.
    - `detail` can be used to attach additional details to the event.
    - `bubbles` is a boolean indicating whether the event should bubble, and will default to *true*.
    - `cancelable` is a boolean indicating whether the event is cancelable, and will default to *true*.

```javascript
const cancelled = !query.triggerOne(event, options);
```

This method returns *false* if the event was cancelled, otherwise returns *true*.


### Manipulation

**Clone**

Clone each node (optionally deep, and with events and data).

- `options` is an object containing options for how to clone the nodes.
    - `deep` is a boolean indicating whether to also clone child nodes, and will default to *true*.
    - `events` is a boolean indicating whether to also clone events, and will default to *false*.
    - `data` is a boolean indicating whether to also clone data, and will default to *false*.
    - `animations` is a boolean indicating whether to also clone animations, and will default to *false*.

```javascript
const clones = query.clone(options);
```

This method returns a new *QuerySet* containing the cloned nodes.

**Detach**

Detach each node from the DOM.

```javascript
query.detach();
```

**Empty**

Remove all children of each node from the query.

```javascript
query.empty();
```

**Remove**

Remove each node from the DOM.

```javascript
query.remove();
```

**Replace All**

Replace each other node with nodes.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement* *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.replaceAll(otherSelector);
```

If a node you are replacing with is a *DocumentFragment*, the fragment contents will be used as a replacement.

If multiple nodes are being replaced, cloned nodes will be created for each except for the last one.

All events, data and animations will be removed from each node that is replaced.

**Replace With**

Replace each node with other nodes.

- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.replaceWith(otherSelector);
```

If a node you are replacing with is a *DocumentFragment*, the fragment contents will be used as a replacement.

If multiple nodes are being replaced, cloned nodes will be created for each except for the last one.

All events, data and animations will be removed from each node that is replaced.

##### Create

**Attach Shadow**

Attach a shadow DOM tree to the first node.

- `options` is an object containing options for how the shadow should be attached.
    - `open` is a boolean indicating whether the nodes are accessible from JavaScript outside the root, and will default to *true*.

```javascript
const shadow = query.attachShadow(options);
```

This method returns a new *QuerySet* containing the *ShadowRoot*.

#### Move

**After**

Insert each other node after the first node.

- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.after(otherSelector);
```

If the node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Append**

Append each other node to the first node.

- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.append(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Append To**

Append each node to the first other node.

- `otherSelector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.appendTo(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Before**

Insert each other node before the first node.

- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.before(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Insert After**

Insert each node after the first other node.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.insertAfter(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Insert Before**

Insert each node before the first other node.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.insertBefore(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Prepend**

Prepend each other node to the first node.

- `otherSelector` is a query selector string, a HTML string, a *Node*, *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.prepend(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

**Prepend To**

Prepend each node to the first other node.

- `otherSelector` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.prependTo(otherSelector);
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

If multiple copies of the nodes are being moved, cloned nodes will be created for each except for the last one.

#### Wrap

**Unwrap**

Unwrap each node.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that must match the parent of each node for it to be unwrapped.

```javascript
query.unwrap(nodeFilter);
```

**Wrap**

Wrap each nodes with other nodes.

- `otherSelector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.wrap(otherSelector);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.

**Wrap All**

Wrap all nodes with other nodes.

- `otherSelector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.wrapAll(otherSelector);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.

**Wrap Inner**

Wrap the contents of each node with other nodes.

- `otherSelector` is a query selector string, a HTML string, a *HTMLElement*, *DocumentFragment*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
query.wrapInner(otherSelector);
```

If a node you are wrapping with is a *DocumentFragment*, the contents will be used to wrap instead.


### Traversal

**Child**

Find the first child of each node (optionally matching a filter).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const newQuery = query.child(nodeFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Children**

Find all children of each node (optionally matching a filter).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const newQuery = query.children(nodeFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Closest**

Find the closest ancestor to each node (optionally matching a filter, and before a limit).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that when matched will stop the search, and will default to *false*.

```javascript
const newQuery = query.closest(nodeFilter, limitFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Common Ancestor**

Find the common ancestor of all nodes.

```javascript
const newQuery = query.commonAncestor();
```

This method returns a new *QuerySet* containing the traversed node.

**Contents**

Find all children of each node (including text and comment nodes).

```javascript
const newQuery = query.contents();
```

This method returns a new *QuerySet* containing the traversed nodes.

**Fragment**

Return the *DocumentFragment* of the first node.

```javascript
const newQuery = query.fragment();
```

This method returns a new *QuerySet* containing the traversed node.

**Next**

Find the next sibling for each node (optionally matching a filter).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const newQuery = query.next(nodeFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Next All**

Find all next siblings for each node (optionally matching a filter, and before a limit).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that when matched will stop the search, and will default to *false*.
- `options` is an object containing options for how the siblings should be traversed.
    - `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const newQuery = query.nextAll(nodeFilter, limitFilter, options);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Offset Parent**

Find the offset parent (relatively positioned) of the first node.

```javascript
const newQuery = query.offsetParent();
```

This method returns a new *QuerySet* containing the traversed node.

**Parent**

Find the parent of each node (optionally matching a filter).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const newQuery = query.parent(nodeFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Parents**

Find all parents of each node (optionally matching a filter, and before a limit).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that when matched will stop the search, and will default to *false*.
- `options` is an object containing options for how the parents should be traversed.
    - `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const newQuery = query.parents(nodeFilter, limitFilter, options);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Previous**

Find the previous sibling for each node (optionally matching a filter).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const newQuery = query.prev(nodeFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Previous All**

Find all previous siblings for each node (optionally matching a filter, and before a limit).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.
- `limitFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that when matched will stop the search, and will default to *false*.
- `options` is an object containing options for how the siblings should be traversed.
    - `first` is a boolean indicating whether to only return the first matching node for each node, and will default to *false*.

```javascript
const newQuery = query.prevAll(nodeFilter, limitFilter, options);
```

This method returns a new *QuerySet* containing the traversed nodes.

**Shadow**

Return the *ShadowRoot* of the first node.

```javascript
const newQuery = query.shadow();
```

This method returns a new *QuerySet* containing the traversed node.

**Siblings**

Find all siblings for each node (optionally matching a filter).

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by, and will default to *false*.

```javascript
const newQuery = query.siblings(nodeFilter);
```

This method returns a new *QuerySet* containing the traversed nodes.

#### Filter

**Connected**

Find all nodes connected to the DOM.

```javascript
const newQuery = query.connected();
```

This method returns a new *QuerySet* containing the filtered nodes.

**Equal**

Find all nodes considered equal to any of the other nodes.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
const newQuery = query.equal(otherSelector);
```

This method returns a new *QuerySet* containing the filtered nodes.

**Filter**

Find all nodes matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by.

```javascript
const newQuery = query.filter(nodeFilter);
```

This method returns a new *QuerySet* containing the filtered nodes.

**Filter One**

Find the first node matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by.

```javascript
const newQuery = query.filterOne(nodeFilter);
```

This method returns a new *QuerySet* containing the filtered node.

**Fixed**

Find all "fixed" nodes.

```javascript
const newQuery = query.fixed();
```

This method returns a new *QuerySet* containing the filtered nodes.

**Hidden**

Find all hidden nodes.

```javascript
const newQuery = query.hidden();
```

This method returns a new *QuerySet* containing the filtered nodes.

**Not**

Find all nodes not matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by.

```javascript
const newQuery = query.not(nodeFilter);
```

This method returns a new *QuerySet* containing the filtered nodes.

**Not One**

Find the first node not matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by.

```javascript
const newQuery = query.notOne(nodeFilter);
```

This method returns a new *QuerySet* containing the filtered node.

**Same**

Find all nodes considered identical to any of the other nodes.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
const newQuery = query.same(otherSelector);
```

This method returns a new *QuerySet* containing the filtered nodes.

**Visible**

Find all visible nodes.

```javascript
const newQuery = query.visible();
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Animation**

Find all nodes with an animation.

```javascript
const newQuery = query.withAnimation();
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Attribute**

Find all nodes with a specified attribute.

- `attribute` is a string indicating the attribute value to test for.

```javascript
const newQuery = query.withAttribute(attribute);
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Children**

Find all nodes with child elements.

```javascript
const newQuery = query.withChildren();
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Class**

Find all nodes with any of the specified classes.

- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const newQuery = query.withClass(classes);
```

This method returns a new *QuerySet* containing the filtered nodes.

**With CSS Animation**

Find all nodes with a CSS animation.

```javascript
const newQuery = query.withCSSAnimation();
```

This method returns a new *QuerySet* containing the filtered nodes.

**With CSS Transition**

Find all nodes with a CSS transition.

```javascript
const newQuery = query.withCSSTransition();
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Data**

Find all nodes with custom data.

- `key` is a string indicating the custom data value to test for.

```javascript
const newQuery = query.withData(key);
```

If the `key` argument is omitted, this method will find all nodes with any custom data.

```javascript
const newQuery = query.withData();
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Descendent**

Find all elements with a descendent matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be filtered by.

```javascript
const newQuery = query.withDescendent(nodeFilter);
```

This method returns a new *QuerySet* containing the filtered nodes.

**With Property**

Find all nodes with a specified property.

- `property` is a string indicating the property value to test for.

```javascript
const newQuery = query.withProperty(property);
```

This method returns a new *QuerySet* containing the filtered nodes.

#### Find

**Find**

Find all descendent nodes matching a selector.

- `selector` is a query selector string to search for.

```javascript
const newQuery = query.find(selector);
```

This method returns a new *QuerySet* containing the matching nodes.

**Find By Class**

Find all descendent nodes with a specific class.

- `className` is a string indicating the class name to search for.

```javascript
const newQuery = query.findByClass(className);
```

This method returns a new *QuerySet* containing the matching nodes.

**Find By ID**

Find all nodes with a specific ID.

- `id` is a string indicating the id to search for.

```javascript
const newQuery = query.findById(id);
```

This method returns a new *QuerySet* containing the matching nodes.

**Find By Tag**

Find all nodes with a specific tag.

- `tagName` is a string indicating the tag name to search for.

```javascript
const newQuery = query.findByTag(tagName);
```

This method returns a new *QuerySet* containing the matching nodes.

**Find One**

Find the first node matching a selector.

- `selector` is a query selector string to search for.

```javascript
const newQuery = query.findOne(selector);
```

This method returns a new *QuerySet* containing the matching node.

**Find One By Class**

Find the first node with a specific class.

- `className` is a string indicating the class name to search for.

```javascript
const newQuery = query.findOneByClass(className);
```

This method returns a new *QuerySet* containing the matching node.

**Find One By ID**

Find the first node with a specific ID.

- `id` is a string indicating the id to search for.

```javascript
const newQuery = query.findOneById(id);
```

This method returns a new *QuerySet* containing the matching node.

**Find One By Tag**

Find the first node with a specific tag.

- `tagName` is a string indicating the tag name to search for.

```javascript
const newQuery = query.findOneByTag(tagName);
```

This method returns a new *QuerySet* containing the matching node.


### Utility

**Add**

Merge with new nodes and sort the results.

- `selector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *Window*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.
- `context` is a query selector string, a *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *Document*, *HTMLCollection*, *QuerySet* or an array of nodes, and will default to the *Document* context.

```javascript
const newQuery = query.add(selector, context);
```

This method returns a new *QuerySet* containing the merged nodes.

**Each**

Execute a function for each node in the set.

- `callback` is a function that accepts a `node` and `index` as arguments.

```javascript
query.each(callback);
```

**Eq**

Reduce the set of nodes to the one at the specified index.

- `index` is the index of the node.

```javascript
const newQuery = query.eq(index);
```

This method returns a new *QuerySet* containing the filtered nodes.

**First**

Reduce the set of nodes to the first.

```javascript
const newQuery = query.first();
```

This method returns a new *QuerySet* containing the filtered node.

**Get**

Retrieve the DOM node(s) contained in the QuerySet.

- `index` is the index of the node.

```javascript
const node = query.get(index);
```

If no `index` argument is supplied, this method will return the internal array containing all the nodes in the set.

```javascript
const nodes = query.get();
```

**Index**

Get the index of the first node relative to it's parent node.

```javascript
const index = query.index();
```

**Index Of**

Get the index of the first node matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be tested for.

```javascript
const indexOf = query.indexOf(nodeFilter);
```

**Last**

Reduce the set of nodes to the last.

```javascript
const newQuery = query.last();
```

This method returns a new *QuerySet* containing the filtered node.

**Map**

Execute a function for each node in the set.

- `callback` is a function that accepts a `node` and `index` as arguments.

```javascript
const newQuery = query.map(callback);
```

This method returns a new *QuerySet* containing the mapped nodes.

**Normalize**

Normalize nodes (remove empty text and join adjacent text nodes).

```javascript
query.normalize();
```

**Serialize**

Returns a serialized string containing names and values of all form nodes.

```javascript
const serialized = query.serialize();
```

**Serialize Array**

Returns a serialized array containing names and values of all form nodes.

```javascript
const serializedArray = query.serializeArray();
```

**Slice**

Reduce the set of matched elements to a subset specified by a range of indices.

- `begin` is a number indicating the index to begin slicing from, and will default to *0*.
- `end` is a number indicating the index to end slicing, and will default to the length of the set. 

```javascript
const newQuery = query.slice(begin, end);
```

This method returns a new *QuerySet* containing the sliced nodes.

**Sort**

Sort nodes by their position in the document.

```javascript
const newQuery = query.sort();
```

This method returns a new *QuerySet* containing the sorted nodes.

**Tag Name**

Return the tag name (lowercase) of the first node.

```javascript
const tagName = query.tagName();
```

**[Symbol.iterator]**

Return an iterable from the elements.

This method allows the *QuerySet* to be used in a `for...of` loop.

```javascript
for (const node of query) {
    console.log(node);
}
```

##### Selection

**After Selection**

Insert each node after the selection.

```javascript
query.afterSelection();
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Before Selection**

Insert each node before the selection.

```javascript
query.beforeSelection();
```

If a node you are moving is a *DocumentFragment*, the contents will be moved instead.

**Select**

Create a selection on the first node.

```javascript
query.select();
```

**Select All**

Create a selection on all nodes.

```javascript
query.selectAll();
```

**Wrap Selection**

Wrap selected nodes with other nodes.

```javascript
query.wrapSelection();
```

#### Tests

**Has Animation**

Returns *true* if any of the nodes has an animation.

```javascript
const hasAnimation = query.hasAnimation();
```

**Has Attribute**

Returns *true* if any of the nodes has a specified attribute.

- `attribute` is a string indicating the attribute value to test for.

```javascript
const hasAttribute = query.hasAttribute(attribute);
```

**Has Children**

Returns *true* if any of the nodes has child nodes.

```javascript
const hasChildren = query.hasChildren();
```

**Has Class**

Returns *true* if any of the nodes has any of the specified classes.

- `classes` is an array of classes, or a space seperated string of class names to test for.

```javascript
const hasClass = query.hasClass(...classes);
```

**Has CSS Animation**

Returns *true* if any of the nodes has a CSS animation.

```javascript
const hasCSSAnimation = query.hasCSSAnimation();
```

**Has CSS Transition**

Returns *true* if any of the nodes has a CSS transition.

```javascript
const hasCSSTransition = query.hasCSSTransition();
```

**Has Data**

Returns *true* if any of the nodes has custom data.

- `key` is a string indicating the custom data value to test for.

```javascript
const hasData = query.hasData(key);
```

If the `key` argument is omitted, this method will return *true* if any of the nodes has any custom data.

```javascript
query.hasData();
```

**Has Dataset**

Returns *true* if any of the nodes has a specified dataset value.

- `key` is a string indicating the custom dataset value to test for.

```javascript
const hasDataset = query.hasDataset(key);
```

**Has Descendent**

Returns *true* if any of the nodes contains a descendent matching a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be tested for.

```javascript
const hasDescendent = query.hasDescendent(nodeFilter);
```

**Has Property**

Returns *true* if any of the nodes has a specified property.

- `property` is a string indicating the property value to test for.

```javascript
const hasProperty = query.hasProperty(property);
```

**Is**

Returns *true* if any of the nodes matches a filter.

- `nodeFilter` is either a function that accepts a `node` argument, a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes that the nodes will be tested for.

```javascript
const is = query.is(nodeFilter);
```

**Is Connected**

Returns *true* if any of the nodes is connected to the DOM.

```javascript
const isConnected = query.isConnected();
```

**Is Equal**

Returns *true* if any of the nodes is considered equal to any of the other nodes.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.
- `options` is an object containing options for how to perform the comparison.
    - `shallow` is a boolean indicating whether to perform a shallow comparison, and will default to *false*.

```javascript
const isEqual = query.isEqual(otherSelector, options);
```

**Is Fixed**

Returns *true* if any of the nodes or a parent of any of the nodes is "fixed".

```javascript
const isFixed = query.isFixed();
```

**Is Hidden**

Returns *true* if any of the nodes is hidden.

```javascript
const isHidden = query.isHidden();
```

**Is Same**

Returns *true* if any of the nodes is considered identical to any of the other nodes.

- `otherSelector` is a query selector string, a *Node*, *HTMLElement*, *DocumentFragment*, *ShadowRoot*, *NodeList*, *HTMLCollection*, *QuerySet* or an array of nodes.

```javascript
const isSame = query.isSame(otherSelector);
```

**Is Visible**

Returns *true* if any of the nodes is visible.

```javascript
const isVisible = query.isVisible();
```