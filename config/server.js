let express = require('express');
//const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
let expressSession = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

let app = express();
const port = 3000;

app.set('view engine', "ejs");
app.set('views', './app/views');
app.use(express.static("./public"));
/*app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
}));  */

//Substitui o body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    name: 'uniqueSessionId',
    secret: process.env.SECRET, // segredo que pode ser qlq string
    resave: false, //regrava toda vez do lado do servidor
    saveUninitialized: false, //cria uma sessão todas vez
}));

app.listen(port, function(){
    console.log('Servidor rodando com Express', port);
});

module.exports = app;

