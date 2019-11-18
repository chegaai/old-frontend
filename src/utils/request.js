import axios from 'axios';

export const internalHttpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://api-gateway.127.0.0.1.nip.io/',
});

export const ibgeHttpClient = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
});
