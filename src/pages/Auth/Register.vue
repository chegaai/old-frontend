<template>
  <div class="fit row justify-center items-center">
    <login-form register />
  </div>
</template>

<script>
import LoginForm from '../../components/LoginForm'

export default {
  name: 'RegisterPage',
  components: {
    LoginForm
  }
}
</script>
