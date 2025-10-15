import type { IBookSessionResponse, ISession } from '@/types/session';
import type { IBookedSeat } from '@/types/common';

export function useSessionApi() {
    function getSession(movieSessionId: string) {
        const config = useRuntimeConfig();

        return useRequest<ISession>(`/movieSessions/${movieSessionId}`, {
            baseURL: config.public.apiURI,
            method: 'GET'
        });
    }

    function bookSession(movieSessionId: string, body: { seats: IBookedSeat[] }) {
        const config = useRuntimeConfig();
        const storage = useLocalStorage();
        const token = storage.get('token')

        return $fetch<IBookSessionResponse>(`/movieSessions/${movieSessionId}/bookings`, {
            baseURL: config.public.apiURI,
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return {
        getSession,
        bookSession
    };
}
