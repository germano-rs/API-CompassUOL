const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clients_controller");


router.get("/", clientsController.getClients);
router.post("/", clientsController.postNewClient);
router.get("/:id", clientsController.getClientById);
router.patch("/:id", clientsController.updateClientByName);
router.delete("/:id", clientsController.deleteClientId);


module.exports = router;