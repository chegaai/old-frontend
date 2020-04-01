<template>
    <div>
    <q-dialog v-model="show" @hide="$emit('hide-modal',)">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-tabs
            v-model="tab"
            class="bg-purple text-white"
            align="justify"
            narrow-indicator>
            <q-tab name="rsvp" label="increver-me"></q-tab>
            <q-tab name="unrsvp" label="desinscrever-me"></q-tab>
          </q-tabs>
        </q-header>

        <q-page-container>
          <q-page padding >
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="rsvp">
                <RSVPForm :inquiries="inquiries" @add-rsvp="(rsvp)=>$emit('add-rsvp', rsvp)"/>
              </q-tab-panel>

              <q-tab-panel name="unrsvp">
                <UnRSVP @remove-rsvp="(email)=>$emit('remove-rsvp', email)" />
              </q-tab-panel>
            </q-tab-panels>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    </div>
</template>
<script>
import RSVPForm from '../RSVPForm'
import UnRSVP from '../UnRSVP'

export default {
  name: 'RSVPModal',
  components: {
    RSVPForm,
    UnRSVP
  },
  data () {
    return {
      tab: 'rsvp'
    }
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
