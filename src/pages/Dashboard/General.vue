<template>
  <div class="fit">
    <!-- backgroundImage: 'url(https://secure.meetupstatic.com/photos/event/c/3/3/e/highres_486769982.jpeg)',
        backgroundPosition: '50% 50%', -->
    <banner
      component="NextMeetup"
      title="NodeBR #59 - Masters of Node.js"
      :styles="{
        /* backgroundImage: 'linear-gradient(45deg, #e6549e, #027BE3)' */
        backgroundColor: '#18104a'
      }"
      sub-title="NodeBR São Paulo"
      additional-info="" />
  </div>
</template>

<script>
import Banner from '../../components/Banner';

export default {
  name: 'HomePage',
  components: { Banner },
};
</script>
