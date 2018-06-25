var express = require('express');
var Zombie = require('./moodels/zombie');
var arma = require('./moodels/arma');
var Arma = require('./moodels/arma');

var passport = require('passport');

var router = express.Router();

router.use((req,res,next) => {
    res.locals.currentZombie = req.zombie;
    res.locals.currnetarma = req.arma;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

router.get('/',(req,res,next) => {
    Zombie.find()
    .sort({createdAt:'descending'})
    .exec((err,zombie) =>{
        if(err){
            return next(err);
        }
        res.render('index',{zombie:zombie});
    });
});

router.get("/zombie/:username",(req,res,next) => {
    Zombie.findOne({username:req.params.username},(err,zombie) =>{
        if(err){
            return next(err);
        }
        if(!zombie){
            return next(404);
        }
        res.render("profile",{zombie:zombie});
    });
});


router.get('/signup',(req,res) => {
    res.render('signup');
});

router.post('/signup',(req,res,next) =>{
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({username:username},(err,zombie)=>{
        if(err){
            return next(err);
        }
        if(zombie){
            req.flash("error","El nombre de usuario ya existe");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username:username,
            password:password
        });
        newZombie.save(next);
        return res.redirect("/")
    });
});

router.get('/index_weapons',(req,res,next) => {
    arma.find()
    .sort({createdat:'descending'})
    .exec((err,arma) =>{
        if(err){
            return next(err);
        }
        res.render('index_weapons',{arma:arma});
    });
});

router.get('/weapons',(req,res) => {
    res.render('weapons');
});

router.post('/weapons',(req,res,next) =>{
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var fuerza = req.body.fuerza;
    var categoria = req.body.categoria;
    var municiones = req.body.municiones;

    arma.findOne({nombre:nombre},(err,arma)=>{
        if(err){
            return next(err);
        }
       
        var newarma = new Arma({
            nombre:nombre,
            descripcion:descripcion,
            fuerza:fuerza,
            categoria:categoria,
            municiones:municiones
        });
        newarma.save(next);
        return res.redirect("/index_weapons")
    });
});

router.get("/login",(req,res)=>{
    res.render("login");
});
router.post("/login",passport.authenticate("login",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true 
}));
module.exports = router;