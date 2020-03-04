<template>
<div>
    <h4 class="text-h4 text-grey-9 text-family-bold q-mb-md q-ml-md">Participantes</h4>
    <div class="row">
        <div  v-bind:key="attendee.id" v-for="attendee in attendees" class="q-px-lg">
            <attendee-card :attendee="attendee"/>
        </div>
    </div>
</div>
</template>

<script>
import AttendeeCard from '../AttendeeCard'
export default {
  components: { AttendeeCard },
  props: {
    attendees: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
