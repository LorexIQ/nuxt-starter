<script setup lang="ts">
const authData = reactive({
  login: '',
  password: ''
});

function signIn() {

}
</script>

<template>
  <div class="auth-login-page">
    <div class="wrap">
      <form action="">
        <input type="text" id="login">
        <ui-input id="password" v-model="authData.password" icon="Basket" type="password"/>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-login-page {

}
</style>
