const DefaultLayout = () => import('../../layouts/Default.vue');

const GroupListPage = () => import('../../pages/Group/List.vue');
const GroupCreatePage = () => import('../../pages/Group/Create.vue');
const GroupDetailPage = () => import('../../pages/Group/Detail.vue');

export default {
  path: '/groups',
  component: DefaultLayout,
  children: [
    { path: 'list', name: 'GroupList', component: GroupListPage },
    { path: 'create', name: 'GroupCreate', component: GroupCreatePage },
    { path: 'detail/:id', name: 'GroupDetail', component: GroupDetailPage },
  ],
};
