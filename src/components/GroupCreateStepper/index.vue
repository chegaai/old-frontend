<template>
  <div class="column items-center q-ma-md q-mt-xl">

    <div class="row items-center group-create-stepper-step-width q-mt-xl q-mb-xl">
      <q-icon
        v-if="$q.platform.is.desktop"
        name="location_city"
        size="110px"
        class="text-grey-4"/>
      <div class="column q-ml-md" style="flex: 1">
        <span class="text-body2 text-grey-6">
          Passo 1/4
        </span>
        <h5 class="text-h5 text-grey-8 text-family-bold q-mb-md">
          Qual será a localização do grupo?
        </h5>
        <q-input
          ref="location"
          filled
          type="text"
          v-model="form.location"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          placeholder="São Paulo"
          class="q-my-xs"
        />
      </div>
    </div>

    <div class="row items-center group-create-stepper-step-width q-mt-xl q-mb-xl">
      <q-icon
        v-if="$q.platform.is.desktop"
        name="question_answer"
        size="110px"
        class="text-grey-4"/>
      <div class="column q-ml-md" style="flex: 1">
        <span class="text-body2 text-grey-6">
          Passo 2/4
        </span>
        <h5 class="text-h5 text-grey-8 text-family-bold q-mb-md">
          Seu grupo será sobre o que?
        </h5>
        <q-select
          filled
          ref="tags"
          v-model="form.tags"
          multiple
          :options="['Software Development', 'Lesbian Friends']"
          use-chips
          stack-label
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          label="Tags"
        />
      </div>
    </div>

    <div class="row group-create-stepper-step-width q-mt-xl q-mb-xl">
      <q-icon
        v-if="$q.platform.is.desktop"
        name="loyalty"
        size="110px"
        class="text-grey-4"/>
      <div class="column q-ml-md" style="flex: 1">
        <span class="text-body2 text-grey-6">
          Passo 3/4
        </span>
        <h5 class="text-h5 text-grey-8 text-family-bold q-mb-md">
          Qual será o nome do seu grupo?
        </h5>
        <q-input
          ref="name"
          filled
          type="text"
          v-model="form.name"
          placeholder="Grupo de estudos de fisica quântica"
          class="q-my-xs"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
        />
        <h5 class="text-h5 text-grey-8 text-family-bold q-my-md">
          Descreva por quê as pessoas deveria se juntar ao seu grupo
          e sobre o que é..
        </h5>
        <q-input
          ref="description"
          filled
          type="textarea"
          placeholder="É um grupo muuuito legal 😍"
          v-model="form.description"
          :rules="[
            value => validators.notEmpty(value) || 'Este campo é obrigatório'
          ]"
          class="q-my-xs"
        />
      </div>
    </div>

    <div class="row items-center group-create-stepper-step-width q-mt-xl q-mb-xl">
      <q-icon
        v-if="$q.platform.is.desktop"
        name="check_circle_outline"
        size="110px"
        class="text-grey-4"/>
      <div class="column q-ml-md" style="flex: 1">
        <span class="text-body2 text-grey-6">
          Passo 4/4
        </span>
        <h5 class="text-h5 text-grey-8 text-family-bold q-mb-md">
          Finalização
        </h5>
        <p class="">Leia os <a class="text-blue-8" href="">termos de uso</a></p>
        <div>
          <q-btn
            @click="createGroup"
            label="Aceitar & continuar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slugify } from '../../utils/string';
import { validate } from '../../utils/validator';
import { notEmpty } from '../../utils/validators';

export default {
  name: 'GroupCreateStepper',
  data: () => ({
    validators: { notEmpty },
    form: {
      name: '',
      description: '',
      location: '',
      tags: ['Lesbian Friends'],
    },
  }),
  methods: {
    goFor(where, params) {
      if (!where) return;
      this.$router.push({ name: where, params });
    },
    async createGroup() {
      const errors = await validate(this, [
        'location',
        'tags',
        'name',
        'description',
      ]);
      if (errors.hasError()) return;

      const response = await this.$s.groups.create({
        ...this.form,
        location: {
          city: this.form.location,
        },
      });

      const groupSlug = slugify(response.data._id);
      this.goFor('GroupDetail', { id: groupSlug });
    },
  },
};
</script>

<style lang="scss">
.group-create-stepper-step-width {
  width: 100%;
  max-width: 800px;
}
</style>
