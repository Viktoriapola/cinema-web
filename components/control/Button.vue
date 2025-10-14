<template>
    <button class="control-button">
        <slot />
    </button>
</template>

<style scoped lang="scss">
.control-button {
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 5px;
}
</style>