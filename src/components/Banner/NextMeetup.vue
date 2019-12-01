<template>
  <div
    :style="styles"
    class="row full-width banner-height justify-center">
    <div class="row items-center justify-between full-height banner-content-width">
      <div class="column">
        <span class="text-body1 text-grey-1 q-ma-none">Seu próximo meetup</span>
        <h1 class="text-h4 text-grey-1 q-ma-none text-weight-bold">
          {{ title }}
        </h1>
        <h4 class="text-h5 text-grey-1 q-ma-none">
          {{ subTitle }}
        </h4>
        <span class="row items-center text-body1 text-weight-bold text-grey-1 q-mt-md">
          <q-icon name="calendar_today" size="20px" class="q-mr-sm"/>
          12/12/2019
        </span>
        <span class="row items-center text-body1 text-weight-bold text-grey-1">
          <q-icon name="where_to_vote" size="20px" class="q-mr-sm"/>
          Pagar.me
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextMeetup',
  props: {
    title: { type: String, default: 'Awesome title' },
    subTitle: { type: String, default: 'Awesome sub title' },
    styles: { type: Object, default: () => ({}) },
  },
};
</script>
