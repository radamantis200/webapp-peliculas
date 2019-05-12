var mongoose = require("mongoose");

var comentarioSchema = mongoose.Schema({
    texto: String,
    autor: String
});

module.exports = mongoose.model("Comentario", comentarioSchema);