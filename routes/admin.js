var express = require('express');
var router = express.Router();

var destinosModel=require('../models/destinosModel');


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

router.get('/destinos', function(req, res, next) {
    destinosModel.fetchAll((error,destinos)=>{
        if(error) return res.status(500).json(error);
        if(req.session.isAdmin==1){
            res.render('adminview',{
                title:"Gestión de destinos",
                layout:"layout2",
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

router.get('/destinos/active/:id', function (req,res,next) {
    destinosModel.activoUpdate(req.params.id, (error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

router.get('/destinos/delete/:id', function (req,res,next) {
    destinosModel.destinoDelete(req.params.id,(error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

router.post('/destinos/create', function (req,res,next) {
    let destino={
        viaje:req.body.viaje,
        precio:req.body.precio,
        fechaIda:req.body.fecha_sal,
        fechaVuelta:req.body.fecha_vuel,
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

module.exports = router;
