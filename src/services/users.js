export default httpClient => ({
  login: (payload) => {
    const { handle, password } = payload;
    return httpClient.post('/users/login', { handle, password });
  },
  checkUsername: username => httpClient.get(`/users/${username}/availability`),
  create: (payload) => {
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
  },
  getMe: () => httpClient.get('/users/me'),
  update: payload => httpClient.put('/users/me', payload),
});
