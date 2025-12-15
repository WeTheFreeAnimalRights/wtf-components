import { useEffect, useMemo } from 'react';
import { buildSocketConfig } from '../../../hooks/useSocket';
import { useChatSocket } from '../hooks/useChatSocket';

export const ChatSocketInitializer = ({ meeting, socketConfig }) => {
    const builtConfig = useMemo(() => buildSocketConfig(socketConfig), [socketConfig]);
    const { listen, leave } = useChatSocket({ meeting, configOverrides: builtConfig });

    useEffect(() => {
        listen();

        return () => {
            console.log('>>leaving', socketConfig);
            leave();
        };
    }, [listen, leave]);

    return null;
};
