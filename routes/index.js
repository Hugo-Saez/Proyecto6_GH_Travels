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
            destinos,
            footerShow: true
        })
    });
});

router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'Iniciar Sesion',
            layout: 'layout'
        });
});

router.get('/registro', function(req, res, next) {
    res.render('registro',
        {
            title: 'Registro de Usuario',
            layout: 'layout'
        });
});

router.get('/userlist', (req,res,next)=>{
    userModel.fetchAll((error,users)=>{
        if(error) return res.status(500).json(error);
        res.render('user-list',{
            title:"Listado de Usuarios",
            layout:"layout",
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
        console.log(result);
        if(error) return res.status(500).json(error);
        if(!result){
            res.redirect('/login');
        }else{
            req.session.usuario = result.usuario;
            req.session.admin = result.admin;
            if(result.admin){
                res.redirect('/admin/destinos');
            }else{
                res.redirect('/');
            }
        }
    })
});

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
                    layout:'layout',
                    errorUsuario:true
                })
                break;
            case 2:
                res.render('registro',{
                    title:"Email existente",
                    layout:'layout',
                    errorEmail:true
                })
                break;
            case 3:
                res.render('login',{
                    title:"Registro correcto",
                    layout:'layout',
                    correcto:true
                })
                break;
        }
    })
});

module.exports = router;
