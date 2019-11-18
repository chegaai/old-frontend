<template>
  <q-header class="bg-white" elevated>
    <q-toolbar class="justify-between">
      <!-- <q-btn
        flat
        round
        dense
        @click="emitDrawerToggle"
        color="black"
        icon="menu"
        class="q-mr-sm" /> -->

      <p
        @click="() => $route.name !== 'General' && goFor('General')"
        class="
          text-body1 text-grey-8 text-weight-bold
          text-uppercase q-pa-none q-ma-none cursor-pointer
        ">
        chega.ai
      </p>

      <div>
        <q-btn
          label="Criar um novo grupo"
          class="text-grey-8 q-mr-md"
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
                  @click="() => goFor(item.route)"
                  :key="index">
                  <q-item-section>
                    <p class="row items-center q-ma-none">
                      <q-icon
                        :name="item.icon"
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
import { menuItems } from './utils';

export default {
  name: 'Heading',
  data() {
    return {
      drawerStatus: false,
      menuItems,
    };
  },
  methods: {
    emitDrawerToggle() {
      this.drawerStatus = !this.drawerStatus;
      this.$emit('drawer-toggle', this.drawerStatus);
    },
    goFor(where) {
      if (!where) return;
      this.$router.push({ name: where });
    },
  },
};
</script>
