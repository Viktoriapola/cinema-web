<template>
    <transition name="slide-up">
        <div v-if="visible" class="snackbar" :class="`snackbar--${type}`">
            <span class="snackbar__message">{{ message }}</span>
            <button class="snackbar__close" @click="hide">×</button>
        </div>
    </transition>
</template>

<script setup lang="ts">
const { snackbar, hide } = useSnackbar();
const visible = computed(() => snackbar.value.visible);
const message = computed(() => snackbar.value.message);
const type = computed(() => snackbar.value.type);
</script>

<style scoped lang="scss">
.snackbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 220px;
    padding: 12px 40px 12px 20px;
    border-radius: 8px;
    color: $color-white;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    &--success {
        background-color: $color-success;
    }

    &--error {
        background-color: $color-error;
    }

    &__close {
        position: absolute;
        right: 10px;
        top: 8px;
        background: transparent;
        border: none;
        color: $color-white;
        font-size: 18px;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        transition: opacity 0.2s;

        &:hover {
            opacity: 0.8;
        }
    }
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px);
}
</style>
