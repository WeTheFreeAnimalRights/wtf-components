import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';
import { GeneratedStandardForm } from '../StandardForm';
import { DataTableFiltersFooter } from './DataTableFiltersFooter';
import { getAppliedFiltersCount } from './helpers/getAppliedFiltersCount';

export const DataTableFilters = ({ meta, filters, onFiltersApplied }) => {
    const { t } = useTranslations();
    const [filtersOpen, setFiltersOpen] = useState(false);

    // If no filters are set up
    if (!filters) {
        return null;
    }

    const { filters: appliedFilters } = meta || {};
    const filtersCount = getAppliedFiltersCount(appliedFilters);

    return (
        <Popover
            onOpenChange={(value) => setFiltersOpen(value)}
            open={filtersOpen}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" className="ms-3">
                    <Filter className="w-4 h-4 me-2" />
                    {t('filters')}
                    {filtersCount > 0 && (
                        <Badge variant="simple" className="ms-2">
                            {filtersCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <GeneratedStandardForm
                    schema={filters}
                    options={{
                        sendToServer: false,
                        eachField: {
                            optional: true,
                        },
                    }}
                    onSuccess={(values) => {
                        setFiltersOpen(false);
                        if (typeof onFiltersApplied === 'function') {
                            onFiltersApplied(values);
                        }
                    }}
                    footer={({ loading }) => (
                        <DataTableFiltersFooter loading={loading} />
                    )}
                    values={appliedFilters}
                />
            </PopoverContent>
        </Popover>
    );
};
