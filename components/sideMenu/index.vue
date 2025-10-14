<template>
    <div>
        <h1>Side Menu</h1>
        <ul>
            <li v-for="item in filteredMenu" :key="item.key">
                <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
            </li>
            <ClientOnly>
                <li v-if="isAuth" @click="logout">Выход</li>
                <li v-else>
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>
            </ClientOnly>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { MENU } from '@/constants/menu';

const { isAuth, logout } = useAuthStore();

const filteredMenu = computed(() =>
    MENU.filter((item) => {
        return item.isAllowedWithoutAuth || isAuth.value;
    })
);
</script>

<style scoped lang="scss">
.side-menu {
    width: 200px;
    height: 100%;
    background-color: #f0f0f0;
}
</style>
