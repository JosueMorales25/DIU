-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 29-05-2024 a las 20:11:43
-- Versión del servidor: 5.7.44
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `universidad`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`admin`@`%` PROCEDURE `getArchivosMateria` (IN `IDMateria` INT)  READS SQL DATA SELECT 
  id, 
  nombre, 
  ruta_archivo, 
  tipo_archivo, 
  fecha_subida 
FROM 
  Archivos 
WHERE 
  materia_id = IDMateria$$

CREATE DEFINER=`admin`@`%` PROCEDURE `getPreguntasRespuestas` (IN `IDMateria` INT)  READS SQL DATA SELECT 
  P.id AS pregunta_id, 
  P.pregunta, 
  P.fecha_pregunta,
  R.id AS respuesta_id, 
  R.respuesta, 
  R.fecha_respuesta 
FROM 
  Preguntas AS P
LEFT JOIN Respuestas AS R ON P.id = R.pregunta_id
WHERE 
  P.materia_id = IDMateria$$

CREATE DEFINER=`admin`@`%` PROCEDURE `getSemestresMateria` ()  READS SQL DATA SELECT 
  Semestres.id AS semestre_id, 
  Semestres.nombre AS semestre_nombre, 
  Materias.id AS materia_id, 
  Materias.nombre AS materia_nombre
FROM 
  Semestres
LEFT JOIN Materias ON Semestres.id = Materias.semestre_id
ORDER BY 
  Semestres.id, Materias.id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Archivos`
--

CREATE TABLE `Archivos` (
  `id` int(11) NOT NULL,
  `materia_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `ruta_pdf` varchar(255) NOT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `estado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Materias`
--

CREATE TABLE `Materias` (
  `id` int(11) NOT NULL,
  `semestre_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Materias`
--

INSERT INTO `Materias` (`id`, `semestre_id`, `nombre`) VALUES
(1, 1, 'Álgebra Superior I'),
(2, 1, 'Estructuras Discretas'),
(3, 1, 'Introducción a Ciencias de la Computación'),
(4, 1, 'Matemáticas para las Ciencias Aplicadas I'),
(5, 2, 'Álgebra Superior II'),
(6, 2, 'Estructuras de Datos'),
(7, 2, 'Graficas y Juegos'),
(8, 2, 'Matemáticas para las Ciencias Aplicadas II'),
(9, 3, 'Álgebra Lineal I'),
(10, 3, 'Matemáticas para las Ciencias Aplicadas III'),
(11, 3, 'Modelado y Programación'),
(12, 3, 'Probabilidad I'),
(13, 4, 'Autómatas y Lenguajes Formales'),
(14, 4, 'Lógica Computacional'),
(15, 4, 'Matemáticas para las Ciencias Aplicadas IV'),
(16, 4, 'Organización y Arquitectura de Computadoras'),
(17, 5, 'Análisis de Algoritmos'),
(18, 5, 'Computación Distribuida'),
(19, 5, 'Fundamentos de Bases de Datos'),
(20, 5, 'Lenguajes de Programación'),
(21, 6, 'Ingeniería de Software'),
(22, 6, 'Inteligencia Artificial'),
(23, 6, 'Sistemas Operativos'),
(24, 7, 'Compiladores'),
(25, 7, 'Complejidad Computacional'),
(26, 7, 'Redes de Computadoras'),
(27, 8, 'Computación Concurrente'),
(28, 8, 'Criptografía y Seguridad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Preguntas`
--

CREATE TABLE `Preguntas` (
  `id` int(11) NOT NULL,
  `materia_id` int(11) DEFAULT NULL,
  `pregunta` text NOT NULL,
  `fecha_pregunta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Preguntas`
--

INSERT INTO `Preguntas` (`id`, `materia_id`, `pregunta`, `fecha_pregunta`) VALUES
(1, 1, '¿Cómo se resuelve esta ecuación?', '2024-04-09 23:07:28'),
(2, 2, '¿Cómo se resuelve esta ecuación?', '2024-04-09 23:07:28'),
(3, 2, '¿Prque se usa la ley de Morgan', '2024-04-28 02:25:10'),
(4, 1, 'Como demostraron que dos conjuntos son biyectivos', '2024-04-28 02:59:22'),
(5, 1, '¿Cómo se demuestra que dos conjuntos son inyectivos', '2024-05-02 23:48:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Respuestas`
--

CREATE TABLE `Respuestas` (
  `id` int(11) NOT NULL,
  `pregunta_id` int(11) DEFAULT NULL,
  `respuesta` text NOT NULL,
  `fecha_respuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Respuestas`
--

INSERT INTO `Respuestas` (`id`, `pregunta_id`, `respuesta`, `fecha_respuesta`) VALUES
(1, 1, 'Puedes usar el método de sustitución...', '2024-04-09 23:07:28'),
(2, 1, 'Otra posible solución es...', '2024-04-09 23:07:28'),
(3, 2, 'Puedes usar el método de sustitución...', '2024-04-09 23:07:28'),
(4, 3, 'Porque con eso se puede demostrar', '2024-04-28 02:25:31'),
(5, 4, 'Para demostrar que dos conjuntos son biyectivos, necesitas mostrar que existe una correspondencia uno a uno y sobre entre los elementos de ambos conjuntos.', '2024-04-28 03:00:28'),
(6, 1, 'esa no sirve', '2024-05-12 01:21:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Semestres`
--

CREATE TABLE `Semestres` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Semestres`
--

INSERT INTO `Semestres` (`id`, `nombre`) VALUES
(1, 'PrimerSemestre'),
(2, 'SegundoSemestre'),
(3, 'TercerSemestre'),
(4, 'CuartoSemestre'),
(5, 'QuintoSemestre'),
(6, 'SextoSemestre'),
(7, 'SeptimoSemestre'),
(8, 'OctavoSemestre');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Archivos`
--
ALTER TABLE `Archivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `Materias`
--
ALTER TABLE `Materias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semestre_id` (`semestre_id`);

--
-- Indices de la tabla `Preguntas`
--
ALTER TABLE `Preguntas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `Respuestas`
--
ALTER TABLE `Respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pregunta_id` (`pregunta_id`);

--
-- Indices de la tabla `Semestres`
--
ALTER TABLE `Semestres`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Archivos`
--
ALTER TABLE `Archivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Materias`
--
ALTER TABLE `Materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `Preguntas`
--
ALTER TABLE `Preguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Respuestas`
--
ALTER TABLE `Respuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Semestres`
--
ALTER TABLE `Semestres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Archivos`
--
ALTER TABLE `Archivos`
  ADD CONSTRAINT `Archivos_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `Materias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Materias`
--
ALTER TABLE `Materias`
  ADD CONSTRAINT `Materias_ibfk_1` FOREIGN KEY (`semestre_id`) REFERENCES `Semestres` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Preguntas`
--
ALTER TABLE `Preguntas`
  ADD CONSTRAINT `Preguntas_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `Materias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Respuestas`
--
ALTER TABLE `Respuestas`
  ADD CONSTRAINT `Respuestas_ibfk_1` FOREIGN KEY (`pregunta_id`) REFERENCES `Preguntas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;