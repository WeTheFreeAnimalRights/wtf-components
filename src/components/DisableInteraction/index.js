export const DisableInteraction = ({ enabled = false, children }) => {
    if (!enabled) {
        return children;
    }
    return (
        <div className="relative">
            <div className="absolute left-0 top-0 right-0 bottom-0 z-10 bg-background/50" />
            {children}
        </div>
    );
};
