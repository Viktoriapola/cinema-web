export function usePaymantApi() {
    function pay(token: string, bookingId: string) {
        const config = useRuntimeConfig();

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
