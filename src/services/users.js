import { withErrorHandling } from '../utils/error';

export default httpClient => ({
  login: withErrorHandling((payload) => {
    const { handle, password } = payload;
    return httpClient.post('/users/login', { handle, password });
  }),
  create: withErrorHandling((payload) => {
    const {
      name,
      email,
      password,
      username,
      document,
      location,
      lastName,
      language,
    } = payload;
    return httpClient.post('/users', {
      user: {
        document,
        email,
        password,
        username,
      },
      profile: {
        name,
        language,
        lastName,
        location: {
          country: location.country.name,
          state: location.state.name,
          city: location.city.name,
        },
      },
    });
  }),
});
