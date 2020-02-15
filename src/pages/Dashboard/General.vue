<template>
  <!-- <div class="fit column items-center"> -->
  <div class="fit">
    <!-- backgroundImage: 'url(https://secure.meetupstatic.com/photos/event/c/3/3/e/highres_486769982.jpeg)',
        backgroundPosition: '50% 50%', -->
    <banner
      component="EventList"
      title="Netwoking. Conhecimento. Felicidade."
      classes="banner-list-groups"
      :styles="{
        /* backgroundImage: 'linear-gradient(45deg, #e6549e, #027BE3)' */
      }"
      sub-title="Junte-se a um grupo e faça mais do que você ama."
      additional-info="" />
    <!--
    <banner
      component="NextMeetup"
      title="NodeBR #59 - Masters of Node.js"
      :styles="{
        /* backgroundImage: 'linear-gradient(45deg, #e6549e, #027BE3)' */
        backgroundColor: '#18104a'
      }"
      sub-title="NodeBR São Paulo"
      additional-info="" />
    -->

    <div class="row justify-center full-width q-mt-xl">
      <div class="col-md-6 col-12 q-mx-md q-px-md">
        <q-input
          v-model="search"
          debounce="500"
          filled
          placeholder="Procure por um evento e presione enter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-center full-width">
      <div class="row justify-center col-md-6 col-12 q-my-md q-ma-md q-px-md">
        <event-card
          v-for="(event, index) in events"
          :aspect-ratio="eventCardAspectRatios.LANDSCAPE"
          :key="`event-${index}`"
          class="q-my-sm"
          :event="event"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Banner from '../../components/Banner'
import EventCard, { aspectRatios } from '../../components/EventCard'

export default {
  name: 'HomePage',
  components: { Banner, EventCard },
  data: () => ({
    events: [],
    eventCardAspectRatios: aspectRatios,
    search: ''
  }),
  mounted () {
    this.$s.events.get().then(async (result) => {
      this.events = result.data
    })
  }
}
</script>

<style lang="scss">
.general-events-listing {
  width: 100%;
  max-width: 800px;
}
</style>
