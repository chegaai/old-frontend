<template>
    <q-form
    @submit="confirmRSVP"
    @reset="onReset">
        <div class="q-mb-xl q-px-lg">
            <p class="text-h5">Digite seu nome completo</p>
            <p class="text-subtitle1">Essa informação sera usada para sua entrada no evento</p>
            <q-input
                type="text"
                :name="nameInput"
                class="full-width"
                v-model="name"
                :rules="[ val => validators.notEmpty(val) || 'Esse campo é obrigatorio']"
             />

            <p class="text-h5 q-mt-lg">Digite seu e-mail</p>
            <p class="text-subtitle1">
                Ele será usado como forma de comunicação com você,
                caso ocorra algum emprevisto com o evento, por exemplo.
            </p>
            <q-input
                type="text"
                :name="emailInput"
                class="full-width"
                v-model="email"
                :rules="[ val => validators.notEmpty(val) || 'Esse campo é obrigatorio']"
            />

            <p class="text-h5 q-mt-lg">Digite o seu documento RG</p>
            <p class="text-subtitle1">Essa informação sera usada para sua entrada no evento</p>
            <q-input
                type="text"
                :name="documentInput"
                class="full-width"
                v-model="document"
                :rules="[
                    val => validators.notEmpty(val) || 'Esse campo é obrigatorio',
                    val => validators.onlyNumber(val) || 'Digite apenas os numeros do seu documento'
                ]"
            />

            <div :key="inquiry.title+index" v-for="(inquiry, index) in inquiries">
                <RSVPInquiry
                    :inquiry="inquiry"
                    class="q-my-md"
                    @update-inquiries="updateInquiries"
                />
            </div>
        </div>
        <div class="q-mt-lg">
            <q-btn class type="submit" label="Confirmar Inscrição" />
        </div>
    </q-form>
</template>
<script>
import RSVPInquiry from '../RSVPInquiry'
import { notEmpty, onlyNumber } from '../../utils/validators'
export default {
  name: 'RSVPForm',
  components: {
    RSVPInquiry
  },
  data () {
    return {
      validators: { notEmpty, onlyNumber },
      name: null,
      email: null,
      document: null,
      inquiriesResponses: {},
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
    updateInquiries (inquiryResponse) {
      this.inquiriesResponses[inquiryResponse.questionTitle] = inquiryResponse.response
    },
    confirmRSVP () {
      const addRSVPBody = {}

      const inquiries = Object.keys(this.inquiriesResponses)
      addRSVPBody.inquiryResponses = inquiries.map((title) => ({ questionTitle: title, response: this.inquiriesResponses[title] }))

      addRSVPBody.rsvp = 'yes'

      addRSVPBody.name = this.name
      addRSVPBody.email = this.email
      addRSVPBody.document = this.document

      this.$emit('add-rsvp', addRSVPBody)
    },
    onReset () {
      console.log('reset')
    }
  }
}
</script>
<style scoped>

</style>
