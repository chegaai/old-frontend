<template>
  <q-no-ssr>
    <GmapAutocomplete
      @place_changed="processLocationChanged"
      class="full-width q-my-sm q-pa-md"
      :options="{ componentRestrictions: { country: 'br' } }"
      select-first-on-enter
    >
      <template v-slot:input="slotProps">
        <q-input
          :loading="loading"
          :disable="loading"
          @change="loading = true"
          filled
          ref="input"
          v-on:listeners="slotProps.listeners"
          v-on:attrs="slotProps.attrs"
          label="Localização"
          :value="placeName"
          placeholder="ex: Google Campus"
          :rules="[
                value => validators.notEmpty(value) || loading || 'Este campo é obrigatório'
              ]"
        />
      </template>
    </GmapAutocomplete>
    <GmapMap
      v-if="canShowMaps"
      :center="{
            lat: location.lat,
            lng: location.lng,
          }"
      :zoom="15"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        :position="{
              lat: location.lat,
              lng: location.lng,
            }"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </q-no-ssr>
</template>

<script>
import { notEmpty } from '../../utils/validators'
export default {
  name: 'LocationSelectionMap',
  props: {
    value: {
      type: Object
    }
  },
  data: () => ({
    validators: { notEmpty },
    placeName: '',
    loading: false,
    location: {
      name: '',
      placeId: '',
      address: '',
      zipCode: '',
      number: '',
      complement: '',
      country: '',
      city: '',
      state: '',
      lat: null,
      lng: null
    }
  }),
  computed: {
    canShowMaps () {
      return !!this.location.lat && !!this.location.lng
    }
  },
  methods: {
    processLocationChanged (payload) {
      if (payload.name && payload.formatted_address) {
        this.placeName = `${payload.name} - ${payload.formatted_address}`
      }

      this.location.placeId = payload.place_id
      this.location.name = payload.name
      this.location.address = payload.formatted_address

      const STATE_KEY = 'administrative_area_level_1'
      const CITY_KEY = 'administrative_area_level_2'
      const COUNTRY_KEY = 'country'
      const NUMBER_KEY = 'street_number'
      const ZIP_CODE_KEY = 'postal_code'

      payload.address_components.forEach(address => {
        if (address.types.includes(STATE_KEY)) {
          this.location.state = address.long_name
        }
        if (address.types.includes(CITY_KEY)) {
          this.location.city = address.long_name
        }
        if (address.types.includes(COUNTRY_KEY)) {
          this.location.country = address.long_name
        }
        if (address.types.includes(NUMBER_KEY)) {
          this.location.number = address.long_name
        }
        if (address.types.includes(ZIP_CODE_KEY)) {
          this.location.zipCode = address.long_name
        }
      })

      this.location.lat = Number(payload.geometry.location.lat())
      this.location.lng = Number(payload.geometry.location.lng())
      this.loading = false
      this.$emit('input', this.location)
    }
  },
  mounted () {
    this.location = { ...this.value }
  },
  watch: {
    value (value) {
      this.location = { ...value }
    }
  }
}
</script>
