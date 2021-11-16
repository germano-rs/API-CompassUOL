const {
  getClients,
  postNewClient,
  getClientById,
  updateClientByName,
  deleteClientId,
  deleteClients,
} = require("../database/Clients");

const {
  factoryInsertClient,
  factoryResponseClients,
} = require("../helpers/index");

const Clients = {
  getClients: async (clientName) => {
    const clients = await getClients(clientName);
    const listOfClients = factoryResponseClients(clients);
    return listOfClients;
  },

  postNewClient: async (clientData) => {
    const clientToInsert = factoryInsertClient(clientData);
    return await postNewClient(clientToInsert);
  },

  getClientById: async (clientId) => {
    const client = await getClientById(clientId);
    const returnClient = factoryResponseClients(client);
    return returnClient;
  },

  updateClientByName: async (clientName, clientId) => {
    await updateClientByName(clientName, clientId);
    const clientById = await getClientById(clientId);
    return factoryResponseClients(clientById);
  },

  deleteClientId: async (clientId) => {
    return await deleteClientId(clientId);
  },

  deleteClients: async () => {
    return await deleteClients();
  },
};
module.exports = Clients;
