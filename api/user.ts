import type { IUserInfoBooking } from '@/types/user';

export function useUserApi() {
    function getBookings() {
        const config = useRuntimeConfig();
        const storage = useLocalStorage();
        const token = storage.get('token');

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
