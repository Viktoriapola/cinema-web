<template>
    <ul class="side-menu">
        <li v-for="item in filteredMenu" :key="item.key" class="side-menu__item side-menu__item--default">
            <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
        </li>
        <li v-if="isAuth" @click="logout" class="side-menu__item side-menu__item--exit">Выход</li>
        <li v-else class="side-menu__item side-menu__item--default">
            <NuxtLink to="/login">Вход</NuxtLink>
        </li>
    </ul>
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
    height: max-content;
    background-color: rgba($color-silver-screen, 0.2);
    border-radius: 25px;
    overflow: hidden;

    &__item {
        padding: 20px;
        text-align: center;
        cursor: pointer;

        &--default {
            a {
                color: $color-white;
            }

            &:hover {
                background-color: rgba($color-silver-screen, 0.3);
            }
        }

        &--exit {
            color: $color-sunset-flame;

            &:hover {
                background-color: rgba($color-sunset-flame, 0.1);
            }
        }

        .router-link-active {
            color: $color-golden-popcorn;
        }
    }
}
</style>
