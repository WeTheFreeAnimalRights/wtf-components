import { formatDistanceToNow, differenceInDays } from 'date-fns';
import { formatDate } from './formatDate';

export const formatTimeAgo = (date) => {
    const daysAgo = differenceInDays(new Date(), date);

    if (daysAgo < 2) {
        return formatDistanceToNow(date, { addSuffix: true }); // e.g., "3 minutes ago"
    } else {
        return formatDate(date, 'MMM d yyyy');
    }
};
