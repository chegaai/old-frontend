const parserStateModel = (states) => {
  const buildStateModel = state => ({
    name: state.nome,
    id: state.id,
    initials: state.sigla
  })
  return states.map(buildStateModel)
}

const parserCityModel = (cities) => {
  const buildCityModel = city => ({
    name: city.nome,
    id: city.id
  })
  return cities.map(buildCityModel)
}

export default httpClient => ({
  async getStates () {
    const response = await httpClient.get('estados')
    return { data: parserStateModel(response.data) }
  },
  async getCities ({ ufId }) {
    const response = await httpClient.get(`estados/${ufId}/municipios`)
    return { data: parserCityModel(response.data) }
  }
})
