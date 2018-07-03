var passport = require('passport');
var zombie = require('./moodels/zombie');

var LocalStrategy = require("passport-local").Strategy;

module.exports = () =>{
    passport.serializeUser((zombie,done) => {
        done(null,zombie._id);
    });
    passport.deserializeUser((id,done) => {
        zombie.findById(id,(err,zombie) => {
            done(err,zombie);
        });
    });
};

passport.use("login",new LocalStrategy(function(username,password,done){
    zombie.findOne({username:username},function(err,zombie){
        if(err){
            return done(err);
        }
        if(!zombie){
            return
            done(null,false,{message:"No existe ningun usuario con ese nombre"})
        }
        zombie.checkPassword(password,(err,isMatch) =>{
            if(err){
                return done(err);
            }
            if(isMatch){
                return done(null,zombie)
            }else{
                return done(null,false,{message:"La contraseñano es valida"})
            }
        })
    })
}))
   