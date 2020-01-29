<template>
  <div
    :class="{
      'justify-center': !hasMembers,
    }"
    class="group-description-tabs-members-content row q-mt-md q-mx-auto">

    <template v-if="hasMembers">
       <div class="row items-center q-my-md" v-for="member in members" :key="member.name">
         <q-avatar class="q-mr-md" v-if="member.picture" size="60px">
           <img :src="member.picture">
         </q-avatar>
         <q-avatar v-else size="80px" icon="perm_identity" />
         <div class="column">
           <p class="q-mb-none text-weight-bold text-body1 text-gray-7">
             {{ member.name }} {{ member.lastName }}
           </p>
           <span class="q-mb-none text-caption text-gray-7">
             {{ member.location.city }}, {{ member.location.country }}.
           </span>
         </div>
       </div>
    </template>

    <p v-else class="text-gray-6 text-body1">
      Ainda não existem membros neste grupo.
    </p>
  </div>
</template>

<script>
export default {
  name: 'GroupDescriptionTabsMembers',
  props: {
    members: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    hasMembers () {
      return this.members && this.members.length
    }
  }
}
</script>

<style lang="scss">
.group-description-tabs-members-content {
  width: 100%;
  max-width: 800px;
}
</style>
