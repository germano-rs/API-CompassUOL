const moment = require("moment");

const Helpers = {
  calculateAge: (birthdayDateString) => {
    var dateOfBithday = new Date(birthdayDateString);
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var birthdayThisYear = new Date(
      currentYear,
      dateOfBithday.getMonth(),
      dateOfBithday.getDate()
    );
    var age = currentYear - dateOfBithday.getFullYear();
    if (birthdayThisYear > currentDate) {
      age--;
    }
    return age;
  },

  convertDateEUAtoBRA: (dt) => {
    return moment(dt, "YYYY-MM-DD").format("DD/MM/YYYY");
  },

  convertDateBRAtoEUA: (dt) => {
    return moment(dt, "DD/MM/YYYY").format("YYYY-MM-DD");
  },

  factoryResponseClients: (listOfClients) => {
    const clients = listOfClients.map(
      ({ id, name, genre, birth_date, city_name, state_name }) => {
        return {
          id: id,
          name: name,
          genre: genre,
          birth_date: Helpers.convertDateEUAtoBRA(birth_date),
          age: Helpers.calculateAge(birth_date),
          city_name: city_name,
          state_name: state_name,
        };
      }
    );
    return clients;
  },

  factoryInsertClient: ({ name, genre, birth_date, city_id }) => {
    return {
      name,
      genre,
      birth_date: Helpers.convertDateBRAtoEUA(birth_date),
      city_id,
    };
  },
};
module.exports = Helpers;
