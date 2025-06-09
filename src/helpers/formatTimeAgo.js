import { formatDistanceToNow, format, differenceInDays } from 'date-fns';

export const formatTimeAgo = (date) => {
    const daysAgo = differenceInDays(new Date(), date);

    if (daysAgo < 2) {
        return formatDistanceToNow(date, { addSuffix: true }); // e.g., "3 minutes ago"
    } else {
        return format(date, 'MMM d yyyy');
    }
};
