var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var destinosModel=require('../models/destinosModel');

// Destinos en homepage
router.get('/',(req,res,next)=> {
    destinosModel.fetchActivo((error, destinos) => {
    if(error) return res.status(500).json(error);
        res.render('home', {
            title: "travels",
            layout: "layout",
            isLoged: req.session.isLoged,
            isAdmin: req.session.isAdmin,
            user: req.session.username,
            destinos
        })
    });
});

router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'Iniciar Sesion',
            layout: 'layout2'
        });
});

router.get('/registro', function(req, res, next) {
    res.render('registro',
        {
            title: 'Registro de Usuario',
            layout: 'layout2'
        });
});

router.get('/userlist', (req,res,next)=>{
    userModel.fetchAll((error,users)=>{
        if(error) return res.status(500).json(error);
        res.render('user-list',{
            title:"Listado de Usuarios",
            layout:"layout2",
            users
        })
    })
});

router.post('/login', function (req,res) {
    let Usuario = {
        usuario: req.body.usuario,
        password: req.body.password
    };
    userModel.login(Usuario,function (error,result) {
        if(error) res.status(500).json(error);

    })
});

/*
router.get('/admindestinos', function(req, res, next) {
    res.render('adminview',
        {
            title: 'Administración Destinos',
            layout: 'layout2',
        });
});
*/

router.get('/destroy',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/')
});

router.post('/registrook', function (req, res) {
    let Usuario={
        usuario:req.body.usuario,
        email:req.body.email,
        password:req.body.password
    }
    userModel.registro(Usuario,function (error,result) {
        if(error) res.status(500).json(error);
        switch (result){
            case 1:
                res.render('registro',{
                    title:"Usuario existente",
                    layout:'layout2',
                    errorUsuario:true
                })
                break;
            case 2:
                res.render('registro',{
                    title:"Email existente",
                    layout:'layout2',
                    errorEmail:true
                })
                break;
            case 3:
                res.render('login',{
                    title:"Registro correcto",
                    layout:'layout2',
                    correcto:true
                })
                break;
        }
    })
});

/*
router.get('/*', function(req, res, next) {
    res.render('error404',
        {
            title: 'error',
            layout: 'layout2',
        });
})
*/
module.exports = router;
