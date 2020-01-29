<template>
  <div class="column items-center full-width q-py-md">
    <div style="width: 800px; max-width: 800px;" class="q-px-md">
      <h4 class="text-h4 text-grey-9 text-weight-bold q-mb-lg">Onde vai ser?</h4>
    </div>

    <gmap-map
      :center="location"
      :zoom="15"
      class="event-place-maps-map"
      map-type-id="terrain">
      <gmap-marker :position="location" />
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'EventPlaceMaps',
  props: {
    location: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.event-place-maps-map {
  width: 100%;
  height: 300px;
}
</style>
