# Proyecto codeCore
### Josué Eduardo Morales Torres
## para poder ejecutar el proyecto es necesario tener instalado docker
### Comandos para iniciar ejecución
sudo systemctl start docker
sudo docker-compose up
##### si se quiere actualizar el build se hace
docker-compose up --build --force-recreate
#### Comando para ver que contenedores están en ejecución
docker ps
#### Para terminar todos los contenedores que hay en docker se hace 
docker-compose down
#### Si se requiere terminar solo un contenedor se hace
sudo docker stop "nombre del contenedor" 

#### Si se ejcuta por separado el back y el front la priera vez se tiene que hacer 
npm i
##### Para levantar el back se hace
npm run start
##### Para levantar el front se hace
npm run serve



docker-compose up --build --force-recreate frontend
