var mongoose = require('mongoose');

var armaSchema = mongoose.Schema({
    nombre:{type:String,require:true},
    descripcion:{type:String,require:true},
    fuerza:{type:Number,require:true},
    categoria:{type:String,require:true},
    municiones:{type:Boolean,require:true}
});
var donothing = () =>{

}
var Arma = mongoose.model("arma",armaSchema);
module.exports = Arma;