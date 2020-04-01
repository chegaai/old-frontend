<template>
    <q-form
    @submit="removeRSVP">
      <div class="q-mb-xl q-px-lg">
        E-mail que foi usado para se cadastrar no evento.
        <q-input
          type="text"
          class="full-width"
          v-model="email"
          :rules="[ val => validators.notEmpty(val) || 'Esse campo é obrigatorio']"/>
      </div>
      <div class="q-mt-lg">
        <q-btn class type="submit" label="Desinscrever-se" />
      </div>
    </q-form>
</template>
<script>
import { notEmpty } from '../../utils/validators'
export default {
  name: 'UnRSVP',
  data () {
    return {
      validators: { notEmpty },
      email: null
    }
  },
  methods: {
    removeRSVP () {
      this.$emit('remove-rsvp', this.email)
    }
  }
}
</script>
<style scoped>

</style>
