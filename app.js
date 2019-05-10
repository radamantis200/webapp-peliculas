var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/peliculas");

// Configuracion del Schema
var peliculaSchema = new mongoose.Schema({
  nombre: String,
  imagen: String,
  descripcion:{
    type: String,
    required: [true,'La descripcion es obligatoria!']
  }
 
});

var Pelicula = mongoose.model("Pelicula", peliculaSchema);

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
  Pelicula.create(NuevaPelicula, function(err, recienCreada){
    if (err) {
      console.log(err);
    } else {
      //Redirreccionar de nuevo a la pagina /peliculas
      res.redirect("/peliculas");
    }
  })
});

app.get("/peliculas/nueva", function (req, res) {
  res.render("nueva");
});

app.get("/peliculas", function (req, res) {
  //Obtener todas las peliculas de la base de datos
  Pelicula.find({}, function(err, todasPeliculas){
    if (err) {
      console.log(err);
    } else {
      res.render("index",{peliculas: todasPeliculas});
    }
  });
});

app.get("/peliculas/:id", function(req,res){
  //Encontrar la película con el id suministrado 
  Pelicula.findById(req.params.id, function(err, peliculaEncontrada){
    if (err) {
      console.log(err);
    } else {
      res.render("mostrar", {peliculas:peliculaEncontrada});
    }
  })
  
});


app.listen(3000, function () {
  console.log("Servidor de peliculas iniciado!!");
});