const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./src/database");

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use('/api', require("./src/api"));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});