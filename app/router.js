const Winner = require('./model/winner');

const {Router} = require('express');
const router = Router();
// le rate limiter est déporté dans un service.
const {apiLimiter} = require('./service/rateLimitRedisSetting');

const mainController = require('./controller/mainController');
const spaceInvaderController = require('./controller/spaceInvaderController');

// implémentation de joi, avec un validator  dans le dossier "services".



// Un petit service pour néttoyer nos entrée et enlever tous caractéres spéciaux. 
const {clean} = require('./service/sanitiz');

// Config du module pour limiter le nombre de connexion sur la route /connexion => empeche toute attaque par Brute-Force et flood 
//Basé sur l'ip


router.get('/', mainController.main);

router.get('/secnumacademie', mainController.anssi);

router.get('/cv', mainController.cv);

router.get('/dossier_de_projet', mainController.dossier_de_projet);

router.post('/',apiLimiter, clean, mainController.mail);

//space Invader 

router.post('/winner/insert', clean, spaceInvaderController.insertWinner)

//router.get('/csp/report', mainController.csp);

/**
 * Redirection vers une page 404
 */
 router.use(async(_, res) => {

  const allWinners = await Winner.findAllWithoutIpAndDate();
    res.status(404).render(`erreur`, {allWinners});
  });
  

module.exports = router;