import { isFunction } from 'lodash-es';
import { Button } from '../../Button';

export const ToggleButton = ({ className, components, value, onChange }) => {
    const OnComponent = components.on;
    const OffComponent = components.off;
    return (
        <Button
            variant="gray"
            onClick={() => {
                if (isFunction(onChange)) {
                    onChange(!value);
                }
            }}
            className={className}
        >
            {value ? (
                <OnComponent className="w-4 h-4" />
            ) : (
                <OffComponent className="w-4 h-4" />
            )}
        </Button>
    );
};

ToggleButton.displayName = 'ToggleButton';
