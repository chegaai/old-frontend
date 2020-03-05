<template>
  <div class="column full-width items-left" v-if="event">
    <hero :event="event" />
    <div class="q-my-lg"><event-description-viewer :html="event.description" /></div>

    <div class="q-mt-md"> <attendees-list :attendees="event.attendees"/> </div>
    <button-sticky label="Inscrever-se"  @click="rsvp = true"/>
    <div class="full-width">
      <custom-footer />
    </div>
    <div class="full-width">
        <RSVPModal :inquiries="event.inquiries" :show="rsvp" @hide-modal="rsvp=false" @add-rsvp="addRSVP"/>
    </div>
  </div>
</template>

<script>
import Hero from '../../components/EventHero'
import EventDescriptionViewer from '../../components/EventDescriptionViewer'
import ButtonSticky from '../../components/ButtonSticky'
import AttendeesList from '../../components/AttendeesList'
import CustomFooter from '../../components/CustomFooter'
import RSVPModal from '../../components/RSVPModal'

export default {
  name: 'EventDetail',
  components: {
    Hero,
    ButtonSticky,
    CustomFooter,
    EventDescriptionViewer,
    AttendeesList,
    RSVPModal
  },
  computed: {
    stickyPosition () {
      return this.$q.platform.is.desktop ? 'bottom-right' : 'bottom'
    }
  },

  async mounted () {
    const { id } = this.$route.params
    const { data } = await this.$s.events.findById(id)
    this.event = data

    const organizerPromises = this.event.organizers.map(organizerId => () => this.$s.users.getProfileById(organizerId))
    const organizers = await Promise.all(organizerPromises.map(fn => fn()))
      .then(results => results.map(({ data, error }) => error ? error.message : data))
    this.event.organizers = organizers

    const owner = this.$s.users.getProfileById(this.event.owner)
    this.event.owner = (await owner).data

    const groupPromises = this.event.groups.map(groupId => () => this.$s.groups.get({ groupId }))
    const groups = await Promise.all(groupPromises.map(fn => fn()))
      .then(results => results.map(({ data, error }) => error ? error.message : data))
    this.event.groups = groups
  },
  data () {
    return {
      event: null,
      rsvp: false
    }
  },
  methods: {
    async addRSVP (rsvp) {
      rsvp.eventId = this.event.id
      this.$s.events.addRSVP(rsvp).then(data => console.log(data)).catch(err => console.log(err))
      this.rsvp = false
      const { data } = await this.$s.events.findById(this.event.id)
      this.event = data
    }
  }
}
</script>
