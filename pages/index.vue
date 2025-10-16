<template>
    <PageWrapper title="Фильмы" :isLoading="isLoading">
        <Table :columns="columns" :rows="data" class="movie">
            <template #cell-posterImage="{ row }">
                <ImageBox :url="row.posterImage" />
            </template>
            <template #cell-lengthMinutes="{ row }">
                {{ minutesToHours(row.lengthMinutes) }}
            </template>
            <template #cell-rating="{ row }">
                <div class="movie__rating">
                    <span>{{ row.rating }}</span>
                    <StarIcon />
                </div>
            </template>
            <template #cell-action="{ row }">
                <ControlButton class="action-button" @click="navigateTo(`/${row.id}`)">Посмотреть сиансы</ControlButton>
            </template>
        </Table>
    </PageWrapper>
</template>

<script setup lang="ts">
import Table from '@/components/Table.vue';
import StarIcon from '@/assets/icons/star.svg?component'
import { minutesToHours } from '@/utils/common'

const columns = [
    { key: 'posterImage', label: '' },
    { key: 'title', label: 'Название' },
    { key: 'lengthMinutes', label: 'Продолжительность' },
    { key: 'rating', label: 'Рейтинг' },
    { key: 'action', label: '' }
];
const { data, execute, status } = useMoviesApi().getMovies();
execute();

const isLoading = computed(() => !['success', 'error'].includes(status.value));
</script>

<style scoped lang="scss">
.movie {
    &__rating {
        display: flex;
        align-items: center;
        gap: 5px;
    }
}
</style>
