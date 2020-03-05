<template>
    <div>
            <p class="text-h5">{{inquiry.title}}</p>
            <p class="text-subtitle1">{{inquiry.subtitle}}</p>
            <q-input
                :type=inquiry.type
                :name=inquiry.title
                class="full-width"
                @input="updateParentData"
                v-model="value"
                :rules="rules"
            />
    </div>
</template>
<script>
import { notEmpty } from '../../utils/validators'
export default {
  name: 'RSVPInquiry',
  props: {
    inquiry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      validators: { notEmpty },
      value: null,
      rules: this.inquiry.required ? [val => this.validators.notEmpty(val) || 'Esse campo é obrigatorio'] : []
    }
  },
  methods: {
    updateParentData () {
      this.$emit('update-inquiries', {
        questionTitle: this.inquiry.title,
        response: this.value
      })
    }
  }
}
</script>
<style scoped>

</style>
