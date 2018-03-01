import { response } from './data';
import R from 'ramda';
const arr = [1,2,3];
const B = f => g => x => f(g(x));

const constant = val => x => ({
    val: x,
    map: f => constant(val)(x)
});

const apply = val => x => ({
    val: x,
    map: f => apply(f(val))(x)
});
const I = x => x;
const K = x => y => x;
const S = f => x => z => f(z)(x(z));

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

const pickGetter = get => set => get;
const debug = S(K)(console.log);

export const custom = () => {

// custom
//   console.log(view(parentLense)(response))
//   console.log(set(parentLense)({new: 'parent'})(response))
// console.log(set(parentLense)(['new', 'parent'])(response));
console.log(set(B(parentLense)(childLense))(['new', 'child'])(response));
// console.log(view(B(parentLense)(childLense))(response));


// ramda
const rparent = R.lens(getProp({})('parent'), R.assoc('parent'))
const rchild = R.lens(getProp({})('child'), R.assoc('child'))
// console.log(R.set(rparent, ['new', 'parent'], response))
console.log(R.set(R.compose(rparent, rchild), ['new', 'child'], response))
// console.log(R.view(R.compose(rparent, rchild), response))

}

const fmap = func => functor => functor.map(func);
                                                                             // childLense 
                                                                             // value need to set in target in fmap 
const lens = get => set => toFunctor => target => fmap(val => set(val)(target))(toFunctor(get(target)));
const view = len => target => len(constant())(target).val;
const set = len => val => target => len(apply(val))(target).val;

const getProp = fb => prop => obj => prop in obj && obj[prop] || fb;
const setProp = fb => prop => val => obj => obj && 
                                            (Array.isArray(obj) && Object.assign([].concat(obj), {[prop]: val})) ||
                                            (Object(obj) === obj && Object.assign({}, obj, {[prop]: val})) ||
                                            fb;

const proptLense = fb => prop => lens(getProp(fb)(prop))(setProp(fb)(prop));

const parentLense = proptLense({})('parent');
const childLense = proptLense([])('child');

const rparentLense = R.lens(getProp, setProp)('parent');
const rchildLense = R.lens(getProp, setProp)('child');

const two = 2;

const func = a => a + 5;
func(2);
