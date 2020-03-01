<template>
  <q-card
    :style="{
      maxWidth: isPortrait ? '500px' : '800px',
      width: '100%'
    }"
    class="cursor-pointer"
  >
    <div
      :class="{
        column: !isPortrait && $q.platform.is.mobile
      }"
      class="row no-wrap"
    >
      <div class="column q-pb-md" @click="emitClick(group)">
        <q-card-section>
          <h5 class="text-h6 text-family-bold text-primary q-mt-md">
            {{ group.name }}
          </h5>
           <div class="column">
            <span class="text-subtitle2 text-grey-8">
              <q-icon name="where_to_vote" size="25px" />
              {{ placeName }}
            </span>
          </div>
          <div class="column" v-if="isLandspace">
            <span class="text-subtitle2 text-grey-8">
              <q-icon name="group" size="25px" />
              {{ group.name }}
            </span>
          </div>
        </q-card-section>
        <q-card-section>{{ group.description.slice(0, 170) }}</q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script>
export const aspectRatios = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE'
}

export default {
  name: 'GroupCard',
  props: {
    group: {
      type: Object,
      required: true
    },
    aspectRatio: { type: String, default: aspectRatios.PORTRAIT }
  },
  methods: {
    emitClick (group) {
      this.$emit('click', group)
    }
  },
  computed: {
    isLandspace () {
      return this.aspectRatio === aspectRatios.LANDSCAPE
    },
    placeName () {
      return this.group
        ? `${this.group.location.city}, ${this.group.location.state}`
        : ''
    },
    isPortrait () {
      return this.aspectRatio === aspectRatios.PORTRAIT
    }
  }
}
</script>
