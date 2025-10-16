<template>
    <div class="image-wrapper">
        <div v-if="isLoading" class="image-wrapper__loader">
            <Spinner size="20" />
        </div>
        <img
            :src="imgSrc"
            @load="onLoad"
            @error="onError"
            alt=""
            class="image-wrapper__img"
            :class="{ 'image-wrapper__img--error': hasError }"
        />
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
    url: string;
    fallback?: string;
}>();

const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);

const imgSrc = computed(() => {
    if (hasError.value) {
        return props.fallback || '/default-image.jpg';
    }
    return `${config.public.apiURI}${props.url}`;
});

const onLoad = () => {
    isLoading.value = false;
};

const onError = () => {
    hasError.value = true;
    isLoading.value = false;
};
</script>

<style scoped lang="scss">
.image-wrapper {
    width: 90px;
    height: 135px;
    overflow: hidden;
    border-radius: 5px;
    background-color: $color-silver-screen-light;

    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        &--error {
            object-position: left;
        }
    }

    &__loader {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
