const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.UrlMap = require("./url.model.js");
module.exports = db;