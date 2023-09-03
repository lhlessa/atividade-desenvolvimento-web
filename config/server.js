let express = require('express');

let app = express();
const port = 3000;

app.set('view engine', "ejs");
app.set('views', './app/views');
app.use(express.static("./public"));

//Substitui o body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(port, function(){
    console.log('Servidor rodando com Express', port);
});

module.exports = app;

