# Étape 1 : Construire l'application Angular
FROM node:latest AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 1 : Utiliser l'image officielle d'Apache
FROM httpd:alpine

# Étape 2 : Copier les fichiers construits de l'application Angular dans le répertoire approprié d'Apache
COPY --from=build /app/dist/angular-template/browser /usr/local/apache2/htdocs/

# Étape 3 : Copier le fichier .htaccess dans le répertoire de l'application Angular pour le routage côté client
COPY ./.htaccess /usr/local/apache2/htdocs/

# Exposer le port 80
EXPOSE 80
