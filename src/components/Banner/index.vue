<template>
  <component :is="component" v-bind="$props" v-on="$listeners" />
</template>

<script>
import NextMeetup from './NextMeetup';
import GroupCover from './GroupCover';

export default {
  name: 'BannerFactory',
  components: { NextMeetup, GroupCover },
  props: {
    component: { type: String, default: 'GroupCover' },
    title: { type: String, default: 'Awesome title' },
    subTitle: { type: String, default: 'Awesome sub title' },
    styles: { type: Object, default: () => ({}) },
  },
};
</script>

<style lang="scss">
.banner-height {
  height: 450px;
  background-size: cover;
  position: relative;

  h1, h4, span {
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 450px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}

.banner-content-width {
  width: 100%;
  max-width: 900px;
}
</style>
