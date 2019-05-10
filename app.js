var express = require("express");
var app = express();
var bodyParse = require("body-parser");
app.use(bodyParse.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("inicio");
});



app.post("/peliculas",function (req,res){
  var nombre = req.body.nombre;
  var imagen = req.body.imagen;
  var NuevaPelicula = {nombre:nombre, imagen:imagen};
  peliculas.push(NuevaPelicula);
  res.redirect("/peliculas");
});

app.get("/peliculas/nueva", function(req,res){
  res.render("nueva");
});

app.get("/peliculas", function (req, res) {
  var peliculas = [{ nombre: "Wrong turn", imagen: "https://4.bp.blogspot.com/--8pEKizKx28/Vu9pYhWk1mI/AAAAAAAASck/agIO1BqdmygxAV_8RsDIWlSrfmEBMmxaw/s400/Km_666_Desv_o_al_infierno-113985199-large.jpg" },
  { nombre: "The Descendant", imagen: "http://pics.filmaffinity.com/the_descent-396561570-large.jpg" },
  { nombre: "Saw", imagen: "http://www.tododvdfull.com/wp-content/uploads/2015/04/SAW0100_zps2a23ee44.jpg" },
  { nombre: "Grave Encounters", imagen: "http://i981.photobucket.com/albums/ae300/mrtorpedin/graveencb.jpg" },
  { nombre: "Zootopia", imagen: "https://2.bp.blogspot.com/-RFEAz_SVv6c/Vz-q5Ju_zgI/AAAAAAAAYwg/Qk3HzDB7AXsrhcuS46dijBdUrl9m63e1QCLcB/s400/Zootr_polis-155827662-large.jpg" },
  { nombre: "The Peanuts Movie", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/03/Peanuts-movie-BD25.jpg" },
  { nombre: "The Good Dinosaur", imagen: "https://1.bp.blogspot.com/-KE-aPMgDjJY/VrY8Gf2QvHI/AAAAAAAAJ0o/aDsSlfOq6CY/s640/CoverDVD.png" },
  { nombre: "Hotel Transylvania", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/01/Hotel_Transilvania-382209595-large.jpg" },
  { nombre: "Ghostbusters", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/10/ghostbusters-bluray-bd25.jpg" },
  { nombre: "Mike and Dave Need Wedding Dates", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/10/mike-and-dave-need-wedding-dates.jpg" },
  { nombre: "Project X", imagen: "http://i1379.photobucket.com/albums/ah136/Luis_Prato/Project%20X/ProjectX1_zpsylxcns3h.jpg" },
  { nombre: "Keanu", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/08/Keanu-BD25.jpg" },
  { nombre: "X-Men: Apocalypse", imagen: "https://upload.wikimedia.org/wikipedia/en/0/04/X-Men_-_Apocalypse.jpg" },
  { nombre: "Warcraft", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/09/Warcraft-BLURAY.jpg" },
  { nombre: "Real Steel", imagen: "http://mankabros.com/blogs/btp/wp-content/uploads/2011/10/real_steel_poster_2.jpg" },
  { nombre: "Captain America: Civil War", imagen: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg" }];
  res.render("peliculas", {peliculas:peliculas});
})


app.listen(3000, function () {
  console.log("Servidor de peliculas iniciado!!");
});