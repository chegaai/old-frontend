<template>
  <div class="column full-width items-center" v-if="event">
    <hero :info="event" />
    <event-description-viewer :html="event.description" />
    <button-sticky label="Inscrever-se" />
    <div class="full-width">
      <custom-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hero from '../../components/Hero'
import EventDescriptionViewer from '../../components/EventDescriptionViewer'
import ButtonSticky from '../../components/ButtonSticky'
import CustomFooter from '../../components/CustomFooter'

export default {
  name: 'EventDetail',
  components: {
    // Hero,
    ButtonSticky,
    CustomFooter,
    EventDescriptionViewer
  },
  computed: {
    ...mapState({
      event: state => state.General.currentSwapSpace
    }),
    stickyPosition () {
      return this.$q.platform.is.desktop ? 'bottom-right' : 'bottom'
    }
  },
  async preFetch ({ store, ssrContext, currentRoute }) {
    if (!ssrContext) return

    const eventId = currentRoute.params.id

    if (!eventId) return

    const { data: eventData, error: eventError } = await ssrContext.$s.events.findById(eventId)

    if (eventError) return store.dispatch('General/setCurrentSwapSpace', { error: eventError.message })

    const organizerPromises = eventData.organizers.map(organizerId => () => ssrContext.$s.users.getProfileById(organizerId))
    const organizers = await Promise.all(organizerPromises.map(fn => fn()))
      .then(results => results.map(({ data, error }) => error ? error.message : data))

    eventData.organizers = organizers

    const groupPromises = eventData.groups.map(groupId => () => ssrContext.$s.groups.get({ groupId }))
    const groups = await Promise.all(groupPromises.map(fn => fn()))
      .then(results => results.map(({ data, error }) => error ? error.message : data))

    eventData.groups = groups

    store.dispatch('General/setCurrentSwapSpace', eventData)
  }
}
</script>
