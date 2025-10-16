<template>
    <div class="form">
        <Title class="form__title">{{ isLogin ? 'Вход' : 'Регистрация' }}</Title>

        <form class="form__inputs-wrapper">
            <ControlInput
                v-model="form.username"
                name="username"
                type="text"
                placeholder="Введите логин"
                @input="resetErrorMessage"
            />
            <ControlInput
                v-model="form.password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                isShowEye
                @input="resetErrorMessage"
            />
            <ControlInput
                v-if="!isLogin"
                v-model="confirmField"
                name="confirmField"
                type="password"
                placeholder="Повторите пароль"
                @input="resetErrorMessage"
            />
        </form>

        <div v-if="errorMessage" class="form__error">{{ errorMessage }}</div>

        <ControlButton class="form__button" @click="submit">
            {{ isLogin ? 'Войдите' : 'Зарегистрируйтесь' }}
        </ControlButton>

        <div v-if="isLogin" class="form__message">
            Усли у вас нет аккаунта, <NuxtLink to="/registration">зарегистрируйтесь</NuxtLink>
        </div>
        <div v-else class="form__message">Усли у вас есть аккаунт, <NuxtLink to="/login">войдите</NuxtLink></div>
    </div>
</template>

<script setup lang="ts">
import Title from '@/components/Title.vue';

const route = useRoute();
const isLogin = computed(() => route.path === '/login');

const { form, confirmField, errorMessage, login, register, setErrorMessage } = useAuthStore();
const { isExistCapitalLetter, isExistNumber, isValidLength } = useValidation();

const checkValidation = (): boolean => {
    // Проверка username
    if (!isValidLength(form.value.username, 8)) {
        setErrorMessage('Имя должно быть не меньше 8 символов');
        return false;
    }

    // Проверка password
    const password = form.value.password;
    const isPasswordValid = isValidLength(password, 8) && isExistCapitalLetter(password) && isExistNumber(password);

    if (!isPasswordValid) {
        setErrorMessage('Пароль должен быть не меньше 8 символов и содержать одну заглавную буквы и одну цифру');
        return false;
    }

    // Проверка совпадения пароля
    if (!isLogin.value && password !== confirmField.value) {
        setErrorMessage('Пароли не совпадают');
        return false;
    }

    return true;
};

const submit = async () => {
    setErrorMessage(null);

    if (isLogin.value) {
        await login(form.value);
        return;
    }
    if (checkValidation()) {
        await register(form.value);
    }
};

const resetErrorMessage = () => {
    setErrorMessage(null);
};
</script>

<style scoped lang="scss">
.form {
    min-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__title {
        text-align: center;
    }

    &__inputs-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__error {
        font-size: 14px;
        color: $color-sunset-flame;
    }

    &__button {
        align-self: center;
    }

    &__message {
        color: $color-white;

        & > a {
            color: $color-golden-popcorn;
            border-bottom: 1px solid $color-golden-popcorn;
        }
    }
}
</style>
