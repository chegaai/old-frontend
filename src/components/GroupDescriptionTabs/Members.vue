<template>
  <div class="row q-mt-md col-3 q-mx-auto">
    <div class="row items-center q-my-md" v-for="member in members" :key="member.name">
      <q-avatar size="60px">
        <img :src="member.picture">
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
