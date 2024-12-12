export const mergePaths = (basePath, relativePath) => {
    // Parse the base URL
    const url = new URL(basePath);

    // Extract the pathname
    let baseSegments = url.pathname.split('/').filter(Boolean);

    // Split the relative path into segments
    const relativeSegments = relativePath.split('/');

    relativeSegments.forEach((segment) => {
        if (segment === '..') {
            // Go one level up, so remove the last segment from the baseSegments
            if (baseSegments.length > 0) {
                baseSegments.pop();
            }
        } else if (segment !== '.' && segment !== '') {
            // Add the segment to the baseSegments
            baseSegments.push(segment);
        }
    });

    // Reconstruct the final pathname
    const mergedPath = '/' + baseSegments.join('/');
    url.pathname = mergedPath;

    // Return the full URL as a string
    return url.toString();
};
