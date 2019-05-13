var express = require("express");
var router = express.Router();
var Pelicula = require("../model/peliculas");


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

router.post("/peliculas", function (req, res) {
    //Obtener los datos del formulario y agregar películas
    var nombre = req.body.nombre;
    var imagen = req.body.imagen;
    var descripcion = req.body.descripcion;
    var NuevaPelicula = { nombre: nombre, imagen: imagen, descripcion: descripcion };
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

router.get("/peliculas/nueva", function (req, res) {
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

module.exports = router;