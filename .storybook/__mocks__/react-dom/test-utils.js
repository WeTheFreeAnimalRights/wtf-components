export const act = (cb) => (typeof cb === 'function' ? cb() : undefined);
