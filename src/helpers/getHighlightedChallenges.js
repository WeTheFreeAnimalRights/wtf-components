import { objectToArray } from "./objectToArray";

export const getHighlightedChallenges = (resources = {}, highlighted = {}) => {
    // First check the highlighted from the code
    const resourceIds = highlighted?.highlighted?.challenge;
    if (resourceIds && resourceIds[1]) {
        return objectToArray(resourceIds).map((id) => resources.byId[id]);
    }

    // Finally return the first 2 challenges
    const allChallengeResources = resources.byType.challenge || [];
    return allChallengeResources.slice(0, 2);
};
