<template>
    <button class="control-button" :class="{'control-button--disabled': disabled}">
        <slot />
    </button>
</template>

<script setup lang="ts">
defineProps<{
    disabled?: boolean;
}>();
</script>

<style scoped lang="scss">
.control-button {
    padding: 10px 30px;
    color: $color-white;
    background-color: rgba($color-golden-popcorn, 0.5);
    border-radius: 5px;
    transition: background-color 0.3s;

    &--disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &:hover {
        background-color: rgba($color-golden-popcorn, 0.7);
    }
}
</style>
