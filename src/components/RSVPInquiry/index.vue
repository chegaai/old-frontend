<template>
    <div>
              <p class="text-h5">{{inquiry.title}}</p>
              <p class="text-subtitle1">{{inquiry.subtitle}}</p>
              <input  :type=inquiry.type   :name=inquiry.title class="full-width" />
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
  }
}
</script>
<style scoped>

</style>
