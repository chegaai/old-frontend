<template>
  <div
    :class="{
      'justify-center': $q.platform.is.mobile,
      'justify-between': !$q.platform.is.mobile
    }"
    class="
    text-body1 text-grey-8 q-pa-md
    q-mt-md row group-description-tabs-events-content">
    <template v-if="hasEvents">
      <event-card
        v-for="(event, index) in events"
        :key="`event-${index}`"
        :event="event"
        class="q-my-sm"
      />
    </template>

    <p v-else class="text-gray-6 text-body1">
      Ainda não existem eventos
    </p>
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
  computed: {
    hasEvents() {
      return this.events && this.events.length;
    },
  },
};
</script>

<style lang="scss">
.group-description-tabs-events-content {
  width: 100%;
  max-width: 800px;
}
</style>
