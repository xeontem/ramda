'use strict';

import { K, debug } from './';
const registry = [];
window.registry = registry;
export const register = fb => error => K(fb)(registry.push(error));