const express = require("express");
const mongoose = require("mongoose");

const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");

const app = express();

app.use(express.json());

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log(`Error while connecting to DB`);
});

db.once("open", () => {
  console.log("Connected to DB");
});

require("./routes/restaurant.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is connected on Port ${serverConfig.PORT}`);
});
