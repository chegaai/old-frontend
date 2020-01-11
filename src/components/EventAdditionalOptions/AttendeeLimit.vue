<template>
  <q-expansion-item
    class="bg-grey-3 q-mt-sm"
    header-class="q-py-md"
    v-model="attendeeLimit.isOpen">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="supervisor_account" text-color="primary" />
      </q-item-section>

      <q-item-section class="col">
        <span class="text-body2 text-grey-9">Limite de participantes</span>
        <span class="text-caption text-grey-7">Número máximo de participantes</span>
      </q-item-section>

      <q-item-section side>
        <q-checkbox v-model="attendeeLimit.isOpen" />
      </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <p class="text-body1 text-grey-6 q-mb-sm">
          As pessoas iram ver a quantidade de espaços disponíveis
        </p>
        <q-input
          type="number"
          filled
          v-model="attendeeLimit.amount"
          label="Coloque a quantidade de pessoas"
          placeholder="ex: 80"
          :rules="[
            value => validators.notEmpty(value) ||
            'Este campo é obrigatório quando esta selecionado'
          ]"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { notEmpty } from '../../utils/validators';

export default {
  name: 'AttendeeLimit',
  data: () => ({
    validators: { notEmpty },
    attendeeLimit: {
      isOpen: false,
      amount: null,
    },
  }),
};
</script>
