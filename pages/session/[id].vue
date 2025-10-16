<template>
    <PageWrapper withBack title="Выбрать место" :isLoading="isLoading">
        <div>
            <div class="container">
                <div v-for="(row, index) in seatGrid" :key="row.row" class="container__row">
                    <div>{{ `${index + 1} ряд`  }}</div>
                    <div
                        v-for="seat in row.seats"
                        :key="seat.seatKey"
                        class="container__seat"
                        :class="{
                            'container__seat--active': selectedSeats.includes(seat.seatKey),
                            'container__seat--disabled': bookedSeats?.includes(seat.seatKey)
                        }"
                        @click="selectSeat(seat.seatKey)"
                    >
                        {{ seat.seat }}
                    </div>
                </div>
            </div>
            <div class="container__button">
                <ControlButton :disabled="!selectedSeats.length" @click="book">Забронировать</ControlButton>
            </div>
        </div>
    </PageWrapper>
</template>

<script setup lang="ts">
import type { IBookedSeat } from '@/types/common';

const route = useRoute();
const { isAuth } = useAuthStore();
const { showError, showSuccess } = useSnackbar();

const { data, execute, status } = useSessionApi().getSession(route.params.id as string);
execute();

const isLoading = computed(() => !['success', 'error'].includes(status.value));

const selectedSeats = ref<string[]>([]);

const bookedSeats = computed(() =>
    data.value?.bookedSeats.map((seat: IBookedSeat) => `${seat.rowNumber}-${seat.seatNumber}`)
);

const seatGrid = computed(() => {
    const rowCount = data.value?.seats.rows || 0;
    const seatsPerRow = data.value?.seats.seatsPerRow || 0;

    return Array.from({ length: rowCount }, (_, rowIndex) => ({
        row: rowIndex + 1,
        seats: Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
            seatKey: `${rowIndex + 1}-${seatIndex + 1}`, // 🔑 уникальный ID
            row: rowIndex + 1,
            seat: seatIndex + 1,
            selected: false
        }))
    }));
});

const selectSeat = (seatKey: string) => {
    const index = selectedSeats.value.indexOf(seatKey);
    index > -1 ? selectedSeats.value.splice(index, 1) : selectedSeats.value.push(seatKey);
};

const book = async () => {
    const dataToRequest: IBookedSeat[] = selectedSeats.value.map((seat: string) => {
        const [rowStr, seatStr] = seat.split('-');

        return {
            rowNumber: Number(rowStr),
            seatNumber: Number(seatStr)
        };
    });
    if (isAuth.value) {
        const body = { seats: dataToRequest };

        try {
            const response = await useSessionApi().bookSession(route.params.id as string, body);
            if (response) {
                navigateTo('/tickets');
                showSuccess('Билеты успешно забронированны')
            }
        } catch (error: unknown) {
            showError('Что-то пошло не так, попробуйте позже.', error)
        }
    } else {
        navigateTo('/login');
        showError('Требуется авторизация')
    }
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    overflow-x: auto;

    &__row {
        color: $color-white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    &__seat {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        color: $color-white;
        width: 30px;
        height: 30px;
        background-color: $color-silver-screen-light;

        &:hover {
            background-color: $color-golden-popcorn;
        }

        &--active {
            background-color: $color-success;
        }

        &--disabled {
            background-color: $color-error;
            pointer-events: none;
        }
    }

    &__button {
        display: flex;
        justify-content: center;
    }
}
</style>
