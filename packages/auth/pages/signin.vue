<script setup lang="ts">
const localAuth = useLocalAuth();
const route = useRoute();

const error = ref('');
const authData = reactive({
  login: '',
  password: ''
});

watch(authData, () => error.value = '');

function signIn() {
  localAuth.signIn(authData, { redirectTo: route.redirectedFrom?.fullPath ?? '/' })
      .catch(() => error.value = 'Ошибка');
}

definePageMeta({
  localAuth: {
    unauthorizedOnly: true
  },
  layout: 'auth'
});
</script>

<template>
  <div class="auth-signin-page">
    <form class="auth-signin-page__form" @submit.prevent="signIn">
      <input type="text" id="login" placeholder="Логин" v-model="authData.login">
      <input type="password" id="password" placeholder="Пароль" v-model="authData.password">
      <div class="auth-signup-page__form__error" v-if="error.length">{{ error }}</div>
      <button type="submit">SignIn</button>
      <nuxt-link to="/signup">signUp</nuxt-link>
    </form>
  </div>
</template>

<style scoped lang="scss">
.auth-signin-page {
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    &__error {
      color: red;
    }
    & input, button {
      font-size: 16px;
      width: 100%;
      padding: 2px 10px;
    }
    & a {
      font-size: 14px;
      text-decoration: none;
    }
  }
}
</style>
