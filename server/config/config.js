//puerto

process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

//Base de datos
if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe2'
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;
