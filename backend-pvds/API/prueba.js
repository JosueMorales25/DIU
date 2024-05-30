const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  
    res.json({ 'Bienvenido': 'Hola' })

})

//==============Generar Compra================
//Agregar Nuevo producto o aumentar stock

routes.get('/reporte', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(400).json({ 'status': '400', 'message': 'Problema de conexión' });
        }
 
        //connection.query("SELECT * FROM Semestres", (err, rows) => {
        connection.query("CALL getSemestresMateria()", (err, rows) => {
            if (err) {
                console.error('Error en la consulta de la base de datos:', err);
                return res.status(400).json({ 'status': '400', 'message': 'Error en la BD' });
            }
            const productos = rows[0];
            // Directamente enviar el resultado de la consulta
            res.json(productos);
        });
    });
});

routes.get('/materia/:id/preguntas-respuestas', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(400).json({ 'status': '400', 'message': 'Problema de conexión' });
        }

        const idMateria = req.params.id;
 
        connection.query("CALL getPreguntasRespuestas(?)", [idMateria], (err, rows) => {
            if (err) {
                console.error('Error en la consulta de la base de datos:', err);
                return res.status(400).json({ 'status': '400', 'message': 'Error en la BD' });
            }

            const data = rows[0];
            const groupedData = data.reduce((acc, curr) => {
                if (!acc[curr.pregunta_id]) {
                    acc[curr.pregunta_id] = {
                        pregunta_id: curr.pregunta_id,
                        pregunta: curr.pregunta,
                        fecha_pregunta: new Date(curr.fecha_pregunta).toLocaleString(),
                        respuestas: []
                    };
                }

                acc[curr.pregunta_id].respuestas.push({
                    respuesta_id: curr.respuesta_id,
                    respuesta: curr.respuesta,
                    fecha_respuesta: new Date(curr.fecha_respuesta).toLocaleString()
                });

                return acc;
            }, {});

            const preguntasRespuestas = Object.values(groupedData);
            res.json(preguntasRespuestas);
        });
    });
});


routes.post('/respuestas/:pregunta_id/:respuesta', (req, res) => {
    

    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(400).json({ error: 'Problema de conexión' });
        }
        
        let pregunta_id = req.params.pregunta_id
        let respuesta = req.params.respuesta

        connection.query('INSERT INTO Respuestas (pregunta_id, respuesta) VALUES (?, ?)',[pregunta_id,respuesta], (error, rows) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al agregar la respuesta' });
            } else {
                res.status(201).json({ message: 'Respuesta agregada exitosamente' });
            }
            
        });
    });
});

routes.post('/preguntas/:materia_id/:pregunta', (req, res) => {
    

    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(400).json({ error: 'Problema de conexión' });
        }
        
        let materia_id = req.params.materia_id
        let pregunta = req.params.pregunta

        connection.query('INSERT INTO Preguntas (materia_id, pregunta) VALUES(?, ?)',[materia_id,pregunta], (error, rows) => {
            
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al agregar la pregunta' });
            } else {
                res.status(201).json({ message: 'Pregunta agregada exitosamente' });
            }
            
        });
    });
});



module.exports = routes
//'CALL generarCompra(@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10, @p11);'