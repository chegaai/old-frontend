import logoNegativa from './negativa'
import logoPositiva from './positiva'
import reducaoNegativa from './reducao/negativa'
import reducaoPositiva from './reducao/positiva'
import { getStorage, setStorage } from '../../utils/localStorage'

export function getLogo (dark = false, key) {
  const colorVariant = dark ? logoNegativa : logoPositiva
  const variant = key || 'circulo'

  return colorVariant[variant] || colorVariant.circulo
}

export function getReducao (dark = false, key) {
  const colorVariant = dark ? reducaoNegativa : reducaoPositiva
  const variant = key || 'circulo'

  return colorVariant[variant] || colorVariant.circulo
}

export function getRandomLogo (dark) {
  const possibilities = Object.keys(logoNegativa)
  const chosen = possibilities[Math.floor(Math.random() * possibilities.length)]
  if (getStorage('lastRandomLogo') === chosen) return getRandomLogo(dark)

  setStorage('lastRandomLogo', chosen)

  return getLogo(dark, chosen)
}

export function getRandomReducao (dark) {
  const possibilities = Object.keys(reducaoNegativa)
  const chosen = possibilities[Math.floor(Math.random() * possibilities.length)]

  if (getStorage('lastRandomReducao') === chosen) return getRandomReducao(dark)

  setStorage('lastRandomReducao', chosen)

  return getReducao(dark, chosen)
}
