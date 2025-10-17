export function usePaymantApi() {
    function pay(bookingId: string) {
        const config = useRuntimeConfig();
        const storage = useLocalStorage();
        const token = storage.get('token');

        return $fetch<{ message: string }>(`/bookings/${bookingId}/payments`, {
            baseURL: config.public.apiURI,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return {
        pay
    };
}
