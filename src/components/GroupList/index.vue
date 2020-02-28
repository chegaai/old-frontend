<template>
    <div class="row justify-center col-md-4 col-12 q-my-md q-ma-md q-px-md">
        <group-card
          v-for="(group, index) in groups"
          :aspect-ratio="cardAspectRatio.LANDSCAPE"
          :key="`event-${index}`"
          class="q-my-sm"
          :group="group"
           @click="$emit('detail-group', group)"
        />
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
