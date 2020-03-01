<template>
  <div class="fit">
    <banner
      title="Seus grupos"
      sub-title="Estes são os grupos que você participa."
      classes="list-groups"
    />
        <group-list
          :groups="groups"
          @detail-group="goToGroup"
        />
    <div v-show="groups.length <= 0" class="row justify-center full-width">
      <div class="row justify-end col-2 q-my-md q-ma-md q-px-md">
        <q-btn
          :class="{
            'full-width': $q.platform.is.mobile
          }"
          class="text-family-regular"
          size="lg"
          color="secondary"
          label="Crie um grupo!"
          :to="{name: 'GroupCreate'}"
        />
      </div>
      <div class="row justify-center col-1 q-my-md q-ma-md q-px-md">
        OU
      </div>
      <div class="row justify-left col-2 q-my-md q-ma-md q-px-md">
        <q-btn
          :class="{
            'full-width': $q.platform.is.mobile
          }"
          class="text-family-regular"
          size="lg"
          color="quarternary"
          label="Seja membro de um grupo!"
          :to="{name: 'General'}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../../components/Banner'
import GroupList from '../../components/GroupList'

export default {
  name: 'GroupPage',
  components: { Banner, GroupList },
  data: () => ({
    groups: [],
    loading: true
  }),
  mounted () {
    this.$s.users.getMyGroups().then(({ data }) => {
      this.groups = data
      this.loading = false
    })
  },
  methods: {
    goToGroup (group) {
      console.log(group)
      this.$router.push({ name: 'GroupDetail', params: { id: group.id }, query: { tab: 'about' } })
    }
  }
}
</script>
