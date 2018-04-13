var express = require('express');
var router = express.Router();

var destinosModel=require('../models/destinosModel');
var userModel=require('../models/userModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(req.session || "Sesión no disponible");
});

router.get('/create', function(req,res,next) {
  req.session.username="mjosesc";
  req.session.isAdmin=1;
  res.redirect('/admin');
});

router.get('/remove',function(req,res,next) {
    req.session.username=null;
res.redirect('/admin');
});

router.get('/destroy',function(req,res,next){
    req.session.destroy();
res.redirect('/admin');
});

router.get('/privada',function(req,res,next){
    if(req.session.isAdmin==1)res.status(200).send("Conectado");
    else res.redirect('/admin');
});

// Mostrar destinos
router.get('/destinos', function(req, res, next) {
    destinosModel.fetchAll((error,destinos)=>{
        if(error) return res.status(500).json(error);
        if(req.session.admin==1){
            res.render('adminview',{
                title:"Gestión de destinos",
                layout:"layout",
                isLoged : req.session.isLoged,
                isAdmin : req.session.isAdmin,
                user : req.session.username,
                destinos
            })
        }
        else{
            res.redirect('/');
        }

    })
});

//Destinos activos
router.get('/destinos/active/:id', function (req,res,next) {
    destinosModel.activoUpdate(req.params.id, (error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

//Borrar destino
router.get('/destinos/delete/:id', function (req,res,next) {
    destinosModel.destinoDelete(req.params.id,(error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

//Creacion de destinos
router.post('/destinos/create', function (req,res,next) {
    let destino={
        viaje:req.body.viaje,
        precio:req.body.precio,
        fecha_sal:req.body.fecha_sal,
        fecha_vuel:req.body.fecha_vuel,
        descripcion:req.body.descripcion,
        imagen:req.body.imagen,
        activo:req.body.activo
    }
    destinosModel.destinoCreate(destino,(error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

// Mostrar usuarios
router.get('/usuarios', function(req, res, next) {
    //console.log(req.body);
    userModel.fetchAll((error,usuarios)=>{
        if(error) return res.status(500).json(error);
        if(req.session.admin==1){
            res.render('usersview',{
                title:"Gestión de usuarios",
                layout:"layout",
                isAdmin : req.session.isAdmin,
                user : req.session.username,
                usuarios
            })
        }
        else{
            res.redirect('/');
        }
    })
});
router.post('/usuarios', function(req, res, next) {
    // console.log(req.body);
    //res.send(req.body);
    let usuario={
        admin:req.body.admin,
        activo:req.body.activo,
        id:req.body.id
    }
    userModel.edit(usuario,(error,usu)=>{
        if(error)return res.status(500).json(error);
    })
    res.redirect('/admin/usuarios');
});

module.exports = router;

