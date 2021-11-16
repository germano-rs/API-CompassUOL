const mysql = require("../mysql");

const ClientsDB = {
  getClients: async (name = "") =>
    await mysql.execute(
      `SELECT 
       clients.id,
       clients.name, 
       clients.genre,
       clients.birth_date,
       cities.city_name
       FROM clients
       JOIN cities ON clients.city_id = cities.id
       WHERE clients.name LIKE '%${name}%'`
    ),

  postNewClient: async (client) =>
    await mysql.execute("INSERT INTO clients SET ? ", client),

  getClientById: async (clientId) => {
    return await mysql.execute(
      `SELECT 
           clients.id,
           clients.name, 
           clients.genre,
           clients.birth_date,
           cities.city_name
           FROM clients
           JOIN cities ON clients.city_id = cities.id
           WHERE clients.id =?`,
      clientId
    );
  },

  updateClientByName: async (clientName, clientId) =>
    await mysql.execute("UPDATE clients SET ? WHERE id = ?", [
      { name: clientName },
      clientId,
    ]),
    
  deleteClientId: async (clientId) =>
    await mysql.execute(
      "DELETE FROM clients WHERE id = ?",
      clientId
    ),
    deleteClients: async () =>
    await mysql.execute(
      "DELETE FROM clients"
    )
};
module.exports = ClientsDB;
