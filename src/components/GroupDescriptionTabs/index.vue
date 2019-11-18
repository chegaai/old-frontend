<template>
  <div class="column items-center">
    <q-tabs
      :breakpoint="700"
      v-model="tab"
      class="full-width bg-grey-3 shadow-2"
    >
      <q-tab style="min-width: 100px" name="about" icon="assessment" label="Sobre" />
      <q-tab style="min-width: 100px" name="events" icon="event" label="Eventos" />
      <q-tab style="min-width: 100px" name="members" icon="group" label="Membros" />
    </q-tabs>
    <component :is="component" v-bind="$props"/>
  </div>
</template>

<script>
import About from './About.vue';
import Events from './Events.vue';
import Members from './Members';

const TABS_ENUM = {
  about: 'About',
  events: 'Events',
  members: 'Members',
};

export default {
  name: 'GroupDescriptionTabs',
  components: { About, Events, Members },
  props: {
    about: { type: String, required: true },
    events: { type: Array, required: true },
  },
  data() {
    return {
      tab: this.$route.query.tab || 'about',
      component: 'About',
    };
  },
  watch: {
    tab: {
      immediate: true,
      handler() {
        const currentTab = TABS_ENUM[this.tab].toLowerCase();
        if (this.$route.query.tab !== currentTab) {
          const query = { tab: currentTab };
          this.$router.push({ query });
        }
        this.component = currentTab;
      },
    },
  },
};
</script>
