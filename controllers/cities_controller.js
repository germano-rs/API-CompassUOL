const { getCities, postNewCity } = require("../models/Cities");

const Cities = {
  getCities: async (req, res, next) => {
    try {
      let cityName = "";
      let cityState = "";
      
      if (req.query.city_name) {
        cityName = req.query.city_name;
      }
      if (req.query.state) {
        cityState = req.query.state;
      }
      const result = await getCities(cityName, cityState);
      return res
        .status(200)
        .send({ result, message: "Successful get cities." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
  postNewCity: async (req, res, next) => {
    try {
      const result = await postNewCity(req.body);
      return res.status(201).send({
        result,
        message: `Successful post city Id ${result.insertId}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
  
};
module.exports = Cities;
