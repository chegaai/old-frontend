<template>
  <q-card class="login-card">
    <q-card-section class="full-width">
      <h4 class="text-h4 text-grey-8 text-center text-uppercase text-weight-bold">
        chega.ai
      </h4>
      <p class="text-body2 text-grey-7 text-center">
        {{ subTitleLabel }}
      </p>
    </q-card-section>

    <q-card-section>
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
          v-if="!forgotPassword"
          ref="password"
          filled
          type="password"
          v-model="form.password"
          label="Sua senha *"
          class="q-my-xs"
        />
      </div>
      <div
        class="row justify-between"
        v-if="register">
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
      <div
        class="column"
        v-if="register">
        <q-select
          filled
          v-model="form.location.country"
          use-input
          input-debounce="0"
          label="País"
          class="q-my-xs"
          :options="[]"
          @filter="() => ({})">
        </q-select>
        <q-select
          filled
          v-model="form.location.state"
          use-input
          input-debounce="0"
          label="Estado"
          class="q-my-xs"
          :options="[]"
          @filter="() => ({})">
        </q-select>
        <q-select
          filled
          v-model="form.location.city"
          use-input
          input-debounce="0"
          label="Cidade"
          class="q-my-xs"
          :options="[]"
          @filter="() => ({})">
        </q-select>
      </div>
    </q-card-section>

    <q-card-section class="column justify-center">
      <q-btn
        class="full-width"
        :label="buttonLabel"
        @click="() => goFor('General')"
      />
      <div class="column items-center q-mt-md">
        <router-link
          v-if="canShowAction('Register')"
          class="text-blue-4"
          :to="{ name: 'Register' }"
        >Criar nova conta</router-link>
        <router-link
          v-if="canShowAction('ForgotPassword')"
          class="text-blue-4 q-mt-xs"
          :to="{ name: 'ForgotPassword' }"
        >Esqueci minha senha</router-link>
        <router-link
          v-if="canShowAction('Login')"
          class="text-blue-4 q-mt-xs"
          :to="{ name: 'Login' }"
        >Fazer login</router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    register: { type: Boolean, default: false },
    forgotPassword: { type: Boolean, default: false },
  },
  computed: {
    subTitleLabel() {
      const { name } = this.$route;
      const labelTypes = {
        Login: () => 'Entre com seus dados',
        ForgotPassword: () => 'Coloque seu email para resetar sua senha',
        Register: () => 'Informe alguns dados para a criação da conta',
      };

      return labelTypes[name] && labelTypes[name]();
    },
    buttonLabel() {
      const { name } = this.$route;
      const labelTypes = {
        Login: () => 'Entrar',
        ForgotPassword: () => 'Resetar minha senha',
        Register: () => 'Criar conta',
      };
      console.log('name', name);
      return labelTypes[name] && labelTypes[name]();
    },
  },
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
  methods: {
    canShowAction(page) {
      if (!page) return false;
      return page !== this.$route.name;
    },
    goFor(where) {
      if (!where) return;
      this.$router.push({ name: where });
    },
  },
};
</script>

<style lang="scss">
.login-card {
  width: 400px;
  max-width: 400px;
}
</style>
