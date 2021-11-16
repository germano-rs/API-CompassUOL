const express = require("express");
const app = express();
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

const clientsRoute = require("./routes/clients");
const citiesRoute = require("./routes/cities");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/clients", clientsRoute);
app.use("/cities", citiesRoute);

module.exports = app;
