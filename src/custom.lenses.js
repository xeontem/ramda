import R from 'ramda';
import { response } from './data';
import {
  B,
  set,
  view,
  getter,
  lensProp,
} from './tools/';

export const custom = () => {

  const parentLense = lensProp({})('parent');
  const childLense = lensProp([])('child');
  const everyChildlense = lensProp({});
  const everyfieldLense = lensProp({});
  const innerLense = lensProp([])('inner');
  const fieldLense = lensProp('')('field');
  // custom
  console.log(response)
  // console.log(set(parentLense)({new: 'parent'})(response))
  // console.log(set(parentLense)(['new', 'parent'])(response));
  // console.log(set(B(parentLense)(childLense))(['new', 'child'])(response));
  // console.log(view(B(parentLense)(childLense))(response));
  const children = view(B(parentLense)(childLense))(response);
  const parsed = children
    .map((child, i, arr) => view(everyChildlense(i))(arr))
    .map(mchild => view(innerLense)(mchild))
    .map(fields => fields.map(field => view(fieldLense)(field))
      // .map(mfield => view()(mfield))
    )
    console.log(parsed);
  
  // ramda
  const rparent = R.lens(getter({})('parent'), R.assoc('parent'))
  const rchild = R.lens(getter({})('child'), R.assoc('child'))
  // console.log(R.set(rparent, ['new', 'parent'], response))
  // console.log(R.set(R.compose(rparent, rchild), ['new', 'child'], response))
  // console.log(R.view(R.compose(rparent, rchild), response))
}

