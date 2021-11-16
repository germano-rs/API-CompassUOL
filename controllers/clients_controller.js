const {
  getClients,
  postNewClient,
  getClientById,
  updateClientByName,
  deleteClientId,
} = require("../models/Clients");
const { cityVerify } = require("../database/Cities");

const Clients = {
  getClients: async (req, res, next) => {
    try {
      let clientName = "";
      if (req.query.name) {
        clientName = req.query.name;
      }
      const result = await getClients(clientName);
      return res
        .status(200)
        .send({ result, message: "Successful get clients." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  postNewClient: async (req, res, next) => {
    try {
      const cityExist = await cityVerify(req.body.city_id);
      if (cityExist.length === 0) {
        return res
          .status(404)
          .send({ message: `This city is not registered.` });
      }
      const result = await postNewClient(req.body);
      return res.status(201).send({
        result,
        message: `Successful post client Id ${result.insertId}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  getClientById: async (req, res, next) => {
    try {
      const clientId = req.params.id;
      const result = await getClientById(clientId);
      if (result == "") {
        return res
          .status(404)
          .send({ result, message: `Client Id ${clientId} not found.` });
      }
      return res
        .status(200)
        .send({ result, message: `Successful get client with Id ${clientId}` });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  updateClientByName: async (req, res, next) => {
    try {
      const clientId = req.params.id;
      const clientName = req.body.name;
      var result = await getClientById(clientId);
      if (result == "") {
        return res
          .status(404)
          .send({ result, message: `Client Id ${clientId} not found.` });
      }
      var result = await updateClientByName(clientName, clientId);
      return res
        .status(200)
        .send({ result, message: "Client updated successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
  deleteClientId: async (req, res, next) => {
    try {
      const clientId = req.params.id;
      var result = await getClientById(clientId);
      if (result == "") {
        return res
          .status(404)
          .send({ result, message: `Client Id ${clientId} not found.` });
      }
      var result = await deleteClientId(clientId);
      return res
        .status(200)
        .send({ result, message: `Client ${clientId} deleted.` });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
};
module.exports = Clients;
