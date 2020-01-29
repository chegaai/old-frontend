import authRoutes from './auth'
import dashboardRoutes from './dashboard'
import eventRoutes from './events'
import groupRoutes from './groups'
import userRoutes from './users'

const Error404Page = () => import('../pages/Auth/Login.vue')

const routes = [
  { path: '/', redirect: { name: 'Login' } },
  authRoutes,
  dashboardRoutes,
  eventRoutes,
  groupRoutes,
  userRoutes
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  const defaultRoute = {
    path: '*',
    component: Error404Page
  }

  routes.push(defaultRoute)
}

export default routes
