import { withErrorHandling } from '../utils/error';

export default httpClient => ({
  create: withErrorHandling((payload) => {
    const {
      name,
      founder,
      location,
      tags,
    } = payload;
    return httpClient.post('/groups', {
      name,
      founder,
      location,
      tags,
    });
  }),
});
