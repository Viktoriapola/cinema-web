import type { UseFetchOptions } from '#app';

export function useRequest<T>(path: string, options?: UseFetchOptions<T>) {
    const config = useRuntimeConfig();

    return useFetch(path, {
        baseURL: config.public.apiURI,
        immediate: false,
        ...options
    });
};