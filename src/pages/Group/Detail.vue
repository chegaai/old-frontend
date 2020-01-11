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
      :sub-title="`${group.followersCount} membro(s)`" />
    <group-description-tabs
      @tab-change="handleTabChange"
      :events="events"
      :members="members"
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

export default {
  name: 'GroupDetail',
  components: {
    Banner,
    CustomFooter,
    ButtonSticky,
    GroupDescriptionTabs,
  },
  data: () => ({
    events: [],
    members: [],
  }),
  computed: {
    ...mapState({
      group: state => state.General.currentSwapSpace,
    }),
  },
  preFetch({ store, ssrContext, currentRoute }) {
    if (!ssrContext) return;
    return new Promise(async (resolve) => {
      const groupDetailResponse = await ssrContext.$s.groups.get({
        groupId: currentRoute.params.slug,
      });
      const followersCountReponse = await ssrContext.$s.groups.getFollowersCount({
        groupId: groupDetailResponse.data.id,
      });

      const payload = {
        ...groupDetailResponse.data,
        followersCount: followersCountReponse.data.count,
      };

      store.dispatch('General/setCurrentSwapSpace', payload);
      resolve();
    });
  },
  mounted() {
    // console.log('this.$store.state', this.$store.state);
    // const response = await this.$s.groups.get({ groupId: this.$route.params.slug });
    // this.group.name = response.data.name;
    // console.log('response', response);
    // console.log('this.data', this.data);
  },
  methods: {
    goFor(where) {
      this.$router.push({ name: where });
    },
    handleTabChange(tab) {
      const tabs = {
        events: async () => {
          const response = await this.$s.groups.getEvents({ groupId: this.group.id });
          this.events = response.data;
          // console.log('this.events', response.data);
        },
        members: async () => {
          const response = await this.$s.groups.getFollowers({ groupId: this.group.id });
          this.members = response.data;
        },
      };

      return tabs[tab] && tabs[tab]();
    },
  },
};
</script>
