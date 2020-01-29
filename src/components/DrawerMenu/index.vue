<template>
  <q-drawer
    v-model="drawerVisibility"
    bordered
    elevated
    content-class="bg-white text-grey-8"
    :breakpoint="2000"
    :width="216"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="style" />
          </q-item-section>

          <q-item-section>
            Últimos pedidos
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>

          <q-item-section>
            Agenda
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>
            Configurações
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  name: 'DrawerMenu',
  props: {
    visibility: { type: Boolean, default: false }
  },
  data () {
    return {
      drawerVisibility: this.visibility
    }
  },
  watch: {
    visibility () {
      this.drawerVisibility = this.visibility
    }
  }
}
</script>
