<script setup lang="ts">
import type {ButtonStyle, ButtonType} from "../types";

interface Props {
  type?: ButtonType
  decor?: ButtonStyle,
  disabled?: boolean
}

defineProps<Props>();
</script>

<template>
  <button
      class="ui-button"
      :class="{[`--${decor}`]: decor, 'disabled': disabled}"
      :type="type ?? 'button'"
  >
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
@import "@uiColors";

.ui-button {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  width: max-content;
  padding: 6px 20px;
  border-radius: 6px;
  border: 0;
  color: $textWhite;
  background: $accent;
  cursor: pointer;
  user-select: none;
  transition: .3s;

  &:hover {
    opacity: .8;
  }
  &.disabled {
    pointer-events: none !important;
    user-select: none;
    opacity: .5;
  }
  &__link {
    margin-left: 5px;
  }

  &.--red {
    background-color: $error;
  }
  &.--white {
    padding: 4px 20px;
    border: 2px solid $border;
    color: $text;
    background-color: $background;
  }
  &.--gray {
    background-color: $backgroundGray;
  }
}
</style>
