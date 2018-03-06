export const S = f => x => z => f(z)(x(z));
export const K = x => y => x;
export const I = x => x;
export const A = f => x => f(x);
export const C = f => a => b => f(b)(a);
export const B = f => g => x => f(g(x));
export const W = x => y => x(y)(y);

export const debug = S(K)(console.log);

export const condL = c => t => f => c ? t() : f();

// predicates
export const existance = val => !!val;

// alg type methods
export const fmap = f => t => t && t.map && t.map(f) || t;
export const show = t => t && t.show ? t.show() : t;
export const filter = p => t => t && t.filter && t.filter(p) || t;
export const flatMap = f => t => t && t.reduce && t.reduce((total, val) => total.concat(f(val)), []);

// lenses
export const viewflatMap = f => t => B(flatMap)(B(B(show(I)))(f))(t);

// curried standart methods
export const includes = sub => str => str.includes(sub);
