<script setup lang="ts">
import type {InputAutocomplete, InputType} from "../types";
import type {IconsType} from "~/app/icons";

interface Props {
  id: string;
  modelValue: any;

  type?: InputType;
  autocomplete?: InputAutocomplete;
  autofocus?: boolean;
  title?: string;
  placeholder?: string;
  icon?: IconsType;
  postIcon?: IconsType;
  disabled?: boolean;
  isError?: boolean;
}
interface Emit {
  (e: 'update:modelValue', v: any): void;
  (e: 'postIcon:click', v: HTMLInputElement): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
});
const emit = defineEmits<Emit>();

const innerValue = ref(props.modelValue ?? '');
const passwordVisible = ref(false);
const inputRef = ref<HTMLInputElement>();
const typeComputed = computed(() => {
  return props.type === 'password' ? (passwordVisible.value ? 'text' : 'password') : props.type;
});

watch(() => props.modelValue, value => innerValue.value = value);
watch(innerValue, value => emit('update:modelValue', value));

const classesInput = reactive({
  '--icon': props.icon,
  '--is-text': computed(() => innerValue.value.length),
  '--post-icon': props.postIcon || props.type === 'password'
});

onMounted(() => {
  props.autofocus && inputRef.value?.focus();
});

function postIconClick() {
  emit('postIcon:click', inputRef.value!);
}
</script>

<template>
  <div
      class="ui-input"
      :class="{'ui-input--error': isError}"
  >
    <input
        :class="classesInput"
        :id="`input-${id}`"
        :type="typeComputed"
        :value="innerValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete ?? 'off'"
        :disabled="disabled"
        ref="inputRef"
        v-model="innerValue"
    >
    <label
        v-if="title"
        class="ui-input__placeholder"
        :for="`input-${id}`"
    >
      {{ title }}
    </label>
    <label
        class="ui-input__icon --pass"
        v-if="type === 'password'"
        :for="`input-${id}`"
        @click="passwordVisible = !passwordVisible"
    >
      <ui-icon
          v-if="passwordVisible"
          size="20px"
          icon="EyeOff"
      />
      <ui-icon
          v-else
          size="20px"
          icon="Eye"
      />
    </label>
    <label
        class="ui-input__icon --type"
        v-if="icon"
        :for="`input-${id}`"
    >
      <ui-icon
          size="20px"
          :icon="icon"
      />
    </label>
    <label
        class="ui-input__icon --post"
        v-if="postIcon && type !== 'password'"
        :for="`input-${id}`"
    >
      <ui-icon
          :icon="postIcon"
          @click="postIconClick"
      />
    </label>
  </div>
</template>

<style lang="scss">
.nuxt-icon svg {
  margin: 0 !important;
}
</style>

<style lang="scss" scoped>
@import "@uiColors";

.ui-input {
  position: relative;
  width: 100%;

  & input {
    font-size: 16px;
    line-height: 16px;
    width: 100%;
    padding: 8px 14px;
    border: 1px solid $border;
    border-radius: 5px;
    color: $text;
    overflow: visible;

    &:disabled {
      opacity: .5;
    }
    &:focus {
      outline: 2px solid $accent;
    }
    &.--icon {
      padding-left: 38px !important;

      & ~ .ui-input__placeholder {
        left: 2.4rem;
      }
    }
    &.--post-icon {
      padding-right: 34px !important;
    }
  }
  &__placeholder {
    font-size: 12px;
    position: absolute;
    left: 6px;
    top: 6px;
    background-color: $background;
    padding: 0 5px;
    margin-top: 0;
    pointer-events: none;
    user-select: none;
    transition: all .375s;
  }
  &__icon {
    position: absolute;
    top: calc(50% - 10px);
    font-size: 20px;
    height: 20px;
    color: $textGray;
    user-select: none;

    &.--pass {
      right: 10px;
      cursor: pointer;
    }
    &.--post {
      right: 10px;
      cursor: pointer;
    }
    &.--type {
      left: 10px;
    }
  }

  &--error {
    & input {
      &:focus {
        outline: 2px solid $error;
      }
    }
  }
}
</style>
