<template>
  <q-card class="q-pa-md q-mt-md">
    <q-card-section>
      <div class="row q-mb-xl justify-center">
        <input type="file" name="picture" ref="pictureUpload" @change="setNewPicture" hidden>
        <q-avatar
          size="200px"
          @click="openFilePicker"
          class="pointer-cursor avatar-image"
          @mouseenter="showOverlay = true"
          @mouseleave="showOverlay = false">
          <transition name="fade">
            <div class="avatar-overlay" v-show="showOverlay"><q-icon name="photo_camera" /></div>
          </transition>
          <img :src="pictureURL" width="300">
        </q-avatar>
      </div>

      <div class="row justify-between q-mt-md">
        <div class="column">
          <p class="text-body1 text-grey-6 q-mb-sm">
            Nome
          </p>
          <q-input
            ref="name"
            :disable="isLoading"
            :loading="isLoading"
            filled
            type="text"
            v-model="form.name"
            :rules="[
                value => validators.notEmpty(value) || 'Este campo é obrigatório'
              ]"
            label="Nome *"
            class="q-my-xs profile-form-sm-input" />
        </div>
        <div class="column">
          <p class="text-body1 text-grey-6 q-mb-sm">
            Sobrenome
          </p>
          <q-input
            ref="lastName"
            :disable="isLoading"
            :loading="isLoading"
            filled
            type="text"
            v-model="form.lastName"
            label="Sobrenome *"
            :rules="[
              value => validators.notEmpty(value) || 'Este campo é obrigatório'
            ]"
            class="q-my-xs profile-form-sm-input" />
        </div>
      </div>

      <p class="text-body1 text-grey-6 q-mb-sm">
        Idioma
      </p>
      <q-select
        filled
        type="text"
        :disable="isLoading"
        :loading="isLoading"
        v-model="form.language"
        map-options
        label="Seu Idioma"
        :options="langOptions"
        class="q-mb-md"
        emit-value
      />

      <div class="column justify-center">
        <p class="text-body1 text-grey-6 q-mb-sm">
          Tags (aperte Enter)
        </p>
        <div>
          <q-input
            @keypress.enter="addChip"
            :disable="isLoading"
            :loading="isLoading"
            v-model="addTag"
            filled
            class="q-mb-md"
          />
          <q-chip
            removable
            :disable="isLoading"
            :loading="isLoading"
            @remove="() => removeTag(tag)"
            v-for="(tag, index) of form.tags"
            :key="index">
              {{tag}}
          </q-chip>
        </div>
      </div>

      <div class="full-width q-mt-md">
        <p class="text-body1 text-grey-6">
          Redes Sociais
        </p>
        <div
          id="old-social"
          v-for="(socialNetwork, index) of form.socialNetworks"
          :key="index"
          class="row items-center" >
          <q-select
            filled
            clearable
            :disable="isLoading"
            :loading="isLoading"
            outlined
            v-model="socialNetwork.name"
            :rules="[
              value => {
                validators.notEmptyIf(socialNetwork.link, value) || 'Este campo é obrigatório'
              }
            ]"
            :options="socialNetworkList"
            class="q-mr-sm social-name"/>
          <q-input
            v-model="socialNetwork.link"
            filled
            type="url"
            :prefix="prefix"
            :disable="isLoading"
            :loading="isLoading"
            :rules="[
              value => {
                validators.notEmptyIf(socialNetwork.name, value) || 'Este campo é obrigatório'
              },
            ]"
            class="q-mr-sm social-link"
            />
            <q-btn @click="() => removeSocial(index)" flat round color="negative" icon="remove" />
        </div>

        <div id="new-social" class="row items-center">
          <q-select
            filled
            clearable
            :disable="isLoading"
            :loading="isLoading"
            outlined
            v-model="newNetwork.name"
            :options="socialNetworkList"
            :rules="[
              value => validators.notEmptyIf(newNetwork.link, value) || 'Este campo é obrigatório'
            ]"
            class="q-mr-sm social-name"
          />
          <q-input
            v-model="newNetwork.link"
            filled
            type="url"
            :prefix="prefix"
            :disable="isLoading"
            :loading="isLoading"
            :rules="[
              value => validators.notEmptyIf(newNetwork.name, value) || 'Este campo é obrigatório'
            ]"
            @keypress.enter="addSocial"
            class="q-mr-sm social-link"
            />
            <q-btn
              @click="addSocial"
              :disable="isLoading"
              flat
              round
              color="positive"
              icon="add" />
        </div>
      </div>
      <div>
        <p class="text-body1 text-grey-6 q-mb-sm">
          Localização
        </p>
        <region-select v-model="form.location" />
      </div>
    </q-card-section>
    <q-card-section class="row justify-end">
      <q-btn
        :class="{
          'full-width': $q.platform.is.mobile
        }"
        class="text-family-regular"
        size="lg"
        :loading="isLoading"
        :disable="isLoading"
        color="primary"
        label="Salvar"
        @click="emitClick" />
    </q-card-section>
  </q-card>
