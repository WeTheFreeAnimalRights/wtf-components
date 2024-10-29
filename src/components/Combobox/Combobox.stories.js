import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { action } from '@storybook/addon-actions';
import { Combobox } from './index';
import '../../base.css';
import { setupApi } from '../../helpers/fetchRequest/api/setupApi';

export default {
    title: 'Components/Combobox',
    component: Combobox,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = () => {
    useEffect(() => {
        setupApi({
            base: 'http://localhost:8000/api',
            endpoints: {
                teams: '/v1/teams',
            },
        });
    }, []);

    const requestObject = (searchText = '') => {
        return {
            url: 'teams',
            method: 'get',
            bearer: '1|MNpnpqG0tGs3SUa4G2XiL8jkWbZCEVPdjQE2nH0V8ecd8745',
            params: {
                'filter[name]': searchText,
            },
        };
    };

    return (
        <Combobox onSelect={action('select')} requestObject={requestObject} />
    );
};
