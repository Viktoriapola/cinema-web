<template>
    <ClientOnly>
        <PageWrapper withBack title="Мои билеты" :isLoading="isLoading">
            <div class="tikets">
                <TicketsWrapper title="Hе оплаченные" :data="data.notPaid">
                    <template #action="{ item }">
                        <div class="tikets__pay">
                            <Timer :seconds="timer" @finish="getBookings" />
                            <ControlButton @click="getPayment(item.id)">Оплатить</ControlButton>
                        </div>
                    </template>
                </TicketsWrapper>
                <TicketsWrapper title="Будущие" :data="data.future" />
                <TicketsWrapper title="Прошедшие" :data="data.past" />
            </div>
        </PageWrapper>
    </ClientOnly>
</template>

<script setup lang="ts">
import type { IUserInfoBooking } from '@/types/user';

type TFilteredData = {
    notPaid: IUserInfoBooking[];
    future: IUserInfoBooking[];
    past: IUserInfoBooking[];
};

definePageMeta({
    middleware: 'auth'
});

const { showError, showSuccess } = useSnackbar();

const isLoading = ref<boolean>(false);
const timer = ref<number | string>(0);
const data = ref<TFilteredData>({
    notPaid: [],
    future: [],
    past: []
});

const filterData = (bookings: IUserInfoBooking[]): TFilteredData => {
    const result: TFilteredData = { notPaid: [], future: [], past: [] };

    bookings.forEach((ticket) => {
        // проверка только на isPaid так как в параметрах нет даты сеанса, только дата бронирования
        if (ticket.isPaid) {
            result.future.push(ticket);
        } else {
            result.notPaid.push(ticket);
        }
    });

    return result;
};

const getTimer = async () => {
    const response = await useSettingsApi().getSettings();
    timer.value = response.bookingPaymentTimeSeconds;
};

const getPayment = async (bookingId: string) => {
    try {
        const response = await usePaymantApi().pay(bookingId);
        if (response) {
            await getBookings();
            showSuccess('Билеты успешно оплачены');
        }
    } catch (error: unknown) {
        showError('Что-то пошло не так!', error);
    }
};

const getBookings = async () => {
    isLoading.value = true;
    try {
        const response = await useUserApi().getBookings();
        if (response) {
            isLoading.value = false;
            data.value = filterData(response);
        }
    } catch (error: unknown) {
        showError('Ошибка загрузки данных', error);
    }
};

onMounted(async () => {
    await getBookings();
    data.value.notPaid.length && (await getTimer());
});
</script>

<style scoped lang="scss">
.tikets {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__pay {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>
