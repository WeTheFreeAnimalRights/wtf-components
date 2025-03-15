import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentChatVisitorState } from '../../../recoilState';

export const useChatVisitor = () => {
    const chatVisitor = useRecoilValue(currentChatVisitorState);
    const setChatVisitor = useSetRecoilState(currentChatVisitorState);

    return {
        chatVisitor,
        setChatVisitor,
    };
};
