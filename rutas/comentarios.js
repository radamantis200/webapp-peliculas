var express = require("express");
var router = express.Router();
var Pelicula = require("../model/peliculas");
var Comentario = require("../model/comentario");


router.get("/peliculas/:id/comentarios/nuevo", estaLoggeado, function (req, res) {
    Pelicula.findById(req.params.id, function (err, pelicula) {
        if (err) {
            console.log(err);
        } else {
            res.render("comentarios/nuevo", { pelicula: pelicula });
        }
    });
});

router.post("/peliculas/:id/comentarios", estaLoggeado, function (req, res) {
    Pelicula.findById(req.params.id, function (err, pelicula) {
        if (err) {
            console.log(err);
            res.redirect("/peliculas");
        } else {
            Comentario.create(req.body.comentario, function (err, comentario) {
                if (err) {
                    console.log(err);
                } else {
                    pelicula.comentario.push(comentario);
                    pelicula.save();
                    res.redirect("/peliculas/" + pelicula._id);
                }
            });
        }
    });
});

//Middleware
function estaLoggeado(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;