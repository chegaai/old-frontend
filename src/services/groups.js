export default httpClient => ({
  get: (payload) => {
    const { groupId } = payload
    return httpClient.get(`/groups/${groupId}`)
  },
  create: (payload) => {
    const {
      name,
      description,
      location: { country = 'Brazil', state = 'SP', city = 'São paulo' },
      tags
    } = payload
    return httpClient.post('/groups', {
      name,
      description,
      location: { country, state, city },
      tags
    })
  },
  getEvents: (payload) => {
    const { groupId } = payload
    return httpClient.get(`/groups/${groupId}/events`)
  },
  getFollowers: (payload) => {
    const { groupId } = payload
    return httpClient.get(`/groups/${groupId}/followers`)
  },
  getFollowersCount: (payload) => {
    const { groupId } = payload
    return httpClient.get(`/groups/${groupId}/followers`, { params: { count: true } })
  }
})
