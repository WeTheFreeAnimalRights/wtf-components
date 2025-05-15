import { Popover, PopoverTrigger, PopoverContent } from './index';
import '../../base.css';
import { Button } from '../Button';

export default {
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs'],
};

export const Primary = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Click me</Button>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
    );
};
