<template>
  <div class="fit">
    <banner
      title="Seus grupos"
      sub-title="Estes são os grupos que você participa."
      classes="list-groups"
    />
    <div class="row justify-center full-width">
      <div class="row justify-center col-md-6 col-12 q-my-md q-ma-md q-px-md">
        <GroupCard
          @click="goToGroup"
          v-for="group in groups"
          :key="group.slug"
          :group="group"
          class="q-my-sm q-mx-sm"
        />
      </div>
    </div>
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
import GroupCard from '../../components/GroupCard'

export default {
  name: 'GroupList',
  components: { Banner, GroupCard },
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
      this.$router.push({ name: 'GroupDetail', params: { slug: group.slug }, query: { tab: 'about' } })
    }
  }
}
</script>
