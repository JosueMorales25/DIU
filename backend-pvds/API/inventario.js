const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  
    res.json({ 'Bienvenido': 'Hola' })

})

//==============Generar Compra================
//Agregar Nuevo producto o aumentar stock

routes.post('/generarCompra/', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        console.log(req.body)
        let productoCodigo = req.body.productoCodigo || null
        let proveedor = req.body.proveedor || null
        let cantidad = req.body.cantidad || 0
        let precio_compra = req.body.precio_compra || 0.00
        let tipo = req.body.tipo || null
        let precio_venta = req.body.precio_venta || 0.00
        let medida = req.body.medida || ''
        let dibujo = req.body.dibujo || ''
        let capaz = req.body.capaz || ''
        let clave = req.body.clave || ''
        let marca = req.body.marca || ''
        if(req.body.newProveedor=='')
        {
            console.log('se agrego MISMO proveedor')
        }else{
            proveedor=req.body.newProveedor
            console.log('se agrego nuevo proveedor')
        }

        let alertNotification = req.body.alertNotification || 0
        if (productoCodigo == null && proveedor == null && cantidad == null && precio_compra == null && tipo == null) {
            res.send(res.json({ 'status': '400', 'mge': 'faltan datos' }))
        }
        connection.query(`CALL generarCompra('${productoCodigo}','${proveedor}',${cantidad},${precio_compra},'${tipo}',${precio_venta},'${medida}','${dibujo}','${capaz}','${clave}','${marca}',${alertNotification});`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows[0][0];

            res.json(resJSON)
        });



    })
})
//=====Consultar todos los productos Activos====/
routes.get('/productos', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))

        connection.query('call getProductos()', (err, rows) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows[0];

            res.json(resJSON)
            console.log('Lista de Productos')
        });
    })
})
//=====Consultar un producto Activo====/
routes.get('/producto/:codigo', (req, res) => {
    try{
        let codigoProducto = req.params.codigo
        console.log(codigoProducto)
        req.getConnection((err, connection) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
    
            connection.query('call 	getProducto("'+codigoProducto+'")', (err, rows) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                const resJSON = rows[0][0];
    
                res.json(resJSON)
            });
        })
    }catch(e){
        console.log('No existe el recurso en la BD')
        next(err)
    }
   
})
//=====Consultar un producto Activo====/
routes.get('/producto/', (req, res) => {
    try{
        let codigoProducto = '000000000'
        console.log(codigoProducto)
        req.getConnection((err, connection) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
    
            connection.query('call 	getProducto("'+codigoProducto+'")', (err, rows) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                const resJSON = rows[0][0];
    
                res.json(resJSON)
            });
        })
    }catch(e){
        console.log('No existe el recurso en la BD')
        next(err)
    }
   
})
//=====Consultar un producto Activo====/
routes.get('/proveedores', (req, res) => {
    try{
        req.getConnection((err, connection) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
    
            connection.query('call 	getProveedores()', (err, rows) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                const resJSON = rows[0];
    
                res.json(resJSON)
            });
        })
    }catch(e){
        console.log('No existe el recurso en la BD')
        next(err)
    }
   
})

//=====Eliminar Producto====/
routes.post('/eliminarProductoLogico/:idProducto', (req, res) => {
    try{
        req.getConnection((err, connection) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
            let idProducto = req.params.idProducto || 0
            connection.query(`call 	eliminarProductoLogico(${idProducto})`, (err, rows) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                const resJSON = rows[0];
    
                res.json(resJSON)
            });
        })
    }catch(e){
        console.log('No existe el recurso en la BD')
        next(err)
    }
   
})

//=====Modificar Producto====/
routes.post('/editarProducto', (req, res) => {
    console.log(req.body)
    try{
        req.getConnection((err, connection) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
            let idProducto = req.body.idProducto || 0
            let productoCodigo = req.body.productoCodigo || null
            let tipo = req.body.tipo || null
            let precio_venta = req.body.precio_venta || 0.00
            let medida = req.body.medida || ''
            let dibujo = req.body.dibujo || ''
            let capaz = req.body.capaz || ''
            let clave = req.body.clave || ''
            let marca = req.body.marca || ''
            let alerta = req.body.notificacion || 0
            
            connection.query(`call modificarDetallesProducto(${idProducto},'${productoCodigo}','${medida}','${dibujo}','${capaz}','${clave}','${marca}','${tipo}',${precio_venta}, ${alerta})`, (err, rows) => {
                if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
                const resJSON = rows[0];
    
                res.json(resJSON)
            });
        })
    }catch(e){
        console.log('No existe el recurso en la BD')
        next(err)
    }
   
})


module.exports = routes
//'CALL generarCompra(@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10, @p11);'