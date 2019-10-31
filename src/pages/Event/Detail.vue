<template>
  <div class="column full-width items-center">
    <hero :info="event" />
    <event-description-viewer :html="event.description" />
    <event-place-maps :location="{ lat: -23.5535129, lng: -46.6596928 }" />
    <q-page-sticky :position="stickyPosition" :offset="[18, 18]">
      <q-btn
        rounded
        icon="check"
        label="Inscrever-se"
        color="primary"
        size="lg" />
    </q-page-sticky>
  </div>
</template>

<script>
import Hero from '../../components/Hero';
import EventDescriptionViewer from '../../components/EventDescriptionViewer';
import EventPlaceMaps from '../../components/EventPlaceMaps';
import { event } from '../../mock/event';

export default {
  name: 'EventDetail',
  components: { Hero, EventDescriptionViewer, EventPlaceMaps },
  data: () => ({
    event,
  }),
  computed: {
    stickyPosition() {
      return this.$q.platform.is.desktop ? 'bottom-right' : 'bottom';
    },
  },
};
</script>
