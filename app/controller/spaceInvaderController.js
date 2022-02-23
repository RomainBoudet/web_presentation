const Winner = require('../model/winner');
const validator = require('validator');
const {
    formatLongBDD
} = require('../service/date');
const {
    formatToast
} = require('../service/date');
const {sendEmailWithIp} = require("../service/sendMail");




const spaceInvaderController = {

    findWinners: async (req, res) => {
        try {

            const allWinners = await Winner.findAllWithoutIpAndDate();
            console.log("allWinners in spaceInvaderController ===> ", allWinners);

            return res.status(404).render(`erreur`, {
                allWinners
            });

        } catch (error) {
            console.log("Erreur dans la méthode findWinners du spaceInvaderController : ", error);
            return res.status(500).end();
        }
    },

    insertWinner: async (req, res) => {
        try {
            // je récupére le nom, le prenom, et le score 
            const nom = validator.trim(req.body.nom);
            const prenom = validator.trim(req.body.prenom);

            //nom et prenom ne doivent pas dépasser 30 caractéres et score doit être un entier entre 999 et 9999.
            if (!validator.isInt(req.body.score, {
                    min: 799,
                    max: 9999
                })) {
                console.log("Erreur dans les score !");
                const allWinners = await Winner.findAllWithoutIpAndDate();
                return res.status(404).render(`erreur`, {
                    allWinners
                });
            }

            const score = parseInt(req.body.score, 10);

            //mais aussi l'IP et la date,
            const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            console.log("clientip ==> ", clientIp);



            if (nom.length > 30 || prenom.length > 30 || nom.length < 3 || prenom.length < 3) {
                console.log("Erreur dans la longeur des nom / prénom !");
                const allWinners = await Winner.findAllWithoutIpAndDate();
                const message = " Votre nom et votre prénom, doivent comprendre, chacun, entre 3 et 30 caractéres.";
                return res.status(404).render('erreurWithModal', {
                    allWinners,
                    score,
                    message
                });

            }

            //! check, si le nom et le prenom existe déja existe, et les IP ne sont pas les même on refuse ! et on renvoie la modale por un nouveau choix. 
            //! Sinon, on vérifie si le score est supérieur, et seulement si c'est la cas, on update !

            const allWinnersBefore = await Winner.findAll();


            // On prépare et mutualise notre objet que l'on passera au model avec une méthode d'instance :
            const doc = {
                nom,
                prenom,
                ip: `${clientIp}`,
                score,
                createdDate: formatLongBDD(),
            };

            // J'envoie un petit email a l'admin pour lui faire part de la bonne nouvelle !
            const contexte = {
                nom,
                prenom,
                score,
                createdDate: formatLongBDD(),
            };
            const emailSend = process.env.MYEMAIL;
            const template = 'winner';
            const text = `Un nouveau gagnant au space invader avec ${score} points ! Donnée => nom:${nom}, prénom:${prenom}, date:${formatLongBDD()}`;
            const subject = `Un nouveau gagnant au space invader avec ${score} points !`;
            const infoEmail = await sendEmailWithIp(emailSend, subject, contexte, text, template, clientIp);
            if (typeof infoEmail === undefined) {
            console.log("Une érreur est survenue lors de l'envoie, merci de réessayer.");
            } else {
                console.log("Votre message a bien été envoyé !");
            }


            //si on a aucun score déja presént, on peut pas 'find' sur du null..
            if (allWinnersBefore !== null) {


                // je vérifie si le nom proposé existe déja en BDD . Si undefined : pas de doublon
                const isNameFound = allWinnersBefore.find(bdd => bdd.nom === nom && bdd.prenom === prenom);

                if (isNameFound !== undefined) {
                    //Un doublon existe, je vérifie l'IP :
                    if (clientIp === isNameFound.ip) {

                        // IP identique : je vérifie les scores :
                        // On ne met a jour le score uniquement si le nouveau score est supérieur a l'ancien...
                        if (score > isNameFound.score) {

                            //Le nouveau score est supérieur, je l'update !

                            const dataToSend = {
                                filter: {
                                    nom: nom
                                },
                                updateobj: {
                                    $set: {
                                        score: score
                                    }
                                },
                            }


                            //Personalisation du message selon l'ip, dans deux cas !
                            if (clientIp === '88.163.249.23') {

                                const updateWinner = new Winner(dataToSend);
                                const updateWinnerDone = await updateWinner.update();

                                if (updateWinnerDone === null) {

                                    console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'update de doit pas être null ! ");
                                    return res.status(500).end()
                                }

                                const allWinners = await Winner.findAllWithoutIpAndDate();
                                const toastMessage = " Ho ! Il me semble que l'on se connait...! 😘 Ton score est à jour ! 🎉 ";
                                const toastDate = await formatToast();
                                return res.status(404).render(`erreur`, {
                                    allWinners,
                                    toastDate,
                                    toastMessage
                                });


                            };

                            if (clientIp === '86.227.129.119') {

                                const updateWinner = new Winner(dataToSend);
                                const updateWinnerDone = await updateWinner.update();

                                if (updateWinnerDone === null) {

                                    console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'update de doit pas être null ! ");
                                    return res.status(500).end()
                                }

                                const allWinners = await Winner.findAllWithoutIpAndDate();
                                const toastMessage = " Ho ! Enchanté cher colloc ! ✌️  Ton score est à jour ! 🎉";
                                const toastDate = await formatToast();
                                return res.status(404).render(`erreur`, {
                                    allWinners,
                                    toastDate,
                                    toastMessage
                                });


                            }


                            // si ip inconnue..
                            const updateWinner = new Winner(dataToSend);
                            const updateWinnerDone = await updateWinner.update();

                            if (updateWinnerDone === null) {

                                console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'update de doit pas être null ! ");
                                return res.status(500).end()
                            }



                            const allWinners = await Winner.findAllWithoutIpAndDate();
                            const toastMessage = "Votre score a été mis à jour avec succés ! 🎉 ";
                            const toastDate = await formatToast();
                            return res.status(404).render('erreur', {
                                allWinners,
                                toastMessage,
                                toastDate
                            });

                        }

                        // Le nouveau score est inférieur, on renvoie la modale en expliquant ce qui se passe :
                        const allWinners = await Winner.findAllWithoutIpAndDate();
                        const message = "Ce nom et ce prénom sont déja existant. Votre adresse ip étant la même que celle qui a servit à réaliser le précédant score avec ce même nom et prénom, vous pouvez mettre à jour votre score en gardant le nom et prénom du précédent score. Néanmoins, comme votre score actuel est inférieur au précédent score réalisé, celui-çi n'a donc pas été enregistré !";
                        return res.status(404).render('erreurWithModalInfo', {
                            allWinners,
                            score,
                            message
                        });


                    }



                    // Si pas la même ip => on n'autorise pas ce nom...
                    //On renvoie la page avec la modal ouverte
                    const allWinners = await Winner.findAllWithoutIpAndDate();
                    // on renvoie également le score a la vue...
                    const message = "Ces nom et prénom sont déja existant, merci de choisir un nom et/ou un prénom différent.";
                    return res.status(404).render('erreurWithModal', {
                        allWinners,
                        score,
                        message
                    });
                };



                if (clientIp === '88.163.249.23') {

                    const newWinner = new Winner(doc);
                    const newWinnerInsert = await newWinner.insert();

                    if (newWinnerInsert === null) {
                        console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'insert de doit pas être null (L154) ! ");
                        return res.status(500).end()
                    }

                    const allWinners = await Winner.findAllWithoutIpAndDate();
                    const toastMessage = " Ho ! Il me semble que l'on se connait... ! 😘";
                    const toastDate = await formatToast();
                    return res.status(404).render(`erreur`, {
                        allWinners,
                        toastDate,
                        toastMessage
                    });


                }

                if (clientIp === '86.227.129.119') {

                    const newWinner = new Winner(doc);
                    const newWinnerInsert = await newWinner.insert();

                    if (newWinnerInsert === null) {
                        console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'insert de doit pas être null (L154) ! ");
                        return res.status(500).end()
                    }

                    const allWinners = await Winner.findAllWithoutIpAndDate();
                    const toastMessage = " Ho ! Enchanté cher colloc ! ✌️ ";
                    const toastDate = await formatToast();
                    return res.status(404).render(`erreur`, {
                        allWinners,
                        toastDate,
                        toastMessage
                    });


                }


                // on insert des donnée en BDD => méthode d'instance
                const newWinner = new Winner(doc);
                const newWinnerInsert = await newWinner.insert();

                if (newWinnerInsert === null) {
                    console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'insert de doit pas être null (L154) ! ");
                    return res.status(500).end()
                }

                const allWinners = await Winner.findAllWithoutIpAndDate();
                const toastMessage = " Vos nom et prénom ont bien été enregistrés avec votre score ! 🎊 ";
                const toastDate = await formatToast();
                return res.status(404).render(`erreur`, {
                    allWinners,
                    toastDate,
                    toastMessage
                });


            };


            // on insert des donnée en BDD => méthode d'instance
            const newWinner = new Winner(doc);
            const newWinnerInsert = await newWinner.insert();

            if (newWinnerInsert === null) {
                console.log("Erreur dans la méthode insertWinner du spaceinvaderController, Le retour de l'insert de doit pas être null (L182) ! ");
                return res.status(500).end()
            }

            const allWinners = await Winner.findAllWithoutIpAndDate();
            const toastMessage = " 🎊 Vous êtes le premier à avoir repoussé l'invasion ! votre score restera gravé pour l'éternité ! 🎊";
            const toastDate = await formatToast();
            return res.status(404).render(`erreur`, {
                allWinners,
                toastDate,
                toastMessage
            });


        } catch (error) {
            console.log("Erreur dans la méthode insert du spaceInvaderController : ", error);
            return res.status(500).end();
        }
    },





}

module.exports = spaceInvaderController;