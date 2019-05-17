var express = require("express");
var router = express.Router();
var Pelicula = require("../model/peliculas");
var Comentario = require("../model/comentario");
var middleware = require("../middleware");


router.get("/peliculas/:id/comentarios/nuevo", middleware.estaLoggeado, function (req, res) {
    Pelicula.findById(req.params.id, function (err, pelicula) {
        if (err) {
            console.log(err);
        } else {
            res.render("comentarios/nuevo", { pelicula: pelicula });
        }
    });
});

router.post("/peliculas/:id/comentarios", middleware.estaLoggeado, function (req, res) {
    Pelicula.findById(req.params.id, function (err, pelicula) {
        if (err) {
            console.log(err);
            res.redirect("/peliculas");
        } else {
            Comentario.create(req.body.comentario, function (err, comentario) {
                if (err) {
                    console.log(err);
                } else {
                    //Agregamos el username y el id al comentario
                    comentario.autor.id = req.user._id;
                    comentario.autor.username = req.user.username;
                    //Guardar Comentario
                    comentario.save();
                    //Asociar el comentario nuevo a una pelicula
                    pelicula.comentario.push(comentario);
                    pelicula.save();
                    res.redirect("/peliculas/" + pelicula._id);
                }
            });
        }
    });
});

router.get("/peliculas/:id/comentarios/:comentario_id/editar",middleware.verificarDuenoComentario, function (req, res) {
    Comentario.findById(req.params.comentario_id, function (err, comentarioEncontrado) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comentarios/editar", { pelicula_id: req.params.id, comentario: comentarioEncontrado })
        }
    });
});

router.put("/peliculas/:id/comentarios/:comentario_id",middleware.verificarDuenoComentario, function (req, res) {
    Comentario.findByIdAndUpdate(req.params.comentario_id, req.body.comentario, function(err,comentarioActualizado){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/peliculas/"+req.params.id);
        }
    });
});

router.delete("/peliculas/:id/comentarios/:comentario_id",middleware.verificarDuenoComentario, function (req,res){
    Comentario.findByIdAndRemove(req.params.comentario_id, function (err){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/peliculas/" + req.params.id);
        }
    })
});






module.exports = router;