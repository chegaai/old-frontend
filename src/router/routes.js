const DefaultLayout = () => import('../layouts/Default.vue');

const EventListPage = () => import('../pages/Event/List.vue');
const EventDetailPage = () => import('../pages/Event/Detail.vue');
const GroupListPage = () => import('../pages/Group/List.vue');
const GroupDetailPage = () => import('../pages/Group/Detail.vue');

const routes = [
  {
    path: '/events',
    component: DefaultLayout,
    children: [
      { path: 'list', name: 'EventList', component: EventListPage },
      { path: 'detail/:id', name: 'EventDetail', component: EventDetailPage },
    ],
  },
  {
    path: '/groups',
    component: DefaultLayout,
    children: [
      { path: 'list', name: 'GroupList', component: GroupListPage },
      { path: 'detail/:id', name: 'GroupDetail', component: GroupDetailPage },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
