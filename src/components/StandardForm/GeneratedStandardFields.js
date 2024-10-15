import React from 'react';
import { FormFieldCodeInput } from '../CodeInput';
import { FormFieldTextInput } from '../TextInput';
import { FormFieldSelect } from '../Select';
import { FormFieldPasswordInput } from '../PasswordInput';
import { FormFieldSwitch } from '../Switch';
import { FormFieldCheckbox } from '../Checkbox';
import { FormFieldTextarea } from '../Textarea';
import { FormFieldDatePicker } from '../DatePicker';
import { FormFieldUploadInput } from '../UploadInput';
import { getGeneratedStandardFieldProps } from './helpers/getGeneratedStandardFieldProps';
import { FormFieldNumberInput } from '../NumberInput';

export const GeneratedStandardFields = ({ fields = [], loading, error }) => {
    return fields.map((fieldSchema) => {
        const props = getGeneratedStandardFieldProps(fieldSchema);
        switch (fieldSchema.type) {
            case 'email':
                return (
                    <FormFieldTextInput
                        key={`email-${fieldSchema.name}`}
                        type="email"
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'password':
                return (
                    <FormFieldPasswordInput
                        key={`password-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'code':
                return (
                    <FormFieldCodeInput
                        key={`code-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'select':
                return (
                    <FormFieldSelect
                        key={`select-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'textarea':
                return (
                    <FormFieldTextarea
                        key={`textarea-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'datepicker':
                return (
                    <FormFieldDatePicker
                        key={`datepicker-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'number':
                return (
                    <FormFieldNumberInput
                        key={`number-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'upload':
                return (
                    <FormFieldUploadInput
                        key={`upload-input-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'boolean':
                return fieldSchema.checkbox ? (
                    <FormFieldCheckbox
                        key={`checkbox-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                ) : (
                    <FormFieldSwitch
                        key={`switch-${fieldSchema.name}`}
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
            case 'div':
                return (
                    <div key={`div-${fieldSchema.name}`} {...props}>
                        <GeneratedStandardFields
                            fields={fieldSchema.children}
                            loading={loading}
                            error={error}
                        />
                    </div>
                );
            default: // text by default
                return (
                    <FormFieldTextInput
                        key={`text-${fieldSchema.name}`}
                        type="text"
                        name={fieldSchema.name}
                        disabled={loading}
                        {...props}
                    />
                );
        }
    });
};
