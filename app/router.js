const {Router} = require('express');
const router = Router();

const mainController = require('./controller/mainController');

router.get('/', mainController.main);

router.get('/secnumacademie', mainController.anssi);

router.get('/cv', mainController.cv);



module.exports = router;