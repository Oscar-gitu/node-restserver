//puerto

process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

//Base de datos
if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe2'
} else {
    urlDB = 'mongodb+srv://OscarMongo:Wbza1xHAlo6tv2mR@cluster0.caidb.mongodb.net/cafe2'
}

process.env.URLDB = urlDB;
