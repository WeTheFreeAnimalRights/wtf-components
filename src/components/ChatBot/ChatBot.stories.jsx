import { action } from 'storybook/actions';
import { ChatBot } from './index';
import { setupApi } from '../../helpers/fetchRequest/api/setupApi';
import { getPublicApiEndpoints } from '../../helpers/fetchRequest/api/getPublicApiEndpoints';

setupApi({
    base: 'http://localhost:8000/api/public/v1',
    endpoints: getPublicApiEndpoints(),
});

export default {
    title: 'Components/ChatBot',
    component: ChatBot,
    tags: ['autodocs'],
};

export const Primary = () => {
    return (
        <div className="h-[600px] max-w-2xl">
            <ChatBot
                name="Story Bot"
                email="story@mbe.ro"
                platform="3movies"
                onConversationStarted={action('conversation-started')}
                onMessageSent={action('message-sent')}
            />
        </div>
    );
};
