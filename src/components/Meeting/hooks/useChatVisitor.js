import { currentChatVisitorState } from '../../../appState';
import { useGlobalState } from '../../../store/AppState';

export const useChatVisitor = () => {
    const [chatVisitor, setChatVisitor] = useGlobalState(
        currentChatVisitorState
    );

    return {
        chatVisitor,
        setChatVisitor,
    };
};
