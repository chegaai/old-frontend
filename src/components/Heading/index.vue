<template>
  <q-header class="bg-white" elevated>
    <q-toolbar class="justify-between">
      <q-btn
        flat
        round
        dense
        @click="emitDrawerToggle"
        color="black"
        icon="menu"
        class="q-mr-sm" />

      <p class="text-body1 text-grey-8 text-weight-bold text-uppercase q-pa-none q-ma-none">
        chega.ai
      </p>

      <q-avatar>
        <img src="https://avatars3.githubusercontent.com/u/9022134?s=100&v=4" alt="avatar">
      </q-avatar>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'Heading',
  data: () => ({
    drawerStatus: false,
  }),
  methods: {
    emitDrawerToggle() {
      this.drawerStatus = !this.drawerStatus;
      this.$emit('drawer-toggle', this.drawerStatus);
    },
  },
};
</script>
