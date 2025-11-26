import React, { useEffect, useRef, useState, useCallback } from 'react';
import { isFunction } from 'lodash-es';
import { useTranslations } from '../../../hooks/useTranslations';
import { Modal, ModalContainer } from '../../Modal';
import { Button } from '../../Button';
import { useEndMeeting } from '../hooks/useEndMeeting';
import { useMeetingAutoEndTimer } from '../hooks/useMeetingAutoEndTimer';
import { formatMsToClock } from '../helpers/formatMsToClock';

/**
 * Props:
 * - warnAfterMs: delay from meeting start until modal shows
 * - autoCloseDelayMs: delay after warn before meeting auto-ends
 * - startedAt: optional ISO/date instance representing meeting start
 * - onWarn: callback when modal first becomes visible
 * - onAutoClose: callback when the meeting gets auto-ended by this guard
 */
export const DurationGuardModal = ({
    warnAfterMs = 20 * 60 * 1000,
    autoCloseDelayMs = 5 * 60 * 1000,
    startedAt,
    onWarn,
    onAutoClose,
    autoEndOnExpire = true,
    ...props
}) => {
    const { t } = useTranslations();
    const { endMeeting } = useEndMeeting();
    const { timeLeftMs, autoCloseDuration, hasWarned } = useMeetingAutoEndTimer(
        {
            startedAt,
            warnAfterMs,
            autoCloseDelayMs,
        }
    );

    const [modalOpen, setModalOpen] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);
    const warnedRef = useRef(false);
    const autoClosedRef = useRef(false);

    useEffect(() => {
        if (!modalOpen && hasWarned && !acknowledged) {
            setModalOpen(true);
        }
    }, [acknowledged, hasWarned, modalOpen]);

    useEffect(() => {
        if (modalOpen && !warnedRef.current && isFunction(onWarn)) {
            warnedRef.current = true;
            onWarn();
        }
    }, [modalOpen, onWarn]);

    const handleAutoClose = useCallback(() => {
        if (autoClosedRef.current) {
            return;
        }
        autoClosedRef.current = true;
        try {
            endMeeting();
        } finally {
            if (isFunction(onAutoClose)) {
                onAutoClose();
            }
        }
    }, [endMeeting, onAutoClose]);

    useEffect(() => {
        if (autoClosedRef.current || !autoEndOnExpire) {
            return;
        }

        if (timeLeftMs <= 0) {
            handleAutoClose();
        }
    }, [autoEndOnExpire, handleAutoClose, timeLeftMs]);

    const countdownLabel = formatMsToClock(timeLeftMs);
    const handleContinue = () => {
        setAcknowledged(true);
        setModalOpen(false);
    };

    const closeDelayMinutes = Math.max(
        1,
        Math.round(autoCloseDuration / 60000) || 0
    );

    return (
        <ModalContainer
            open={modalOpen && !autoClosedRef.current}
            onOpenChange={(open) => {
                if (!open) {
                    handleContinue();
                }
            }}
        >
            <Modal
                title={
                    <div className="px-6 py-5 space-y-0 bg-gray-800 text-white rounded-t-md pe-12 sm:pe-6">
                        {t('duration-guard-modal-title')}
                    </div>
                }
                description={t('duration-guard-modal-description')}
                showDescription={false}
                className="w-10/12 sm:w-2/3 lg:w-[900px] h-auto p-0 gap-0 border-0 max-w-[500px] rounded-md"
                contentClassName="bg-gray-100 dark:bg-gray-900 rounded-b-md max-h-[75vh] pt-6"
                headerClassName="space-y-0 border-b border-gray-300 dark:border-gray-500"
                setWidth={false}
                overflow
                {...props}
            >
                <div className="p-6 pt-0">
                    <p className="text-sm opacity-80">
                        {t('duration-guard-modal-description', [
                            closeDelayMinutes,
                        ])}
                    </p>
                    <p className="text-base font-semibold mt-4">
                        {t('duration-guard-modal-countdown', [countdownLabel])}
                    </p>

                    <div className="mt-6">
                        <Button className="w-full" onClick={handleContinue}>
                            {t('duration-guard-modal-continue')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </ModalContainer>
    );
};

DurationGuardModal.displayName = 'DurationGuardModal';
