<template>
  <div
    class="column full-width items-center q-pb-lg q-pt-sm"
    :style="`background-image: URL('${this.event.banner || altBanner}')`"
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
      {{ event.name }}
    </h3>
    <div class="row q-mt-md q-mb-xl">
      <q-avatar class="q-mr-md">
        <img :src="mainOrganizerPicture" />
      </q-avatar>
      <p
        :class="{
          'text-body2': $q.platform.is.mobile
        }"
        class="text-body1 text-grey-7 q-ma-none"
      >
        Organizador por
        <router-link class="text-blue-7" :to="goFor('')">
          {{ event.owner.name }} {{ event.owner.lastName }}
          <template v-if="amountOfOrganizersWithoutMainOrganizers">
            e mais
            {{ amountOfOrganizersWithoutMainOrganizers }}
          </template></router-link
        >
        <br />
        Grupo{{ event.groups.length === 1 ? "" : "s" }}:
        <router-link
          v-for="group in event.groups"
          :key="group.id"
          class="text-blue-7"
          :to="getGroupRoute(group.id)"
        >
          {{ group.name }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Hero',
  props: {
    event: { type: Object, required: true }
  },
  data: () => ({
    altBanner: '/statics/images/standard-group-image.jpg',
    mainOrganizer: {},
    mainOrganizerPicture: '',
    amountOfOrganizersWithoutMainOrganizers: 0,
    eventDate: ''
  }),
  mounted () {
    this.mainOrganizer = this.event.owner
    console.log(this.mainOrganizer)
    this.mainOrganizerPicture = this.event.owner.picture || this.altBanner
    this.amountOfOrganizersWithoutMainOrganizers = this.event.organizers.length
    this.eventDate = `${this.event.startAt}>${this.event.endAt}`
    if (this.event.startAt.split('T')[0] === this.event.endAt.split('T')[0]) {
      this.eventDate = this.event.startAt
    }
  },
  methods: {
    getGroupRoute (id) {
      return { name: 'GroupDetail', params: { id } }
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
