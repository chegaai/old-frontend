<template>
  <div class="column full-width items-center q-px-md q-pb-xl">
    <div class="column q-mt-xl event-create-container-width">
      <h4 class="text-h4 text-weight-bold text-grey-7">Crie um evento</h4>
      <p></p>
      <router-link v-if="group.slug" :to="{ name: 'GroupDetail', params: { slug: group.slug } }">{{ group.name }}</router-link>
    </div>

    <div class="column q-mt-xl event-create-container-width">
      <q-input
        filled
        v-model="form.name"
        label="Nome do evento"
        placeholder="Evento muito top ❤️"
        :rules="[
          value => validators.notEmpty(value) || 'Este campo é obrigatório'
        ]"
      />
    </div>

    <div
      :class="{
        row: $q.platform.is.desktop,
        col: $q.platform.is.mobile,
      }"
      class="justify-between event-create-container-width"
    >
      <div
        :class="{
          'q-mt-none': $q.platform.is.desktop,
        }"
        class="col-5 q-my-md"
      >
        <q-input
          hint="Clique nos ícones para selecionar data e hora"
          label="Data/hora de início"
          filled
          v-model="form.date.begin"
          mask="##/##/#### ##:##"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="form.date.begin" mask="DD/MM/YYYY HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="form.date.begin" mask="DD/MM/YYYY HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div
        :class="{
          'q-mt-sm': $q.platform.is.desktop,
        }"
        class="col-5 q-my-md q-mt-lg"
      >
        <q-input
          hint="Clique nos ícones para selecionar data e hora"
          label="Data/hora de fim"
          filled
          v-model="form.date.end"
          mask="##/##/#### ##:##"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="form.date.end" mask="DD/MM/YYYY HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="form.date.end" mask="DD/MM/YYYY HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="column q-mt-lg event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">Descrição do evento *</p>
      <text-editor />
    </div>

    <div class="column q-mt-lg event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">Localização do evento *</p>
      <LocationSelectionMap v-model="form.location" />
    </div>

    <div class="column q-mt-lg event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">Opções adicionais</p>
      <event-additional-options />
    </div>

    <action-footer @action="handleEvents" ok-label="Criar evento" />
  </div>
</template>

<script>
import LocationSelectionMap from '../../components/LocationSelectionMap'
import { mapState } from 'vuex'
import TextEditor from '../../components/TextEditor'
import EventAdditionalOptions from '../../components/EventAdditionalOptions'
import ActionFooter from '../../components/ActionFooter'
import { notEmpty } from '../../utils/validators'
// import { validate } from '../../utils/validator';

export default {
  name: 'EventCreate',
  components: {
    EventAdditionalOptions,
    ActionFooter,
    TextEditor,
    LocationSelectionMap
  },
  data: () => ({
    loadingLocation: false,
    validators: { notEmpty },
    placeName: '',
    form: {
      name: '',
      description: '',
      date: {
        begin: null,
        end: null
      },
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
    }
  }),
  computed: {
    canShowMaps () {
      return !!this.form.location.lat && !!this.form.location.lng
    },
    ...mapState({
      group: state => state.General.currentSwapSpace
    })
  },
  methods: {
    processLocationChanged (payload) {
      if (payload.name && payload.formatted_address) this.placeName = `${payload.name} - ${payload.formatted_address}`
      this.form.location.placeId = payload.place_id
      this.form.location.name = payload.name
      this.form.location.address = payload.formatted_address

      const STATE_KEY = 'administrative_area_level_1'
      const CITY_KEY = 'administrative_area_level_2'
      const COUNTRY_KEY = 'country'
      const NUMBER_KEY = 'street_number'
      const ZIP_CODE_KEY = 'postal_code'

      payload.address_components.forEach(address => {
        if (address.types.includes(STATE_KEY)) {
          this.form.location.state = address.long_name
        }
        if (address.types.includes(CITY_KEY)) {
          this.form.location.city = address.long_name
        }
        if (address.types.includes(COUNTRY_KEY)) {
          this.form.location.country = address.long_name
        }
        if (address.types.includes(NUMBER_KEY)) {
          this.form.location.number = address.long_name
        }
        if (address.types.includes(ZIP_CODE_KEY)) {
          this.form.location.zipCode = address.long_name
        }
      })

      this.form.location.lat = Number(payload.geometry.location.lat())
      this.form.location.lng = Number(payload.geometry.location.lng())
      this.loadingLocation = false
    },
    handleEvents (action) {
      const types = {
        OK: () => {
          console.log('this.form', this.form)
        }
      }

      return types[action.type] && types[action.type]()
    }
  }
}
</script>

<style>
.event-create-container-width {
  width: 900px;
  max-width: 100%;
}
</style>
