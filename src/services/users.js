export default httpClient => ({
  create: ({
    email, password, username, document, location, name, lastName, language,
  }) => httpClient.post('/users', {
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
  }),
});
