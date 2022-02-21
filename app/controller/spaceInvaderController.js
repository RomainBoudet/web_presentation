const Winner = require('../model/winner');
const validator = require('validator');
const {
    formatLongBDD
} = require('../service/date');
const { checkout } = require('../router');


const spaceInvaderController = {

    findWinners: async (req, res) => {
        try {

            const allWinners = await Winner.findAllWithoutIpAndDate();
            console.log("allWinners in spaceInvaderController ===> ", allWinners);

            return res.status(404).render(`erreur`, {
                allWinners
            });

        } catch (error) {
            console.log("Erreur dans la méthode insert du spaceInvaderController : ", error);
            return res.status(500).end();
        }
    },

    insertWinner: async (req, res) => {
        try {
            // je récupére le nom, le prenom, 
            console.log("req.body ==>> ", req.body);
            const {
                nom,
                prenom,
                score
            } = req.body;

            //const allWinnersBefore = await Winner.findAll();

            //! faire un calcul des rang !
            // https://docs.mongodb.com/manual/reference/operator/aggregation/rank/


            // je fais des vérif avant insertion !
            //nom et prenom ne doivent pas dépasser 20 caractéres et score doit être un entier entre 999 et 9999.


            if (!validator.isInt(score, {
                    min: 9,
                    max: 9999
                })) {
                console.log("Erreur dans les score !");
                const allWinnersBis = await Winner.findAllWithoutIpAndDate();
                return res.status(404).render(`erreur`, {
                    allWinnersBis
                });
            }

            //! check, si le nom ou le prenom existe déja existe déja, on refuse ! et on renvoie la modale por un nouveau choix. 
            //! si IP identique on accepte de prendre le même nom ! 



            if (nom.length > 20 || prenom.length > 20) {
                console.log("Erreur dans la longeur des nom / prénom !");
                const allWinnersBis = await Winner.findAllWithoutIpAndDate();
                return res.status(404).render(`erreur`, {
                    allWinnersBis
                });
            }

            //mais aussi l'IP et la date,
            const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            //console.log("clientip ==> ", clientIp);



            //
            const doc = {
                nom,
                prenom,
                ip: `${clientIp}`,
                score:parseInt(score, 10),
                createdDate: formatLongBDD(),
            };

            // on insert des donnée en BDD => méthode d'instance
            const newWinner = new Winner(doc);
            const insertWinner = await newWinner.insert();
            //console.log("insertWinners ==> ", insertWinner); 
          /*   insertWinners == > {
                acknowledged: true,
                insertedId: new ObjectId("6213dee425aeec3f987339b1")
            } */

            const allWinners = await Winner.findAllWithoutIpAndDate();

            return res.status(404).render(`erreur`, {
                allWinners
            });


        } catch (error) {
            console.log("Erreur dans la méthode insert du spaceInvaderController : ", error);
            return res.status(500).end();
        }
    },





}

module.exports = spaceInvaderController;