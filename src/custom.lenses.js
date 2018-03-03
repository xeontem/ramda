import R from 'ramda';
import { response } from './data';
import {
  B,
  map,
  set,
  view,
  getter,
  flatMap,
  lensProp,
  lensField,
} from './tools/';

export const custom = () => {
  console.log(flatMap(x => x*10)([[1],[2],[3]]))
  
  const parentLense = lensProp({})('parent');
  const childLense = lensProp([])('child');
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
  const children = view(B(parentLense)(childLense))(response);
  const parsed = flatMap(B(map(view(fieldLense)))(view(innerLense)))(children)
    // .map(mchild => view(innerLense)(mchild))
    // .map(fields => fields.map(field => view(fieldLense)(field))
    // )
  console.log(parsed);
  
  // ramda
  const rparent = R.lens(getter({})('parent'), R.assoc('parent'))
  const rchild = R.lens(getter({})('child'), R.assoc('child'))
  // console.log(R.set(rparent, ['new', 'parent'], response))
  // console.log(R.set(R.compose(rparent, rchild), ['new', 'child'], response))
  // console.log(R.view(R.compose(rparent, rchild), response))
}

