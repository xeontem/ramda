'use strict';

import { 
  I,
  B, K, C,
  debug
} from './';
// ------------------ Functors ------------------------
export const Constant = () => a2 => ({
  show: K(a2),
  map: f => Constant()(a2)
});
//                   f       get(tar)  
export const Apply = func => tar => ({
  show: K(func(tar)),
  map: f => Apply(K(f(func(tar))))(tar)
});
//------------------------------------------------------
