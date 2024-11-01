import { debounce, isFunction, isUndefined } from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Search, CircleX } from 'lucide-react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { useTranslations } from '../../hooks/useTranslations';
import { Tooltip } from '../Tooltip';

import { cn } from '_/lib/utils';

export const SearchBox = ({
    value = '',
    placeholder,
    className,
    onSearch,
    searchOnChange = false,
}) => {
    const { t } = useTranslations();

    const [text, setText] = useState(value);

    useEffect(() => {
        setText(value);
    }, [value]);

    const doSearch = (value) => {
        setText(value);
        if (isFunction(onSearch)) {
            onSearch(value);
        }
    };

    const performSearchOnChange = useCallback(debounce(doSearch, 250), []);

    return (
        <div className={cn('flex flex-row items-center', className)}>
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
                className="w-full"
                onChange={(e) => {
                    setText(e.target.value);

                    if (searchOnChange) {
                        performSearchOnChange.cancel();
                        performSearchOnChange(e.target.value);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        performSearchOnChange.cancel();
                        performSearchOnChange(text);
                    }
                }}
                placeholder={
                    isUndefined(placeholder) ? t('search') : placeholder
                }
            />
            {(value || (searchOnChange && text)) && (
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
        </div>
    );
};

SearchBox.displayName = 'SearchBox';

SearchBox.propTypes = {
    /**
     * The value of the search box
     */
    value: PropTypes.string,

    /**
     * The placeholder of the search box
     */
    placeholder: PropTypes.string,

    /**
     * Should the users search on change or not
     */
    searchOnChange: PropTypes.bool,

    /**
     * When the user performs a search
     */
    onSearch: PropTypes.func,

    /**
     * Optional extra classname to the search box
     */
    className: PropTypes.string,
};
