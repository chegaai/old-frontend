<template>
  <q-card
    :style="{
      maxWidth: isPortrait ? '360px' : '800px'
    }"
    class="cursor-pointer"
    @click="goFor('EventDetail', { id: event.id })">
    <q-img v-if="isPortrait" :src="event.bannerImageUrl" />

    <div class="row no-wrap">
      <div class="bg-primary column items-center justify-center q-pa-md" v-if="isLandspace">
        <h2 class="text-h2 text-family-bold q-ma-none text-white">12</h2>
        <p class="text-body1 q-ma-none text-grey-1">12/2019</p>
        <p class="text-body1 q-ma-none text-grey-1">às 19:00</p>
      </div>
      <div class="column q-pb-md">
        <q-card-section>
          <span class="
            text-grey-9 text-weight-bold bg-grey-3
             absolute-top-right q-pa-xs
          ">
            123 confirmados
          </span>
          <h5 class="text-h6 text-family-bold text-primary q-mt-md">{{ event.name }}</h5>
          <div class="column">
            <span class="text-subtitle2 text-grey-8">
              <q-icon name="where_to_vote" size="25px" /> {{ event.location.name }}
            </span>
            <span class="text-subtitle2 text-grey-8" v-if="isLandspace">
              <q-icon name="group" size="25px" /> {{ event.group.name }}
            </span>
          </div>
        </q-card-section>

        <q-card-section>
          {{ event.description.slice(0, 170) }}
        </q-card-section>
      </div>
    </div>
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
