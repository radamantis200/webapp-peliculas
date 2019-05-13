var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var estratLocal = require("passport-local");
var Pelicula = require("./model/peliculas");
var Comentario = require("./model/comentario");
var Usuario = require("./model/usuario");
var poblarDB = require("./semillas");

var rutasComentario = require("./rutas/comentarios");
var rutasPeliculas = require("./rutas/peliculas");
var rutasIndex = require("./rutas/index");

poblarDB();
mongoose.connect("mongodb://localhost/peliculas");

app.use(bodyParse.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
  secret: "Esta linea ya sabemos para que es!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new estratLocal(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());
app.use(function (req, res, next) {
  res.locals.usuarioActual = req.user;
  next();
})

app.use(rutasIndex);
app.use(rutasComentario);
app.use(rutasPeliculas);

app.listen(3000, function () {
  console.log("Servidor de peliculas iniciado!!");
});