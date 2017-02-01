// ...args in the input is the rest operator;
//  it takes multiple arguments and turns them into an array
// ...args in the bind is the spread operator
export const partial = (fn, ...args) => fn.bind(null, ...args)

const _pipe = (f, g) => (...args) => g(f(...args));

export const pipe = (...fns) => fns.reduce(_pipe);
