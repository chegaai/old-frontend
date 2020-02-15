import { clearStorage, setStorage } from '../../utils/localStorage'

export const buildMenuItems = context => ([
  { label: 'Meus grupos', route: 'UserGroupList', icon: 'supervisor_account' },
  { label: 'Criar um grupo', route: 'GroupCreate', icon: 'group_add' },
  { separator: true },
  { label: 'Conta', route: 'UserAccount', icon: 'settings_applications' },
  { label: 'Perfil', route: 'UserProfile', icon: 'perm_identity' },
  { separator: true },
  {
    label: 'Modo Escuro',
    icon: () => context.$q.dark.isActive ? 'flash_off' : 'flash_on',
    click () {
      context.$q.dark.set(!context.$q.dark.isActive)
      setStorage('dark', context.$q.dark.isActive)
    }
  },
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
