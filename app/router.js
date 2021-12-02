const {Router} = require('express');
const router = Router();

const mainController = require('./controller/mainController');

router.get('/test', mainController.test);

module.exports = router;