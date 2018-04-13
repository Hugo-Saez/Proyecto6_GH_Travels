let conn=require('../connections/mysqlconnection');
let userModel={};

userModel.fetchAll=(cb)=>{
    if(!conn) return cb("No se ha podido realizar conexión");
    const SQL="Select * FROM usuarios";
    conn.query(SQL, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
};

userModel.registro=function (usuario,cb) {

    if(!conn) return cb("No existe conexión con la BD");
    conn.query('SELECT * FROM usuarios WHERE usuario=?',[usuario.usuario],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            conn.query('SELECT * FROM usuarios WHERE email=?',[usuario.email],(error,result)=>{
                if(error) return cb(error);
                if (result != ''){
                    return cb(null,2);
                } else {
                    conn.query('INSERT INTO usuarios SET ?',[usuario],(error,result)=>{
                        if(error) return cb(error);
                        return cb(null,3);
                    })
                }
            })
        }
    })
};

userModel.login = function(usuario,cb) {
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('SELECT * FROM usuarios WHERE usuario=? AND password=?',[usuario.usuario,usuario.password],(error,result)=>{
        if(error) return cb(error);
        console.log(result);
        if (result != ''){
            let userData = {
              usuario: result[0].usuario,
              admin: result[0].admin
            };
            return cb(null,userData);
        } else {
            return cb(null,null);
        }
    })
};


userModel.edit = function(usuario,cb){
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('UPDATE usuarios SET admin =?, activo=? WHERE id=?', [usuario.admin,usuario.activo,usuario.id])
}

module.exports = userModel;
