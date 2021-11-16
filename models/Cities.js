const { getCities, postNewCity } = require("../database/Cities");

const Cities = {
  getCities: async (cityName, cityState) => {
    const listOfCities = await getCities(cityName, cityState);
    return listOfCities;
  },
  postNewCity: async (city) => {
    return await postNewCity(city);
  },
};
module.exports = Cities;
