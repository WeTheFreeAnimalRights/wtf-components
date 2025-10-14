export class SecureStore {
    static encryptionKey = '3movies-mystats-16012025';
    static VERSION_PREFIX = 'v2:'; // new scheme marker

    // --- helpers: utf8 <-> bytes, base64 <-> bytes ---
    static #toBytes(str) {
        return new TextEncoder().encode(str);
    }
    static #fromBytes(bytes) {
        return new TextDecoder().decode(bytes);
    }
    static #b64FromBytes(bytes) {
        // safe for 0..255
        let bin = '';
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return btoa(bin);
    }
    static #bytesFromB64(b64) {
        const bin = atob(b64);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
    }

    // --- NEW v2 (emoji-safe) encrypt/decrypt on UTF-8 bytes ---
    static #encryptV2(plainStr) {
        const keyBytes = SecureStore.#toBytes(SecureStore.encryptionKey);
        const dataBytes = SecureStore.#toBytes(plainStr);
        const out = new Uint8Array(dataBytes.length);
        for (let i = 0; i < dataBytes.length; i++) {
            out[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
        }
        return SecureStore.VERSION_PREFIX + SecureStore.#b64FromBytes(out);
    }

    static #decryptV2(cipher) {
        const b64 = cipher.startsWith(SecureStore.VERSION_PREFIX)
            ? cipher.slice(SecureStore.VERSION_PREFIX.length)
            : cipher;
        const keyBytes = SecureStore.#toBytes(SecureStore.encryptionKey);
        const dataBytes = SecureStore.#bytesFromB64(b64);
        const out = new Uint8Array(dataBytes.length);
        for (let i = 0; i < dataBytes.length; i++) {
            out[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
        }
        return SecureStore.#fromBytes(out);
    }

    // --- OLD v1 (kept only for backward compatibility) ---
    // XOR on UTF-16 code units + btoa (breaks with emojis)
    static #decryptV1(data) {
        const key = SecureStore.encryptionKey;
        const decoded = atob(data)
            .split('')
            .map((char, i) =>
                String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
            )
            .join('');
        return decoded;
    }

    // Public encrypt/decrypt
    static encrypt(data) {
        // Always write with v2 going forward (emoji-safe).
        return SecureStore.#encryptV2(data);
    }

    static decrypt(data) {
        // If marked v2, use v2. Otherwise try legacy v1 first; if it fails, try v2 without prefix.
        if (data.startsWith(SecureStore.VERSION_PREFIX)) {
            return SecureStore.#decryptV2(data);
        }
        try {
            return SecureStore.#decryptV1(data);
        } catch (_) {
            // Not valid v1 (or atob failed) — try v2 without prefix as a last resort
            try {
                return SecureStore.#decryptV2(data);
            } catch (__) {
                throw new Error('Decryption failed (unknown format).');
            }
        }
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
            const json = SecureStore.decrypt(encryptedData);
            const data = JSON.parse(json);

            if (data.expiresAt && Date.now() > data.expiresAt) {
                localStorage.removeItem(key);
                return undefined;
            }
            return data.value;
        } catch (e) {
            // Could not decrypt/parse; clean up corrupt entry
            localStorage.removeItem(key);
            console.error(`Failed to decrypt or parse data for key: ${key}`, e);
            return undefined;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}
