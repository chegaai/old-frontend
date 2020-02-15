import axios from 'axios'
import { getStorage } from './localStorage'

const internalHttpClient = axios.create({
  baseURL: process.env.API_URL || 'http://api-gateway.lvh.me/'
})

internalHttpClient.interceptors.request.use((config) => { // eslint-disable-line
  const token = getStorage('token')
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
}, response => Promise.reject(response))

internalHttpClient.interceptors.response.use(
  response => response, error => Promise.reject(error)
)

const ibgeHttpClient = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
})

export { internalHttpClient, ibgeHttpClient }
