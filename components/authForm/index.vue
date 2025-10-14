<template>
    <div>
        <h1>{{ isLogin ? 'Login' : 'Registration' }}</h1>
        <form>
            <ControlInput v-model="form.username" type="text" placeholder="Username" @input="resetErrorMessage" />
            <ControlInput v-model="form.password" type="password" placeholder="Password" @input="resetErrorMessage" />
            <ControlInput
                v-if="!isLogin"
                v-model="confirmField"
                type="confirmation"
                placeholder="Password confirmation"
                @input="resetErrorMessage"
            />
        </form>
        <div v-if="errorMessage">{{ errorMessage }}</div>
        <ControlButton @click="submit">{{ isLogin ? 'Login' : 'Registration' }}</ControlButton>
        <div v-if="isLogin">Усли у вас нет аккаунта, <NuxtLink to="/registration">зарегистрируйтесь</NuxtLink></div>
        <div v-else>Усли у вас есть аккаунт, <NuxtLink to="/login">войдите</NuxtLink></div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const isLogin = computed(() => route.path === '/login');

const { form, confirmField, errorMessage, login, register, setErrorMessage } = useAuthStore();
const { isExistCapitalLetter, isExistNumber, isValidLength } = useValidation();

const checkValidation = (): boolean => {
    // Проверка username
    if (!isValidLength(form.value.username, 8)) {
        setErrorMessage('имя должно быть не меньше 8 символов');
        return false;
    }

    // Проверка password
    const password = form.value.password;
    const isPasswordValid = isValidLength(password, 8) && isExistCapitalLetter(password) && isExistNumber(password);

    if (!isPasswordValid) {
        setErrorMessage('пароль должен быть не меньше 8 символов и содержать одну заглавную буквы и одну цифру');
        return false;
    }

    // Проверка совпадения пароля
    if (!isLogin.value && password !== confirmField.value) {
        setErrorMessage('пароли не совпадают');
        return false;
    }

    return true;
};

const submit = async () => {
    errorMessage.value = '';

    if (!checkValidation() && !isLogin.value) return;

    if (isLogin.value) {
        await login(form.value);
        return;
    }
    register(form.value);
};

const resetErrorMessage = () => {
    setErrorMessage(null);
};
</script>
