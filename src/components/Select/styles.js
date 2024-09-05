import { StyleSheet } from 'react-native';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig({});
const tailwind = fullConfig.theme;

export const styles = StyleSheet.create({
    dropdown: {
        padding: tailwind.padding['2.5'],
        borderWidth: tailwind.borderWidth.DEFAULT,
        borderColor: tailwind.borderColor.gray[300],
        backgroundColor: tailwind.backgroundColor.gray[50],
        borderRadius: tailwind.borderRadius['lg'],
        color: tailwind.textColor.gray[800],
        fontSize: tailwind.fontSize['sm'],
        width: tailwind.width['full'],
    },
    darkDropdown: {
        color: tailwind.textColor.white,
        borderColor: tailwind.borderColor.gray[600],
        backgroundColor: tailwind.backgroundColor.gray[600],
    },
    dropdownFocus: {
        borderColor: tailwind.borderColor.blue[500],
        borderWidth: tailwind.borderWidth[2],
        shadowColor: tailwind.ringColor.blue[500],
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: tailwind.ringWidth['2'],
    },
    placeholderStyle: {
        fontSize: tailwind.fontSize['sm'],
        color: tailwind.textColor.gray[700],
    },
    darkPlaceholderStyle: {
        color: tailwind.textColor.gray[300],
    },
    selectedTextStyle: {
        fontSize: tailwind.fontSize['sm'],
        color: tailwind.textColor.gray[800],
    },
    darkSelectedTextStyle: {
        color: tailwind.textColor.white,
    },
    containerStyle: {
        borderWidth: tailwind.borderWidth.DEFAULT,
        borderColor: tailwind.borderColor.gray[300],
        backgroundColor: tailwind.backgroundColor.white,
        borderRadius: tailwind.borderRadius['lg'],
        overflow: 'scroll',
    },
    darkContainerStyle: {
        borderColor: tailwind.borderColor.gray[600],
        backgroundColor: tailwind.backgroundColor.gray[900],
        color: tailwind.textColor.white,
    },
});
