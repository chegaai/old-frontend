<template>
  <q-page-sticky :position="stickyPosition" :offset="[18, 18]">
    <q-btn
      :icon="icon"
      :label="label"
      color="primary"
      size="lg" />
  </q-page-sticky>
</template>

<script>
export default {
  name: 'ButtonSticky',
  props: {
    label: { type: String, required: true },
    icon: { type: String, default: 'check' },
  },
  computed: {
    stickyPosition() {
      return this.$q.platform.is.desktop ? 'bottom-right' : 'bottom';
    },
  },
};
</script>
