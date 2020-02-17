const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    name: String,
    url: String
});
var Link = mongoose.model('links', linkSchema);
module.exports = Link;