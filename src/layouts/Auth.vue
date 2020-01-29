<template>
  <transition
    :duration="400"
    appear
    mode="out-in"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>
