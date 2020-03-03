<template>
    <div>
        <q-dialog v-model="show" @hide="$emit('hide-modal',)">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Formulario de RSVP</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close"  />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding >
              <RSVPForm :inquiries="inquiries"/>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    </div>
</template>
<script>
import RSVPForm from '../RSVPForm'
export default {
  name: 'RSVPModal',
  components: {
    RSVPForm
  },
  props: {
    inquiries: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style scoped>

</style>
