import {
    response
} from './data';
import R from 'ramda';

const S = f => x => z => f(z)(x(z));
const K = x => y => x;
const I = x => x;
const B = f => g => x => f(g(x));

//------------------ do notation ------------------------
// const x = { val: 'virgin' };
// const f = x => x.val += '. f did some dirty job';
// const g = x => x.val += '. g did some dirty job';
// const h = x => x.val += '. h did some dirty job';

// const doo = f => g => h => x => (
//     f(x),
//     g(x),
//     h(x)
// )
// console.log(doo(f)(g)(h)(x));
//--------------------------------------------------------

const debug = S(K)(console.log);

export const custom = () => {

  // custom
  // console.log(view(parentLense)(response))
  // console.log(set(parentLense)({new: 'parent'})(response))
  // console.log(set(parentLense)(['new', 'parent'])(response));
  // console.log(set(B(parentLense)(childLense))(['new', 'child'])(response));
  console.log(view(B(parentLense)(childLense))(response));


  // ramda
  const rparent = R.lens(getProp({})('parent'), R.assoc('parent'))
  const rchild = R.lens(getProp({})('child'), R.assoc('child'))
  // console.log(R.set(rparent, ['new', 'parent'], response))
  // console.log(R.set(R.compose(rparent, rchild), ['new', 'child'], response))
  console.log(R.view(R.compose(rparent, rchild), response))

}

// ------------------ Functors ------------------------
// Constructors
const Constant = val => x => ({
  show: f => f(x),
  map: f => Constant(val)(x)
});

const Apply = val => x => ({
  show: f => f(val),
  map: f => Apply(f(val))(x)
});

// Accessors
const fmap = func => functor => functor.map(func);
const fshow = func => functor => functor.show(func);
//------------------------------------------------------

// toFunctor = Constant || Apply || lens
const lens = get => set => toFunctor => target => fmap(val => set(val)(target))(toFunctor(get(target)));
const view = len => target => fshow(I)(len(Constant(target))(target));
const set = len => val => target => fshow(I)(len(Apply(val))(target));

const getProp = fb => prop => obj => prop in obj && obj[prop] || fb;
const setProp = fb => prop => val => obj =>
  obj &&
  (Array.isArray(obj) && Object.assign([].concat(obj), {
    [prop]: val
  })) ||
  (Object(obj) === obj && Object.assign({}, obj, {
    [prop]: val
  })) ||
  fb;

const proptLense = fb => prop => lens(getProp(fb)(prop))(setProp(fb)(prop));

const parentLense = proptLense({})('parent');
const childLense = proptLense([])('child');

const rparentLense = R.lens(getProp, setProp)('parent');
const rchildLense = R.lens(getProp, setProp)('child');