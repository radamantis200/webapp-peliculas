var Pelicula = require("../model/peliculas");
var Comentario = require("../model/comentario.js");
var objetoMiddleware = {

};

objetoMiddleware.verificarDuenoPelicula = function (req, res, next) {
    // Verificar si hay alguien con sesion abierta
    if (req.isAuthenticated()) {
        Pelicula.findById(req.params.id, function (err, peliculaEncontrada) {
            if (err) {
                res.redirect("back");
            } else {
                //Si hay sesion abierta, se verifica si ese usuario es el dueño de la pelicula 
                if (peliculaEncontrada.autor.id.equals(req.user._id)) {
                    next();

                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }

};

objetoMiddleware.verificarDuenoComentario = function (req, res, next) {
    // Verificar si hay alguien con sesion abierta
    if (req.isAuthenticated()) {
        Comentario.findById(req.params.comentario_id, function (err, comentarioEncontrado) {
            if (err) {
                res.redirect("back");
            } else {
                //Si hay sesion abierta, se verifica si ese usuario es el dueño de la Comentario 
                if (comentarioEncontrado.autor.id.equals(req.user._id)) {
                    next();

                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }

};

objetoMiddleware.estaLoggeado = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = objetoMiddleware;