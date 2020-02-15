<template>
  <div
    :style="styles"
    :class="classes"
    class="column full-width banner-height items-center justify-center q-pa-md">
    <h1
      :class="{
        'text-h4': $q.platform.is.mobile
      }"
      class="text-h2 text-grey-1 q-ma-none text-family-bold text-center">{{ title }}</h1>
    <h4 class="text-h5 text-grey-1 q-ma-none text-center">{{ subTitle }}</h4>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  props: {
    title: { type: String, default: 'Awesome title' },
    subTitle: { type: String, default: 'Awesome sub title' },
    styles: { type: Object, default: () => ({}) },
    classes: { type: String, default: '' }
  }
}
</script>
