<template>
  <div class="fit row justify-center items-center">
    <password-recovery-form/>
  </div>
</template>

<script>
import PassowordRecoveryForm from '../../components/PasswordRecovery'

export default {
  name: 'PassowordRecoveryPage',
  components: {
    'password-recovery-form': PassowordRecoveryForm
  }
}
</script>
