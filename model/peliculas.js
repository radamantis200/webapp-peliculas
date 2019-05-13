var mongoose = require("mongoose");

// Configuracion del Schema
var peliculaSchema = new mongoose.Schema({
    nombre: String,
    imagen: String,
    descripcion: {
        type: String,
        default: "Es una buena pelicula",
        required: [true, 'La descripcion es obligatoria!'],
    },
    autor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        username: String
    },
    comentario: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario"
    }]

});

module.exports = mongoose.model("Pelicula", peliculaSchema);

