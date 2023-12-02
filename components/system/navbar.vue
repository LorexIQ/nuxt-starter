<script setup lang="ts">

</script>

<template>
  <div class="navbar-system">
    <div class="wrap">
      <div class="navbar-system__logo">
        <nuxt-link to="/">БУБЕК PLANER</nuxt-link>
      </div>
      <div class="navbar-system__buttons">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-system {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #55575c;
  box-shadow: 0 0 5px #55575c;

  &__logo {
    & a {
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
