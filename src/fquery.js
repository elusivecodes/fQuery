import * as _ from '@fr0st/core';
import { getAjaxDefaults, getAnimationDefaults, getContext, getWindow, setAjaxDefaults, setAnimationDefaults, setContext, setWindow, useTimeout } from './config.js';
import { noConflict } from './globals.js';
import { BORDER_BOX, CONTENT_BOX, MARGIN_BOX, PADDING_BOX, SCROLL_BOX } from './vars.js';
import { ajax, _delete, get, patch, post, put } from './ajax/ajax.js';
import { parseFormData, parseParams } from './ajax/helpers.js';
import { animate, stop } from './animation/animate.js';
import Animation from './animation/animation.js';
import AnimationSet from './animation/animation-set.js';
import { dropIn, dropOut, fadeIn, fadeOut, rotateIn, rotateOut, slideIn, slideOut, squeezeIn, squeezeOut } from './animation/animations.js';
import { getAttribute, getDataset, getHTML, getProperty, getText, getValue, removeAttribute, removeDataset, removeProperty, setAttribute, setDataset, setHTML, setProperty, setText, setValue } from './attributes/attributes.js';
import { cloneData, getData, removeData, setData } from './attributes/data.js';
import { center, constrain, distTo, distToNode, nearestTo, nearestToNode, percentX, percentY, position, rect } from './attributes/position.js';
import { getScrollX, getScrollY, setScroll, setScrollX, setScrollY } from './attributes/scroll.js';
import { height, width } from './attributes/size.js';
import { addClass, css, getStyle, hide, removeClass, setStyle, show, toggle, toggleClass } from './attributes/styles.js';
import { getCookie, removeCookie, setCookie } from './cookie/cookie.js';
import { mouseDragFactory } from './events/event-factory.js';
import { addEvent, addEventDelegate, addEventDelegateOnce, addEventOnce, cloneEvents, removeEvent, removeEventDelegate, triggerEvent, triggerOne } from './events/event-handlers.js';
import { blur, click, focus, ready } from './events/events.js';
import { attachShadow, create, createComment, createFragment, createRange, createText } from './manipulation/create.js';
import { clone, detach, empty, remove, replaceAll, replaceWith } from './manipulation/manipulation.js';
import { after, append, appendTo, before, insertAfter, insertBefore, prepend, prependTo } from './manipulation/move.js';
import { unwrap, wrap, wrapAll, wrapInner } from './manipulation/wrap.js';
import { parseDocument, parseHTML } from './parser/parser.js';
import { query, queryOne } from './query/query.js';
import QuerySet from './query/query-set.js';
import { clearQueue, queue } from './queue/queue.js';
import { loadScript, loadScripts } from './scripts/scripts.js';
import { loadStyle, loadStyles } from './styles/styles.js';
import { connected, equal, filter, filterOne, fixed, hidden, not, notOne, same, visible, withAnimation, withAttribute, withChildren, withClass, withCSSAnimation, withCSSTransition, withData, withDescendent, withProperty } from './traversal/filter.js';
import { find, findByClass, findById, findByTag, findOne, findOneByClass, findOneById, findOneByTag } from './traversal/find.js';
import { child, children, closest, commonAncestor, contents, fragment, next, nextAll, offsetParent, parent, parents, prev, prevAll, shadow, siblings } from './traversal/traversal.js';
import { sanitize } from './utility/sanitize.js';
import { afterSelection, beforeSelection, extractSelection, getSelection, select, selectAll, wrapSelection } from './utility/selection.js';
import { hasAnimation, hasAttribute, hasChildren, hasClass, hasCSSAnimation, hasCSSTransition, hasData, hasDataset, hasDescendent, hasFragment, hasProperty, hasShadow, is, isConnected, isEqual, isFixed, isHidden, isSame, isVisible } from './utility/tests.js';
import { exec, index, indexOf, normalize, serialize, serializeArray, sort, tagName } from './utility/utility.js';

Object.assign(query, {
    ..._,
    BORDER_BOX,
    CONTENT_BOX,
    MARGIN_BOX,
    PADDING_BOX,
    SCROLL_BOX,
    Animation,
    AnimationSet,
    QuerySet,
    addClass,
    addEvent,
    addEventDelegate,
    addEventDelegateOnce,
    addEventOnce,
    after,
    afterSelection,
    ajax,
    animate,
    append,
    appendTo,
    attachShadow,
    before,
    beforeSelection,
    blur,
    center,
    child,
    children,
    clearQueue,
    click,
    clone,
    cloneData,
    cloneEvents,
    closest,
    commonAncestor,
    connected,
    constrain,
    contents,
    create,
    createComment,
    createFragment,
    createRange,
    createText,
    css,
    delete: _delete,
    detach,
    distTo,
    distToNode,
    dropIn,
    dropOut,
    empty,
    equal,
    exec,
    extractSelection,
    fadeIn,
    fadeOut,
    filter,
    filterOne,
    find,
    findByClass,
    findById,
    findByTag,
    findOne,
    findOneByClass,
    findOneById,
    findOneByTag,
    fixed,
    focus,
    fragment,
    get,
    getAjaxDefaults,
    getAnimationDefaults,
    getAttribute,
    getContext,
    getCookie,
    getData,
    getDataset,
    getHTML,
    getProperty,
    getScrollX,
    getScrollY,
    getSelection,
    getStyle,
    getText,
    getValue,
    getWindow,
    hasAnimation,
    hasAttribute,
    hasCSSAnimation,
    hasCSSTransition,
    hasChildren,
    hasClass,
    hasData,
    hasDataset,
    hasDescendent,
    hasFragment,
    hasProperty,
    hasShadow,
    height,
    hidden,
    hide,
    index,
    indexOf,
    insertAfter,
    insertBefore,
    is,
    isConnected,
    isEqual,
    isFixed,
    isHidden,
    isSame,
    isVisible,
    loadScript,
    loadScripts,
    loadStyle,
    loadStyles,
    mouseDragFactory,
    nearestTo,
    nearestToNode,
    next,
    nextAll,
    noConflict,
    normalize,
    not,
    notOne,
    offsetParent,
    parent,
    parents,
    parseDocument,
    parseFormData,
    parseHTML,
    parseParams,
    patch,
    percentX,
    percentY,
    position,
    post,
    prepend,
    prependTo,
    prev,
    prevAll,
    put,
    query,
    queryOne,
    queue,
    ready,
    rect,
    remove,
    removeAttribute,
    removeClass,
    removeCookie,
    removeData,
    removeDataset,
    removeEvent,
    removeEventDelegate,
    removeProperty,
    replaceAll,
    replaceWith,
    rotateIn,
    rotateOut,
    same,
    sanitize,
    select,
    selectAll,
    serialize,
    serializeArray,
    setAjaxDefaults,
    setAnimationDefaults,
    setAttribute,
    setContext,
    setCookie,
    setData,
    setDataset,
    setHTML,
    setProperty,
    setScroll,
    setScrollX,
    setScrollY,
    setStyle,
    setText,
    setValue,
    setWindow,
    shadow,
    show,
    siblings,
    slideIn,
    slideOut,
    sort,
    squeezeIn,
    squeezeOut,
    stop,
    tagName,
    toggle,
    toggleClass,
    triggerEvent,
    triggerOne,
    unwrap,
    useTimeout,
    visible,
    width,
    withAnimation,
    withAttribute,
    withCSSAnimation,
    withCSSTransition,
    withChildren,
    withClass,
    withData,
    withDescendent,
    withProperty,
    wrap,
    wrapAll,
    wrapInner,
    wrapSelection,
});

export default query;
