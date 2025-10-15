<template>
    <div class="p-4">
        <h1 class="text-xl font-bold mb-4">Выбрать место</h1>

        <div class="container">
            <!-- Проходим по рядам -->
            <div v-for="row in seatGrid" :key="row.row" class="container__row">
                <!-- Проходим по местам в каждом ряду -->
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

        <div class="mt-4 text-center">
            <ControlButton @click="book">Забронировать</ControlButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBookedSeat } from '@/types/common';

const route = useRoute();
const { isAuth } = useAuthStore();

const { data, execute } = useSessionApi().getSession(route.params.id as string);
execute();

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
            }
        } catch (error: any) {
            console.log(error);
        }
    } else {
        navigateTo('/login');
    }
};
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    &__seat {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border: 1px solid black;

        &:hover {
            background-color: aqua;
        }

        &--active {
            background-color: greenyellow;
        }

        &--disabled {
            background-color: red;
            pointer-events: none;
        }
    }
}
</style>
