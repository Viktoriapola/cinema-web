import type { IErrorResponse, IErrorResponseData } from '@/types/common';

export const useSnackbar = () => {
    const storage = useLocalStorage();

    const snackbar = useState('snackbar', () => ({
        visible: false,
        message: '',
        type: 'success' as 'success' | 'error'
    }));

    const errorHandler = (error: IErrorResponse<IErrorResponseData>) => {
        if (error.status === 401) {
            storage.remove('token')
            show(error.data.message ?? 'Требуется авторизация', 'error');
            navigateTo('/login');
        }

        throw Error;
    };

    const show = (message: string, type: 'success' | 'error' = 'success') => {
        snackbar.value = { visible: true, message, type };
        setTimeout(() => {
            snackbar.value.visible = false;
        }, 3000);
    };

    const hide = () => {
        snackbar.value.visible = false;
    };

    const showSuccess = (message: string) => {
        show(message, 'success');
    };

    const showError = (message: string, error?: unknown) => {
        if (error) {
            errorHandler(error as IErrorResponse<IErrorResponseData>);
            return;
        }
        show(message, 'error');
    };

    return { snackbar, show, hide, showSuccess, showError };
};
