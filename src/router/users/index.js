const DefaultLayout = () => import('../../layouts/Default.vue');

const UserGroupListPage = () => import('../../pages/User/Groups.vue');

export default {
  path: '/user',
  component: DefaultLayout,
  children: [
    { path: 'groups', name: 'UserGroupList', component: UserGroupListPage },
  ],
};
