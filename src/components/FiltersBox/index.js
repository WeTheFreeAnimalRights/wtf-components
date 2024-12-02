import { isFunction } from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';
import { GeneratedStandardForm } from '../StandardForm';
import { FiltersBoxFooter } from './FiltersBoxFooter';
import { getAppliedFiltersCount } from './helpers/getAppliedFiltersCount';
import { getSchema } from '../StandardForm/helpers/getSchema';

export const FiltersBox = ({ children, className, onApplied }) => {
    const { t } = useTranslations();

    // Are the filters open
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Count the applied filters
    const { values } = getSchema(children);
    const filtersCount = getAppliedFiltersCount(values);

    return (
        <Popover
            onOpenChange={(value) => setFiltersOpen(value)}
            open={filtersOpen}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" className={className}>
                    <Filter className="w-4 h-4 me-2" />
                    {t('filters-box-title')}
                    {filtersCount > 0 && (
                        <Badge variant="simple" className="ms-2">
                            {filtersCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <GeneratedStandardForm
                    options={{
                        sendToServer: false,
                        eachField: {
                            optional: true,
                        },
                    }}
                    onSuccess={(values) => {
                        setFiltersOpen(false);
                        if (isFunction(onApplied)) {
                            onApplied(values);
                        }
                    }}
                    footer={({ loading }) => (
                        <FiltersBoxFooter loading={loading} />
                    )}
                >
                    {children}
                </GeneratedStandardForm>
            </PopoverContent>
        </Popover>
    );
};

FiltersBox.displayName = 'FiltersBox';

FiltersBox.propTypes = {
    /**
     * When the user applies the filters
     */
    onApplied: PropTypes.func,

    /**
     * Optional extra classname to the filters box
     */
    className: PropTypes.string,
};
