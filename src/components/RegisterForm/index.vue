<template>
  <q-card class="register-card">
    <q-card-section class="full-width">
      <h4 class="text-h4 text-grey-8 text-center text-uppercase text-weight-bold">
        chega.ai
      </h4>
      <p class="text-body2 text-grey-7 text-center">
        Informe alguns dados para a criação da conta
      </p>
    </q-card-section>

    <q-card-section>
      <div class="row justify-between">
        <q-input
          ref="username"
          filled
          type="text"
          v-model="form.username"
          label="Username *"
          class="q-my-xs"
        />
        <q-input
          ref="document"
          filled
          type="text"
          v-model="form.document"
          label="Numero do RG *"
          class="q-my-xs"
        />
      </div>
      <div class="column justify-between">
        <q-input
          ref="email"
          filled
          type="email"
          v-model="form.email"
          label="Seu email *"
          class="q-my-xs"
        />
        <q-input
          ref="password"
          filled
          type="password"
          v-model="form.password"
          label="Sua senha *"
          class="q-my-xs"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'RegisterForm',
  data: () => ({
    form: {
      email: '',
      password: '',
      username: '',
      document: '',
      passwordMatch: '',
      location: {},
    },
  }),
};
</script>

<style lang="scss">
.register-card {
  width: 400px;
  max-width: 400px;
}
</style>
