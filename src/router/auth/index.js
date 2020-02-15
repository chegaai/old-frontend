const AuthLayout = () => import('../../layouts/Auth.vue')

const LoginPage = () => import('../../pages/Auth/Login.vue')
const ForgotPasswordPage = () => import('../../pages/Auth/ForgotPassword.vue')
const RegisterPage = () => import('../../pages/Auth/Register.vue')
const PassowordRecoveryPage = () => import('../../pages/Auth/PasswordRecovery')

export default {
  path: '/auth',
  component: AuthLayout,
  children: [
    { path: 'login', name: 'Login', component: LoginPage },
    { path: 'register', name: 'Register', component: RegisterPage },
    { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPasswordPage },
    { path: 'password-reset', name: 'PassowordRecovery', component: PassowordRecoveryPage }
  ]
}
