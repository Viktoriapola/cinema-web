import type { IMovie, IMovieSession } from '@/types/movies';

export function useMoviesApi() {
    function getMovies() {
        const config = useRuntimeConfig();

        return useRequest<IMovie[]>('/movies', {
            baseURL: config.public.apiURI,
            method: 'GET'
        });
    }

    function getSessions(moviesSessionId: string) {
        const config = useRuntimeConfig();

        return useRequest<IMovieSession[]>(`/movies/${moviesSessionId}/sessions`, {
            baseURL: config.public.apiURI,
            method: 'GET'
        });
    }

    return {
        getMovies,
        getSessions
    };
}
