<template>
  <div class="column full-width items-center">
    <!--<hero :info="event" />-->
    <event-description-viewer :html="event.description" />
    <button-sticky label="Inscrever-se" />
    <div class="full-width">
      <custom-footer />
    </div>
  </div>
</template>

<script>
// import Hero from '../../components/Hero'
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
  data: () => ({
    event: Object.create(null)
  }),
  created () {
    const { id } = this.$route.params
    if (!id) {
      this.$router.push({ name: 'General' })
      return
    }

    this.$s.events.findById(id).then(result => {
      this.event = result.data
    })
  },
  computed: {
    stickyPosition () {
      return this.$q.platform.is.desktop ? 'bottom-right' : 'bottom'
    }
  }
}
</script>
