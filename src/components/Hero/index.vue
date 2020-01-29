<template>
  <div class="column full-width items-center q-pb-lg q-pt-sm">
    <div class="full-width" style="max-width: 950px">
      <q-img
        class="full-width q-mx-none q-px-none"
        :src="info.bannerImageUrl" />
    </div>

    <p
      :class="{
        'text-body2': $q.platform.is.mobile
      }"
      class="text-body1 text-grey-7 q-px-md q-mt-lg">
      {{ info.date }}
    </p>
    <h3
      :class="{
        'text-h4': $q.platform.is.mobile
      }"
      class="text-h3 text-primary text-family-bold text-center q-px-md q-ma-none"
      style="max-width: 950px">
      {{ info.name }}
    </h3>
    <div class="row q-mt-md q-mb-xl">
      <q-avatar class="q-mr-md">
        <img :src="mainOrganizer.pictureUrl">
      </q-avatar>
      <p
        :class="{
          'text-body2': $q.platform.is.mobile
        }"
        class="text-body1 text-grey-7 q-ma-none">
        Organizador por <router-link class="text-blue-7" :to="goFor('')">
        {{ mainOrganizer.name }} e mais {{ amountOfOrganizersWithoutMainOrganizers }}</router-link>
        <br/>
        Grupo <router-link class="text-blue-7" :to="goFor('GroupDetail')">
          {{ info.group.name }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    info: { type: Object, required: true }
  },
  computed: {
    mainOrganizer () {
      return this.info.organizers[0]
    },
    amountOfOrganizersWithoutMainOrganizers () {
      return this.info.organizers.length - 1
    }
  },
  methods: {
    goFor (where) {
      if (!where) return {}
      return { name: where }
    }
  }
}
</script>
