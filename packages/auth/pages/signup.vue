<script setup lang="ts">
const localAuth = useLocalAuth();
const route = useRoute();

const error = ref('');
const authData = reactive({
  login: '',
  name: '',
  password: ''
});

watch(authData, () => error.value = '');

function signUp() {
  localAuth.signUp(authData, { redirectTo: route.redirectedFrom?.fullPath ?? '/' })
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
  <div class="auth-signup-page">
    <div class="auth-signup-page">
      <form class="auth-signup-page__form" @submit.prevent="signUp">
        <input type="text" id="login" placeholder="Логин" v-model="authData.login">
        <input type="text" id="name" placeholder="Имя" v-model="authData.name">
        <input type="password" id="password" placeholder="Пароль" v-model="authData.password">
        <div class="auth-signup-page__form__error" v-if="error.length">{{ error }}</div>
        <button type="submit">SignUp</button>
        <nuxt-link to="/signin">signIn</nuxt-link>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-signup-page {
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
    }
  }
}
</style>
