<template>
    <form @submit.prevent="confirmRSVP">
        <div class="q-mb-xl q-px-lg">
            <p class="text-h5">Digite seu nome completo</p>
            <p class="text-subtitle1">Essa informação sera usada para sua entrada no evento</p>
            <input  type="text"  :name="nameInput" class="full-width" />
            <q-separator class="q-mt-xl"/>

            <p class="text-h5 q-mt-lg">Digite seu e-mail</p>
            <p class="text-subtitle1">Ele será usado como forma de comunicação com você, caso ocorra algum emprevisto com o evento por exemplo</p>
            <input  type="text"  :name="emailInput" class="full-width" />
            <q-separator class="q-mt-xl"/>

            <p class="text-h5 q-mt-lg">Digite o seu documento RG</p>
            <p class="text-subtitle1">Essa informação sera usada para sua entrada no evento</p>
            <input  type="text"  :name="documentInput" class="full-width" />
            <q-separator class="q-mt-xl"/>

            <div :key="inquiry.title+index" v-for="(inquiry, index) in inquiries">
                <RSVPInquiry :inquiry="inquiry" class="q-my-md"/>
            </div>
        </div>
        <div class="q-mt-lg">
            <q-btn class type="submit" label="Confirmar Inscrição" />
        </div>
    </form>
</template>
<script>
import RSVPInquiry from '../RSVPInquiry'
export default {
  name: 'RSVPForm',
  components: {
    RSVPInquiry
  },
  data () {
    return {
      nameInput: 'name',
      emailInput: 'email',
      documentInput: 'document'
    }
  },
  props: {
    inquiries: {
      type: Array,
      required: true
    }
  },
  methods: {
    confirmRSVP (inquiriesRespose) {
      const addRSVPBody = {}
      addRSVPBody.inquiries = this.inquiries.map(inquiry => {
        console.log(inquiry)

        console.log(inquiriesRespose.target.elements[inquiry.title].value)
        return {
          questionTitle: inquiry.title,
          response: inquiriesRespose.target.elements[inquiry.title].value
        }
      })
      addRSVPBody.rsvp = 'yes'
      addRSVPBody.name = inquiriesRespose.target.elements[this.nameInput].value
      addRSVPBody.email = inquiriesRespose.target.elements[this.emailInput].value
      addRSVPBody.document = inquiriesRespose.target.elements[this.documentInput].value
      this.$emit('add-rsvp', addRSVPBody)
    }
  }
}
</script>
<style scoped>

</style>
