<template>
    <div class="row justify-center col-md-4 col-12 q-my-md q-ma-md q-px-md">
        <event-card
          v-for="(event, index) in events"
          :aspect-ratio="cardAspectRatio.LANDSCAPE"
          :key="`event-${index}`"
          class="q-my-sm"
          :event="event"
           @click="$emit('detail-event', event)"
        />
    </div>
</template>
<script>
import EventCard, { aspectRatios } from '../EventCard'

export default {
  name: 'EventList',
  components: { EventCard },
  mounted: () => {
  },
  data: () => {
    return {
      cardAspectRatio: aspectRatios
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  }
}
</script>
