import { sample } from 'lodash';
import {
    Cat,
    Dog,
    Bird,
    Fish,
    Rabbit,
    Rat,
    Squirrel,
    Turtle,
} from 'lucide-react';

export const AnimalIcon = ({ className }) => {
    const animalIcons = [Cat, Dog, Bird, Fish, Rabbit, Rat, Squirrel, Turtle];
    const AnimalIconComponent = sample(animalIcons);
    return <AnimalIconComponent className={className} />;
};
