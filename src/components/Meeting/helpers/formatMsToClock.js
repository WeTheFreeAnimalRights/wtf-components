export const formatMsToClock = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
};
