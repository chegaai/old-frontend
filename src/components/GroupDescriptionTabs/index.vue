<template>
  <div class="column items-center">
    <q-tabs
      :breakpoint="700"
      v-model="tab"
      class="full-width bg-grey-3 shadow-2"
    >
      <q-tab style="min-width: 100px" name="About" icon="assessment" label="Sobre" />
      <q-tab style="min-width: 100px" name="Events" icon="event" label="Eventos" />
      <q-tab style="min-width: 100px" name="Members" icon="group" label="Membros" />
    </q-tabs>
    <component :is="component" v-bind="$props"/>
  </div>
</template>

<script>
import About from './About.vue';
import Events from './Events.vue';
import Members from './Members';

export default {
  name: 'GroupDescriptionTabs',
  components: { About, Events, Members },
  props: {
    about: { type: String, required: true },
    events: { type: Array, required: true },
  },
  data: () => ({
    tab: 'About',
    component: 'About',
  }),
  watch: {
    tab() {
      this.component = this.tab;
    },
  },
};
</script>
