# IMDB IONIC APLICATION

[themoviedb](https://www.themoviedb.org/documentation/api) - api

[Ionic](https://ionicframework.com/) Aplicacion para ver las ultimas peliculas

### Instalaciones
Instalar [Nodejs](https://nodejs.org/es/)

Instalar [Android Studio](https://developer.android.com/studio) - Para poder correr la aplicacion en dispositivos Android

Instalar [Ionic CLI](https://ionicframework.com/docs/cli)

### Instalar dependencias 
Despues de clonar el repositorio, abrir una terminal en el directorio raiz del projecto y ejecutar los siguientes comandos
```bash
npm install
```

### Pasos para correr la aplicacion en el navegador

```bash
ionic serve
```

### Instalar en Android
Tener un dispositivo conectado a la computadora y que esta lo reconozca, puede correr el siguiente compando comprobar que este conectado
```bash
adb devices
```
Preparar la plataforma
```bash
ionic cordova prepare android
```
Para instalar la aplicacion
```bash
ionic cordova run android --prod
```
