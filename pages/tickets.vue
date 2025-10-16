<template>
    <ClientOnly>
        <PageWrapper withBack title="Мои билеты" :isLoading="isLoading">
            <div>
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
        </PageWrapper>
    </ClientOnly>
</template>

<script setup lang="ts">
import type { IUserInfoBooking } from '@/types/user';

type TFilteredData = {
    notPaid: IUserInfoBooking[];
    future: IUserInfoBooking[];
};

definePageMeta({
    middleware: 'auth'
});

const storage = useLocalStorage();
const { showError } = useSnackbar()

const isLoading = ref<boolean>(false);
const data = ref<TFilteredData>({
    notPaid: [],
    future: []
});

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

const getTimer = async () => {
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
    isLoading.value = true;
    const token = storage.get('token');
    if (token) {
        try {
            const response = await useUserApi().getBookings(token as string);
            if (response) {
                isLoading.value = false;
                data.value = filterData(response);
            }
        } catch (error: unknown) {
            showError('Ошибка загрузки данных', error)
        }
    }
};

onMounted(async () => {
    await getBookings();
    data.value.notPaid.length && (await getTimer());
});
</script>
