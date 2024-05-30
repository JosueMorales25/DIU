const express = require('express')
const routes = express.Router()

//==============PRODUCTOS================
//Traer todos los productos
routes.get('/materias', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.send(err)

        connection.query('CALL reporteStockExistencia()', (err, rows) => {
            if (err) return res.send(err)
            
            console.log(rows)
            res.json(rows)
        });
    })
})

//Traer producto por codigo de barras
routes.get('/materias/:id', (req, res) => {
    let materia_id = req.params.codigo
    req.getConnection((err, connection) => {
        if (err) return res.send(err)

        connection.query('SELECT * FROM productos WHERE materia_id = '+materia_id, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        });
    })
})

//////insertar nuevo producto por codigo de barras
//routes.post('/productos/add-new-product/', (req, res) => {
//    //console.log(req.body.tipo)
//    //res.json(req.body)
//    let productoCodigo = req.body.codigo || null
//    let productoMarca = req.body.marca || null
//    let productoMedida = req.body.medida || null
//    let productoCapaz = req.body.capaz || 0
//    let productoRodadura = req.body.rodadura || null
//    let productoTipo = req.body.tipo || null
//    let productoStock = req.body.stock || 0
//    let productoAlert = req.body.alert || 0
//    let productoPrecio = req.body.precio || 0
//
//    req.getConnection((err, connection) => {
//        if (err) return res.send(err)
//
//        connection.query('CALL addProducto("'+productoCodigo+'","'+productoMarca+'","'+productoMedida+'",'+productoCapaz+',"'+productoRodadura+'","'+productoTipo+'",'+productoStock+','+productoAlert+','+productoPrecio+')', (err, rows) => {
//            if (err) return res.send(err)
//            res.json(rows)
//        });
//    })
//})
//
////Buscar producto por codigo
//routes.post('/productos/productot/', (req, res) => {
//    //console.log(req.body.tipo)
//    //res.json(req.body)
//    let productoCodigo = req.body.codigo
//
//    req.getConnection((err, connection) => {
//        if (err) return res.send(err)
//
//        connection.query('CALL addProducto("'+productoCodigo+'","'+productoMarca+'","'+productoMedida+'",'+productoCapaz+',"'+productoRodadura+'","'+productoTipo+'",'+productoStock+','+productoAlert+','+productoPrecio+')', (err, rows) => {
//            if (err) return res.send(err)
//            res.json(rows)
//        });
//    })
//})

module.exports = routes