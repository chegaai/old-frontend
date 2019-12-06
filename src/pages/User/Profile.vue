<template>
  <div class="column items-center q-ma-md q-mt-xl">
    <div class="profile-page-content-width">
      <h5
        class="text-h5 text-grey-7 text-family-bold q-ma-none"
        style="max-width: 950px">
        Informações de perfil
      </h5>
    </div>

    <profile-form class="profile-page-content-width" />
  </div>
</template>

<script>
import ProfileForm from '../../components/ProfileForm';

export default {
  name: 'ProfilePage',
  components: { ProfileForm },
};
</script>

<style>
.profile-page-content-width {
  width: 800px;
  max-width: 100%;
}
</style>
