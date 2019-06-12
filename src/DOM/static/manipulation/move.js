/**
 * DOM (Static) Move
 */

Object.assign(DOM, {

    _insertBefore(parentNode, newNode, referenceNode = null) {
        parentNode.insertBefore(newNode, referenceNode);
    }

});
