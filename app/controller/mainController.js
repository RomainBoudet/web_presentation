const path = require('path');
const {
    sendEmail
} = require('../service/sendMail');
const validator = require('validator');
const {
    formatLong
} = require('../service/date');
const geoip = require('geoip-lite');







const mainController = {


    main: (req, res) => {

        res.status(200).render("index");
    },

    anssi: (req, res) => {

        res.status(200).sendFile(path.resolve(__dirname + `./../public/attestation_secnumacademie.pdf`));
        res.setHeader('Content-type', 'application/pdf');
    },

    cv: (req, res) => {

        res.status(200).sendFile(path.resolve(__dirname + `./../public/romain_CV.pdf`));
        res.setHeader('Content-type', 'application/pdf');
    },

    dwwm: (req, res) => {

        res.status(200).sendFile(path.resolve(__dirname + `./../public/DProjet-Boudet_Romain.pdf`));
        res.setHeader('Content-type', 'application/pdf');
    },


    // un futur logger sera a configurer !
    /* csp: (req, res) => {

        winston.warn(`CSP header violation`, req.body[`csp-report`])
        res.status(204).end()


    } */

    mail: async (req, res) => {
        try {
            
            // on utilise cette valeur puisqu'on est derriere un proxy...
            const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            // avec l'ip je récupére quelques détail sur la localisation possible...
            const geo = geoip.lookup(clientIp);

            // Je vérifie que mon body contient bien un email, que celui ci est bien un email,  

            //on vérifie que l'email a un format valide
            if (!validator.isEmail(req.body.email)) {
                //le format de l'email est incorrect
                return res.render('index', {
                    errorMail: 'Le format de l\'email est incorrect'
                });
            }

            const email = req.body.email;

            // on trim le message
            const textArea = validator.trim(req.body.textArea);


            // on vérifit que le contenu ne soit pas égal a zéro
            if (validator.isEmpty(textArea, {
                    ignore_whitespace: false
                })) {
                //le contenu du mail est égal a zéro.
                return res.render('index', {
                    errorTextArea: 'Le format de votre message est incorrect'
                });
            }

            //on vérifit que le contenu du message soit supérieur a 10 et inf a 5000 caractéres

            if (textArea.length < 10) {
                return res.render('index', {
                    errorTextArea: 'Le format de votre message est incorrect, celui-ci doit comporter plus de 10 caractéres pour être envoyé.'
                });
            }

            if (textArea.length > 5000) {
                return res.render('index', {
                    errorTextArea: 'Le format de votre message est incorrect, celui-ci doit comporter moins de 5000 caractéres pour être envoyé.'
                });
            }

            //Je définit les variables pour mes mails :
            let contexte = {};

            if (geo === null) {
                contexte = {
                    email,
                    textArea,
                    dateEnvoi: formatLong(new Date()),
                    ip: clientIp,

                };

            } else {
                contexte = {
                    email,
                    textArea,
                    dateEnvoi: formatLong(new Date()),
                    ip: clientIp,
                    ville: geo.city,
                    pays: geo.country,
                    coord: geo.ll,
                    precision: geo.area,

                };
            }


            if (req.body.copy === 'true') {
                // j'envoie le mail et une copie a son expéditeur. Pour des raison de sécurités, je renseigne l'adresse ip dans chaque copie de mail. 

                // Le message que reçois l'expéditeur du message, sur la boite mail qu'il a rentrée.
                const emailSend = email;
                const text = `Envoyé par l'email ${email} : ${textArea}`;
                const template = 'email';
                const subject = "La copie de votre message envoyé via le site romainboudet.fr";
                const infoEmail = await sendEmail(emailSend, subject, contexte, text, template);

                // Le message que je reçois sur ma boite perso :
                const emailSend2 = process.env.MYEMAIL;
                const template2 = 'emailPerso';
                const subject2 = "Un nouveau message via romainboudet.fr avec copie à l'expéditeur";
                const infoEmail2 = await sendEmail(emailSend2, subject2, contexte, text, template2);


                // Prise en compte des différentes configurations d'érreurs
                if (typeof infoEmail === undefined && typeof infoEmail2 === undefined) {
                    return res.render('index', {
                        errorGeneral: "Une érreur est survenue, merci de réessayer."
                    });
                } else if (typeof infoEmail !== undefined && typeof infoEmail2 !== undefined) {
                    return res.render('index', {
                        info: "Votre message et sa copie sur votre email ont bien été envoyés !"
                    });
                } else if (typeof infoEmail === undefined && typeof infoEmail2 !== undefined) {
                    return res.render('index', {
                        errorGeneral: " Une érreur est survenue, seule une copie sur votre boite mail a pu être envoyée mais Romain Boudet n'a reçu aucun email !"
                    });
                } else if (typeof infoEmail !== undefined && typeof infoEmail2 === undefined) {
                    return res.render('index', {
                        info: "Une érreur est survenue, Romain Boudet a bien reçu votre message mais aucune copie n'a pu vous être envoyée !"
                    });
                }


            } else {
                // j'envoie le mail, sans copie !

                const emailSend = process.env.MYEMAIL;
                const text = `${textArea}`;
                const template = 'emailPerso';
                const subject = "Un nouveau message via romainboudet.fr sans copie à l'expéditeur";
                const infoEmail = await sendEmail(emailSend, subject, contexte, text, template);


                if (typeof infoEmail === undefined) {
                    return res.render('index', {
                        errorGeneral: "Une érreur est survenue lors de l'envoie, merci de réessayer."
                    });
                } else {
                    return res.render('index', {
                        info: "Votre message a bien été envoyé !"
                    });
                }
            }


        } catch (error) {
            console.trace(error);
            res.status(500).end();
        }


    },





};

module.exports = mainController;