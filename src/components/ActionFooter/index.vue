<template>
  <q-footer
    elevated
    class="row bg-white justify-between q-py-md q-px-xl"
  >
    <q-btn
      color="primary"
      outline
      label="Cancelar"
      @click="emitAction({ type: actionTypes.CANCEL })"
    />
    <q-btn
      color="primary"
      :label="okLabel"
      @click="emitAction({ type: actionTypes.OK })"
    />
  </q-footer>
</template>

<script>
export const events = {
  OK: 'OK',
  CANCEL: 'CANCEL',
};

export default {
  name: 'ActionFooter',
  props: {
    okLabel: { type: String, default: 'Ok label' },
    cancelLabel: { type: String, default: 'Cancel label' },
  },
  data: () => ({
    actionTypes: events,
  }),
  methods: {
    emitAction(action) {
      this.$emit('action', action);
    },
  },
};
</script>
