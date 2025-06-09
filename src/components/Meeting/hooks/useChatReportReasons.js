import { useTranslations } from '../../../hooks/useTranslations';

export const useChatReportReasons = () => {
    const reasons = [
        'spam',
        'nudity',
        'suicide_or_self_injury',
        'hate_speech',
        'bullying_or_harassment',
        'illegal',
        'violence',
        'other',
    ];
    const { t } = useTranslations();

    return reasons.map((item) => ({
        value: item,
        label: t(`chat-reason-${item}`),
    }));
};
