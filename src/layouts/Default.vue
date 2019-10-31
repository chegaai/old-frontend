<template>
  <q-layout view="lHh lpr lFf">
    <drawer-menu :visibility="drawerVisibility" />
    <heading @drawer-toggle="toggleDrawer" />

    <q-page-container>
      <transition
        :duration="400"
        appear
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import DrawerMenu from '../components/DrawerMenu';
import Heading from '../components/Heading';

export default {
  name: 'DefaultLayout',
  components: { Heading, DrawerMenu },
  data: () => ({
    drawerVisibility: false,
  }),
  methods: {
    toggleDrawer(status) {
      this.drawerVisibility = status;
    },
  },
};
</script>
