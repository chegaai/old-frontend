<template>
  <div class="column full-width items-center q-px-md q-pb-xl">
    <div class="column q-mt-xl event-create-container-width">
      <h4 class="text-h4 text-weight-bold text-grey-7">Crie um evento</h4>
      <router-link
        :to="{ name: 'GroupDetail', params: { slug: 'golang-sp' } }"
        class="text-h6 text-grey-6">
        Vue.js SP
      </router-link>
    </div>

    <div class="column q-mt-xl event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">
        Nome do evento *
      </p>
      <q-input
        filled
        v-model="form.title"
        label="Evento muito ❤️"
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
      class="justify-between q-mt-xl event-create-container-width">
      <div
        :class="{
          'q-mt-none': $q.platform.is.desktop,
        }"
        class="col-5 q-my-md">
        <p class="text-body1 text-grey-6 q-mb-sm">
          Data/hora de início *
        </p>
        <q-input filled v-model="form.date.start">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="form.date.start" mask="YYYY-MM-DD HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="form.date.start" mask="YYYY-MM-DD HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div
        :class="{
          'q-mt-none': $q.platform.is.desktop,
        }"
        class="col-5 q-my-md">
        <p class="text-body1 text-grey-6 q-mb-sm">
          Data/hora de finalização *
        </p>
        <q-input filled v-model="form.date.end">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="form.date.end" mask="YYYY-MM-DD HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="form.date.end" mask="YYYY-MM-DD HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="column q-mt-xl event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">
        Descrição do evento *
      </p>
      <text-editor />
    </div>

    <div class="column q-mt-xl event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">
        Localização do evento *
      </p>
      <q-no-ssr>
        <GmapAutocomplete
          @place_changed="processLocationChanged"
          class="full-width q-my-sm q-pa-md">
          <template v-slot:input="slotProps">
            <q-input
              filled
              ref="input"
              v-on:listeners="slotProps.listeners"
              v-on:attrs="slotProps.attrs"
              v-model="form.location"
              label="Localização"
              placeholder="ex: Google Campus"
              :rules="[
                value => validators.notEmpty(value) || 'Este campo é obrigatório'
              ]"
            />
          </template>
        </GmapAutocomplete>
        <GmapMap
          :center="{lat:10, lng:10}"
          :zoom="7"
          style="width: 100%; height: 300px"
        >
          <GmapMarker
            :clickable="true"
            :draggable="true"
          />
        </GmapMap>
      </q-no-ssr>
    </div>

    <div class="column q-mt-xl event-create-container-width">
      <p class="text-body1 text-grey-6 q-mb-sm">
        Opções adicionais
      </p>
      <event-additional-options />
    </div>

    <action-footer ok-label="Criar evento" />
  </div>
</template>

<script>
import TextEditor from '../../components/TextEditor';
import EventAdditionalOptions from '../../components/EventAdditionalOptions';
import ActionFooter from '../../components/ActionFooter';
import { notEmpty } from '../../utils/validators';
// import { validate } from '../../utils/validator';

export default {
  name: 'EventCreate',
  components: {
    EventAdditionalOptions,
    ActionFooter,
    TextEditor,
  },
  data: () => ({
    validators: { notEmpty },
    form: {
      title: '',
      date: {
        start: new Date(),
        end: new Date(),
      },
      location: '',
      description: '',
    },
  }),
  methods: {
    processLocationChanged(data) {
      console.log(data);
    },
  },
};
</script>

<style>
.event-create-container-width {
  width: 900px;
  max-width: 100%;
}
</style>
