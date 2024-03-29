<template>
  <q-card class="login-card">
    <q-card-section class="full-width column items-center">
      <img :src="logoVariant" width="190" alt="logo" />
      <!-- <h4 class="text-h4 text-grey-8 text-center text-uppercase text-family-light">
        <span class="text-family-bold">chega</span>.ai
      </h4> -->
      <!-- <p class="text-body2 text-grey-7 text-center">
        {{ subTitleLabel }}
      </p>-->
    </q-card-section>

    <q-card-section>
      <div class="column justify-between">
        <q-input
          ref="email"
          filled
          type="email"
          v-model="form.email"
          label="Seu email ou username *"
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
      <div class="row justify-between" v-if="register">
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
      <div class="column q-pb-md" v-if="register">
        <region-select v-model="form.location" />
      </div>
    </q-card-section>

    <q-card-section class="column justify-center">
      <q-btn
        class="full-width text-family-regular"
        size="lg"
        :loading="loading"
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
import RegionSelect from '../RegionSelect'
import { setStorage } from '../../utils/localStorage'
import { validate } from '../../utils/validator'
import { notEmpty } from '../../utils/validators'
import { getRandomLogo } from '../../assets/logo'

export default {
  name: 'LoginForm',
  components: { RegionSelect },
  props: {
    register: { type: Boolean, default: false },
    forgotPassword: { type: Boolean, default: false }
  },
  computed: {
    isDarkModeActive () {
      return this.$q.dark.isActive
    },
    subTitleLabel () {
      const { name } = this.$route
      const labelTypes = {
        Login: () => 'Entre com seus dados',
        ForgotPassword: () => 'Coloque seu email para resetar sua senha',
        Register: () => 'Informe alguns dados para a criação da conta'
      }

      return labelTypes[name] && labelTypes[name]()
    },
    buttonLabel () {
      const { name } = this.$route
      const labelTypes = {
        Login: () => 'Entrar',
        ForgotPassword: () => 'Resetar minha senha',
        Register: () => 'Criar conta'
      }
      return labelTypes[name] && labelTypes[name]()
    },
    logoVariant () {
      return getRandomLogo(this.$q.dark.isActive)
    }
  },
  data: () => ({
    loading: false,
    validators: { notEmpty },
    form: {
      email: '',
      password: '',
      username: '',
      document: '',
      passwordMatch: '',
      location: {
        country: 'Brasil',
        state: '',
        city: ''
      }
    }
  }),
  methods: {
    canShowAction (page) {
      if (!page) return false
      return page !== this.$route.name
    },
    goTo (where) {
      if (!where) return
      this.$router.push({ name: where })
    },
    async submit () {
      this.loading = true
      const errors = await validate(this, [
        'email',
        'password',
        'username',
        'document',
        'name',
        'lastName',
        'country',
        'state',
        'city'
      ])
      if (errors.hasError()) {
        this.loading = false
        return
      }

      if (this.register) {
        const { language } = navigator
        const response = await this.$s.users.create({ ...this.form, language })
        if (response.error) {
          this.$q.notify('Ocorreu um erro ao criar a conta')
          this.loading = false
        } else this.$router.push({ name: 'Login' })
        return
      }

      if (this.forgotPassword) {
        const response = this.$s.users.recoveryPassword(this.form.email)
        if (response.error) { this.$q.notify('Ocorreu um erro ao solicitar a recuperação de senha') } else this.$router.push({ name: 'Login' })
        return
      }

      const response = await this.$s.users.login({
        handle: this.form.email.trim(),
        password: this.form.password.trim()
      })

      if (response.error) {
        this.$q.notify('Erro ao fazer o login.')
        this.loading = false
        return
      }

      setStorage('token', response.data.token)

      const { data: me } = await this.$s.users.getMyProfile()
      setStorage('userData', me, { format: true })
      this.loading = false
      this.$router.push({ name: 'General' })
    }
  }
}
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
