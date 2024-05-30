# Usar una imagen oficial de Node.js como base
FROM node:16-alpine

# Configurar el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install --only=production

# Copiar los archivos de la aplicación
COPY . .

# Exponer el puerto que usa tu backend
EXPOSE 9000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
