import {
    GeneratedStandardForm,
    StandardCodeInput,
    StandardTextarea,
} from './index';

export default {
    title: 'Components/GeneratedStandardForm',
    component: GeneratedStandardForm,
    tags: ['autodocs'],
    argTypes: {
        onSuccess: {
            action: 'success',
        },
        onError: {
            action: 'error',
        },
    },
};

export const Primary = () => {
    return (
        <GeneratedStandardForm>
            <div>Something demo</div>
            <StandardTextarea name="myTextarea" value="some value">
                Textarea
            </StandardTextarea>

            <div className="my-text">
                <div>Red thing</div>
                <StandardCodeInput name="myCodeInput">
                    Code Input
                </StandardCodeInput>
            </div>
        </GeneratedStandardForm>
    );
};
