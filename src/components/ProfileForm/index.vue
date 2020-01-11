<template>
  <q-card class="q-pa-md q-mt-md">
    <q-card-section>
      <div class="row q-mb-xl">
        <q-avatar size="200px">
          <img src="https://avatars3.githubusercontent.com/u/9022134?s=400&v=4" width="300">
        </q-avatar>
      </div>
      <p class="text-body1 text-grey-6 q-mb-sm">
        Username
      </p>
      <q-input
        filled
        v-model="form.name"
        label="Seu username"
        :rules="[
          value => validators.notEmpty(value) || 'Este campo é obrigatório'
        ]"
      />
      <p class="text-body1 text-grey-6 q-mb-sm">
        Email
      </p>
      <q-input
        filled
        type="email"
        v-model="form.email"
        label="Seu email"
        :rules="[
          value => validators.notEmpty(value) || 'Este campo é obrigatório'
        ]"
      />

      <div class="row justify-between q-mt-md">
        <div class="column">
          <p class="text-body1 text-grey-6 q-mb-sm">
            Username
          </p>
          <q-input
            ref="username"
            filled
            type="text"
            v-model="form.username"
            :rules="[
              value => validators.notEmpty(value) || 'Este campo é obrigatório'
            ]"
            label="Username *"
            class="q-my-xs profile-form-sm-input"
          />
        </div>
        <div class="column">
          <p class="text-body1 text-grey-6 q-mb-sm">
            RG
          </p>
          <q-input
            ref="document"
            filled
            type="text"
            v-model="form.document"
            label="Numero do RG *"
            :rules="[
              value => validators.notEmpty(value) || 'Este campo é obrigatório'
            ]"
            class="q-my-xs profile-form-sm-input"
          />
        </div>
      </div>

      <div class="bg-grey-1 q-pa-sm">
        <p class="text-body1 text-grey-6 q-mb-sm">
          Região
        </p>
        <region-select />
      </div>
    </q-card-section>
    <q-card-section class="row justify-end">
      <q-btn
        :class="{
          'full-width': $q.platform.is.mobile
        }"
        class="text-family-regular"
        size="lg"
        color="primary"
        label="Salvar"
        @click="emitClick" />
    </q-card-section>
  </q-card>
</template>

<script>
import RegionSelect from '../../components/RegionSelect';
import { notEmpty } from '../../utils/validators';

export default {
  name: 'ProfileForm',
  components: { RegionSelect },
  data: () => ({
    validators: { notEmpty },
    form: {
      name: 'Igor Halfeld',
      email: 'hello@igorluiz.me',
      username: 'igorhalfeld',
      document: '999999999',
  methods: {
    emitClick() {
      this.$emit('profile-submit', this.form);
    },
    },
};
</script>

<style lang="scss">
.profile-form-sm-input {
  width: 300px;
  @media all and (max-width: 500px) {
    width: 100%;
  }
}
</style>
