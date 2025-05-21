import '@testing-library/jest-dom';

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Prevent .scrollIntoView errors from ShadCN / Popovers
window.HTMLElement.prototype.scrollIntoView = function () {};
