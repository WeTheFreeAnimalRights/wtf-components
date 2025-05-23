export const parseParticipants = (participants, meeting) => {
    const visitorId = String(meeting.visitor.id);
    const final = {
        all: [],
        current: null,
    };

    participants.forEach((item) => {
        if (String(item.id) === visitorId) {
            final.current = item;
        } else {
            final.all.push(item);
        }
    });

    return final;
};
