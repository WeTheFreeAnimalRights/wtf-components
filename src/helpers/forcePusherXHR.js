// Force pusher to use credentials
import Pusher from 'pusher-js';

export const forcePusherXHR = () => {
    const originalCreateXHR = Pusher.Runtime.createXHR;
    Pusher.Runtime.createXHR = function () {
        const xhr = originalCreateXHR.call(this);
        xhr.withCredentials = true;
        return xhr;
    };
    window.Pusher = Pusher;
};
