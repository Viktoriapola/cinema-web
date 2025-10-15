<template>
    <div class="card-container">
        <ControlButton @click="goBack">Назад</ControlButton>
        <div v-for="[date, cinemas] in Object.entries(sessionsGrouped)" :key="date">
            <h1>Дата: {{ date }}</h1>
            <div v-for="[movieId, sessions] in Object.entries(cinemas)" :key="movieId">
                <h2>Фильм {{ movieId }}</h2>
                <ul>
                    <li
                        v-for="session in sessions"
                        :key="session.id"
                        @click="navigateTo(`/session/${session.id}`)"
                    >
                        Сеанс: {{ session.startTime }}
                        ID: {{ session.id }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ICinemaSession } from '@/types/cinemas';
const route = useRoute();
const router = useRouter();

const { data, execute } = useCinemasApi().getSessions(route.params.id as string);
execute();

const sessionsGrouped = computed(() => {
    const sessions = data.value || [];

    return sessions.reduce<Record<string, Record<string, ICinemaSession[]>>>((acc, session) => {
        // Берем только дату в формате YYYY-MM-DD
        const date = session.startTime.split('T')[0];
        const movieId = session.movieId?.toString();
        if (!movieId || !date) return acc;

        if (!acc[date]) acc[date] = {};
        if (!acc[date][movieId]) acc[date][movieId] = [];

        acc[date][movieId].push(session);
        return acc;
    }, {});
});

function goBack() {
    router.back();
}
</script>

<style scoped lang="scss">
.card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
