import { useState } from 'react';
import { isFunction } from 'lodash-es';
import { useCode } from '../../hooks/useCode';
import { FeedbackForm } from '../FeedbackForm';
import { Modal, ModalContainer } from '../Modal';
import { cn } from '_/lib/utils';
import { getFeedbackValue } from '../FeedbackForm/getFeedbackValue';

export const FeedbackModalSimple = ({
    open,
    onOpenChange,
    onVote,
    footer,
    resourceId,
    title,
    showFeedback = true,
    children,
    className,
    showCloseButton,
}) => {
    // Has the user already given feedback
    const { code } = useCode();
    const alreadyGaveFeedback = getFeedbackValue(resourceId, code);

    const [justVoted, setJustVoted] = useState(false);

    const actuallyShowFeedback = justVoted || (showFeedback && resourceId > 0 && !alreadyGaveFeedback);

    return (
        <ModalContainer open={open} onOpenChange={(value) => {
            if (!value) {
                setJustVoted(false);
            }

            if (isFunction(onOpenChange)) {
                onOpenChange(value);
            }
        }}>
            <Modal
                title={
                    <div className="px-6 py-5 space-y-0 bg-gray-800 rounded-t-md pe-12 sm:pe-6">
                        {title}
                    </div>
                }
                showCloseButton={showCloseButton}
                closeButtonClassName="top-5 end-5"
                closeIconClassName="w-6 h-6 text-white"
                className={cn(
                    'w-10/12 sm:w-2/3 lg:w-[900px] h-2/3 p-0 gap-0 border-0',
                    className
                )}
                contentClassName={cn(
                    'bg-gray-100 dark:bg-gray-900 rounded-b-md max-h-[75vh]',
                    [!actuallyShowFeedback && 'pt-6']
                )}
                headerClassName="space-y-0 border-b border-gray-300 dark:border-gray-500"
                footer={footer}
                setWidth={false}
                overflow
            >
                {actuallyShowFeedback && (
                    <FeedbackForm resourceId={resourceId} onVote={(...params) => {
                        setJustVoted(true);

                        if (isFunction(onVote)) {
                            onVote(...params);
                        }
                    }} className="p-6" />
                )}
                {children}
            </Modal>
        </ModalContainer>
    );
};
