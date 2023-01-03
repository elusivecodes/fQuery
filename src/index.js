import { isWindow } from '@fr0st/core';
import { registerGlobals } from './globals.js';

export default isWindow(globalThis) ? registerGlobals(globalThis) : registerGlobals;
