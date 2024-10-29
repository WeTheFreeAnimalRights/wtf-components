// Definitions
import { StandardCheckbox } from '../definitions/StandardCheckbox';
import { StandardCodeInput } from '../definitions/StandardCodeInput';
import { StandardCombobox } from '../definitions/StandardCombobox';
import { StandardDatePicker } from '../definitions/StandardDatePicker';
import { StandardTextInput } from '../definitions/StandardTextInput';
import { StandardNumberInput } from '../definitions/StandardNumberInput';
import { StandardPasswordInput } from '../definitions/StandardPasswordInput';
import { StandardSelect } from '../definitions/StandardSelect';
import { StandardSwitch } from '../definitions/StandardSwitch';
import { StandardTextarea } from '../definitions/StandardTextarea';
import { StandardUploadInput } from '../definitions/StandardUploadInput';

// Replacements
import { FormFieldCheckbox } from '../../Checkbox';
import { FormFieldCodeInput } from '../../CodeInput';
import { FormFieldCombobox } from '../../Combobox';
import { FormFieldDatePicker } from '../../DatePicker';
import { FormFieldTextInput } from '../../TextInput';
import { FormFieldNumberInput } from '../../NumberInput';
import { FormFieldPasswordInput } from '../../PasswordInput';
import { FormFieldSelect } from '../../Select';
import { FormFieldSwitch } from '../../Switch';
import { FormFieldTextarea } from '../../Textarea';
import { FormFieldUploadInput } from '../../UploadInput';

export const getGeneratedComponentMatrix = () => {
    return {
        [StandardCheckbox.displayName]: {
            Component: FormFieldCheckbox,
            type: 'boolean',
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
        [StandardTextarea.displayName]: {
            Component: FormFieldTextarea,
            type: 'textarea',
        },
        [StandardUploadInput.displayName]: {
            Component: FormFieldUploadInput,
            type: 'upload',
        },
    };
};
