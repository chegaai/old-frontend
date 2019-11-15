<template>
  <div
    class="
    text-body1 text-grey-8 q-pa-md
    q-mt-md row justify-between group-description-tabs-events-content">
    <event-card
      v-for="(event, index) in events"
      :key="`event-${index}`"
      :event="event"
    />
  </div>
</template>

<script>
import EventCard from '../EventCard';

export default {
  name: 'GroupDescriptionTabsEvents',
  components: { EventCard },
  props: {
    events: { type: Array, required: true },
  },
};
</script>

<style lang="scss">
.group-description-tabs-events-content {
  width: 100%;
  max-width: 800px;
}
</style>
