import {
  fmap,
  show,
  condL,
  Apply,
  I, S, K,
  C, B, W,
  Constant,
  register
} from './';

// B(C(B))(C(B)) === W(B)(C(B)) === S(W)(C)(B)
// export const lens = B(C(B)(B(S)(B(B(map(C))))))(S(W)(C)(B));
export const lens = get => set => toFunctor => target => fmap(val => set(val)(target))(toFunctor(get(target)));
export const view = len => target => show(I)(len(Constant(target))(target));
export const set = len => val => target => show(I)(len(Apply(val))(target));

// ----------- accessors ----------------------
export const getter = fb => prop => obj => (obj && Object(obj) === obj && prop in obj && obj[prop]) ||
  register(fb)({prop, obj});

export const setter = fb => prop => val => obj =>  obj &&
  (Array.isArray(obj) && Object.assign([].concat(obj), { [prop]: val })) ||
  (Object(obj) === obj && Object.assign({}, obj, { [prop]: val })) ||
  register(fb)({prop, obj});

export const fieldGetter = fb => prop =>
  S(obj => res => condL(res.includes('valid_field'))
    (x => res)(x => register(fb)({prop, obj})))
  (getter(fb)(prop));

export const lensProp = fb => prop => lens(getter(fb)(prop))(setter(fb)(prop));
export const lensField = fb => prop => lens(fieldGetter(fb)(prop))(setter(fb)(prop));
