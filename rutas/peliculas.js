var express = require("express");
var router = express.Router();
var Pelicula = require("../model/peliculas");
var middleware = require("../middleware");


router.get("/peliculas", function (req, res) {
    //Obtener todas las peliculas de la base de datos
    Pelicula.find({}, function (err, todasPeliculas) {
        if (err) {
            console.log(err);
        } else {
            res.render("películas/index", { peliculas: todasPeliculas, usuarioActual: req.user });
        }
    });
});

router.post("/peliculas",middleware.estaLoggeado, function (req, res) {
    //Obtener los datos del formulario y agregar películas
    var nombre = req.body.nombre;
    var imagen = req.body.imagen;
    var descripcion = req.body.descripcion;
    var autor = {
        id: req.user._id,
        username: req.user.username
    };
    var NuevaPelicula = { nombre: nombre, imagen: imagen, descripcion: descripcion, autor: autor };
    // Crear un nuevo registro de película y guardarlo en la base de datos
    Pelicula.create(NuevaPelicula, function (err, recienCreada) {
        if (err) {
            console.log(err);
        } else {
            //Redirreccionar de nuevo a la pagina /peliculas
            res.redirect("/peliculas");
        }
    })
});

router.get("/peliculas/nueva", middleware.estaLoggeado, function (req, res) {
    res.render("películas/nueva");
});

router.get("/peliculas/:id", function (req, res) {
    //Encontrar la película con el id suministrado 
    Pelicula.findById(req.params.id).populate("comentario").exec(function (err, peliculaEncontrada) {
        if (err) {
            console.log(err);
        } else {
            console.log(peliculaEncontrada);
            res.render("películas/mostrar", { peliculas: peliculaEncontrada });
        }
    });
});

router.get("/peliculas/:id/editar",middleware.verificarDuenoPelicula, function (req, res) {
    // Verificar si hay alguien con sesion abierta
    Pelicula.findById(req.params.id, function (err, peliculaEncontrada) {
        res.render("películas/editar", { pelicula: peliculaEncontrada })
    });
});

router.put("/peliculas/:id",middleware.verificarDuenoPelicula, function (req, res) {
    Pelicula.findByIdAndUpdate(req.params.id, req.body.pelicula, function (err, peliculaActualizada) {
        if (err) {
            res.render("/peliculas");
        } else {
            res.redirect("/peliculas/" + req.params.id);
        }
    });
});

router.delete("/peliculas/:id",middleware.verificarDuenoPelicula, function (req, res) {
    Pelicula.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/peliculas");
        } else {
            res.redirect("/peliculas");
        }
    });
});




module.exports = router;