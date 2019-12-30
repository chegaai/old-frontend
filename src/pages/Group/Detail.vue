<template>
  <div class="fit">
    <banner
      component="GroupCover"
      :title="group.name"
      :styles="{
        backgroundImage: group.pictures.banner
          ? `url(${group.pictures.banner})`
          : 'url(/statics/images/standard-group-image.jpg)',
        backgroundPosition: '50% 50%',
      }"
      :sub-title="group.tags.join(', ')" />
    <group-description-tabs
      :events="eventList"
      :about="group.description"
    />
    <button-sticky
      icon="add"
      label="Criar evento"
      @click="() => goFor('EventCreate')" />
    <custom-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Banner from '../../components/Banner';
import GroupDescriptionTabs from '../../components/GroupDescriptionTabs';
import ButtonSticky from '../../components/ButtonSticky';
import CustomFooter from '../../components/CustomFooter';
import { eventList } from '../../mock/event';

export default {
  name: 'GroupDetail',
  components: {
    Banner,
    CustomFooter,
    ButtonSticky,
    GroupDescriptionTabs,
  },
  data: () => ({
    eventList,
  }),
  computed: {
    ...mapState({
      group: state => state.General.currentSwapSpace,
    }),
  },
  preFetch({ store, ssrContext, currentRoute }) {
    return new Promise(async (resolve) => {
      const response = await ssrContext.$s.groups.get({ groupId: currentRoute.params.slug });
      console.log('response', response.data);

      store.dispatch('General/setCurrentSwapSpace', response.data);
      resolve();
    });
  },
  mounted() {
    console.log('this.$store.state', this.$store.state);
    // const response = await this.$s.groups.get({ groupId: this.$route.params.slug });
    // this.group.name = response.data.name;
    // console.log('response', response);
    // console.log('this.data', this.data);
  },
  methods: {
    goFor(where) {
      this.$router.push({ name: where });
    },
  },
};
</script>
