import { 
  I,
  B,
  fmap,
  show,
} from './';
// ------------------ Functors ------------------------
export const Constant = () => a2 => ({
  show: () => a2,
  map: f => Constant()(a2)
});

export const Apply = a1 => () => ({
  show: () => a1,
  map: f => Apply(f(a1))()
});
//------------------------------------------------------
