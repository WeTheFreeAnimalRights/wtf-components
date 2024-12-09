export const getAppliedFiltersCount = (appliedFilters) => {
    // If no filters are set up
    if (!appliedFilters) {
        return 0;
    }

    return Object.values(appliedFilters).filter(Boolean).length;
};
