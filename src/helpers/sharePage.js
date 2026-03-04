export const sharePage = async ({ title, text }) => {
    const shareData = {
        title,
        text,
        url: window.location.href,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            return;
        }

        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(shareData.url);
        }
    } catch (error) {
        if (error?.name !== 'AbortError') {
            console.error('Unable to share landing page', error);
        }
    }
};
