import R from 'ramda';
import { response } from './data';
import {
  B,
  I,
  set,
  lmap,
  fmap,
  view,
  show,
  Apply,
  filter,
  getter,
  viewMap,
  flatMap,
  Constant,
  lensProp,
  existance,
  lensField,
} from './tools/';

export const custom = () => {
  const parentLense = lensProp({})('parent');
  const childLense = lensProp([])('child');
  const child2Lense = lensProp({})('child2');
  const everyChildlense = lensProp({});
  const everyfieldLense = lensProp({});
  const innerLense = lensProp([])('inner');
  const fieldLense = lensField('')('field');
  // custom
  console.log(response)
  // console.log(set(parentLense)({new: 'parent'})(response))
  // console.log(set(parentLense)(['new', 'parent'])(response));
  // console.log(set(B(parentLense)(childLense))(['new', 'child'])(response));
  // console.log(view(B(parentLense)(childLense))(response));
  // const children = view(B(parentLense)(childLense))(response);
  // const parsed = lflatMap(B(fmap(view(fieldLense)))(view(innerLense)))(children)
  // console.log(filter(existance)(parsed));
  const arr = [{field:'valid_field'},{field:'2'}];

  // const temp = view(B(fmap)(fieldLense))(arr)
  const temp = view(B(parentLense)(B(child2Lense)(B(childLense)(B(fmap)(fieldLense)))))(response);
  console.log(temp)
  
  // ramda
  const rparent = R.lens(getter({})('parent'), R.assoc('parent'))
  const rchild = R.lens(getter({})('child'), R.assoc('child'))
  // console.log(R.set(rparent, ['new', 'parent'], response))
  // console.log(R.set(R.compose(rparent, rchild), ['new', 'child'], response))
  // console.log(R.view(R.compose(rparent, rchild), response))
}

