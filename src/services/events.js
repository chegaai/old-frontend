export default httpClient => ({
  get: () => httpClient.get('/events'),
  findById: (id) => httpClient.get(`/events/${id}`)
})
