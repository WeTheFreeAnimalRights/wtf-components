export class SecureStore {
    static encryptionKey = '3movies-mystats-16012025';

    // Simple encryption using XOR (for demonstration purposes; replace with a stronger algorithm if needed)
    static encrypt(data) {
        const key = SecureStore.encryptionKey;
        return btoa(
            data
                .split('')
                .map((char, i) =>
                    String.fromCharCode(
                        char.charCodeAt(0) ^ key.charCodeAt(i % key.length)
                    )
                )
                .join('')
        );
    }

    static decrypt(data) {
        const key = SecureStore.encryptionKey;
        return atob(data)
            .split('')
            .map((char, i) =>
                String.fromCharCode(
                    char.charCodeAt(0) ^ key.charCodeAt(i % key.length)
                )
            )
            .join('');
    }

    static set(key, value, durationInDays) {
        const expiresAt = durationInDays
            ? Date.now() + durationInDays * 24 * 60 * 60 * 1000
            : null;
        const data = { value, expiresAt };
        const encryptedData = SecureStore.encrypt(JSON.stringify(data));
        localStorage.setItem(key, encryptedData);
    }

    static get(key) {
        const encryptedData = localStorage.getItem(key);
        if (!encryptedData) return undefined;

        try {
            const data = JSON.parse(SecureStore.decrypt(encryptedData));

            if (data.expiresAt && Date.now() > data.expiresAt) {
                localStorage.removeItem(key); // Clear expired data
                return undefined;
            }

            return data.value;
        } catch (e) {
            // Decryption or parsing failed
            localStorage.removeItem(key);
            console.error(`Failed to decrypt or parse data for key: ${key}`);
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}
