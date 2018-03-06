import R from 'ramda';
import { response } from './data';
import {
  B,
  I,
  set,
  fmap,
  view,
  show,
  Apply,
  filter,
  getter,
  setMap,
  viewMap,
  flatMap,
  Constant,
  lensProp,
  existance,
  lensField,
  fieldGetter,
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
  console.log(response);
  // console.log(set(parentLense)({new: 'parent'})(response))
  // console.log(set(parentLense)(['new', 'parent'])(response));
  // console.log(set(B(parentLense)(childLense))(['new', 'child'])(response));
  // console.log(view(B(parentLense)(childLense))(response));
  // const children = view(B(parentLense)(childLense))(response);
  // const parsed = lflatMap(B(fmap(view(fieldLense)))(view(innerLense)))(children)
  // console.log(filter(existance)(parsed));
  const child = {parent: {child: [{field:'valid_field'},{field:'valid22_field2'}]}};

  // const temp = view(B(viewMap)(fieldLense))(arr)
  const temp = view(B(B(B(B(parentLense)(child2Lense))(childLense))(viewMap))(fieldLense))(response);
  // const temp = set(B(B(B(B(parentLense)(child2Lense))(childLense))(setMap))(fieldLense))('new value')(response);
  console.log(temp)
  
  // ramda
  const rparent = R.lens(getter({})('parent'), R.assoc('parent'));
  const rchild = R.lens(getter({})('child'), R.assoc('child'));
  const rfield = R.lens(fieldGetter('')('field'), R.assoc('field'));
  const rtemp = R.view(B(B(B(rparent)(rchild))(supermap))(rfield), child);
  console.log(rtemp.map(R.view(rfield)))
  
  // console.log(R.set(rparent, ['new', 'parent'], response))
  // console.log(R.set(R.compose(rparent, rchild), ['new', 'child'], response))
  // console.log(R.view(R.compose(rparent, rchild), response))
}

