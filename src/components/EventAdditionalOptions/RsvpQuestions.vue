<template>
  <q-expansion-item
    class="bg-grey-3"
    header-class="q-py-md"
    @before-show="handleQuestionExpansion"
    v-model="questions.isOpen">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="question_answer" text-color="primary" />
      </q-item-section>

      <q-item-section class="col">
        <span class="text-body2 text-grey-9">Pergunta no RSVP</span>
        <span class="text-caption text-grey-7">
          Pergunta para fazer antes do participante se inscrever
        </span>
      </q-item-section>

      <q-item-section side>
        <q-checkbox v-model="questions.isOpen" />
      </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <div
          v-for="(question, index) in questions.inquiries"
          :key="`question-${index}`"
          class="column q-mb-md q-pa-sm">
          <div class="row">
            <q-input
              type="text"
              filled
              v-model="question.title"
              label="Coloque a quantidade de pessoas"
              placeholder="ex: Coloque seu RG"
              style="flex: 1"
              class="q-pa-none"
              :rules="[
                value => validators.notEmpty(value) ||
                'Este campo é obrigatório quando esta selecionado'
              ]"
            />
            <q-btn
              icon="close"
              flat
              class="q-ml-sm"
              size="sm"
              @click="() => removeQuestion(index)"
            />
          </div>
          <q-item tag="label" class="q-mt-sm" dense>
            <q-item-section avatar top>
                <q-checkbox
                v-model="question.required" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Obrigatória</q-item-label>
              <q-item-label caption>
                O participante terá que responder essa pergunta quando fizer o RSVP
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <q-btn
          icon="add"
          label="Adicionar mais"
          flat
          :class="{
            'full-width': !$q.platform.is.desktop
          }"
          class="q-mt-lg"
          @click="addMoreQuestions"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { notEmpty } from '../../utils/validators';

export default {
  name: 'RsvpQuestions',
  data: () => ({
    validators: { notEmpty },
    questions: {
      isOpen: false,
      inquiries: [
        { title: 'Coloque seu e-mail', required: true },
        { title: 'Coloque seu RG', required: true },
        { title: 'Coloque seu Nome', required: false },
      ],
    },
  }),
  methods: {
    addMoreQuestions() {
      this.questions.inquiries.push({
        title: '',
        required: false,
      });
    },
    removeQuestion(index) {
      this.questions.inquiries = this.questions.inquiries.filter((_, idx) => index !== idx);
      if (!this.questions.inquiries.length) {
        this.questions.isOpen = false;
      }
    },
    handleQuestionExpansion() {
      if (!this.questions.inquiries.length) {
        this.addMoreQuestions();
      }
    },
  },
};
</script>

<style>

</style>
