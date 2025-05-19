import '@testing-library/jest-dom';

global.React = require('react');
global.ResizeObserver = require('resize-observer-polyfill');

if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = vi.fn(); // or () => {}
  }
