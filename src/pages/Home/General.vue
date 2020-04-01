<template>
  <!-- <div class="fit column items-center"> -->
  <div class="fit">

    <banner
      component="EventList"
      title="Netwoking. Conhecimento. Felicidade."
      classes="banner-list-groups"
      :styles="{
        /* backgroundImage: 'linear-gradient(45deg, #e6549e, #027BE3)' */
      }"
      sub-title="Junte-se a um grupo e faça mais do que você ama."
      additional-info="" />

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

    <div class="row justify-center full-width q-mt-xl">
        <event-list
            :events=  "events"
        />
        <group-list
            :groups=  "groups"
            @detail-group="goToGroup"
        />
    </div>

  </div>
</template>

<script>
import Banner from '../../components/Banner'
import GroupList from '../../components/GroupList'
import EventList from '../../components/EventList'

export default {
  name: 'HomePage',
  components: { Banner, GroupList, EventList },
  data: () => ({
    events: [],
    groups: [],
    search: ''
  }),
  mounted () {
    this.$s.events.get().then(async (result) => {
      this.events = result.data
    })
    this.$s.groups.getAll().then(({ data }) => {
      this.groups = data
    })
  },
  methods: {
    goToGroup (group) {
      console.log(group)
      this.$router.push({ name: 'GroupDetail', params: { id: group.id }, query: { tab: 'about' } })
    }
  }
}
</script>

<style lang="scss">
.general-events-listing {
  width: 100%;
  max-width: 800px;
}
</style>
