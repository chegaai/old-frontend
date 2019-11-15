<template>
  <div class="column full-width items-center">
    <hero :info="event" />
    <event-description-viewer :html="event.description" />
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
import { eventList } from '../../mock/event';

export default {
  name: 'EventDetail',
  components: { Hero, EventDescriptionViewer },
  data: () => ({
    event: Object.create(null),
  }),
  created() {
    const { id } = this.$route.params;
    if (!id) {
      this.$router.push({ name: 'General' });
      return;
    }
    this.event = eventList.find(event => String(event.id) === id);
  },
  computed: {
    stickyPosition() {
      return this.$q.platform.is.desktop ? 'bottom-right' : 'bottom';
    },
  },
};
</script>
