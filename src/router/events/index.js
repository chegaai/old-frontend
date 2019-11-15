const DefaultLayout = () => import('../../layouts/Default.vue');

const EventListPage = () => import('../../pages/Event/List.vue');
const EventDetailPage = () => import('../../pages/Event/Detail.vue');

export default {
  path: '/events',
  component: DefaultLayout,
  children: [
    { path: 'list', name: 'EventList', component: EventListPage },
    { path: 'detail/:id', name: 'EventDetail', component: EventDetailPage },
  ],
};
