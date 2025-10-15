import type { IUserInfoBooking } from '@/types/user';

export function useSettingsApi() {
    function getSettings(token: string) {
        const config = useRuntimeConfig();

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
