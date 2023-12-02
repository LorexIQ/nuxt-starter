<template>
  <div class="default-layout">
    <system-navbar class="default-layout__navbar"/>
    <slot class="default-layout__page"/>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: grid;
  grid-template-rows: 50px calc(100% - 50px);
  overflow: hidden;
}
</style>
