// ------------------ Functors ------------------------
export const Constant = val => x => ({
  show: f => f(x),
  map: f => Constant(val)(x)
});

export const Apply = val => x => ({
  show: f => f(val),
  map: f => Apply(f(val))(x)
});
//------------------------------------------------------