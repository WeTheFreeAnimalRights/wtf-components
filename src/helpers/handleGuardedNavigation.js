export const handleGuardedNavigation = (
    shouldBlock,
    message = 'You have unsaved changes. Are you sure you want to leave?'
) => {
    return (e) => {
        if (shouldBlock) {
            const confirmed = window.confirm(message);
            if (!confirmed) {
                e.preventDefault();
                return;
            }
        }
    };
};
