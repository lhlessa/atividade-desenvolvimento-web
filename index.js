const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.home(app);
routes.tarsila(app);
routes.portinari(app);
//routes.error(app);
routes.insertPainting(app);
routes.savePainting(app);
routes.selectObraPorId(app);
routes.editarObraPorId(app)
routes.updateObraPorId(app);
routes.cadastraUsuario(app);
routes.userRegisterService(app);
routes.loginUser(app);
routes.authenticate(app);
routes.logOff(app);