export const playAudio = (sound) => {
    try {
        sound.currentTime = 0;
        // Some browsers block autoplay without prior gesture; ignore failure
        sound.play().catch(() => {});
    } catch (err) {
        console.error('sound play error:', err);
    }
};
