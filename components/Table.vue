<template>
    <template v-if="rows?.length">
        <table class="base-table">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.key">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="col in columns" :key="col.key">
                        <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                            {{ row[col.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
    <EmptyText v-else>{{ emptyText ?? 'Данных нет' }}</EmptyText>
</template>

<script setup lang="ts">
import EmptyText from '@/components/EmptyText.vue';

interface Column {
    key: string;
    label: string;
}

interface Props<T = any> {
    rows: T[] | undefined;
    columns: Column[];
    emptyText?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.base-table {
    width: 100%;
    min-width: 600px;
    overflow-x: auto;
    border-collapse: collapse;
    color: $color-white;

    thead > tr {
        border-bottom: 1px solid $color-sunset-flame;
    }

    tr > :last-child {
        text-align: end;
    }

    th,
    td {
        padding: 10px;
        text-align: start;
    }

    td {
        font-size: 14px;
    }
}
</style>
