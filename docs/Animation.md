## Animation

The *Animation* class provides a Promise-based wrapper for performing animations.

- `node` is a *HTMLElement*
- `callback` is a function that accepts `node`, `progress` and `options` as arguments, where `node` is a *HTMLElement*, `progress` is a value between *0* and *1* and `options` is the `options` object passed to this method.
- `options` is an object containing options for how the animation should be handled.
    - `duration` is the number of milliseconds that the animation should last, and will default to *1000*.
    - `type` is a string of either *ease-in*, *ease-out*, *ease-in-out* or *linear* indicating the type of animation to run, and will default to *ease-in-out*.
    - `infinite` is a boolean indicating whether the animation should continue forever, and will default to *false*.

```javascript
const animation = new $.Animation(node, callback, options);
```

The *Animation* object resolves when the animation is completed, or rejects if it is stopped without finishing.

### Stopping An Animation

It is also possible to stop a running *Animation*.

- `options` is an object containing options for how the animation should be stopped.
    - `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
animation.stop(options);
```


## Animation Set

The *AnimationSet* class provides a Promise-based wrapper for performing a set of animations.

- `animations` is an array of *Animation* objects.

```javascript
const animationSet = new $.AnimationSet(animations);
```

The *AnimationSet* object resolves when the animations are completed, or rejects if it is stopped without finishing.

### Stopping Animations

It is also possible to stop a running *AnimationSet*.

- `options` is an object containing options for how the animations should be stopped.
    - `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
animationSet.stop(options);
```