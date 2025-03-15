import { objectToArray } from './objectToArray';

export const getHighlightedMovies = (resources = {}, highlighted = {}) => {
    // First check the highlighted from the code
    const resourceIds = highlighted?.highlighted?.video;
    if (resourceIds && resourceIds[1]) {
        return objectToArray(resourceIds).map((id) => resources.byId[id]);
    }

    // Finally return the first 3 documentaries
    const allChallengeResources = resources.byType.documentary || [];
    return allChallengeResources.slice(0, 3);
};
