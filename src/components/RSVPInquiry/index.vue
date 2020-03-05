<template>
    <div>
              <p class="text-h5">{{inquiry.title}}</p>
              <p class="text-subtitle1">{{inquiry.subtitle}}</p>
              <q-input  :type=inquiry.type   :name=inquiry.title class="full-width" @input="updateParentData"  v-model="value"/>
              <q-separator class="q-mt-xl"/>
    </div>
</template>
<script>
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
      value: null
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
