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
            <form @submit.prevent="confirmRSVP">
                <div class="q-mb-xl">
                    <div :key="inquiry.title+index" v-for="(inquiry, index) in inquiries">
                        <RSVPInquiry :inquiry="inquiry" class="q-my-md"/>
                    </div>
                </div>
                <div class="q-mt-lg">
                    <q-btn class type="submit" label="Confirmar Inscrição" />
                </div>
            </form>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    </div>
</template>
<script>
import RSVPInquiry from '../RSVPInquiry'
export default {
  name: 'RSVPModal',
  components: {
    RSVPInquiry
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
  },
  methods: {
    confirmRSVP (inquiriesRespose) {
      const addRSVPBody = this.inquiries.map(inquiry => {
        console.log(inquiry)

        console.log(inquiriesRespose.target.elements[inquiry.title].value)
        return {
          questionTitle: inquiry.title,
          response: inquiriesRespose.target.elements[inquiry.title].value
        }
      })
      addRSVPBody.rsvp = 'yes'
    }
  }
}
</script>
<style scoped>

</style>
