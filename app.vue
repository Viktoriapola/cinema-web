<template>
    <div class="app">
        <div class="app__menu">
            <ClientOnly>
                <SideBar />
            </ClientOnly>
        </div>
        <div class="app__page">
            <NuxtPage class="app__page" />
            <Snackbar />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app {
    width: 100%;
    height: 100vh;
    background-color: $color-midnight-hall;
    display: flex;
    gap: 20px;
    padding: 20px;

    &__menu {
        min-width: 250px;
    }

    &__page {
        width: 100%;
        padding: 0 20px;
        overflow-y: auto;
    }
}
</style>
