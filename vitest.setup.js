import '@testing-library/jest-dom';

// eslint-disable-next-line no-undef
global.React = require('react');
// eslint-disable-next-line no-undef
global.ResizeObserver = require('resize-observer-polyfill');

if (!Element.prototype.scrollIntoView) {
    // eslint-disable-next-line no-undef
    Element.prototype.scrollIntoView = vi.fn(); // or () => {}
}
