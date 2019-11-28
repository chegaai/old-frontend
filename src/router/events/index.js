const DefaultLayout = () => import('../../layouts/Default.vue');

const EventListPage = () => import('../../pages/Event/List.vue');
const EventCreatePage = () => import('../../pages/Event/Create.vue');
const EventDetailPage = () => import('../../pages/Event/Detail.vue');

export default {
  path: '/events',
  component: DefaultLayout,
  children: [
    { path: 'list', name: 'EventList', component: EventListPage },
    { path: 'create', name: 'EventCreate', component: EventCreatePage },
    { path: 'detail/:id', name: 'EventDetail', component: EventDetailPage },
  ],
};
