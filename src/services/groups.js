import { withErrorHandling } from '../utils/error';

export default httpClient => ({
  get: withErrorHandling((payload) => {
    const { groupId } = payload;
    return httpClient.get(`/groups/${groupId}`);
  }),
  create: withErrorHandling((payload) => {
    const {
      name,
      description,
      location: { country = 'Brazil', state = 'SP', city = 'São paulo' },
      tags,
    } = payload;
    return httpClient.post('/groups', {
      name,
      description,
      location: { country, state, city },
      tags,
    });
  }),
});
