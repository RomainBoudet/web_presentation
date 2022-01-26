require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const crypto = require("crypto");


const express = require('express');
const router = require('./app/router');

const app = express();

// Pour récupérer les données du formulaire
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT;

//configuration pour utiliser EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Config for sub-resources integrity 
app.use((_, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("hex");
    next();
});

/*  */

app.use(helmet());
// https://ponyfoo.com/articles/content-security-policy-in-express-apps
//configuration de nos header !
 app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [`'self'`, ],
            "script-src": [ (_, res) => `'nonce-${res.locals.nonce}'`],
            "img-src": [`'self'`, "https://filedn.eu/lD5jpSv048KLfgLMlwC2cLz/RB.png"],
            "font-src": ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.ttf"],

            "style-src": ["'unsafe-inline'", `'self'`], //
            "style-src-elem": [`'self'`, (_, res) => `'nonce-${res.locals.nonce}'`], //
            "base-uri": ["'none'"],
            "object-src": ["'none'"],
            //reportUri: `/csp/report`,

            upgradeInsecureRequests: []
        },
       // reportOnly: true
    }),
    helmet.dnsPrefetchControl({
        allow: true, //j'autorise la prélecture DNS pour gagner du temps sur mobile.. => https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
    }),
    helmet.expectCt({
        maxAge: 0,
        enforce: true, //demander qu'un navigateur applique toujours l'exigence de transparence du certificat SSL ! //TODO  repasser a true
        //reportUri: "https://example.com/report", Pourrait être intérresant de se prévoir une url pour l'admin avec aussi 
    }))
 
// ATTENTION cette protection contre les reflextive XSS pourrait être la porte ouverte pour les attaques XS search.. :
//https://infosecwriteups.com/xss-auditor-the-protector-of-unprotected-f900a5e15b7b
//https://portswigger.net/research/top-10-web-hacking-techniques-of-2019
//https://github.com/xsleaks/xsleaks/wiki/Browser-Side-Channels
// risque de XS leak important, des attaquant peuvent soutirer des infos en provoquant des faux postive, l'API XSS filter étant sensible a ce type d'attaque..
// cette option override celle de helmet qui la méttait a 0
app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});

app.set('x-powered-by', false);



 /* app.use(cors({
    optionsSuccessStatus: 200,
    origin: "*", //! a pas oublier pour la prod ! => remplacer par le bon nom de domaine
    methods: "GET, OPTIONS", // ok via un array aussi
    allowedHeaders: ['Content-Type'],
}));  */

//on ne va pas utiliser les fichiers html fournis mais des vues ejs
//le middleware static servira uniquement pour les fichiers css
app.use(express.static('./app/public'));


//Mon routeur
app.use(router);

app.listen(port, () => console.log(`API running on port ${port}`))