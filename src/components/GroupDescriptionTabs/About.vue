<template>
  <div
    v-html="about"
    class="text-body1 text-grey-8 q-pa-md q-mt-md group-description-tabs-about-content" />
</template>

<script>
export default {
  name: 'GroupDescriptionTabsAbout',
  props: {
    about: { type: String, required: true },
  },
};
</script>

<style lang="scss">
.group-description-tabs-about-content {
  width: 100%;
  max-width: 800px;
}
</style>
