const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema(
    {
        longUrl: String,
        _id: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('UrlMap', URLSchema)

