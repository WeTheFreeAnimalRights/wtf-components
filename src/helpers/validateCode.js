export const validateCode = (code = '') => {
    const safeCode = String(code);
    if (safeCode.length === 0) {
        return 'entercode-not-empty';
    }

    if (safeCode.length !== 5) {
        return 'entercode-5-chars-exactly';
    }

    if (!/(^[a-z0-9]{5}$)/i.test(safeCode)) {
        return 'entercode-alpha-num-only';
    }

    return true;
};
