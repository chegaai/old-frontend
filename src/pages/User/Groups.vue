<template>
  <div class="fit">
    <banner
      title="Seus grupos"
      sub-title="Estes são os grupos que você participa."
      classes="list-groups" />
  </div>
</template>

<script>
import Banner from '../../components/Banner';

export default {
  name: 'GroupList',
  components: { Banner },
};
</script>
