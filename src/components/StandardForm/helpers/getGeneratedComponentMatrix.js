// Definitions
import { StandardCheckbox } from '../definitions/StandardCheckbox';
import { StandardMultipleCheckbox } from '../definitions/StandardMultipleCheckbox';
import { StandardCodeInput } from '../definitions/StandardCodeInput';
import { StandardCombobox } from '../definitions/StandardCombobox';
import { StandardDatePicker } from '../definitions/StandardDatePicker';
import { StandardTextInput } from '../definitions/StandardTextInput';
import { StandardNumberInput } from '../definitions/StandardNumberInput';
import { StandardPasswordInput } from '../definitions/StandardPasswordInput';
import { StandardRadioGroup } from '../definitions/StandardRadioGroup';
import { StandardSelect } from '../definitions/StandardSelect';
import { StandardSwitch } from '../definitions/StandardSwitch';
import { StandardTextarea } from '../definitions/StandardTextarea';
import { StandardTimePicker } from '../definitions/StandardTimePicker';
import { StandardToggleGroup } from '../definitions/StandardToggleGroup';
import { StandardUploadInput } from '../definitions/StandardUploadInput';

// Replacements
import { FormFieldCheckbox, FormFieldMultipleCheckbox } from '../../Checkbox';
import { FormFieldCodeInput } from '../../CodeInput';
import { FormFieldCombobox } from '../../Combobox';
import { FormFieldDatePicker } from '../../DatePicker';
import { FormFieldTextInput } from '../../TextInput';
import { FormFieldNumberInput } from '../../NumberInput';
import { FormFieldPasswordInput } from '../../PasswordInput';
import { FormFieldRadioGroup } from '../../RadioGroup';
import { FormFieldSelect } from '../../Select';
import { FormFieldSwitch } from '../../Switch';
import { FormFieldTextarea } from '../../Textarea';
import { FormFieldTimePicker } from '../../TimePicker';
import { FormFieldToggleGroupInput } from '../../ToggleGroupInput';
import { FormFieldUploadInput } from '../../UploadInput';
import { parseDate } from '../../DatePicker/parseDate';

export const getGeneratedComponentMatrix = () => {
    return {
        [StandardCheckbox.displayName]: {
            Component: FormFieldCheckbox,
            type: 'boolean',
        },
        [StandardMultipleCheckbox.displayName]: {
            Component: FormFieldMultipleCheckbox,
            type: 'multiple',
        },
        [StandardCodeInput.displayName]: {
            Component: FormFieldCodeInput,
            type: 'code',
        },
        [StandardCombobox.displayName]: {
            Component: FormFieldCombobox,
            type: 'combobox',
        },
        [StandardDatePicker.displayName]: {
            Component: FormFieldDatePicker,
            type: 'datepicker',
            parseValue: (value, props) =>
                parseDate(value, props.showTime || false),
        },
        [StandardTimePicker.displayName]: {
            Component: FormFieldTimePicker,
            type: 'timepicker',
            parseValue: (value) => parseDate(value, true),
        },
        [StandardTextInput.displayName]: {
            Component: FormFieldTextInput,
            type: 'text',
        },
        [StandardNumberInput.displayName]: {
            Component: FormFieldNumberInput,
            type: 'number',
        },
        [StandardPasswordInput.displayName]: {
            Component: FormFieldPasswordInput,
            type: 'password',
        },
        [StandardSelect.displayName]: {
            Component: FormFieldSelect,
            type: 'select',
        },
        [StandardSwitch.displayName]: {
            Component: FormFieldSwitch,
            type: 'boolean',
        },
        [StandardRadioGroup.displayName]: {
            Component: FormFieldRadioGroup,
            type: 'select',
        },
        [StandardTextarea.displayName]: {
            Component: FormFieldTextarea,
            type: 'textarea',
        },
        [StandardToggleGroup.displayName]: {
            Component: FormFieldToggleGroupInput,
            type: 'togglegroup',
        },
        [StandardUploadInput.displayName]: {
            Component: FormFieldUploadInput,
            type: 'upload',
        },
    };
};
