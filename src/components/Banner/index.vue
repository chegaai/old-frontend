<template>
  <component :is="component" v-bind="$props" v-on="$listeners" />
</template>

<script>
import EventList from './EventList'
import NextMeetup from './NextMeetup'
import GroupCover from './GroupCover'

export default {
  name: 'BannerFactory',
  components: { NextMeetup, GroupCover, EventList },
  props: {
    component: { type: String, default: 'GroupCover' },
    title: { type: String, default: 'Awesome title' },
    subTitle: { type: String, default: 'Awesome sub title' },
    styles: { type: Object, default: () => ({}) },
    classes: { type: String, default: '' }
  }
}
</script>

<style lang="scss">
.banner-height {
  height: 380px;
  background-size: cover;
  position: relative;

  h1, h4, span {
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 380px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}

.banner-content-width {
  width: 100%;
  max-width: 900px;
}

.banner-create-group {
  background-image: url(../../assets/create-group.jpg);
  background-position: 30% 30%;
}
.banner-list-groups {
  background-image: url(../../assets/list-groups.jpg);
  background-position: 40% 40%;
}
</style>
