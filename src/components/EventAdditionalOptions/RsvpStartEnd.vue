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

    <q-card>
      <q-card-section>
        <p class="text-body1 text-grey-6 q-mb-sm">
          Data/hora de início *
        </p>
        <div>
          <q-input filled v-model="rsvpStartEnd.start">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="rsvpStartEnd.begin"
                    mask="YYYY-MM-DD HH:mm" />
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="rsvpStartEnd.begin" mask="YYYY-MM-DD HH:mm" format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <p class="text-grey-6 q-mt-sm">Clique nos ícones ao lado para abrir o DatePicker</p>
        </div>
        <div
          :class="{
            'q-mt-none': $q.platform.is.desktop,
          }"
          class="col-5 q-my-md">
          <p class="text-body1 text-grey-6 q-mb-sm">
            Data/hora de finalização *
          </p>
          <q-input filled v-model="rsvpStartEnd.end">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="rsvpStartEnd.end" mask="YYYY-MM-DD HH:mm" />
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="rsvpStartEnd.end" mask="YYYY-MM-DD HH:mm" format24h />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <p class="text-grey-6 q-mt-sm">Clique nos ícones ao lado para abrir o DatePicker</p>
        </div>
      </q-card-section>
    </q-card>

  </q-expansion-item>
</template>

<script>
export default {
  data: () => ({
    rsvpStartEnd: {
      isOpen: false,
      begin: null,
      end: null,
    },
  }),
};
</script>
