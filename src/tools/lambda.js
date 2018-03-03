export const S = f => x => z => f(z)(x(z));
export const K = x => y => x;
export const I = x => x;
export const A = f => x => f(x);
export const C = f => a => b => f(b)(a);
export const B = f => g => x => f(g(x));
export const debug = S(K)(console.log);

export const condL = c => t => f => c ? t() : f();

export const map = f => functor => functor.map && functor.map(f) || [];
export const show = f => t => t && t.show && t.show(f);
export const flatMap = f => t => t && t.reduce && t.reduce((total, val) => total.concat(f(val)), []);