import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { View, Pressable, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from '../../hooks/useTheme';
import { useTranslations } from '../../hooks/useTranslations';
import { TextInput } from '../TextInput';
import { styles } from './styles';

export const Select = forwardRef(
    (
        {
            label,
            value,
            options = [],
            placeholder,
            className,
            disabled = false,
            search = false,
            searchPlaceholder,
            onChange = () => {},
        },
        outerRef
    ) => {
        const innerRef = useRef(null);
        useImperativeHandle(outerRef, () => innerRef.current, []);

        // Whether focused or not
        const [isFocused, setIsFocused] = useState(false);

        // Theme
        const { theme } = useTheme();
        const isDark = theme === 'dark';

        // Translations
        const { t } = useTranslations();

        return (
            <View className={className || ''}>
                {label && (
                    <Pressable
                        className="block mb-2"
                        onPress={() => {
                            innerRef.current.open();
                        }}
                    >
                        <Text className="text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </Text>
                    </Pressable>
                )}
                <Dropdown
                    data={options}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}
                    value={value}
                    disable={disabled}
                    style={[
                        styles.dropdown,
                        isDark && styles.darkDropdown,
                        isFocused && styles.dropdownFocus,
                    ]}
                    placeholderStyle={[
                        styles.placeholderStyle,
                        isDark && styles.darkPlaceholderStyle,
                    ]}
                    selectedTextStyle={[
                        styles.selectedTextStyle,
                        isDark && styles.darkSelectedTextStyle,
                    ]}
                    containerStyle={[
                        styles.containerStyle,
                        isDark && styles.darkContainerStyle,
                    ]}
                    search={search}
                    renderInputSearch={(onSearch) => (
                        <View className="p-2.5">
                            <TextInput
                                onChange={(e) => {
                                    onSearch(e.currentTarget.value);
                                }}
                                placeholder={searchPlaceholder || t('search')}
                            />
                        </View>
                    )}
                    renderItem={(item, selected) => (
                        <View
                            className={`${search ? 'px-5 py-2.5' : 'p-2.5'} ${selected ? 'bg-blue-500 hover:bg-blue-400 dark:hover:bg-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} text-start`}
                        >
                            <Text
                                className={`text-sm text-start ${selected ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}
                            >
                                {item.label}
                            </Text>
                        </View>
                    )}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={onChange}
                    ref={innerRef}
                />
            </View>
        );
    }
);

Select.propTypes = {
    /**
     * The label to display next to the select box
     */
    label: PropTypes.string,

    /**
     * The name of the select box (useful for forms)
     */
    name: PropTypes.string,

    /**
     * The selected value
     */
    value: PropTypes.string,

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
    ).isRequired,

    /**
     * The placeholder to be shown on the select
     */
    placeholder: PropTypes.string,

    /**
     * Is the select box disabled
     */
    disabled: PropTypes.bool,

    /**
     * Should the select have a search through the items?
     */
    search: PropTypes.bool,

    /**
     * Placeholder for the search input
     */
    searchPlaceholder: PropTypes.string,

    /**
     * Called when the selected item changes
     */
    onChange: PropTypes.func,

    /**
     * Optional extra classname to the select box
     */
    className: PropTypes.string,
};
