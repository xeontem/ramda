import './main.css';
import Icon from '../../images/icon.png';
import R from 'ramda';
var lazyFunc = require('bundle-loader!../lazy/lazy.component.js');

//--------------------- Ramda ----------------------------------
const experim = (a, b) => a + b;

const curryExp = R.curry(experim);

console.log(curryExp(3)(4));


const a = {
  key: 2,
  family: [{title: 'uncle', age: 35}]
};

const familyGetter = o => key => o[key];

// const keyLens = R.lensProp('key');
R.lensProp('title');
R.lensProp('0');
R.lensProp('family');

// R.view(keyLens, a);


const familyLens = R.lensProp('family');
const familySetGet = R.lens();

const titleLens = R.lensProp('title');



const ageLens = R.lensProp('age');
const itemArrayLense = i => R.lensProp(i);

const titleLensPath = R.lensPath(['family', '0', 'title']);


const family_titleLens = R.compose(familyLens, itemArrayLense(0), titleLens);

const ageLensPath = R.lensPath(['family', '0', 'age']);
const family_ageLens = R.compose(familyLens, itemArrayLense(0), ageLens);

const title = R.view(family_titleLens, a); // val - 2
const settedTitle = R.set(titleLensPath, 'changed', a);
const age = R.view(ageLensPath, a); // val - 2

console.dir(a);
console.log(title,':', age);

//-------------------------------


// let compose = f => g => x => f(g(x));
let flip = f => a => b => f(b)(a);

let flipCustom = f => a1 => a2 => a3 => a4 => f(a4)(a3)(a2)(a1);

let flipN = mem => f => a => {
  if(!a) return mem.reduceRight((acc, func) => acc = func(acc), f);
  else {
    mem.push(f);
    return flipN(mem)(a);
  }
};

let S = f => x => z => f(z)(x(z));

let flipNMem = flipN([]);

let Y = F => F(x => Y(F)(x));
let fixed = Y(flipNMem);
fixed.valueOf = fixed();

let returner = f => fixed;

let flipFromFixed = mem => returner;
let flipFromFixedMem = flipFromFixed([]);
// console.log(flipFromFixedMem);

// flipNMem.valueOf = () => flipNMem();

let addA = s => s + '_a';
let addB = s => s + '_b';

// f.style

// let temp1 = flipNMem(addB)(addA)('test_string')();
// console.dir(temp1);

// compose = f => g => z => x => f(g(z(x)));

let composeNRight = x => f => {
  if(!f) return x;
  return composeNRight(f(x));
};

let create = x => document.createElement(x);

let addEvent = event => cb => el => {
  el.addEventListener(event, cb);
  return el;
};

let addStyle = style => elem => {
  for(let key in style) {
    elem.style[key] = style[key];
  }
  return elem;
};

let addInnerHTML = inner => elem => {
  elem.innerHTML = elem.tagName + ': ' + inner;
  return elem;
};
// -----------------------------------------------------------------------------------

let curryedAddEvent = addEvent('click')(x => console.dir(x.target));
let curryedAddInnerHTML = addInnerHTML(`inner text`);
let curryedAddStyle = addStyle({cursor: 'pointer'});

let creator = elems => elems.map(el => create(el));
// let combinator = target => f => g => f(target);
let elems = creator(['div', 'p', 'section']);//(addEvent('click')());

let customizer = mem => e => f => {
  if(!f) e.map(e => mem.map(f => f(e)));
  mem.push(f);
  return customizer(mem)(e);
};

// customizer(f)(g)(z)();
// let ready = customizer([])(['div', 'p', 'section'])()()();

// composeNRight(curryedAddStyle(curryedAddInnerHTML(elem)));

// let temp = elems.map(elem => composeNRight(elem)(curryedAddEvent)(curryedAddInnerHTML)(curryedAddStyle));
let temp = elems.map(flipCustom(composeNRight)(curryedAddStyle)(curryedAddInnerHTML)(curryedAddEvent));



// console.dir(temp);

let fragment = new DocumentFragment();

elems.map(el => fragment.append(el));
document.body.append(fragment);

export default function component() {

  //----------------------------------------------------------- lazy-loading
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = ['Hello', 'webpack'].join(' ');
  element.classList.add('hello');
  
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console!!!';
  btn.onclick = () => import(/* webpackChunkName: "print" */ '../print/print')
    .then(module => {
      var print = module.default;
      print();
    });

    element.appendChild(btn);

    //---------------------------------------------------- bundle-loader
    var textP = document.createElement('p');
    btn = document.createElement('button');
    btn.onclick = () => {
      lazyFunc(x => {
        console.dir(x.default);
        textP.innerHTML += x.default();
      });
    };
    btn.innerHTML = 'bundle-loader';
  element.appendChild(btn);

  element.appendChild(textP);

  return element;
}
