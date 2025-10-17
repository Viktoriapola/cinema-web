<template>
    <div>{{ formattedTime }}</div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue';

const props = defineProps<{
    seconds: number | string;
}>();

const emit = defineEmits<{
    finish: [];
}>();

const timeLeft = ref(Number(props.seconds));
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const tick = () => {
    if (timeLeft.value > 0) {
        timeLeft.value--;
        timeoutId = setTimeout(tick, 1000);
    } else {
        emit('finish');
    }
};

const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeLeft.value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
});

watch(
    () => props.seconds,
    (newVal) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeLeft.value = Number(newVal);
        tick();
    },
    { immediate: true }
);

onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
});
</script>
