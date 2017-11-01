import './global.css';
import R from 'ramda';
import component from './components/main/main.component';

// let element = component();
// document.body.appendChild(element);

// alert('works')
const obj = {
  parent: {
    child: [
      {inner: 'text'}
    ]
  }
}

//-------------- Object -------------------------------------

const getter = fb => prop => obj => obj[prop] ? 
  obj[prop] : 
  fb;
// const objSet = prop => val => obj => Object.assign({});
//--------------- Array -----------------------------------

// const arrIget = fb => i => arr => arr[i] ? arr[i] : fb;
//----------------------------------------------------------

const parentGet = prop => obj => obj[prop] ? obj[prop] : {};
const childGet = prop => obj => obj[prop] ? obj[prop] : [];

const parentLens = R.lens(getter({})('parent'), R.assoc('parent'));
const childLens = R.lens(getter([])('child'), R.assoc('child'));
const childIndexlens = ind => R.lens(getter({})(ind), R.assoc(ind));
const innerLens = R.lens(getter('')('inner'), R.assoc('inner'));

const inner = R.compose(parentLens, childLens, childIndexlens('0'), innerLens);
const innerData = R.set(inner, 'changed',  obj);
console.dir(innerData);
