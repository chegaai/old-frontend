const DefaultLayout = () => import('../../layouts/Default.vue')

const GeneralPage = () => import('../../pages/Dashboard/General.vue')

export default {
  path: '/app',
  component: DefaultLayout,
  children: [
    { path: 'general', name: 'General', component: GeneralPage }
  ]
}
