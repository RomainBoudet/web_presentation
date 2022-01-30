const {Router} = require('express');
const router = Router();
// le rate limiter est déporté dans un service.
const {apiLimiter} = require('./service/rateLimitRedisSetting');

const mainController = require('./controller/mainController');

// Un petit service pour néttoyer nos entrée et enlever tous caractéres spéciaux. 
const {clean} = require('./service/sanitiz');

// Config du module pour limiter le nombre de connexion sur la route /connexion => empeche toute attaque par Brute-Force et flood 
//Basé sur l'ip


router.get('/', mainController.main);

router.get('/secnumacademie', mainController.anssi);

router.get('/cv', mainController.cv);

router.get('/dwwm', mainController.dwwm);

router.post('/',apiLimiter, clean, mainController.mail);

//router.get('/csp/report', mainController.csp);

module.exports = router;