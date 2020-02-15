<template>
  <div class="fit">
    <banner
      title="Criar um novo grupo"
      sub-title="Ajudaremos você a encontrar as pessoas certas para que isso aconteça."
      classes="banner-create-group" />
    <group-create-stepper />
    <custom-footer />
  </div>
</template>

<script>
import Banner from '../../components/Banner'
import GroupCreateStepper from '../../components/GroupCreateStepper'
import CustomFooter from '../../components/CustomFooter'

export default {
  name: 'CreateGroup',
  components: { Banner, GroupCreateStepper, CustomFooter }
}
</script>
