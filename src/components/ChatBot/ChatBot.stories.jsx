import { action } from 'storybook/actions';
import { ChatBot } from './index';
import { setupApi } from '../../helpers/fetchRequest/api/setupApi';
import { getPublicApiEndpoints } from '../../helpers/fetchRequest/api/getPublicApiEndpoints';
import { useTranslations } from '../../hooks/useTranslations';
import { useEffect } from 'react';

const STORY_INSTANCE_KEY = Date.now();

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
    const {setCurrentLanguage} = useTranslations();
    useEffect(() => {
        setCurrentLanguage({
            code: 'en',
        });
    }, []);

    return (
        <div className="h-[600px] max-w-2xl">
            <ChatBot
                key={STORY_INSTANCE_KEY}
                name="Story Bot"
                email="story@mbe.ro"
                platform="3minutes"
                onConversationStarted={action('conversation-started')}
                onMessageSent={action('message-sent')}
            />
        </div>
    );
};
