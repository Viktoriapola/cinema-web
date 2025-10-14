import type { AuthForm, AuthResponse } from '@/types/auth';

export function useAuthApi() {
    function loginFetch(body: AuthForm) {
        const config = useRuntimeConfig();

        return $fetch<AuthResponse>('/login', {
            baseURL: config.public.apiURI,
            method: 'POST',
            body
        });
    }

    function registerFetch(body: AuthForm) {
        const config = useRuntimeConfig();

        return $fetch<AuthResponse>('/register', {
            baseURL: config.public.apiURI,
            method: 'POST',
            body
        });
    }

    return {
        loginFetch,
        registerFetch
    };
}
