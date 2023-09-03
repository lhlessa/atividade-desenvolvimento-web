const { home } = require('../controllers/home');
const { tarsila } = require('../controllers/tarsila');
const { portinari } = require('../controllers/portinari');
const { addPaintingController } = require('../controllers/home');
const { check, validationResult } = require('express-validator');
//const {error} = require('../controllers/error');

module.exports = {
    home: (app) => {
        app.get('/', function (req, res) {
            home(app, req, res);
        });
    },
    tarsila: (app) => {
        app.get('/tarsila', function (req, res) {
            tarsila(app, req, res);
        });
    },
    portinari: (app) => {
        app.get('/portinari', function (req, res) {
            portinari(app, req, res);
            res.render('insertPainting.ejs');
        });
    },
    insertPainting: (app) => {
        console.log("Rota do formulário para inserção de obras");
        app.get('/inserirobra', function (req, res) {
            res.render('insertPainting.ejs', {errors: [], painting: {}});
        })
    },
    savePainting: (app) => {
        app.post('/salvaObra',
            check('nome').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('artista').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('ano').isLength({ min: 4, max: 4 }).withMessage('Ano deve ter apenas 04 caracteres.').isNumeric().withMessage('Somente números são aceitos no ano.').isInt({ min: 0, max: 2100 }).withMessage('Ano deve estar entre 0 e 2100'),
            check('comentarios').isLength({ min: 1, max: 250 }).withMessage('Comentário deve ter pelo menos entre 01 e 250 caracteres'),
            check('urlimagem').isURL().withMessage('Url da imagem deve conter um link')
            , function (req, res) {
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    const painting = req.body;
                    console.log(`O que veio ${painting}`);
                    res.render('insertPainting.ejs', {errors:errors.errors, painting: painting});
                } else {
                    addPaintingController(app, req, res);
                }
            });
    }/*,
    error: (app) =>{
        app.get('*', function(req, res){
            error(app, req, res);
        });
    }*/
}