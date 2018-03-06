'use strict';

import {
  fmap,
  show,
  show2,
  condL,
  Apply,
  debug,
  I, S, K,
  C, B, W,
  includes,
  Constant,
  register,
} from './';

// B(C(B))(C(B)) === W(B)(C(B)) === S(W)(C)(B)
// export const lens = B(C(B)(B(S)(B(B(fmap(C))))))(S(W)(C)(B));
export const lens = get => set => toFunctor => target => fmap(C(set)(target))(toFunctor(get(target)));
export const view = lens => S(t => ct => show(lens(ct)(t)))(Constant);
export const over = lens => func => target => show(lens(Apply(func))(target));
// export const set = lens => val => target => show(lens(Apply(K(val)))(target));
export const set = B(C(B)(K))(over);

// methods to work with lenses inside arrays without full application
export const viewMap = toFunctor => t => Constant()(fmap(B(show)(toFunctor))(t));
export const overMap = toFunctor => t => Apply(K(fmap(B(show)(toFunctor))(t)))(t);
export const setMap = overMap;

// ----------- accessors ----------------------
export const getter = fb => prop => obj => (obj && Object(obj) === obj && prop in obj && obj[prop]) ||
  register(fb)({prop, obj});

export const setter = fb => prop => val => obj =>  obj &&
  (Array.isArray(obj) && Object.assign([].concat(obj), { [prop]: val })) ||
  (Object(obj) === obj && Object.assign({}, obj, { [prop]: val })) ||
  register(fb)({prop, obj});

export const fieldGetter = fb => prop =>
  S(obj => res => B(condL)(includes('valid_field'))(res)
    (K(res))(x => register(fb)({prop, obj})))
  (getter(fb)(prop));

export const lensProp = fb => prop => lens(getter(fb)(prop))(setter(fb)(prop));
export const lensField = fb => prop => lens(fieldGetter(fb)(prop))(setter(fb)(prop));