</template>

<script>
import RegionSelect from '../../components/RegionSelect'
import { notEmpty, isUrl } from '../../utils/validators'

const notEmptyIf = (compareField, value) => {
  if (compareField) {
    return !!value
  }
  return true
}

const readFileAsDataURL = async file => new Promise((resolve, reject) => {
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    resolve(fileReader.result)
  }

  fileReader.onerror = reject

  fileReader.readAsDataURL(file)
})

export default {
  name: 'ProfileForm',
  components: { RegionSelect },
  props: {
    initialValues: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      validators: { notEmpty, notEmptyIf, isUrl },
      langOptions: [{ label: 'Português', value: 'pt-BR' }, { label: 'English', value: 'en-US' }],
      socialNetworkList: ['Google', 'Facebook', 'Github', 'Gitlab', 'Behance', 'Twitter', 'Dribble', 'Instagram', 'LinkedIn', 'Flickr', 'Dev.to', 'Medium', 'YouTube', 'Tumblr', 'Telegram', 'Skype', 'Snapchat', 'Pinterest', 'Reddit', 'Site Pessoal', 'Outros'],
      addTag: '',
      prefix: 'http://',
      showOverlay: false,
      newNetwork: {
        name: '',
        link: ''
      },
      form: {
        name: '',
        lastName: '',
        socialNetworks: [],
        picture: '',
        language: '',
        tags: new Set(),
        location: {}
      }
    }
  },
  computed: {
    pictureURL () {
      return this.form.picture || 'https://dummyimage.com/800x800/18104a/fff.jpg'
    }
  },
  methods: {
    emitClick () {
      this.$emit('submit', {
        ...this.form,
        location: {
          country: this.form.location.country.name,
          state: this.form.location.state.name,
          city: this.form.location.city.name
        },
        socialNetworks: this.form.socialNetworks.map(socialNetwork => ({
          ...socialNetwork,
          link: `${this.prefix}${socialNetwork.link}`
        })),
        picture: this.form.picture ? this.form.picture.split(',')[1] : '',
        tags: Array.from(this.form.tags)
      })
    },
    addChip () {
      this.form.tags.add(this.addTag)
      this.addTag = ''
    },
    removeTag (tag) {
      this.form.tags.delete(tag)
      this.$forceUpdate()
    },
    addSocial () {
      if (!this.newNetwork.name || !this.newNetwork.link) return
      this.form.socialNetworks.push({
        name: this.newNetwork.name,
        link: this.newNetwork.link
      })
      this.newNetwork = {
        name: '',
        link: ''
      }
    },
    removeSocial (index) {
      this.form.socialNetworks.splice(index, 1)
    },
    openFilePicker () {
      this.$refs.pictureUpload.click()
    },
    async setNewPicture ({ target: { files: [file] } }) {
      const fileDataURL = await readFileAsDataURL(file)
      this.form.picture = fileDataURL
    }
  },
  watch: {
    initialValues () {
      this.form = this.initialValues
      this.form.location = {
        country: { name: this.initialValues.location.country },
        state: { name: this.initialValues.location.state },
        city: { name: this.initialValues.location.city }
      }
      this.form.tags = new Set(this.form.tags)
    }
  }
}
</script>

<style lang="scss">
.profile-form-sm-input {
  width: 300px;
  @media all and (max-width: 500px) {
    width: 100%;
  }
}
.social-link {
  min-width: 70%;
  max-width: 70%;
}

.social-name {
  min-width: 20%;
  max-width: 20%;
}

.pointer-cursor {
  cursor: pointer;
}

.avatar-overlay {
  .q-icon {
    font-size: 0.5em;
    text-shadow: 1px 1px 15px rgba(255, 255, 255, 0.5);
  }
  text-align: center;
  color: white;
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
