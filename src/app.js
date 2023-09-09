//importamos express
const express = require('express');
// lo inicializamos atravez de una constante llamada app
const app = express();
//es un modulo que se encarga de unir directorios
const path = require('path');
//Es un modulo que se encarga de leer las peticiones
const morgan = require('morgan');
//Modulos de BBDD
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//Importando rutas
const customerRoutes = require('./routes/customer');



//--------------------------------------------------
//setting: esta seccion se encarga de configurar express
//puerto, motor de plantilla ,carpetas de las vistas, etc

//Configuramos del servidor
//puerto del servidor (revisa si hay un puerto en el os si no usa el 3000)
app.set('port',process.env.PORT || 3003);

//cofigurar las vistas "motor de plantillas","cual"
app.set('view engine','ejs');
//tenemos que indicarle donde estan las vistas (Esto se hace desdes la ruta inicial del sistema operativo)
//Modulo path une los siguinetes directorios 
//(__dirname se encarga e darnos la ruto desde el archivo que lo ejecuta, 'luego lo concatena con views')
app.set('views',path.join(__dirname,'views'))

//middlewares: Son funciones que se ejecutan antes de que lleguen las peticiones (podemos alterar los datos)
app.use(morgan('dev'))
app.use(myConnection(mysql,{
    host:'localhost',//la dirección a la cual nos conectaremos al servidor
    user:'root',//
    password:'' ,
    port:'3306',
    database:'crudnodejsmysql',
    insecureAuth: true
},'single'))


//Traducir los datos del formulario
//extended false es por que no va a recibir archivos codificados como imagenes
app.use(express.urlencoded({extended: false}));

//Vamos a registrar las peticiones que nos llegan

//Routes
//las peticiones se conocen como routes en express(./ , ./compradores , ./productos)
//Todas sla urls que los usuarios pueden solicitar del servidor

//Aplicacion utiliza cada vez que un usuario llegue a la ruta inicial del servidor
//ejecuta customerRoutes
app.use('/',customerRoutes);

//Static files 
//Para poder cargar archivos estaticos usamos este metodo (css,imagnes)
app.use(express.static(path.join(__dirname,'public')))

//Inicializamos el servidor , Escuchamos el servidor 
//le indicamos el puerto , la funcion 
app.listen(app.get('port'), () =>{
    console.log("Server is running on port 3000")
})