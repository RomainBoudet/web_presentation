require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();

const port = process.env.PORT;

//configuration pour utiliser EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', './app/views');

//on ne va pas utiliser les fichiers html fournis mais des vues ejs
//le middleware static servira uniquement pour les fichiers css
app.use(express.static('./app/public'));

//Mon routeur
app.use('/', router);

app.listen(port, () => console.log(`API running on port ${port}`))
