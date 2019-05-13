var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
var Pelicula = require("./model/peliculas");
var Comentario = require("./model/comentario");
var poblarDB = require("./semillas");

poblarDB();
mongoose.connect("mongodb://localhost/peliculas");



// Pelicula.create({ 
//   nombre: "X-Men: Apocalypse", 
//   imagen: "https://upload.wikimedia.org/wikipedia/en/0/04/X-Men_-_Apocalypse.jpg" ,
//   descripcion: "X-Men: Apocalipsis es una película de acción, aventuras y superhéroes de 2016 perteneciente a la saga fílmica de X-Men"}, 
//   function (err, pelicula) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Nueva película agregada: ");
//       console.log(pelicula);
//     }
// });

app.use(bodyParse.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("inicio");
});



app.post("/peliculas", function (req, res) {
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

app.get("/peliculas/nueva", function (req, res) {
  res.render("películas/nueva");
});

app.get("/peliculas", function (req, res) {
  //Obtener todas las peliculas de la base de datos
  Pelicula.find({}, function (err, todasPeliculas) {
    if (err) {
      console.log(err);
    } else {
      res.render("películas/index", { peliculas: todasPeliculas });
    }
  });
});

app.get("/peliculas/:id", function (req, res) {
  //Encontrar la película con el id suministrado 
  Pelicula.findById(req.params.id).populate("comentario").exec(function(err, peliculaEncontrada){
    if (err) {
      console.log(err);
    } else {
      console.log(peliculaEncontrada);
      res.render("películas/mostrar",{peliculas:peliculaEncontrada});
    }
  });

  

});


app.get("/peliculas/:id/comentarios/nuevo",function(req,res){
  Pelicula.findById(req.params.id, function(err,pelicula){
    if (err) {
      console.log(err);
    } else {
      res.render("comentarios/nuevo",{pelicula: pelicula});
    }
  });
});

app.post("/peliculas/:id/comentarios", function(req,res){
  Pelicula.findById(req.params.id, function(err,pelicula){
    if (err) {
      console.log(err);
      res.redirect("/peliculas");
    } else {
      Comentario.create(req.body.comentario, function(err,comentario){
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

app.listen(3000, function () {
  console.log("Servidor de peliculas iniciado!!");
});