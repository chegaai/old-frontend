export default httpClient => ({
  get: () => httpClient.get('/events'),
  findById: (id) => httpClient.get(`/events/${id}`),
  addRSVP: ({
    inquiries,
    eventId,
    name,
    email,
    document,
    rsvp
  }) => {
    return httpClient.patch(`/events/${eventId}/rsvps`, {
      inquiryResponses: inquiries,
      name,
      email,
      document,
      rsvp
    })
  }
})
