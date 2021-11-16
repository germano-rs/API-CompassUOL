require('dotenv').config()

const port = process.env.SERVER_PORT;
const app = require("./app");

app.listen(port)
