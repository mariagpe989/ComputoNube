//codigo de express (el servidor)
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const _handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require ('connect-flash');
const session = require ('express-session');
const passport = require ('passport');

// Inicializaciones
const app = express();
require ('./config/passport');


// Configuraciones 
app.set('views', path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine', '.hbs');

// Middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// guardar los mensajes en el servidor
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    //res.locals.user = req.user || null; // Corregido
    next();
});


app.use((req, res, next) => {
    res.locals.user = req.user || null; // Ejemplo de variable global
    next();
});

// Rutas 
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Manejo de errores
// Manejo de error 404 sin intentar renderizar una vista
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Manejo de errores internos (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


module.exports = app;
