export const parseJson = (str) => {
    let data = {};
    try {
        data = JSON.parse(str);
    } catch (e) {
        console.error('JSON parse error:', e, str);
    }
    return data;
}
