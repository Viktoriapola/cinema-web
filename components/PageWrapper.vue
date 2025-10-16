<template>
    <div class="page-info-wrapper">
        <ControlButton v-if="withBack" class="page-info-wrapper__button" @click="goBack">Назад</ControlButton>

        <div class="page-info-wrapper__content">
            <Title v-if="title">{{ title }}</Title>

            <template v-if="isLoading">
                <div class="page-info-wrapper__spinner">
                    <Spinner />
                </div>
            </template>

            <template v-else>
                <slot />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import Title from '@/components/Title.vue';
import Spinner from '@/components/Spinner.vue';

const router = useRouter();

defineProps<{
    title?: string;
    withBack?: boolean;
    isLoading?: boolean;
}>();

function goBack() {
    router.back();
}
</script>

<style scoped lang="scss">
.page-info-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__button {
        align-self: flex-start;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__spinner {
        align-self: center;
    }
}
</style>
