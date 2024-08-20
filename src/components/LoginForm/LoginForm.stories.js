import { LoginForm } from './index';
import '../../base.css';
import { RecoilRoot } from 'recoil';

export default {
    title: 'Components/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
                    <Story />
                </div>
            </RecoilRoot>
        ),
    ],
    argTypes: {
        onSubmit: {
            action: 'submitted',
        },
    },
};

export const Primary = {
    args: {},
};
