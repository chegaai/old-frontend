<template>
  <q-page-sticky
    :position="stickyPosition"
    :expand="$q.platform.is.mobile"
    :offset="[
      $q.platform.is.mobile ? 0 : 18,
      $q.platform.is.mobile ? 0 : 18,
    ]">
    <q-btn
      :icon="icon"
      :label="label"
      @click="() => $emit('click')"
      class="full-width"
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
