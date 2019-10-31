<template>
  <div class="event-description-viewer q-px-md">
    <h4 class="text-h4 text-grey-9 text-weight-bold q-mb-lg">Sobre o evento</h4>
    <div
      class="text-body1 text-grey-9"
      v-html="html" />
  </div>
</template>

<script>
export default {
  name: 'EventDescriptionViewer',
  props: {
    html: { type: String, required: true },
  },
};
</script>

<style lang="scss">
.event-description-viewer {
  max-width: 800px;
  // font-size:
}
</style>
