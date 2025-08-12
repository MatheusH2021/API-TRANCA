const express = require('express');
const cors = require('cors');
const clientMQTT = require('../mqtt/client');
const conn = require("../database/database");

const app = express();

app.use(cors());
app.use(express.json());
conn();

const routes = require("../routes/router");
app.use("/api", routes);

app.listen(3000, () => {
    console.log("Api-tranca rodando na porta 3000");
});