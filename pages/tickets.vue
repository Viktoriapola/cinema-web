<template>
    <div>
        <h1>Tickets</h1>
        <div>
            <h2>не оплаченные</h2>
            <ul>
                <li v-for="item of data.notPaid" :key="item.id">
                    {{ item.movieSessionId }}
                    <ControlButton @click="getPayment(item.id)">Оплатить</ControlButton>
                </li>
            </ul>
        </div>
        <div>
            <h2>будущие</h2>
            <ul>
                <li v-for="item of data.future" :key="item.id">{{ item.movieSessionId }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IUserInfoBooking } from '@/types/user';
import { ref, onMounted } from 'vue';

type TFilteredData = {
    notPaid: IUserInfoBooking[];
    future: IUserInfoBooking[];
};

const storage = useLocalStorage();

// Изначально пустые группы
const data = ref<TFilteredData>({
    notPaid: [],
    future: []
});

// Функция фильтрации билетов
const filterData = (bookings: IUserInfoBooking[]): TFilteredData => {
    const result: TFilteredData = { notPaid: [], future: [] };

    bookings.forEach((ticket) => {
        if (!ticket.isPaid) {
            result.notPaid.push(ticket);
        } else {
            result.future.push(ticket);
        }
    });

    return result;
};

const getTimer = async() => {
    const token = storage.get('token');
    const response = await useSettingsApi().getSettings(token as string);
    console.log(response);
};

const getPayment = async (bookingId: string) => {
    const token = storage.get('token');
    const response = await usePaymantApi().pay(token as string, bookingId);
    if (response) {
        await getBookings();
    }
};

const getBookings = async () => {
    const token = storage.get('token');
    if (token) {
        const response = await useUserApi().getBookings(token as string);
        if (response) {
            data.value = filterData(response);
        }
    }
};

// Получение данных из API и фильтрация
onMounted(async () => {
    await getBookings();
    data.value.notPaid.length && await getTimer()
});
</script>
