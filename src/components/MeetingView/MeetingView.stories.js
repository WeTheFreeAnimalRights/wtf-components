import { MeetingView } from './index';
import '../../base.css';
import { RecoilRoot } from 'recoil';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNTViZTc3MC01NTM1LTQ0YjgtYWE5ZC1lZDEyZWNmNjM1ZmMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczODU3MzUxMSwiZXhwIjoxNzM4NjU5OTExfQ.xHXGO4y06Ez_sR8O3fxkFWkDNKVrHVZRixa0DumIbyY';

export default {
    title: 'Components/MeetingView',
    component: MeetingView,
    tags: ['autodocs'],
    argTypes: {
        onMeetingId: {
            action: 'onMeetingId',
        },
    },
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = {
    args: {
        token,
        id: 'xjpp-v6eu-401r',
    },
};
