export const parseParticipants = ({client}) => {
    const participants = client.getAllUser();
    const current = client.getCurrentUserInfo();

    const final = {
        all: [],
        current: null,
    };

    participants.forEach((item) => {
        if (item.userId === current.userId) {
            final.current = item;
        } else {
            final.all.push(item);
        }
    });

    return final;
};
