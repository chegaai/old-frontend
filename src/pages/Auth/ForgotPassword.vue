<template>
  <div class="fit row justify-center items-center">
    <login-form forgot-password />
  </div>
</template>

<script>
import LoginForm from '../../components/LoginForm';

export default {
  name: 'ForgotPasswordPage',
  components: {
    LoginForm,
  },
};
</script>
