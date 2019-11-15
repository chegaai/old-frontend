<template>
  <div class="fit row justify-center items-center">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../../components/LoginForm';

export default {
  name: 'LoginPage',
  components: {
    LoginForm,
  },
};
</script>
