<template>
  <q-card
    class="event-card cursor-pointer"
    @click="goFor('EventDetail', { id: event.id })">
    <q-img :src="event.bannerImageUrl" />

    <q-card-section>
      <div class="text-h6">{{ event.name }}</div>
      <div class="text-subtitle2">
        <q-icon name="where_to_vote" size="25px" /> {{ event.location.name }}
      </div>
    </q-card-section>

    <q-card-section>
      {{ event.description.slice(0, 170) }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: { type: Object, default: () => ({}) },
  },
  methods: {
    goFor(where, params) {
      if (!where) return;
      this.$router.push({ name: where, params });
    },
  },
};
</script>

<style lang="scss">
.event-card {
  max-width: 360px;
}
</style>
