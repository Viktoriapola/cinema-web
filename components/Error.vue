<template>
    <div class="error-container">
        <div class="error-container__code">{{ code }}</div>
        <div class="error-container__message">{{ message }}</div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const code = computed(() => route.name === 'error' ? 'Ошибка' : route.name);

const { snackbar } = useSnackbar();
const message = computed(() => snackbar.value.message ?? 'Что-то пошло не так, повторите позже.');
</script>

<style scoped lang="scss">
.error-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;

    &__code {
        font-size: 60px;
        font-weight: bold;
        color: $color-sunset-flame;
    }

    &__message {
        text-align: center;
        font-size: 32px;
        color: $color-white;
    }
}
</style>
