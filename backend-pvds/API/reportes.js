const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {

    res.json({ 'Bienvenido a inventario': 'Hola' })

})

//==============Generar inventario================
//trae ventas con un rango de fechas

routes.post('/rangoFechas/', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let fechaInicio = req.body.fechaInicio
        let fechaFinal = req.body.fechaFinal
        console.log(req.body)
        connection.query(`SELECT * FROM ventas WHERE ventas.ESTADO='ACTIVO' and ventas.CREATED_AT BETWEEN '${fechaInicio}' AND '${fechaFinal}'`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows;
            console.log(resJSON)
            res.json(resJSON)
        });



    })
})


//==============Generar inventario================
//trae COMPRAS con un rango de fechas

routes.post('/ComprasrangoFechas/', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let fechaInicio = req.body.fechaInicio
        let fechaFinal = req.body.fechaFinal
        console.log(req.body)
        connection.query(`SELECT 
        compra.ID_COMPRA,
        compra.PROVEEDOR,
        compra.CANTIDAD,
        compra.PRECIO_COMPRA,
        compra.CREATED_AT,
        productos.CODIGO,
        productos.MEDIDA,
        productos.DIBUJO,
        productos.CAPAZ,
        productos.CLAVE,
        productos.MARCA,
        productos.TIPO
        FROM compra,productos 
        WHERE compra.ESTADO='ACTIVO' and  compra.ID_PRODUCTO=productos.ID_PRODUCTO and compra.CREATED_AT BETWEEN '${fechaInicio}' AND '${fechaFinal}'
        ORDER BY compra.ID_COMPRA
        `, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows;
            console.log(resJSON)
            res.json(resJSON)
        });



    })
})


//==============Trae productos_venta================
//trae ventas con un rango de fechas

routes.get('/productos/:idVenta', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let idVenta = req.params.idVenta
        console.log(req.params)
        connection.query(`CALL productosByIdVenta(${idVenta})`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows[0];
            console.log(resJSON)
            res.json(resJSON)
        });



    })
})

//==============Obtener Facturas================
//trae ventas con un rango de fechas

routes.post('/facturas/:factura', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let factura = req.params.factura
        console.log(factura)
        let queryAll = (factura == 4) 
        ? `SELECT * FROM ventas WHERE ventas.ESTADO='ACTIVO' and ventas.FACTURA!=0 ORDER BY ventas.ID_VENTA DESC` 
        : `SELECT * FROM ventas WHERE ventas.ESTADO='ACTIVO' and ventas.FACTURA=${factura} ORDER BY ventas.ID_VENTA DESC`;

        connection.query(queryAll, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows;
            console.log(resJSON)
            res.json(resJSON)
        });



    })
})

//==============ACCION FACTURA================

routes.post('/accionFactura/:idVenta/:accion', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        //console.log(req.body)

        let accion = req.params.accion
        let idVenta = req.params.idVenta
        

        connection.query(`call accionFacturar(${idVenta},${accion})`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows;
            console.log(resJSON)
            res.json(resJSON)
        });



    })
})

//==============MODIFICAR ALERTA================

routes.post('/modificarAlerta/', (req, res) => {
    //console.log(req.body)
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }))
        console.log(req.body)

        let idProducto = req.body.idProducto
        let alerta = req.body.alerta || 0
        let alertaFlag = req.body.alertaFlag
        

        connection.query(`call modificarAlerta(${idProducto},${alerta},${alertaFlag})`, (err, rows) => {

            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }))
            const resJSON = rows;
            console.log(resJSON)
            res.json(resJSON)
        });



    })
})

//==============NuevoReporte================

routes.get('/NuevoReporte/', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.send(res.json({ 'status': '400', 'mge': 'Problema de Conexion' }));

        connection.query(`CALL reporteStockExistencia();`, (err, rows) => {
            if (err) return res.send(res.json({ 'status': '400', 'mge': 'Error en la BD' }));

            const productos = rows[0];
            var valCostoTotal = 0;
            productos.forEach(producto => {
                if ((producto.suma_acumulada == producto.stock_actual) || ((producto.suma_acumulada - producto.stock_actual) < 0)) {
                    producto["CostoTotal"] = producto.CANTIDAD * producto.PRECIO_COMPRA;
                } else {
                    producto["CostoTotal"] = (producto.CANTIDAD - (producto.suma_acumulada - producto.stock_actual)) * producto.PRECIO_COMPRA;
                }
                valCostoTotal += producto["CostoTotal"];
                producto["PRECIO_COMPRA"] = "$" + producto["PRECIO_COMPRA"].toString();
            });
            //Ultima línea para mostrar la suma acumulada de los costos de los productos existentes
            productos.push({"ID_PRODUCTO":"","CODIGO":"","MEDIDA":"","CAPAZ":"","CLAVE":"","MARCA":"","stock_actual":"","ID_COMPRA":"","CANTIDAD":"","PRECIO_COMPRA":"Total de costos :","CREATED_AT":"","suma_acumulada":"","CostoTotal":valCostoTotal})
            console.log(productos)
            res.json(productos);
        });
    });
});


module.exports = routes