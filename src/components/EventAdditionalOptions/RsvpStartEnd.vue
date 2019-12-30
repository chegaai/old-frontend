<template>
  <q-expansion-item
    class="bg-grey-3 q-mt-sm"
    header-class="q-py-md"
    v-model="rsvpStartEnd.isOpen">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="supervisor_account" text-color="primary" />
      </q-item-section>

      <q-item-section class="col">
        <span class="text-body2 text-grey-9">Inicio e fim do RSVP</span>
        <span class="text-caption text-grey-7">Quando abrirá e fechara as inscrições</span>
      </q-item-section>

      <q-item-section side>
        <q-checkbox v-model="rsvpStartEnd.isOpen" />
      </q-item-section>
    </template>
  </q-expansion-item>
</template>

<script>
export default {
  data: () => ({
    rsvpStartEnd: {
      isOpen: false,
    },
  }),
};
</script>
