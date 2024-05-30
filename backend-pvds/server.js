const path = require('path')

const express = require('express')
const mysql = require('mysql')
const myconnection = require('express-myconnection')
const cors = require('cors')

//const APIinventario = require('./API/inventario')
//const APIventas = require('./API/ventas')
//const APIReportes = require('./API/reportes')
const APIPrueba = require('./API/prueba')
const { response } = require('express')

const app = express()
app.set('port',process.env.PORT || 9000)
const dbOptions = {
    host:'mysql', // regresar a -> mysql ///en contenedor es mysql y asi solito localhost
    port: 3306,
    user: 'admin',
    password:'codecore',
    database:'universidad',
    multipleStatements: true,
    insecureAuth : true,
    connectTimeout: 20000,
}

app.use(express.static("app"))
//middelwares------------------
app.use(cors());
app.use(myconnection(mysql,dbOptions,'single'))
app.use(express.json())


//rutas
app.get('/',(req,res)=>{
    //res.send('Welcome to my app');
    //response.sendFile(path.resolve(__dirname,'index.html'))
    res.json({ 'Bienvenido': 'PVDS API V1.0.0' })
})
app.use('/api/prueba',APIPrueba)
//app.use('/api/ventas',APIventas)
//app.use('/api/reportes',APIReportes)

//server running
app.listen(9000,()=>{
   console.log("servidor corriendo", app.get('port')) 
})
