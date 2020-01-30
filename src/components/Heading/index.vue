<template>
  <q-header
    :class="headerClass"
    elevated>
    <q-toolbar class="justify-between">
      <!-- <q-btn
        flat
        round
        dense
        @click="emitDrawerToggle"
        color="black"
        icon="menu"
        class="q-mr-sm" /> -->

      <div class="row items-center">
        <img
          :src="logoVariant"
          alt="logo"
          width="30">
        <p
          @click="() => $route.name !== 'General' && goFor('General')"
          class="
            text-family-light text-body1 text-grey-8
            text-uppercase q-pa-none q-ma-none q-ml-sm cursor-pointer
          ">
          <span class="text-family-bold">chega</span>.ai
        </p>
      </div>

      <div>
        <q-btn
          label="Criar um novo grupo"
          class="text-grey-8 text-family-bold q-mr-md"
          icon="group_add"
          v-if="$q.platform.is.desktop"
          @click="() => goFor('GroupCreate')"
          flat />
        <q-btn flat class="q-pa-none">
          <q-avatar>
            <img src="https://avatars3.githubusercontent.com/u/9022134?s=100&v=4" alt="avatar">
          </q-avatar>
          <q-menu auto-close>
            <q-list style="min-width: 250px">

              <template v-for="(item, index) in menuItems">
                <q-separator v-if="item.separator" :key="index" />
                <q-item
                  v-else
                  clickable
                  @click="() => item.click ? item.click() : goFor(item.route)"
                  :key="index">
                  <q-item-section>
                    <p class="row items-center q-ma-none">
                      <q-icon
                        :name="getIconFromMenuItem(item)"
                        size="25px"
                        class="q-mr-md" /> {{ item.label }}
                    </p>
                  </q-item-section>
                </q-item>
              </template>

            </q-list>
          </q-menu>
        </q-btn>

      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { buildMenuItems } from './utils'
import { getRandomReducao } from '../../assets/logo'

export default {
  name: 'Heading',
  data () {
    return {
      drawerStatus: false,
      menuItems: buildMenuItems(this)
    }
  },
  computed: {
    headerClass () {
      return this.$q.dark.isActive ? 'bg-dark' : 'bg-white'
    },
    isDarkModeActive () {
      return this.$q.dark.isActive
    },
    logoVariant () {
      return getRandomReducao(this.$q.dark.isActive)
    }
  },
  methods: {
    emitDrawerToggle () {
      this.drawerStatus = !this.drawerStatus
      this.$emit('drawer-toggle', this.drawerStatus)
    },
    goFor (where) {
      if (!where) return
      this.$router.push({ name: where })
    },
    getIconFromMenuItem (menuItem) {
      return typeof menuItem.icon === 'function'
        ? menuItem.icon(this)
        : menuItem.icon
    }
  }
}
</script>
