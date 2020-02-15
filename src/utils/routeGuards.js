import { getStorage } from './localStorage'

export function checkAuthentication (to, from, next) { // eslint-disable-line no-unused-vars
  const token = getStorage('token')
  if (!token) {
    next({ replace: true, name: 'Login' })
  }

  return next()
}
