<template>
  <div
    class="column full-width items-center q-pb-lg q-pt-sm"
    :style="`background-image: URL('${info.banner || altBanner}')`"
  >
    <p
      :class="{
        'text-body2': $q.platform.is.mobile
      }"
      class="text-body1 text-grey-7 q-px-md q-mt-lg"
    >
      {{ eventDate | date }}
    </p>
    <h3
      :class="{
        'text-h4': $q.platform.is.mobile
      }"
      class="text-h3 text-primary text-family-bold text-center q-px-md q-ma-none"
      style="max-width: 950px"
    >
      {{ info.name }}
    </h3>
    <div class="row q-mt-md q-mb-xl">
      <q-avatar class="q-mr-md">
        <img :src="mainOrganizer.picture" />
      </q-avatar>
      <p
        :class="{
          'text-body2': $q.platform.is.mobile
        }"
        class="text-body1 text-grey-7 q-ma-none"
      >
        Organizador por
        <router-link class="text-blue-7" :to="goFor('')">
          {{ mainOrganizer.name }} {{ mainOrganizer.lastName }}
          <template v-if="amountOfOrganizersWithoutMainOrganizers">
            e mais
            {{ amountOfOrganizersWithoutMainOrganizers }}
          </template></router-link
        >
        <br />
        Grupo{{ info.groups.length === 1 ? "" : "s" }}:
        <router-link
          v-for="group in info.groups"
          :key="group.id"
          class="text-blue-7"
          :to="getGroupRoute(group.slug)"
        >
          {{ group.name }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import altBanner from '../../assets/source/png/chegaai-marca-vetores_negativo-grafismo.png'

export default {
  name: 'Hero',
  props: {
    info: { type: Object, required: true }
  },
  data: () => ({
    altBanner
  }),
  computed: {
    mainOrganizer () {
      return this.info.organizers[0]
    },
    amountOfOrganizersWithoutMainOrganizers () {
      return this.info.organizers.length - 1
    },
    eventDate () {
      if (this.info.startAt.split('T')[0] === this.info.endAt.split('T')[0]) return this.info.startAt

      return `${this.info.startAt}>${this.info.endAt}`
    }
  },
  methods: {
    getGroupRoute (slug) {
      return { name: 'GroupDetail', params: { slug } }
    },
    goFor (where) {
      if (!where) return {}
      return { name: where }
    }
  },
  filters: {
    date: (value) => {
      if (!value || typeof value !== 'string') return value

      const [start, end] = value.split('>')

      const formattedStart = start.split('T')[0].split('-').reverse().join('/')

      if (!end) return formattedStart

      const formattedEnd = end.split('T')[0].split('-').reverse().join('/')

      return `${formattedStart} a ${formattedEnd}`
    }
  }
}
</script>
