<template>
  <div class="column q-pb-md">
    <q-select
      filled
      ref="country"
      v-model="form.location.country"
      use-input
      input-debounce="0"
      label="País"
      class="q-my-xs"
      option-label="name"
      @input="submitRegion"
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
      @input="submitRegion"
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
      @input="submitRegion"
      :loading="cityOptions.isLoading"
      :options="cityOptions.list"
      :disable="!form.location.state.id"
      :rules="[
        value => validators.notEmpty(value) || 'Este campo é obrigatório'
      ]"
      @filter="(val, update) => createFilterFn('city')(val, update)">
    </q-select>
  </div>
</template>

<script>
import { notEmpty } from '../../utils/validators'

export default {
  name: 'RegionSelect',
  props: {
    initialValues: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    validators: { notEmpty },
    countryOptions: {
      list: [{ name: 'Brasil' }]
    },
    stateOptions: {
      list: [],
      isLoading: false
    },
    cityOptions: {
      list: [],
      isLoading: false
    },
    form: {
      location: {
        country: { name: 'Brasil' },
        state: '',
        city: ''
      }
    }
  }),
  methods: {
    createFilterFn (entity) {
      return (val, update) => {
        const entities = {
          state: async () => {
            this.stateOptions.isLoading = true
            const response = await this.$s.ibge.getStates()
            this.stateOptions.list = response.data
            this.stateOptions.isLoading = false
          },
          city: async () => {
            this.cityOptions.isLoading = true
            const response = await this.$s.ibge.getCities({ ufId: this.form.location.state.id })
            this.cityOptions.list = response.data
            this.cityOptions.isLoading = false
          }
        }

        update(async () => await entities[entity] && entities[entity]())
      }
    },
    submitRegion () {
      this.$emit('set-region', this.form.location)
    }
  },
  watch: {
    initialValues () {
      this.stateOptions.isLoading = true
      this.cityOptions.isLoading = true
      this.form.location = this.initialValues
      this.stateOptions.isLoading = false
      this.cityOptions.isLoading = false
    }
  }
}
</script>
