# Proyecto6_GH_Travels

# Actividad_6
### 6º Actividad semanal. Mejorando nuestro sistema de registro y gestionando los usuarios
Vaya la web empieza a funcionar y estamos comprobando que se nos está llenando de usuarios fantasma a la hora de registrarse, para ello debemos comprobar que los email que nos envian los usuarios son correctos, y a la vez que puedan recuperar sus contraseña.

---

## Condiciones
Generaremos una nuevo proceso de registro en el que se seguirán los siguientes paso para el proceso:
1º El usuario se registra.
2º Recibe un email con enlace y un hash de activación
3º Una vez el usuario pulse sobre el hash de activación la cuenta quedará activada mientras tanto el usuario intenta loguearse recibirá un mensaje de usuario no activo.
Para ello crearemos una vista donde se recibirá le hash de activación comprobará el mismo y activará al usuario.
Y se modificará la tabla de Usuarios para introducir estos dos nuevos campos:
* Hash -> Tipo String 20
* Activo -> Tipo Boolean

También procederemos a la reactivación de la cuenta mediante el envio de otro email con un hash que reenvia la usuario otra vista donde se le solicité un nuevo password y la repitición del mismo una vez introducido adecuadamente la cuenta quedará activa mediante este nuevo password.

En el apartado administrador crearemos una nueva vista donde se pueda ver el listado de todos los usuarios, podamos activar o desactivar a los mismo o reenviar un mensaje de solicitud de nuevo password.

A la vez en el formulario de creación de viajes crearemos la actualización y subida de imagenes para los viajes y su posterior uso en la vista.


## Características.
* Se utilizará NPM para la instalación de dependencias.
* El proyecto debe estar subido en un contendor en vagrant, y debe cumplir las siguientes condiciones:
  * Debe disponer de un vagrantfile y un archivo .sh donde se encuentren todos los scripts necesarios para construir el contenedor y nuestra aplicacion se autoejecute.
  * El contendor debe tener abierto el puerto 80 y apuntara internamente al puerto 3000 donde tenemos apuntado nuestro servidor de node.js
  * El contendor debe disponer un mysql instalado con la tabla descrita anteriormente.
  * Dentro del package.json debemos disponer la tarea production debe llamar al módulo forever y arrancar la maquina.
  * Debemos generar una nueva carpeta en nuestra estructura denominada log, donde se almacenará un log de los posibles errores que se produzcan en la aplicación.
  * Se utilizará nodemailer para el envio de los emails de los diferentes procesos.
  * Se utilizará Multer para las subidas de archivos al servidor.
