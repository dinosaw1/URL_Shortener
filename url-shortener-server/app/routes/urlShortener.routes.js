module.exports = app => {
    const urlShortener = require("../controllers/urlShortener.controller.js");
    var router = require("express").Router();
    router.post("/create", urlShortener.create);
    router.get("/getAll", urlShortener.retrieveAll);
    router.get("/searchByShortURL", urlShortener.searchByShortURL);

    app.use('/api/urlShortener', router);
  };