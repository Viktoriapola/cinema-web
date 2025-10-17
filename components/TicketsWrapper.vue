<template>
    <div class="tickets-wrapper">
        <h3 class="tickets-wrapper__title">{{ title }}</h3>
        <ul v-if="data.length" class="tickets-wrapper__list">
            <li v-for="item of data" :key="item.id" class="tickets-wrapper__list-item list-item">
                <div class="list-item__content">
                    <div class="list-item__name">
                        <div>Сеанс: {{ item.movieSessionId }}</div>
                        <div>Дата: {{ getDate(item.bookedAt) }}</div>
                        <div>Время: {{ getTime(item.bookedAt) }}</div>
                    </div>
                    <div class="list-item__seats">
                        <div v-for="seat of item.seats" class="list-item__seat seat">
                            <div class="seat__row">Ряд: {{ seat.rowNumber }}</div>
                            <div class="seat__col">Место: {{ seat.seatNumber }}</div>
                        </div>
                    </div>
                </div>
                <div class="list-item__action">
                    <slot name="action" :item="item" />
                </div>
            </li>
        </ul>
        <EmptyText v-else>Пусто</EmptyText>
    </div>
</template>

<script setup lang="ts">
import type { IUserInfoBooking } from '@/types/user';
import { getDate, getTime } from '@/utils/common';

defineProps<{
    title: string;
    data: IUserInfoBooking[];
}>();
</script>

<style scoped lang="scss">
.tickets-wrapper {
    &__title {
        color: $color-white;
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid $color-white;
        margin-bottom: 20px;
    }

    .list-item {
        color: $color-white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__content {
            width: 50%;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }

        &__name {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        &__seats {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .seat {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }
    }
}
</style>
