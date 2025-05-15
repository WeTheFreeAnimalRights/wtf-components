import {
    Frown,
    Meh,
    Smile,
    Laugh,
    Circle,
    HeartOff,
    Microscope,
    ShoppingCart,
    Vegan,
} from 'lucide-react';
import { IconWrapper } from '../IconWrapper';
import { cn } from '../../_shadcn/lib/utils';

export const FeedbackIcon = ({
    name = '',
    isPublic = false,
    className,
    iconClassName,
}) => {
    const icons = {
        no_impact: Frown,
        more_research: Meh,
        reduce_animal_products: Smile,
        only_vegan_products: Laugh,
    };
    const publicIcons = {
        no_impact: HeartOff,
        more_research: Microscope,
        reduce_animal_products: ShoppingCart,
        only_vegan_products: Vegan,
    };
    const iconColors = {
        no_impact: 'amber',
        more_research: 'cyan',
        reduce_animal_products: 'pink',
        only_vegan_products: 'green',
    };

    const Icon = (isPublic ? publicIcons[name] : icons[name]) || Circle;

    return (
        <IconWrapper color={iconColors[name]} className={className}>
            <Icon className={cn('w-4 h-4', iconClassName)} />
        </IconWrapper>
    );
};
