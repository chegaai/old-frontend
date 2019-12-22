<template>
  <div
    :class="{
      'justify-center': $q.platform.is.mobile,
      'justify-between': !$q.platform.is.mobile
    }"
    class="
    text-body1 text-grey-8 q-pa-md
    q-mt-md row group-description-tabs-events-content">
    <event-card
      v-for="(event, index) in events"
      :key="`event-${index}`"
      :event="event"
      class="q-my-sm"
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
