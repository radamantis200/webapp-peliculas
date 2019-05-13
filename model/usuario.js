var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UsuarioSchema = new mongoose.Schema({
    username:  String,
    passport: String
});
UsuarioSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Usuario",UsuarioSchema);