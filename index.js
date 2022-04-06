require('dotenv').config();
const helmet = require('helmet');
const crypto = require("crypto");
const enforceSSL = require('./app/MW/enforceSSL');


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
    res.locals.nonce = crypto.randomBytes(150).toString("base64");
    next();
});

// On lancera notre app derriere un proxie => Si la valeur est true, l’adresse IP du client est interprétée comme étant l’entrée la plus à gauche dans l’en-tête X-Forwarded-*.
app.set('trust proxy', true);

// on redirige tout en HTTPS !
//app.use(enforceSSL());

app.use(helmet());
// https://ponyfoo.com/articles/content-security-policy-in-express-apps
//configuration de nos header !
// https://connect.ed-diamond.com/MISC/misc-101/vos-entetes-https-avec-helmet

 app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [`'none'`, ],
            "script-src": [(_, res) => `'nonce-${res.locals.nonce}'`, `'strict-dynamic'`, "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"], //'strict-dynamic' allows the execution of scripts dynamically added to the page, as long as they were loaded by a safe, already-trusted script https://web.dev/strict-csp/?utm_source=devtools https://www.w3.org/TR/CSP3/#strict-dynamic-usage 
            "img-src": [`'self'`, "https://filedn.eu/lD5jpSv048KLfgLMlwC2cLz/RB.png"],
            "font-src": ["http://localhost:5000/fonts/glyphicons-halflings-regular.woff", "http://localhost:5000/fonts/glyphicons-halflings-regular.ttf", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.ttf"],

            "style-src": ["'unsafe-inline'", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css", "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", `'self'`],
            "base-uri": ["'none'"],
            "object-src": ["'none'"],
            "connect-src":["https://www.google-analytics.com/"], //https://w3c.github.io/webappsec-csp/#directive-connect-src // api find ip => "https://api.ipify.org"
            //"form-action":["https://romainboudet.fr/"],
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
    }), 
    // Géré par NGINX
     /* helmet.hsts({
        maxAge: 31536000,
        preload: true,
        includeSubDomains: true,
      }),  */
       helmet.frameguard({
          action:"deny",
      }), 
       helmet.expectCt({
        maxAge: 86400,
        enforce: true,
        //reportUri: "Et faudrait lui donner quelque chose d'autre là.. 😉 ",
      }) 

    )
 
// Géré par NGINX
/* app.use((req, res, next) => {
    res.setHeader(
        "Permissions-Policy",
        "geolocation=(), fullscreen=(), autoplay=(), camera=(), display-capture=(), document-domain=(), fullscreen=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), screen-wake-lock=(), xr-spatial-tracking=()"
      );
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
}); */
// Géré par NGINX
//app.set('x-powered-by', false);

//pour géreer les donnée en post et réceptionné un req.body !
app.use(express.urlencoded({extended: true}));



//on ne va pas utiliser les fichiers html fournis mais des vues ejs

app.use(express.static('./app/public'));


//Mon routeur
app.use(router);

app.listen(port, () => console.log(`API running on port ${port}`))