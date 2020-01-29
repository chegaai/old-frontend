import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

export default ({ ssrContext }) => {
  if (ssrContext) return

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAjgsO8kOTodxtGn9OyUgPtUVCp0AGcCCQ',
      libraries: 'places'
    },
    installComponents: true
  })
}
