import React, { useEffect } from 'react';
import { isFunction } from 'lodash-es';
import { useTranslations } from '../../../hooks/useTranslations';
import { Modal, ModalContainer } from '../../Modal';
import { Button } from '../../Button';
import { useConfirm } from '../../Confirm';
import { useInactivityStages } from '../hooks/useInactivityStages';
import { useMeeting } from '../hooks/useMeeting';
import { useEndMeeting } from '../hooks/useEndMeeting';

/**
 * Props:
 * - warnAfterMs: when to show the modal
 * - actionAfterMs: when to call onEscalate (must be > warnAfterMs)
 * - onBecameInactive: fires once when phase enters "warn"
 * - onEscalate: fires once when phase becomes "actioned"
 */
export const InactivityGuardModal = ({
    warnAfterMs = 30_000,
    actionAfterMs = 40_000,
    onBecameInactive,
    onEscalate,
    onResume,
    showSecondsIdle = true,
    ...props
}) => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const { confirm } = useConfirm();
    const { client } = meeting;

    // End the meeting
    const { endMeeting } = useEndMeeting();

    const {
        phase, // "active" | "warn" | "actioned"
        inactive, // phase === "warn" || "actioned"
        escalated, // phase === "actioned"
        secondsIdle,
        acknowledge, // call when user clicks "Still here"
    } = useInactivityStages({ warnAfterMs, actionAfterMs });

    // Fire when we first show the modal
    useEffect(() => {
        if (phase === 'warn' && isFunction(onBecameInactive)) {
            onBecameInactive();
        }
    }, [phase, onBecameInactive]);

    // Fire the escalation callback
    useEffect(() => {
        if (escalated) {
            if (isFunction(onEscalate)) {
                onEscalate();
            }
            endMeeting();
        }
    }, [escalated, onEscalate]);

    const handleStillHere = () => {
        acknowledge(); // returns to "active" and re-arms timers
        if (isFunction(onResume)) onResume();
    };

    return (
        <ModalContainer
            open={inactive}
            onOpenChange={(open) => {
                // If modal is closed via ESC/backdrop, treat that as a confirm
                if (!open) handleStillHere();
            }}
        >
            <Modal
                title={
                    <div className="px-6 py-5 space-y-0 bg-gray-800 text-white rounded-t-md pe-12 sm:pe-6">
                        {t('inactivity-guard-modal-title')}
                    </div>
                }
                description={t('inactivity-guard-modal-description')}
                showDescription={false}
                showCloseButton={false}
                className="w-10/12 sm:w-2/3 lg:w-[900px] h-auto p-0 gap-0 border-0 max-w-[500px] rounded-md"
                contentClassName="bg-gray-100 dark:bg-gray-900 rounded-b-md max-h-[75vh] pt-6"
                headerClassName="space-y-0 border-b border-gray-300 dark:border-gray-500"
                setWidth={false}
                overflow
                {...props}
            >
                <div className="p-6 pt-0">
                    <p className="text-sm opacity-80">
                        {t('inactivity-guard-modal-description')}
                        {showSecondsIdle && (
                            <span className="ml-1 opacity-60">
                                (
                                {t('inactivity-guard-modal-seconds-idle', [
                                    secondsIdle,
                                ])}
                                )
                            </span>
                        )}
                    </p>

                    <div className="mt-4 flex gap-2 grid grid-cols-2">
                        <Button onClick={handleStillHere}>
                            {t('inactivity-guard-modal-still-here')}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                confirm({
                                    title: t('end-meeting-confirm-title'),
                                    message: t('end-meeting-confirm-message'),
                                    callback: () => {
                                        endMeeting();
                                    },
                                });
                            }}
                        >
                            {t('inactivity-guard-modal-end-meeting')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </ModalContainer>
    );
};
