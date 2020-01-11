<template>
  <div class="q-mt-md">
    <div class="row items-center" v-for="member in members" :key="member.name">
      <q-avatar size="60px">
        <img :src="members.picture">
      </q-avatar>
      <p class="q-ml-md q-mb-none text-body1 text-gray-7">{{ member.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupDescriptionTabsMembers',
  props: {
    members: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>
