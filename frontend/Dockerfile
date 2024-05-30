# Usar una imagen oficial de Node.js como base
FROM node:20-alpine

# Configurar el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del proyecto y la configuración al directorio de trabajo
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto que usa tu frontend
EXPOSE 8080

# Iniciar el servidor de Vue.js
CMD ["npm", "run", "serve"]
