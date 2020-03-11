<template>
<div class="card col-2 items-center">
    <q-card class="my-card content-center">
        <q-card-section class="q-my-md">
         </q-card-section>
         <q-card-section >
            {{attendee.email}}
        </q-card-section>
    </q-card>
</div>

</template>
<script>
export default {
  name: 'AttendeeCard',
  props: {
    attendee: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
