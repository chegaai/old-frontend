<template>
  <div class="col">
    <rsvp-questions />
    <attendee-limit />
    <rsvp-start-end />
  </div>
</template>

<script>
import RsvpQuestions from './RsvpQuestions';
import AttendeeLimit from './AttendeeLimit';
import RsvpStartEnd from './RsvpStartEnd';

export default {
  name: 'EventAdditionalOptions',
  components: { AttendeeLimit, RsvpQuestions, RsvpStartEnd },
  data: () => ({
  }),
};
</script>
