const { home, selectById, updateById, deleteById } = require('../controllers/home');
const { tarsila } = require('../controllers/tarsila');
const { portinari } = require('../controllers/portinari');
const { addPaintingController } = require('../controllers/home');
const { check, validationResult } = require('express-validator');
const { userRegisterController } = require('../controllers/userRegister');
const { authenticateUser } = require('../controllers/authenticate');
const isAuthenticated = require('../controllers/isAuthenticated');
const app = require('../../config/server');

module.exports = {
    home: (app) => {
        app.get('/', function (req, res) {
            home(app, req, res);
        });
    },
    tarsila: (app) => {
        app.get('/tarsila', isAuthenticated, function (req, res) {
            tarsila(app, req, res);
        });
    },
    portinari: (app) => {
        app.get('/portinari', isAuthenticated, function (req, res) {
            portinari(app, req, res);
        });
    },
    insertPainting: (app) => {
        console.log("Rota do formulário para inserção de obras");
        app.get('/inserirobra', isAuthenticated, function (req, res) {
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
        app.get('/home', isAuthenticated, function (req, res) {
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
        app.get('/editar', isAuthenticated, function (req, res) {
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
    updateObraPorId: (app) => {
        app.post('/alterar',
            check('nome').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('artista').isLength({ min: 1, max: 100 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
            check('ano').isLength({ min: 4, max: 4 }).withMessage('Ano deve ter apenas 04 caracteres.').isNumeric().withMessage('Somente números são aceitos no ano.').isInt({ min: 0, max: 2100 }).withMessage('Ano deve estar entre 0 e 2100'),
            check('comentarios').isLength({ min: 1, max: 250 }).withMessage('Comentário deve ter pelo menos entre 01 e 250 caracteres'),
            check('urlimagem').isURL().withMessage('Url da imagem deve conter um link'),
            function (req, res) {
                const validation = validationResult(req);
                if (!validation.isEmpty()) {
                    const painting = req.body;
                    res.render('insertPainting.ejs', { isUpdate: true, errors: validation.errors, painting: painting });
                } else {
                    updateById(app, req, res);
                    res.redirect('/');
                }
            });
    },
    cadastraUsuario: (app) => {
        app.get('/cadastro', function (req, res) {
            res.render('cadastro.ejs', { errors: [], userRegister: [] });
        });

    },
    userRegisterService: (app) => {
        app.post('/cadastroUsuario',
            check('usuario').trim().isLength({ min: 6, max: 20 }).withMessage('Nome deve ter pelo menos entre 6 e 20 caracteres'),
            check('email').isEmail().isLength({ max: 20 }).withMessage('O campo deve ser um email válido'),
            check('password').trim().isLength({ min: 6, max: 20 }).withMessage('Senha deve ter pelo menos entre 6 e 20 caracteres'),
            function (req, res) {
                const validation = validationResult(req);
                if (!validation.isEmpty()) {

                    res.render('cadastro.ejs', { errors: validation.errors, userRegister: userRegister });
                } else {
                    const userRegister = req.body;
                    userRegisterController(app, userRegister, res);
                    console.log("Validação funcionou!!");
                    res.redirect('/');
                }
            });
    },
    loginUser: (app) => {
        app.get('/login', function (req, res) {
            res.render('login.ejs')
        });
    },
    authenticate: (app) => {
        app.post('/autenticacao', function (req, res) {
            authenticateUser(app, req, res);
        });
    },
    logOff: (app) => {
        app.post('/logout', function (req, res) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erro ao encerrar sessão:', err);
                }
                // Redirecione para a página de login ou qualquer outra página apropriada após o logout
                res.redirect('/login'); // ou res.redirect('/');
            });
        });
    },
    deletarObraPorId: (app) =>
        app.get('/deletar', isAuthenticated, function(req,res){
            deleteById(app, req, res); 
        })
}
/*,
error: (app) =>{
    app.get('*', function(req, res){
        error(app, req, res);
    });
}*/



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