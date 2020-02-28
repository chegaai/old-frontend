<template>
    <div>
        <div class="row justify-center full-width">
      <div class="row justify-center col-md-6 col-12 q-my-md q-ma-md q-px-md">
        <group-card
          v-for="(group, index) in groups"
          :aspect-ratio="cardAspectRatio.LANDSCAPE"
          :key="`event-${index}`"
          class="q-my-sm"
          :group="group"
           @click="$emit('detail-group', group)"
        />
      </div>
    </div>
    </div>
</template>
<script>
import GroupCard, { aspectRatios } from '../GroupCard'

export default {
  name: 'GroupList',
  components: { GroupCard },
  mounted: () => {
  },
  data: () => {
    return {
      cardAspectRatio: aspectRatios
    }
  },
  props: {
    groups: {
      type: Array,
      required: true
    }
  }
}
</script>
