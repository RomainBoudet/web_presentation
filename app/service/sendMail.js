const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
var helpers = require('handlebars-helpers')();
const geoip = require('geoip-lite');
const openpgpEncrypt = require('nodemailer-openpgp').openpgpEncrypt;
const fs = require('fs').promises;




//Sendgrid ou MailGun serait préférable en prod...
//https://medium.com/how-tos-for-coders/send-emails-from-nodejs-applications-using-nodemailer-mailgun-handlebars-the-opensource-way-bf5363604f54
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
});


// Config pour les templates et le moteur handlebars lié a Nodemailer
const options = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve(__dirname, "./viewsEmail"),
        defaultLayout: false
    },
    extName: ".hbs",
    viewPath: path.resolve(__dirname, "../viewsEmail"),
};

transporter.use('compile', hbs(options));

/**
 *  
 * Un service permettant d'envoyer un email en prenant en entré (l'email de )
 * Service sendEmailWithIp
 * @module service/sendEmail
 * 
 */
const sendEmail = async (email, subject, context, text, template) => {

    try {
        // l'envoie d'email définit par l'object "transporter"
        const info = await transporter.sendMail({
            from: process.env.EMAIL, //l'envoyeur
            to: email, // le receveur du mail.
            subject, // le sujet du mail
            text, // une variante en texte si pas de html
            template, // une vue hbs
            context, // l'objet que je passe a ma vue, contenant les variables pour mon email !
        });

        console.log(`Un email à bien été envoyé a ${email} : ${info.response}`);
        return info.response;
    } catch (error) {
        console.trace("erreur dans la méthode sendMail du  service sendEmail", error);
    }
};

/**
 * Un service permettant d'envoyer un email avec des données de l'adresse ip (ville, pays, coordonnées, précision) disponible dans le contexte our l'écriture du mail.
 * Service sendEmailWithIp
 * @module service/sendEmailWithIp
 * 
 */
const sendEmailWithIp = async (email, subject, context, text, template, ip) => {

    try {
        const geo = geoip.lookup(ip);
        context.ip = ip;
        if (geo === null) {
            context.ville = false;
            context.pays = false;
            context.coord = false;
            context.precision = false;


        } else {
            context.ville = geo.city;
            context.pays = geo.country;
            context.coord = geo.ll;
            context.precision = geo.area;
        }


        // l'envoie d'email définit par l'object "transporter"
        const info = await transporter.sendMail({
            from: process.env.EMAIL, //l'envoyeur
            to: email, // le receveur du mail.
            subject, // le sujet du mail
            text, // une variante en texte si pas de html
            template, // une vue hbs
            context, // l'objet que je passe a ma vue, contenant les variables pour mon email !

        });

        console.log(`Un email à bien été envoyé a ${email} : ${info.response}`);
        return info.response;
    } catch (error) {
        console.trace("erreur dans la méthode sendMailWithIp du service sendEmail", error);
    }

};

/**
 * Un service permettant d'envoyer un email avec des données de l'adresse ip (ville, pays, coordonnées, précision) disponible dans le contexte our l'écriture du mail.
 * Les emails envoyés sont chiffrés avec une clé PGP
 * Service sendEmailWithIpAndCrypt
 * @module service/sendEmailWithIp
 * 
 */
const sendEmailWithIpAndCrypt = async (email, subject, context, text, template, ip) => {

    try {

        const geo = geoip.lookup(ip);
        context.ip = ip;
        if (geo === null) {
            context.ville = false;
            context.pays = false;
            context.coord = false;
            context.precision = false;


        } else {
            context.ville = geo.city;
            context.pays = geo.country;
            context.coord = geo.ll;
            context.precision = geo.area;
        }
        //const pubkey = fs.readFileSync(process.env.PGPPUBLIKEY, 'utf8') // => si fichier .txt
        const pubkey =  await fs.readFile(process.env.PGPPUBLIKEY,'ascii');

    
        // Pas moyen de signer cet email !! grrr....
       /*  const signingKey = await fs.readFile(process.env.PGPPRIVATEKEY, 'ascii')
        const passphrase = process.env.PASSPHRASE;
        const options = {
            signingKey,
            passphrase,
        }; 
        console.log("signinKey ==> ", signingKey);
        console.log("options == > ", options); */
        //console.log("options.signingKey == > ", options.signingKey);

        //console.log("public key ==> ", pubkey);
        //console.log( "passphrase ==> ",passphrase);
        //"private_key": process.env.GATSBY_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        //https://stackoverflow.com/questions/55459528/using-private-key-in-a-env-file
        //https://github.com/nodemailer/nodemailer-openpgp

        // l'envoie d'email définit par l'object "transporter"
       // transporter.use('stream', openpgpEncrypt(option));
        await transporter.use('stream', openpgpEncrypt());
        const info = await transporter.sendMail({
            from: process.env.EMAIL, //l'envoyeur
            to: email, // le receveur du mail.
            subject, // le sujet du mail
            text, // une variante en texte si pas de html
            template, // une vue hbs
            context,
            encryptionKeys: [pubkey], //
        });

        console.log(`Un email chiffré à bien été envoyé a ${email} : ${info.response}`);

        return info.response;
    } catch (error) {
        console.trace("erreur dans la méthode sendEmailWithIpAndCrypt du service sendEmail", error);
    }
};



module.exports = {
    sendEmail,
    sendEmailWithIp,
    sendEmailWithIpAndCrypt
};