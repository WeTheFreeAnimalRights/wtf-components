import { isFunction, map } from 'lodash-es';
import { IdCard, Search, Text, X } from 'lucide-react';
import { useState } from 'react';
import { Resource } from '../../Resource';
import { textContains } from '../../../helpers/textContains';
import { TextInput } from '../../TextInput';
import { useTranslations } from '../../../hooks/useTranslations';
import { Empty } from '../../Empty';
import { ToggleGroupInput } from '../../ToggleGroupInput';
import { Button } from '../../Button';

export const ChatPluginsList = ({ onSelect, onCancel }) => {
    const { t } = useTranslations();

    const handleSelect = (item) => {
        if (isFunction(onSelect)) {
            onSelect(item);
        }
    };

    return (
        <div className="h-auto">
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <Button
                        variant="ghost"
                        className="flex-col h-auto"
                        onClick={() => handleSelect('resources')}
                    >
                        <div className="rounded-full bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-300 p-4 aspect-square items-center justify-center flex mb-2">
                            <IdCard className="w-6 h-6" />
                        </div>
                        {t('plugin-resources')}
                    </Button>
                </div>
                <div className="text-center">
                    <Button
                        variant="ghost"
                        className="flex-col h-auto"
                        onClick={() => handleSelect('prompts')}
                    >
                        <div className="rounded-full bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-300 p-4 aspect-square items-center justify-center flex mb-2">
                            <Text className="w-6 h-6" />
                        </div>
                        {t('plugin-prompts')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
