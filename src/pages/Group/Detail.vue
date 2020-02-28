<template>
  <div class="fit">
    <template v-if="group && !group.error">
      <banner
        component="GroupCover"
        :title="group.name"
        :styles="{
          backgroundImage: group.pictures && group.pictures.banner
            ? `url(${group.pictures.banner})`
            : 'url(/statics/images/standard-group-image.jpg)',
          backgroundPosition: '50% 50%',
        }"
        :sub-title="`${followersCount}`" />
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
    </template>
    <template v-else>
      <banner
        component="GroupCover"
        title="Erro ao carregar grupo"
        :sub-title="group.error"
      />
    </template>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import Banner from '../../components/Banner'
import GroupDescriptionTabs from '../../components/GroupDescriptionTabs'
import ButtonSticky from '../../components/ButtonSticky'
import CustomFooter from '../../components/CustomFooter'

export default {
  name: 'GroupDetail',
  components: {
    Banner,
    CustomFooter,
    ButtonSticky,
    GroupDescriptionTabs
  },
  data: () => ({
    events: [],
    members: [],
    group: Object.create(null),
    followersCount: 0
  }),
  mounted () {
    const { id } = this.$route.params

    this.$s.groups.get({ groupId: id })
      .then(({ data }) => { this.group = data })
      .catch(err => console.log(err))

    this.$s.groups.getFollowersCount({ groupId: id }).then(({ data }) => {
      this.group.followersCount = data.count
    })

    const membersCount = this.group ? this.group.followersCount : 0
    if (!membersCount) { this.followersCount = 'Nenhum membro' }
    if (membersCount > 1) { this.followersCount = `${membersCount} membros` }
    this.followersCount = '1 membro'
  },
  methods: {
    goFor (where) {
      this.$router.push({ name: where })
    },
    handleTabChange (tab) {
      const tabs = {
        events: async () => {
          const response = await this.$s.groups.getEvents({ groupId: this.group.id })
          this.events = response.data
        },
        members: async () => {
          const response = await this.$s.groups.getFollowers({ groupId: this.group.id })
          this.members = response.data
        }
      }
      return tabs[tab] && tabs[tab]()
    }
  }
}
</script>
