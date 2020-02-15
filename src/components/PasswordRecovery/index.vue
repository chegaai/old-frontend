<template>
  <q-card class="login-card">
    <q-card-section class="full-width column items-center">
      <img
        :src="logoVariant"
        width="190"
        alt="logo">
      <!-- <h4 class="text-h4 text-grey-8 text-center text-uppercase text-family-light">
        <span class="text-family-bold">chega</span>.ai
      </h4> -->
      <!-- <p class="text-body2 text-grey-7 text-center">
        {{ subTitleLabel }}
      </p> -->
    </q-card-section>

    <q-card-section>
      <div class="column justify-between">
        <q-input
          ref="password"
          filled
          type="password"
          v-model="password"
          @keyup.enter="submit"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          label="Sua senha *"
          class="q-my-xs"
        />

        <q-input
          ref="password"
          filled
          type="password"
          v-model="confirmedPassword"
          @keyup.enter="submit"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          label="Confirme sua senha *"
          class="q-my-xs"
        />
      </div>
    </q-card-section>

    <q-card-section class="column justify-center">
      <q-btn
        class="full-width text-family-regular"
        size="lg"
        :loading="isButtonLoading"
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
          v-if="canShowAction('Login')"
          class="text-blue-4 q-mt-xs"
          :to="{ name: 'Login' }"
        >Fazer login</router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { validate } from '../../utils/validator'
import { notEmpty } from '../../utils/validators'
import { getRandomLogo } from '../../assets/logo'

export default {
  name: 'PassowordRecoveryForm',
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
        ForgotPassword: () => 'Coloque seu email para resetar sua senha'
      }

      return labelTypes[name] && labelTypes[name]()
    },
    buttonLabel () {
      return 'Renovar minha senha'
    },
    logoVariant () {
      return getRandomLogo(this.$q.dark.isActive)
    }
  },
  data: () => ({
    isButtonLoading: false,
    validators: { notEmpty },
    password: '',
    confirmedPassword: ''
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
      this.isButtonLoading = true
      const errors = await validate(this, [
        'password',
        'confirmedPassword'
      ])
      if (errors.hasError()) return
      if (this.password !== this.confirmedPassword) {
        this.$q.notify('A confirmação de senha não confere com a sua senha. Os campos devem ser iguais.')
        this.isButtonLoading = false
        return
      }

      if (!this.$route.query || !this.$route.query.token) {
        this.$router.push({ name: 'Login' })
        return
      }
      const payload = {
        password: this.password,
        token: this.$route.query.token
      }

      const response = this.$s.users.updatePassword(payload)
      if (response.error) {
        this.$q.notify('Ocorreu um erro ao solicitar a recuperação de senha')
        this.$router.push({ name: 'Login' })
      }

      this.$q.notify('Resetamos sua senha com sucesso, agora é só logar e ser feliz!')

      this.isButtonLoading = false
      this.$router.push({ name: 'Login' })
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
