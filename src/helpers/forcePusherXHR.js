export const forcePusherXHR = () => {
    const Pusher = window.Pusher;
    if (!Pusher?.Runtime) {
        return;
    }
    if (Pusher.Runtime._alreadyReplaced) {
        return;
    }

    const originalCreateXHR = Pusher.Runtime.createXHR;
    Pusher.Runtime.createXHR = function () {
        const xhr = originalCreateXHR.call(this);
        xhr.withCredentials = true;
        console.log('Pusher xhr changed');
        return xhr;
    };
    Pusher.Runtime._alreadyReplaced = true;
    window.Pusher = Pusher;
};
