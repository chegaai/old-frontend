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
      option-label="name"
      option-value="name"
      use-input
      @focus="loadStates"
      @input="() => { submitRegion(); clearCities(); }"
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
      option-value="name"
      use-input
      @focus="loadCities"
      @input="submitRegion"
      :loading="cityOptions.isLoading"
      :options="cityOptions.list"
      :disable="!form.location.state"
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
    value: {
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
      rawList: [],
      list: [],
      isLoading: false
    },
    cityOptions: {
      rawList: [],
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
    async loadStates () {
      this.stateOptions.isLoading = true
      const response = await this.$s.ibge.getStates()
      this.stateOptions.rawList = response.data

      if (!this.form.location.state.id && this.form.location.state.name) {
        const stateName = this.form.location.state.name
        const stateObject = this.stateOptions.rawList.find(item => item.name === stateName)
        console.log(stateObject)
        this.form.location.state = stateObject
      }

      this.stateOptions.isLoading = false
    },
    async loadCities () {
      this.cityOptions.isLoading = true
      if (!this.form.location.state.id) await this.loadStates()
      const response = await this.$s.ibge.getCities({ ufId: this.form.location.state.id })
      this.cityOptions.rawList = response.data
      this.cityOptions.isLoading = false
    },
    clearCities () {
      this.cityOptions.rawList = []
      this.cityOptions.list = []
      this.form.location.city = ''
    },
    createFilterFn (entity) {
      const entityOptionNames = {
        state: 'stateOptions',
        city: 'cityOptions'
      }

      const entityOptions = entityOptionNames[entity]

      return (val, update) => {
        update(() => {
          if (!val) {
            this[entityOptions].list = [...this[entityOptions].rawList]
            return
          }

          const filterByName = item => item.name.match(new RegExp(val, 'ig'))
          this[entityOptions].list = this[entityOptions].rawList.filter(filterByName)
        })
      }
    },
    submitRegion () {
      this.$emit('input', this.form.location)
    }
  },
  watch: {
    value () {
      this.stateOptions.isLoading = true
      this.cityOptions.isLoading = true
      this.form.location = this.value
      this.stateOptions.isLoading = false
      this.cityOptions.isLoading = false
    }
  }
}
</script>
