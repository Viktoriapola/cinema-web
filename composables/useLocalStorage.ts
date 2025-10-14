export function useLocalStorage() {
    const get = <T>(key: string, defaultValue?: T): T | null => {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue ?? null;
        try {
            return JSON.parse(item) as T;
        } catch {
            return defaultValue ?? null;
        }
    };

    const set = <T>(key: string, value: T): void => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const remove = (key: string): void => {
        localStorage.removeItem(key);
    };

    return { get, set, remove };
}
