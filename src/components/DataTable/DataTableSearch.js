import React, { useState } from 'react';
import { Search, CircleX } from 'lucide-react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { useTranslations } from '../../hooks/useTranslations';
import { useEffect } from 'react';
import { Tooltip } from '../Tooltip';

export const DataTableSearch = ({ meta, onSearch }) => {
    const { t } = useTranslations();

    const { visible } = meta.search;
    const [text, setText] = useState(meta.search.text);

    useEffect(() => {
        setText(meta.search.text);
    }, [meta.search.text]);

    const doSearch = (value) => {
        setText(value);
        if (typeof onSearch === 'function') {
            onSearch(value);
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <>
            <TextInput
                innerRightContent={
                    <Button
                        variant="ghost"
                        size="small-icon"
                        onClick={(e) => {
                            e.preventDefault();
                            doSearch(text);
                        }}
                        type="Button"
                    >
                        <Search className="w-4 h-4" />
                    </Button>
                }
                value={text}
                className="w-full sm:w-auto"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        doSearch(text);
                    }
                }}
                placeholder={t('search')}
            />
            {meta.search.text && (
                <Button
                    type="button"
                    variant="ghost"
                    className="ms-2"
                    size="small-icon"
                    onClick={() => {
                        doSearch('');
                    }}
                >
                    <Tooltip message={t('clear-applied-search')}>
                        <CircleX className="w-5 h-5" />
                    </Tooltip>
                </Button>
            )}
        </>
    );
};
