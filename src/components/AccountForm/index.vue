<template>
  <q-card class="q-pa-md q-mt-md">
    <q-card-section>
      <p class="text-body1 text-grey-6 q-mb-sm">
        Username
      </p>
      <q-input
        filled
        :loading="isLoading || isCheckingAvailability"
        :disable="isLoading || isCheckingAvailability"
        v-model="form.username"
        debounce="500"
        label="Seu username"
        :rules="[
          value => validators.notEmpty(value) || 'Este campo é obrigatório',
          value => validators.isAvailable(value) || 'Este usuário não está disponível'
        ]" />
      <p class="text-body1 text-grey-6 q-mb-sm">
        Email
      </p>
      <q-input
        filled
        :loading="isLoading"
        :disable="isLoading"
        type="email"
        v-model="form.email"
        label="Seu email"
        :rules="[
          value => validators.notEmpty(value) || 'Este campo é obrigatório'
        ]" />
      <p class="text-body1 text-grey-6 q-mb-sm">
        RG
      </p>
      <q-input
        ref="document"
        filled
        :loading="isLoading"
        :disable="isLoading"
        type="text"
        v-model="form.document"
        label="Numero do RG *"
        :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
        />
    </q-card-section>
    <q-card-section class="row justify-end">
      <q-btn :class="{
          'full-width': $q.platform.is.mobile
        }"
        class="text-family-regular"
        size="lg"
        color="primary"
        label="Salvar"
        @click="emitClick" />
    </q-card-section>
  </q-card>
</template>

<script>
import { notEmpty } from '../../utils/validators'

const buildIsAvailable = context => async (value) => {
  if (value === context.username) return true
  context.isCheckingAvailability = true
  const { data } = await context.$s.users.checkUsername(value)
  context.isCheckingAvailability = false
  return data.available
}

export default {
  name: 'AccountForm',
  props: {
    initialValues: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      validators: { notEmpty, isAvailable: buildIsAvailable(this) },
      isLoading: true,
      isCheckingAvailability: false,
      username: '',
      form: {
        email: 'email@email.com',
        username: 'username',
        document: '1234567890'
      }
    }
  },
  methods: {
    emitClick () {
      this.$emit('account-submit', this.form)
    }
  },
  watch: {
    initialValues () {
      this.form = this.initialValues
      this.username = this.initialValues.username
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.profile-form-sm-input {
  width: 300px;
  @media all and (max-width: 500px) {
    width: 100%;
  }
}
</style>
