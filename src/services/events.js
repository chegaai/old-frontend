export default httpClient => ({
  get: () => httpClient.get('/events'),
  findById: (id) => httpClient.get(`/events/${id}`),
  addRSVP: ({
    inquiryResponses,
    eventId,
    name,
    email,
    document,
    rsvp
  }) => {
    return httpClient.patch(`/events/${eventId}/rsvps`, {
      inquiryResponses,
      name,
      email,
      document,
      rsvp
    })
  },
  removeRSVP: ({ eventId, email }) => {
    return httpClient.post(`/events/${eventId}/rsvps/request-decline`, { email })
  }
})
