import type { IUserInfoBooking } from '@/types/user';

export function useUserApi() {
    function getBookings(token: string) {
        const config = useRuntimeConfig();

        return $fetch<IUserInfoBooking[]>('/me/bookings', {
            baseURL: config.public.apiURI,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return {
        getBookings
    };
}
