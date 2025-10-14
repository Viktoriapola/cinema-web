<template>
    <div class="app">
        <SideMenu class="app__menu" />
        <NuxtPage class="app__page" />
    </div>
</template>

<style scoped lang="scss">
.app {
    display: flex;
    gap: 20px;

    &__menu {
        max-width: 200px;
    }

    &__page {
        flex: 1;
    }
}
</style>