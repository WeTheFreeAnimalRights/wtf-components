import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { Preloader } from './index';
import { setupApi } from '../../helpers/fetchRequest/api/setupApi';
import '../../base.css';

export default {
    title: 'Components/Preloader',
    component: Preloader,
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
    const [response, setResponse] = useState('');

    useEffect(() => {
        setupApi({
            base: 'https://jsonplaceholder.typicode.com',
            endpoints: {
                users: '/users/1',
            },
        });
    }, []);

    const requests = [
        {
            url: 'users',
            callback: (data) => {
                setResponse(JSON.stringify(data, null, '\t'));
            },
        },
    ];

    return (
        <Preloader requests={requests}>
            <h3>Fetched:</h3>
            {
                <pre className="bg-gray-900 text-white p-5 rounded-lg mt-2">
                    {response}
                </pre>
            }
        </Preloader>
    );
};
