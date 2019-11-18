<template>
  <div class="column full-width items-center">
    <hero :info="event" />
    <event-description-viewer :html="event.description" />
    <button-sticky label="Inscrever-se" />
    <div class="full-width">
      <custom-footer />
    </div>
  </div>
</template>

<script>
import Hero from '../../components/Hero';
import EventDescriptionViewer from '../../components/EventDescriptionViewer';
import ButtonSticky from '../../components/ButtonSticky';
import CustomFooter from '../../components/CustomFooter';
import { eventList } from '../../mock/event';

export default {
  name: 'EventDetail',
  components: {
    Hero,
    ButtonSticky,
    CustomFooter,
    EventDescriptionViewer,
  },
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
