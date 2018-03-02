import {
  I,
  fmap,
  Apply,
  fshow,
  Constant,
  register
} from './';

export const lens = get => set => toFunctor => target => fmap(val => set(val)(target))(toFunctor(get(target)));
export const view = len => target => fshow(I)(len(Constant(target))(target));
export const set = len => val => target => fshow(I)(len(Apply(val))(target));

export const getter = fb => prop => obj => (obj && Object(obj) === obj && prop in obj && obj[prop]) ||
  register(fb)({prop, obj});

export const setter = fb => prop => val => obj =>
  obj &&
  (Array.isArray(obj) && Object.assign([].concat(obj), { [prop]: val })) ||
  (Object(obj) === obj && Object.assign({}, obj, { [prop]: val })) ||
  register(fb)({prop, obj});

// const registeredGetter = fb => prop => obj => register(getter(fb)(prop))(obj)
// const registeredSetter = 

export const lensProp = fb => prop => lens(getter(fb)(prop))(setter(fb)(prop));