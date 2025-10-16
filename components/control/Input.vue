<template>
    <div class="control-input-container">
        <input
            v-model="value"
            :type="typeInput"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="$emit('input')"
            class="control-input-container__input"
            :class="{ 'control-input--error': error, 'control-input--disabled': disabled }"
        />
        <EyeOpenIcon v-if="isShowEye && type === 'password'" class="control-input-container__eye" @click="onClickEye" />
    </div>
</template>

<script setup lang="ts">
import EyeOpenIcon from '@/assets/icons/eye-open.svg?component';

const props = defineProps<{
    type: 'number' | 'text' | 'password';
    placeholder: string;
    error?: boolean;
    disabled?: boolean;
    isShowEye?: boolean;
}>();

defineEmits<{
    input: [];
}>();

const typeInput = computed(() => props.type === 'password' && isShowPassword.value ? 'text' : props.type)

const value = defineModel<string>({ required: true });

const isShowPassword = ref<boolean>(false)

const onClickEye = () => {
    isShowPassword.value = !isShowPassword.value
};
</script>

<style scoped lang="scss">
.control-input-container {
    position: relative;

    &__input {
        width: 100%;
        height: 50px;
        padding: 10px;
        border-radius: 5px;
        background-color: $color-silver-screen-light;
        border: 1px solid $color-silver-screen-light;
        color: $color-white;
        font-size: 16px;
        transition: border-color 0.3s;

        &::placeholder {
            color: $color-white;
            opacity: 1;
            transition: color 0.3s;
        }

        &:focus {
            outline: none;
            box-shadow: none;

            &::placeholder {
                color: rgba($color-white, 0.3);
            }
        }

        &--error {
            border-color: $color-sunset-flame;
        }

        &--disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    }

    &__eye {
        position: absolute;
        cursor: pointer;
        top: 15px;
        right: 15px;
    }
}
</style>
