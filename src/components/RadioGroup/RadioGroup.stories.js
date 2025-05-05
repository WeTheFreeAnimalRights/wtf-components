import { RecoilRoot } from 'recoil';
import { RadioGroup, RadioGroupItem } from './index';
import '../../base.css';
import { Label } from '_/components/label';

export default {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = () => (
    <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
        </div>
    </RadioGroup>
);
