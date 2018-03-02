export const S = f => x => z => f(z)(x(z));
export const K = x => y => x;
export const I = x => x;
export const B = f => g => x => f(g(x));
export const debug = S(K)(console.log);
