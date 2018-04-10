var express = require('express');
var router = express.Router();
var winston= require('../config/winston');

router.get('/', function(req, res, next) {
  winston.info("Error de generación.");
  res.send('Bienvenido');
});

router.get('/create', function (req,res,next) {
    req.flash('info','Sesión creada con flash.');
    req.flash('error','error de cualquier tipo');
    req.redirect('/loginFlash');
});

module.exports = router;
