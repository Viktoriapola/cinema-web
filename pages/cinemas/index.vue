<template>
    <div class="card-container">
        <h1>Cinemas</h1>
        <div v-for="item of data" :key="item.id" class="card">
            <div>{{ item.name }}</div>
            <ControlButton @click="navigateTo(`/cinemas/${item.id}`)">Посмотреть сиансы</ControlButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data, execute } = useCinemasApi().getCinemas()
execute()
</script>

<style scoped lang="scss">
.card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card {
    padding: 20px;
    border: 1px solid black;
}
</style>
