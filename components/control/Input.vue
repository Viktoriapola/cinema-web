<template>
    <input v-model="value" :type="type" :placeholder="placeholder" @input="$emit('input')" />
</template>

<script setup lang="ts">
defineProps<{
    type: string;
    placeholder: string;
}>();

defineEmits<{
    input: []
}>()

const value = defineModel<string>({ required: true });
</script>
