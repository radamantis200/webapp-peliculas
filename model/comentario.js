var mongoose = require("mongoose");

var comentarioSchema = mongoose.Schema({
    texto: String,
    autor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        username: String
    }
});

module.exports = mongoose.model("Comentario", comentarioSchema);