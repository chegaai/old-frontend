import authRoutes from './auth'
import HomeRoutes from './Home'
import eventRoutes from './events'
import groupRoutes from './groups'
import userRoutes from './users'

const Error404Page = () => import('../pages/Auth/Login.vue')

const routes = [
  { path: '/', redirect: { name: 'Login' } },
  authRoutes,
  HomeRoutes,
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
