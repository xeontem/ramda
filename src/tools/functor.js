import { 
  I,
  B,
  fmap,
  show,
} from './';
// ------------------ Functors ------------------------
export const Constant = a1 => a2 => ({
  show: () => a2,
  map: f => Constant(a1)(a2)
});

export const Apply = a1 => a2 => ({
  show: () => a1,
  map: f => Apply(f(a1))(a2)
});
//------------------------------------------------------
