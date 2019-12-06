<template>
  <q-card class="login-card">
    <q-card-section class="full-width">
      <h4 class="text-h4 text-grey-8 text-center text-uppercase text-family-light">
        <span class="text-family-bold">chega</span>.ai
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
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
        />
        <q-input
          v-if="!forgotPassword"
          ref="password"
          filled
          type="password"
          v-model="form.password"
          @keyup.enter="submit"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          label="Sua senha *"
          class="q-my-xs"
        />
      </div>
      <div
        class="row justify-between"
        v-if="register">
        <q-input
          ref="name"
          filled
          type="text"
          v-model="form.name"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          label="Nome *"
          class="q-my-xs login-form-sm-input"
        />
        <q-input
          ref="lastName"
          filled
          type="text"
          v-model="form.lastName"
          label="Sobrenome *"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          class="q-my-xs login-form-sm-input"
        />
        <q-input
          ref="username"
          filled
          type="text"
          v-model="form.username"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          label="Username *"
          class="q-my-xs login-form-sm-input"
        />
        <q-input
          ref="document"
          filled
          type="text"
          v-model="form.document"
          label="Numero do RG *"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          class="q-my-xs login-form-sm-input"
        />
      </div>
      <div
        class="column q-pb-md"
        v-if="register">
        <q-select
          filled
          ref="country"
          v-model="form.location.country"
          use-input
          input-debounce="0"
          label="País"
          class="q-my-xs"
          option-label="name"
          :disable="true"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          :options="countryOptions.list">
        </q-select>
        <q-select
          filled
          ref="state"
          v-model="form.location.state"
          input-debounce="0"
          label="Estado"
          class="q-my-xs"
          option-label="name"
          :loading="stateOptions.isLoading"
          :options="stateOptions.list"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          @filter="(val, update) => createFilterFn('state')(val, update)">
        </q-select>
        <q-select
          filled
          ref="city"
          v-model="form.location.city"
          input-debounce="0"
          label="Cidade"
          class="q-my-xs"
          option-label="name"
          :loading="cityOptions.isLoading"
          :options="cityOptions.list"
          :disable="!form.location.state.id"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          @filter="(val, update) => createFilterFn('city')(val, update)">
        </q-select>
      </div>
    </q-card-section>

    <q-card-section class="column justify-center">
      <q-btn
        class="full-width text-family-regular"
        size="lg"
        :label="buttonLabel"
        @click="submit"
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
import { setStorage } from '../../utils/localStorage';
import { validate } from '../../utils/validator';
import { notEmpty } from '../../utils/validators';

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
      return labelTypes[name] && labelTypes[name]();
    },
  },
  data: () => ({
    validators: { notEmpty },
    countryOptions: {
      list: [{ name: 'Brasil' }],
    },
    stateOptions: {
      list: [],
      isLoading: false,
    },
    cityOptions: {
      list: [],
      isLoading: false,
    },
    form: {
      email: '',
      password: '',
      username: '',
      document: '',
      passwordMatch: '',
      location: {
        country: { name: 'Brasil' },
        state: '',
        city: '',
      },
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
    createFilterFn(entity) {
      return (val, update) => {
        const entities = {
          state: async () => {
            this.stateOptions.isLoading = true;
            const response = await this.$s.ibge.getStates();
            this.stateOptions.list = response.data;
            this.stateOptions.isLoading = false;
          },
          city: async () => {
            this.cityOptions.isLoading = true;
            const response = await this.$s.ibge.getCities({ ufId: this.form.location.state.id });
            this.cityOptions.list = response.data;
            this.cityOptions.isLoading = false;
          },
        };

        update(async () => await entities[entity] && entities[entity]());
      };
    },
    async submit() {
      const errors = await validate(this, [
        'email',
        'password',
        'username',
        'document',
        'name',
        'lastName',
        'country',
        'state',
        'city',
      ]);
      if (errors.hasError()) return;

      if (this.register) {
        const { language } = navigator;
        const response = await this.$s.users.create({ ...this.form, language });
        if (response.error) this.$q.notify('Ocorreu um erro ao criar a conta');
        else this.$router.push({ name: 'Login' });
        return;
      }

      const response = await this.$s.users.login({
        handle: this.form.email.trim(),
        password: this.form.password.trim(),
      });

      if (response.error) {
        this.$q.notify('Erro ao fazer o login.');
        return;
      }
      setStorage('token', response.data.token);
      this.$router.push({ name: 'General' });
    },
  },
};
</script>

<style lang="scss">
.login-card {
  width: 500px;
  max-width: 500px;

}
.login-form-sm-input {
  width: 206px;
  @media all and (max-width: 500px) {
    width: 100%;
  }
}
</style>
