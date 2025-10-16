<template>
    <PageWrapper title="Кинотеатры" :isLoading="isLoading">
        <Table :columns="columns" :rows="data" class="movie">
            <template #cell-action="{ row }">
                <ControlButton class="action-button" @click="navigateTo(`/cinemas/${row.id}`)">Посмотреть сиансы</ControlButton>
            </template>
        </Table>
    </PageWrapper>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue';

const columns = [
    { key: 'name', label: 'Кинотеатр' },
    { key: 'address', label: 'Адрес' },
    { key: 'action', label: '' }
];
const { data, execute, status } = useCinemasApi().getCinemas();
execute();
const isLoading = computed(() => !['success', 'error'].includes(status.value));
</script>
