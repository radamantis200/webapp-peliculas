var express = require("express");
var router = express.Router();
var passport = require("passport");
var Usuario = require("../model/usuario");

router.get("/", function (req, res) {
    res.render("inicio");
});

router.get("/registro", function (req, res) {
    res.render("registro");
});

router.post("/registro", function (req, res) {
    var usuarioNuevo = new Usuario({ username: req.body.username });
    Usuario.register(usuarioNuevo, req.body.password, function (err, usuario) {
        if (err) {
            console.log(err);
            return res.render("registro");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/peliculas");
        });
    });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/peliculas",
    failureRedirect: "/login"
}), function (req, res) {
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/peliculas");
});



module.exports = router;