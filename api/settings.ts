export function useSettingsApi() {
    function getSettings() {
        const config = useRuntimeConfig();
        const storage = useLocalStorage();
        const token = storage.get('token');

        return $fetch<{ bookingPaymentTimeSeconds: string }>('/settings', {
            baseURL: config.public.apiURI,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return {
        getSettings
    };
}
