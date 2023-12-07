<script setup lang="ts">

</script>

<template>
  <div class="auth-auth-layout">
    <div class="auth-auth-layout__logo">
      NUXT STARTER
    </div>
    <div class="auth-auth-layout__page">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-auth-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #55575c;

  &__logo {
    font-size: 22px;
    font-weight: 600;
    padding: 8px 0;
    color: #fff;
  }
  &__page {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
