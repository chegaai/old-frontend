<template>
  <q-card
    :style="{
      maxWidth: isPortrait ? '360px' : '800px'
    }"
    class="cursor-pointer"
    @click="goFor('EventDetail', { id: event.id })">
    <q-img v-if="isPortrait" :src="event.bannerImageUrl" />

    <q-card-section>
      <span class="text-grey-8 text-weight-regular">12/12/2019</span>
      <h5 class="text-h6 text-grey-8">{{ event.name }}</h5>
      <div class="text-subtitle2 text-grey-8">
        <q-icon name="where_to_vote" size="25px" /> {{ event.location.name }}
      </div>
    </q-card-section>

    <q-card-section>
      {{ event.description.slice(0, 170) }}
    </q-card-section>
  </q-card>
</template>

<script>
export const aspectRatios = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE',
};

export default {
  name: 'EventCard',
  props: {
    event: { type: Object, default: () => ({}) },
    aspectRatio: { type: String, default: aspectRatios.PORTRAIT },
  },
  computed: {
    isLandspace() {
      return this.aspectRatio === aspectRatios.LANDSCAPE;
    },
    isPortrait() {
      return this.aspectRatio === aspectRatios.PORTRAIT;
    },
  },
  methods: {
    goFor(where, params) {
      if (!where) return;
      this.$router.push({ name: where, params });
    },
  },
};
</script>
