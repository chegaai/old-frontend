export default httpClient => ({
  get: () => httpClient.get('/events')
})
