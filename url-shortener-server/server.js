require('dotenv').config();
const express = require("express");
const db = require("./app/models");
const cors = require("cors");
const ENV = process.env;
const ServerApiVersion = require('mongodb');

var corsOptions = {
  origin: ENV.CLIENT_URL || "http://localhost:4200"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/urlShortener.routes")(app);

db.mongoose
  .connect(ENV.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslKey: ENV.SSL_CERT,
    sslCert: ENV.SSL_CERT,
    serverApi: ServerApiVersion.v1
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = ENV.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



