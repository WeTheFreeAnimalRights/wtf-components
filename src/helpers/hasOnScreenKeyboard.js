export const hasOnScreenKeyboard = () => {
    if (typeof navigator === 'undefined') return false;
    return (
        'ontouchstart' in window &&
        !navigator.userAgent.match(/Macintosh|Windows/i)
    );
};
