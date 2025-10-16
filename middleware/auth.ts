export default defineNuxtRouteMiddleware(() => {
    const { isAuth } = useAuthStore();
    const { showError } = useSnackbar();

    if (!isAuth.value && import.meta.client) {
        showError('Требуется авторизация');
        return navigateTo('/login');
    }
});

