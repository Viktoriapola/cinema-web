<template>
    <PageWrapper withBack :isLoading="isLoading">
        <RecursiveList :data="sessionsByMovie" itemName="Фильм" @select="goToSession" />
    </PageWrapper>
</template>

<script setup lang="ts">
const route = useRoute();

const { data, execute, status } = useCinemasApi().getSessions(route.params.id as string);
execute();

const isLoading = computed(() => !['success', 'error'].includes(status.value));

const sessionsByMovie = useGroupedSessions('movieId', data);

const goToSession = (id: number | string) => {
    navigateTo(`/session/${id}`);
};
</script>

<style scoped lang="scss">
.card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
