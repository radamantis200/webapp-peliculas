var datos = [
    { nombre: "Saw", imagen: "http://www.tododvdfull.com/wp-content/uploads/2015/04/SAW0100_zps2a23ee44.jpg" },
    { nombre: "Grave Encounters", imagen: "http://i981.photobucket.com/albums/ae300/mrtorpedin/graveencb.jpg" },
    { nombre: "The Peanuts Movie", imagen: "http://www.tododvdfull.com/wp-content/uploads/2016/03/Peanuts-movie-BD25.jpg" },
    { nombre: "Captain America: Civil War", imagen: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg" }];


var moongose = require("mongoose");
var Pelicula = require("./model/peliculas.js");
var Comentario = require("./model/comentario.js");

function poblarDB() {
    Pelicula.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Películas eliminadas");
            datos.forEach(function (semilla) {
                Pelicula.create(semilla, function (err, datos) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Pelicula agregada!");
                        //Agregar Comentario
                        Comentario.create({
                            texto: "Esta Pelicula esta Genial",
                            autor: "katherine"
                        }, function (err, comentario) {
                            if (err) {
                                console.log(err);
                            } else {
                                
                                datos.comentario.push(comentario);
                                datos.save();
                                console.log("Comentario nuevo agregado!");
                            }
                        });
                    }
                });
            });
        }
    })
}

module.exports = poblarDB;