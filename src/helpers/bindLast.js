export const bindLast = (fn, lastArg) => {
    return (...args) => fn(...args, lastArg);
};
