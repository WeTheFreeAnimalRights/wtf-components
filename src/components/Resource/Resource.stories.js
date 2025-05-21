import { Resource } from './index';

export default {
    title: 'Components/Resource',
    component: Resource,
    tags: ['autodocs'],
};

// TODO: Add proper args here
export const Primary = {
    args: {
        image: 'https://dev.api.mystats.wtf/storage/resources/dominion.jpg',
        title: 'Dominion',
        description:
            'Exposing the dark underbelly of modern animal agriculture through drones, hidden & handheld cameras, the feature-length film explores the morality and validity of our dominion over the animal kingdom.',
    },
};
