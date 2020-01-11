const DefaultLayout = () => import('../../layouts/Default.vue');

const UserGroupListPage = () => import('../../pages/User/Groups.vue');
const UserProfilePage = () => import('../../pages/User/Profile.vue');
const UserAccountPage = () => import('../../pages/User/Account.vue');
const UserSettingsPage = () => import('../../pages/User/Settings.vue');

export default {
  path: '/user',
  component: DefaultLayout,
  children: [
    { path: 'groups', name: 'UserGroupList', component: UserGroupListPage },
    { path: 'profile', name: 'UserProfile', component: UserProfilePage },
    { path: 'account', name: 'UserAccount', component: UserAccountPage },
    { path: 'settings', name: 'UserSettings', component: UserSettingsPage },
  ],
};
