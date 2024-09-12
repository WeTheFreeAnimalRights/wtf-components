import { RecoilRoot } from 'recoil';
import { GeneratedStandardForm } from './index';
import '../../base.css';

export default {
    title: 'Components/GeneratedStandardForm',
    component: GeneratedStandardForm,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
    argTypes: {
        onSuccess: {
            action: 'success',
        },
        onError: {
            action: 'error',
        },
    },
};

export const Primary = {
    args: {
        schema: {
            codeSharingMethodId: {
                type: 'select',
                options: [
                    {
                        value: '1',
                        label: 'Code Sharee1',
                    },
                    {
                        value: '2',
                        label: 'Code Share 2',
                    },
                ],
                label: 'Code Sharing Method',
                placeholder: 'Filter by Sharing Method',
            },
            d1: {
                type: 'div',
                className: 'flex flex-row items-center',
                children: {
                    isActive: {
                        type: 'boolean',
                        label: 'Active',
                        className: 'flex-shrink basis-0 pe-4',
                    },
                    description: {
                        type: 'text',
                        label: 'Description',
                        className: 'flex-grow basis-0',
                    },
                },
            },
        },
        options: {
            sendToServer: false,
            eachField: {
                optional: true,
            },
        },
    },
};
