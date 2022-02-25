const {
    rateLimitView
} = require('./rateLimitView');
const rateLimit = require('express-rate-limit');
const RedisStore = require("rate-limit-redis");
const {
    createClient
} = require('redis');

// On crée un `node-redis` client basé sur le port 6379 par défault. Redis V4, welcome to the promises !!
// on s'en servira pour stocker nos ip qui tente de contacter la route post / 
// il seront préfixé dans redis avec : romainboudet.fr/IP-ratelimite/
let client;
(async () => {
    client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.set('key', 'value');
    await client.get('key');
})();


// le MW limitant le nombre de requetes pour un user (defense contre les attaques par Brute-Force ou le flooding de mail...)
const apiLimiter = rateLimit({
    windowMs: 3600 * 1000 * 12, // la fenetre de tir pour le nombre de connexion : 12h
    message: rateLimitView(), // une vue qui renvoie le nombre d'email max possible et l'explication du refus !
    max: 5, //le nombre de connexion max pour la fenetre donnée.
    standardHeaders: true, //retourne le nombre de connexion restante dans le `RateLimit-*` headers
    store: new RedisStore({ // la config pour stocker ça dans REDIS 
        sendCommand: (...args) => client.sendCommand(args),
        prefix: "romainboudet.fr/IP-ratelimite/", // le préfixe.
    }),

});

module.exports = {
    apiLimiter,
};