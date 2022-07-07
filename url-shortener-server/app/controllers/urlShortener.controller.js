require('url');
const nanoid = require('nanoid-esm');
const db = require("../models");

const UrlModel = db.UrlMap;

exports.create = async (req, res) => {
  const reqURL = req.body ? req.body.longURL : "";
  if (!reqURL) {
    res.status(400).send({ message: "Long URL is empty" });
    return;
  }
  else if (!isValidUrl(reqURL)) {
    res.status(400).send({ message: "Invalid URL" });
    return;
  }

  try {
    let shortUrlData = await UrlModel.findOne({ longUrl: reqURL });
    // Insert if no existing record
    if (!shortUrlData) {
      shortUrlData = await createAndInsertDB(reqURL);
    }
    res.send({ shortURL: shortUrlData._id });

  } catch (err) {
    res.status(500)
      .send({ message: "Error Creating Short URL: " + reqURL });
  }

};

exports.retrieveAll = async (req, res) => {
  try {
    const data = await UrlModel.find();
    if (!data || data.length==0) {
      res.status(404).send({ message: "No data found." });
    }
    else {
      res.send(data);
    }
  } catch (err) {
    res.status(500)
      .send({ message: "Error retrieving URL: " });
  };
}

exports.searchByShortURL = async (req, res) => {
  const shortURL = req.query.shortURL;
  try {
    const data = await UrlModel.findById(shortURL);
    if (!data || data.length==0) {
      res.status(404).send({ message: "Short URL not found: " + shortURL });
    }
    else {
      res.send(data);
    }
  } catch (err) {
    res.status(500)
      .send({ message: "Error retrieving URL: " + shortURL });
  };
};

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function createAndInsertDB(reqURL) {

  const url = new UrlModel({
    longUrl: reqURL,
    _id: nanoid(5)
  });

  // Insert in the database
  return url.save(url);
}
