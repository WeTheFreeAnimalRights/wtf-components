export const getStatusFromMeeting = (item) => {
    if (item.activist && item.activistEnteredAt) {
        return 'entered';
    }

    if (item.activist) {
        return 'accepted';
    }

    return 'loading';
}
