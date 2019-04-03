import * as express from 'express';
import UsuarioCtrl from '../controllers/UsuarioCtrl';
import PhotoCtlr from '../controllers/photoCtlr';


var router = express.Router();

router.post('/usuarios',UsuarioCtrl.create);
router.post('/loginUser', UsuarioCtrl.login);
router.get('/usuarios',UsuarioCtrl.getUsuarios);
router.put('/login', UsuarioCtrl.loginFirebase);
router.post('/salvarFotos' ,PhotoCtlr.putPhotos);
router.get('/carregarAlbuns/:id', PhotoCtlr.buscarAlbuns);
router.get('/carregarFotos/:id', PhotoCtlr.buscarAlbum);
router.post('/apagarFoto', PhotoCtlr.deletarFoto);
router.put('/addFotos',PhotoCtlr.addFotos);

export = router;