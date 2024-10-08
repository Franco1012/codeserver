#definir que tipo de aplicacion vaos a construir
FROM node

#definir donde se va a guardar y el nombre  del proyecto o imagen
WORKDIR /matilda

#copiar/mover el package desde el servidor local hacia el contenedor
COPY package*json ./
#instalar los paquetes del json
RUN npm install
#copiar el resto de la aplicacion
COPY . . 
#configuramos el puerto de exposicion, es el puerto donde se va a levantar el contenedor
EXPOSE 8080
#configuramos el comando de inicializacion de la aplicacion
CMD ["npm","run","dev"]
#CMD ["npm","run","dev"]
