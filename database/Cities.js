const mysql = require("../mysql");

const CitiesDB = {
  cityVerify: async (cityId) => {
    return await mysql.execute("SELECT id FROM cities WHERE id = ? ", cityId);
  },

  getCities: async (cityName, cityState) =>
    await mysql.execute(
      `SELECT 
       cities.id,
       cities.city_name,
       cities.state
       FROM cities
       WHERE cities.city_name LIKE '%${cityName}%' AND cities.state LIKE '%${cityState}%'`
    ),
  postNewCity: async (city) =>
    await mysql.execute("INSERT INTO cities SET ? ", city),

  deleteCities: async () => {
    return await mysql.execute("DELETE FROM cities");
  },
};

module.exports = CitiesDB;
