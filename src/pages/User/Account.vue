<template>
  <div class="column items-center q-ma-md q-mt-xl">
    <div class="profile-page-content-width">
      <h5 class="text-h5 text-grey-7 text-family-bold q-ma-none" style="max-width: 950px">
        Informações de conta
      </h5>
    </div>

    <account-form
      :initial-values="initialValues"
      @account-submit="saveAccount"
      class="profile-page-content-width" />
  </div>
</template>

<script>
import AccountForm from '../../components/AccountForm';

export default {
  name: 'AccountPage',
  components: { AccountForm },
  data() {
    return {
      initialValues: {},
    };
  },
  methods: {
    async saveAccount(account) {
      const { data } = await this.$s.users.update(account);
      if (data) return this.$q.notify('Usuário atualizado com sucesso');
      return this.$q.notify('Erro ao salvar usuário');
    },
    async getInitialValues() {
      const { data: { username, email, document } } = await this.$s.users.getMe();
      return { username, email, document };
    },
  },
  created() {
    this.getInitialValues().then((data) => { this.initialValues = data; });
  },
};
</script>

<style>
.profile-page-content-width {
  width: 800px;
  max-width: 100%;
}
</style>
