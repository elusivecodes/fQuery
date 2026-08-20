import { isWindow } from '@fr0st/core';
import $ from './fquery.js';
import { registerGlobals } from './globals.js';

const register = (window, document) => registerGlobals(window, document, $);

export default isWindow(globalThis) ?
    register(globalThis) :
    register;
