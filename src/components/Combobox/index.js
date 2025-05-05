import { debounce, isEmpty, isFunction } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '_/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '_/components/command';
import { FormControl } from '_/components/form';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';
import { useRequest } from '../../hooks/useRequest';
import { Spinner } from '../Spinner';

export const Combobox = ({
    className,
    placeholder,
    searchPlaceholder,
    disabled = false,
    options = [],
    emptyMessage,
    selected: selectedParam,
    onSelect,
    formControl,
    requestObject,
    requestObjectParams,
    parseResponse,
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState(selectedParam);

    useEffect(() => {
        setSelected(selectedParam);
        if (selectedParam && selectedParam.id) {
            setValue(selectedParam.id.toString());

            // If there is a callback, call it
            if (isFunction(onSelect)) {
                onSelect(selectedParam.id.toString());
            }
        }
    }, [selectedParam]);

    const { t } = useTranslations();
    const usedEmptyMessage = emptyMessage || t('combo-empty');
    const usedPlaceholder = placeholder || t('combo-placeholder');
    const usedSearchPlaceholder =
        searchPlaceholder || t('combo-search-placeholder');

    const [searchText, setSearchText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    const { loading, error, request } = useRequest();


    // Whether to send the data to the server or not
    const shouldPerformServerSearch =
        !isEmpty(requestObject) || isFunction(requestObject);

    // Submit method
    const performServerSearch = useCallback(
        debounce(async (text) => {
            const usedRequestObject = isFunction(requestObject)
                ? requestObject(text, requestObjectParams)
                : requestObject;

            // Remove the selected
            setSelected(undefined);

            // Perform the request
            await request(
                usedRequestObject,
                () => {
                    // On error
                    setFilteredOptions([]);
                },
                (data) => {
                    // On success
                    if (isFunction(parseResponse)) {
                        setFilteredOptions(parseResponse(data));
                    } else {
                        setFilteredOptions(
                            data.data.map((item) => ({
                                value: item.id.toString(),
                                label: item.name,
                            }))
                        );
                    }
                }
            );
        }, 250),
        [requestObjectParams]
    );

    const trigger = (
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                    'w-full justify-between flex-row items-center font-normal',
                    className
                )}
                disabled={disabled}
            >
                <div className="flex-grow text-ellipsis overflow-hidden text-start">
                    {selected ? selected.label : usedPlaceholder}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {formControl ? <FormControl>{trigger}</FormControl> : trigger}

            <PopoverContent className="w-[200px] p-0">
                <Command shouldFilter={!shouldPerformServerSearch}>
                    <CommandInput
                        placeholder={usedSearchPlaceholder}
                        value={searchText}
                        onValueChange={(value) => {
                            if (shouldPerformServerSearch) {
                                if (value) {
                                    performServerSearch(value);
                                } else {
                                    setFilteredOptions([]);
                                }
                            }

                            setSearchText(value);
                        }}
                    />
                    <CommandList className="relative">
                        {loading && (
                            <div className="absolute left-0 top-0 right-0 bottom-0 bg-muted/50 flex items-center justify-center">
                                <Spinner />
                            </div>
                        )}

                        <CommandEmpty>
                            {error ? (
                                <div className="text-destructive">{error}</div>
                            ) : searchText ? (
                                usedEmptyMessage
                            ) : (
                                usedSearchPlaceholder
                            )}
                        </CommandEmpty>

                        <CommandGroup>
                            {filteredOptions.map((item) => (
                                <CommandItem
                                    key={`item-${item.value}`}
                                    value={item.value}
                                    onSelect={(newValue) => {
                                        // Set the value and the selected item
                                        setValue(newValue);
                                        setSelected(
                                            filteredOptions.find(
                                                (item) =>
                                                    item.value === newValue
                                            )
                                        );

                                        // Close the popover
                                        setOpen(false);

                                        // If there is a callback, call it
                                        if (isFunction(onSelect)) {
                                            onSelect(newValue);
                                        }
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export { FormFieldCombobox } from './FormFieldCombobox';

Combobox.displayName = 'Combobox';
Combobox.propTypes = {
    /**
     * Options of the select
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Value of the option
             */
            value: PropTypes.string.isRequired,

            /**
             * Label to be visible for the option
             */
            label: PropTypes.string,
        })
    ),

    /**
     * The placeholder to be shown on the select
     */
    placeholder: PropTypes.string,

    /**
     * Optional if combobox is used within a form
     */
    formControl: PropTypes.bool,

    /**
     * The placeholder to be shown on the search in the dropdown
     */
    searchPlaceholder: PropTypes.string,

    /**
     * The optional empty message to be shown when no items found
     */
    emptyMessage: PropTypes.string,

    /**
     * Is the combobox box disabled
     */
    disabled: PropTypes.bool,

    /**
     * Optional extra classname to the combo box
     */
    className: PropTypes.string,

    /**
     * Optional handler when the item is selected
     */
    onSelect: PropTypes.func,

    /**
     * If this is passed on, then the search is done server side
     */
    requestObject: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * If this is passed on, then it will be passed on to the requestObejct function
     */
    requestObjectParams: PropTypes.object,

    /**
     * If this is passed on, then parse the results coming from the api
     */
    parseResponse: PropTypes.func,
};
