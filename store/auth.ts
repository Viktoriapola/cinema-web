import type { IErrorResponse } from '@/types/common';
import type { AuthForm, AuthResponseError } from '@/types/auth';
import { AUTH_FORM } from '@/constants/auth';

export function useAuthStore() {
    const { loginFetch, registerFetch } = useAuthApi();
    const storage = useLocalStorage();

    const isAuth: Ref<boolean> = useState('isAuth', () => false);
    const confirmField = ref<string>('');
    const errorMessage = ref<string | null>(null);
    const form = ref<AuthForm>({ ...AUTH_FORM });

    onMounted(() => {
        isAuth.value = Boolean(storage.get('token'));
    });

    const setErrorMessage = (message: string | null) => {
        errorMessage.value = message;
    };

    const login = async (form: AuthForm) => {
        try {
            const { token } = await loginFetch(form);
            if (token) {
                storage.set('token', token);
                isAuth.value = true;
                navigateTo('/tickets');
            } else {
                setErrorMessage('Что-то пошло не так, повторите позже')
            }
        } catch (error: unknown) {
            const errorType = error as IErrorResponse<AuthResponseError>;
            setErrorMessage(errorType.data?.message ?? null);
        }
    };

    const logout = () => {
        storage.remove('token');
        isAuth.value = false;
        navigateTo('/');
    };

    const register = async (form: AuthForm) => {
        try {
            await registerFetch(form);
            navigateTo('/tickets');
        } catch (error: unknown) {
            const errorType = error as IErrorResponse<AuthResponseError>;
            setErrorMessage(errorType.data?.message ?? null);
        }
    };

    return {
        isAuth,
        form,
        confirmField,
        errorMessage,
        login,
        logout,
        register,
        setErrorMessage
    };
}
