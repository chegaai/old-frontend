import { withErrorHandling } from '../utils/error';

export default httpClient => ({
  create: withErrorHandling((payload) => {
    const {
      name,
      founder = '5dd62fb7ddcc3a0010413743',
      location: { country = 'Brazil', state = 'SP', city = 'São paulo' },
      tags,
    } = payload;
    return httpClient.post('/groups/groups', {
      name,
      founder,
      location: { country, state, city },
      tags,
    });
  }),
});
