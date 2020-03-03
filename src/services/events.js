export default httpClient => ({
  get: () => httpClient.get('/events'),
  findById: (id) => httpClient.get(`/events/${id}`),
  addRSVP: ({
    inquiries,
    eventId,
    name,
    email,
    document
  }) => {
    return httpClient.patch(`/events/${eventId}/rsvps`, {
      inquiries,
      name,
      email,
      document
    })
  }
})
