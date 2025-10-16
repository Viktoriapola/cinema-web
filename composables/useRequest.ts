import type { UseFetchOptions } from '#app';

export function useRequest<T>(path: string, options?: UseFetchOptions<T>) {
    const config = useRuntimeConfig();
    const { showError } = useSnackbar();

    return useFetch(path, {
        baseURL: config.public.apiURI,
        immediate: false,
        ...options,
        onResponseError({ response }) {
            switch (response.status) {
                case 404: {
                    navigateTo('/404', { replace: true });
                    showError(response._data?.message ?? 'Страница не найдена');
                    break;
                }
                case 401: {
                    navigateTo('/login', { replace: true });
                    showError(response._data?.message ?? 'Требуется авторизация');
                    break;
                }
                default: {
                    navigateTo('/error', { replace: true });
                }
            }
        }
    });
}
