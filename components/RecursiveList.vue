<template>
    <div class="sessions">
        <div v-for="[date, cinemas] in Object.entries(data)" :key="date" class="sessions__group">
            <h2 class="sessions__date">{{ date }}</h2>

            <div v-for="[id, sessions] in Object.entries(cinemas)" :key="id" class="sessions__list-container">
                <h3 class="sessions__cinema-title">{{ itemName }}: {{ id }}</h3>

                <ul class="sessions__list">
                    <li
                        v-for="session in sessions"
                        :key="session.id"
                        class="sessions__item"
                        @click="$emit('select', session.id)"
                    >
                        {{ getTime(session.startTime) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends { id: string | number; startTime: string; [key: string]: any }">
import { getTime } from '@/utils/common';

defineProps<{
    itemName: string;
    data: Record<string, Record<string, T[]>>;
}>();
defineEmits<{
    select: [number | string]
}>()
</script>

<style scoped lang="scss">
.sessions {
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: $color-white;

    &__date {
        width: 100%;
        font-weight: 600;
        font-size: 24px;
        padding-bottom: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid $color-white;
    }

    &__list-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        align-items: center;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-right: 50px;
    }

    &__item {
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid $color-white;
        transition: background-color 0.3s;

        &:hover {
            border-color: $color-golden-popcorn;
            background-color: $color-golden-popcorn;
        }
    }
}
</style>
