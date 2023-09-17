const { home, selectById, updateById } = require('../controllers/home');
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
        });
    },
    insertPainting: (app) => {
        console.log("Rota do formulário para inserção de obras");
        app.get('/inserirobra', function (req, res) {
            const idObra = parseInt(req.query.idobra);
            if (idObra) {
                selectById(idObra, (error, result) => {
                    res.render('insertPainting.ejs', { isUpdate: true, errors: [], painting: result });
                });
            } else {
                res.render('insertPainting.ejs', { isUpdate: false, errors: [], painting: [] });
            }
        });
    },
    savePainting: (app) => {
        app.post('/salvaObra',
            check('nome').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('artista').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('ano').isLength({ min: 4, max: 4 }).withMessage('Ano deve ter apenas 04 caracteres.').isNumeric().withMessage('Somente números são aceitos no ano.').isInt({ min: 0, max: 2100 }).withMessage('Ano deve estar entre 0 e 2100'),
            check('comentarios').isLength({ min: 1, max: 250 }).withMessage('Comentário deve ter pelo menos entre 01 e 250 caracteres'),
            check('urlimagem').isURL().withMessage('Url da imagem deve conter um link')
            , function (req, res) {
                const validation = validationResult(req);
                if (!validation.isEmpty()) {
                    const painting = req.body;
                    res.render('insertPainting.ejs', { isUpdate: false, errors: validation.errors, painting: painting });
                } else {
                    addPaintingController(app, req, res);
                }
            });
    },
    selectObraPorId: (app) => {
        app.get('/home', function (req, res) {
            const idObra = parseInt(req.query.idobra);
            selectById(idObra, (error, result) => {
                if (result && result.length > 0) {
                    res.render("obraindividual.ejs", { paintings: result });
                } else {
                    res.redirect('/');
                }
            });
        });
    },
    editarObraPorId: (app) => {
        app.get('/editar', function (req, res) {
            const idObra = parseInt(req.query.idobra);
            selectById(idObra, (error, result) => {
                if (result && result.length > 0) {
                    res.render('insertPainting.ejs', { isUpdate: true, errors: [], painting: result[0] });
                } else {
                    res.redirect('/inserirobra');
                }
            });
        });

    },
    updateObraPorId:(app) => {
        app.post('/alterar',
            check('nome').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('artista').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('ano').isLength({ min: 4, max: 4 }).withMessage('Ano deve ter apenas 04 caracteres.').isNumeric().withMessage('Somente números são aceitos no ano.').isInt({ min: 0, max: 2100 }).withMessage('Ano deve estar entre 0 e 2100'),
            check('comentarios').isLength({ min: 1, max: 250 }).withMessage('Comentário deve ter pelo menos entre 01 e 250 caracteres'),
            check('urlimagem').isURL().withMessage('Url da imagem deve conter um link')
            , function (req, res) {
                const validation = validationResult(req);
                if (!validation.isEmpty()) {
                    const painting = req.body;
                    res.render('insertPainting.ejs', { isUpdate: true, errors: validation.errors, painting: painting });
                } else {
                    updateById(app, req, res);
                    res.redirect('/');
                }
            });
        }

    /*,
    error: (app) =>{
        app.get('*', function(req, res){
            error(app, req, res);
        });
    }*/
}


/*function metodoDeEntrada() {
    metodoQueChamaCallback(67, (resultado, resultado2) => {
        console.log(resultado);
        console.log(resultado2);
    });
}

function metodoQueChamaCallback(id, callback) {
    const result = id * 50;
    const result2 = id - 30;
    // callback(result, result2);
    console.log(result);
        console.log(result2);
}*/