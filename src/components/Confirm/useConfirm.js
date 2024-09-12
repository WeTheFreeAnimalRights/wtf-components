import { confirmState } from '../../recoilState';
import { useSetRecoilState } from 'recoil';

export const useConfirm = () => {
    const setConfirmObj = useSetRecoilState(confirmState);

    return {
        confirm: ({ title, message, callback }) => {
            setConfirmObj({
                visible: true,
                title,
                message,
                callback,
            });
        },
    };
};
