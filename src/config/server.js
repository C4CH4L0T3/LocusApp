const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
require('colors');

const app = express();

// Ajustes
app.set('Puerto', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views/'));

// Middlewares
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../static/')));
app.use(express.urlencoded({ extended: true }));

module.exports = app;