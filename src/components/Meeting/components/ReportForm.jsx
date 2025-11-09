import { useState } from 'react';
import { MessageCircleWarning } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover';
import { Tooltip } from '../../Tooltip';
import { Button } from '../../Button';
import { useTranslations } from '../../../hooks/useTranslations';
import { useChatReportReasons } from '../hooks/useChatReportReasons';
import { useMeeting } from '../hooks/useMeeting';
import {
    GeneratedStandardForm,
    StandardRadioGroup,
    StandardTextarea,
} from '../../StandardForm';
import { reportOptionsState } from '../../../appState';
import { useGlobalState } from '../../../store';
import { useEndMeeting } from '../hooks/useEndMeeting';

export const ReportForm = ({ id, api = 'public', token, meetingId }) => {
    const { t } = useTranslations();
    const reasons = useChatReportReasons();
    const { meeting } = useMeeting();
    const { client } = meeting;
    const [open, setOpen] = useState(false);

    // Get the report options
    const [reportOptions] = useGlobalState(reportOptionsState);

    // End the meeting
    const { endMeeting } = useEndMeeting();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Tooltip message={t('chat-report-tooltip')}>
                <PopoverTrigger asChild>
                    <Button variant="gray">
                        <MessageCircleWarning className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </Tooltip>
            <PopoverContent className="w-80" align="end">
                <h2 className="text-lg font-semibold mb-4">
                    {t('chat-report-title')}
                </h2>
                <GeneratedStandardForm
                    requestObject={{
                        url: 'chats',
                        api,
                        segments: [id, 'report'],
                        method: 'post',
                        bearer: token,
                        parseStandardBody: (body) => ({
                            ...body,
                            ...(meetingId
                                ? {
                                      meeting_id: meetingId,
                                  }
                                : {}),
                        }),
                    }}
                    onSuccess={() => {
                        endMeeting();
                        setOpen(false);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                >
                    <StandardRadioGroup name="reason" options={reportOptions}>
                        {t('chat-report-reason')}
                    </StandardRadioGroup>

                    <StandardTextarea
                        name="comment"
                        maxLength={255}
                        className="mt-6"
                    >
                        {t('chat-report-comment')}
                    </StandardTextarea>
                </GeneratedStandardForm>
            </PopoverContent>
        </Popover>
    );
};
