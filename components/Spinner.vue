<template>
    <div class="spinner" :style="{ width: `${size}px`, height: `${size}px` }"></div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        size?: string;
    }>(),
    {
        size: '40'
    }
);
</script>

<style scoped>
.spinner {
    border: 4px solid #ddd;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 1s steps(8) infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
