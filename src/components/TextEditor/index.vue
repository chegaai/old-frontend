<template>
  <div class="full-width rounded-borders">
    <textarea ref="editor" />
  </div>
</template>

<script>
import 'simplemde/dist/simplemde.min.css'

// this is necessary to works with ssr
const getSimpleMDE = () => import('simplemde')

export default {
  name: 'TextEditor',
  async mounted () {
    const SimpleMDE = await getSimpleMDE()

    const registerEditor = () => {
      const simplemde = new SimpleMDE.default({ // eslint-disable-line
        element: this.$refs.editor
      })
    }

    this.$nextTick(registerEditor)
  }
}
</script>
