import type { ICinema, ICinemaSession } from '@/types/cinemas';

export function useCinemasApi() {
    function getCinemas() {
        const config = useRuntimeConfig();

        return useRequest<ICinema[]>('/cinemas', {
            baseURL: config.public.apiURI,
            method: 'GET'
        });
    }

    function getSessions(cinemaId: string) {
        const config = useRuntimeConfig();

        return useRequest<ICinemaSession[]>(`/cinemas/${cinemaId}/sessions`, {
            baseURL: config.public.apiURI,
            method: 'GET'
            
        });
    }

    return {
        getCinemas,
        getSessions
    };
}
