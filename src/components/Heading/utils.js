import { clearStorage } from '../../utils/localStorage'

export const buildMenuItems = context => ([
  { label: 'Meus grupos', route: 'UserGroupList', icon: 'supervisor_account' },
  { label: 'Criar um grupo', route: 'GroupCreate', icon: 'group_add' },
  { separator: true },
  { label: 'Conta', route: 'UserAccount', icon: 'settings_applications' },
  { label: 'Perfil', route: 'UserProfile', icon: 'perm_identity' },
  { separator: true },
  {
    label: 'Sair',
    icon: 'exit_to_app',
    click () {
      clearStorage()
      context.$router.push({ name: 'Login' })
    }
  }
  // { label: 'Configurações', route: 'UserSettings', icon: 'settings_applications' },
])
