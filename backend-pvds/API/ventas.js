const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {

    res.json({ 'Bienvenido a ventas': 'Hola' })

})

//==============Generar Venta================
//Agregar nueva Venta y restar stock

routes.post('/generarVenta/', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let idVenta = req.body.idVenta
        let factura = req.body.factura
        factura = (factura)?1:0;
        let total = req.body.total
        let pago = req.body.pago
        let cambio = req.body.cambio
        let client = req.body.cliente || "Sin Cliente"
        console.log(req.body)
        connection.query(`CALL generarVenta(${idVenta},'${factura}', ${total},${pago}, ${cambio}, '${client}');`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows[0][0];
            console.log(resJSON)
            res.json(resJSON)
        });
        
        

    })
})

//==============Agregar Productos a Venta================
//Agregar nueva Venta y restar stock

routes.post('/agregarProductosEnVenta/', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let idProducto = req.body.ID_PRODUCTO
        let idVenta = req.body.ID_VENTA
        let precioVenta = req.body.PRECIO_VENTA
        let cantidad = req.body.CANTIDAD
        let descuento = req.body.DESCUENTO
        let total = req.body.TOTAL
        //console.log(req.body)
        connection.query(`CALL agregarProductosVenta(${idProducto},${idVenta},${precioVenta},${cantidad},${descuento},${total})`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows[0][0];
            //console.log(resJSON)
            res.json(resJSON)

        })
    })
})
 
    //=====Consultar idVenta====/
    routes.get('/idVenta', (req, res) => {
        try {
            req.getConnection((err, connection) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))

                connection.query('CALL getIdVenta();', (err, rows) => {
                    if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                    const resJSON = rows[0][0];

                    res.json(resJSON)
                });
            })
        } catch (e) {
            console.log('No existe el recurso en la BD')
            next(err)
        }

    });

    //=====RestarStock====/
    routes.post('/restarStock', (req, res) => {
        //console.log('se ha restado: '+JSON.stringify(req.body))
        try {
            let idProducto = req.body.idProducto
            let cantidad = req.body.cantidad
            req.getConnection((err, connection) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
                
                connection.query(`CALL restarStock(${idProducto},${cantidad});`, (err, rows) => {
                    if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                    const resJSON = rows[0][0];
                    console.log('se ha restado: '+JSON.stringify(req.body))
                    res.json(resJSON)
                });
            })
        } catch (e) {
            console.log('No existe el recurso en la BD')
            next(err)
        }

    });

    module.exports = routes