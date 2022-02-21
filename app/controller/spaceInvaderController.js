const Winner = require('../model/winner');

const spaceInvaderController = {

    insertWinner: async (req, res) => {
        try {
            // je récupére le nom, le prenom, 
            console.log("req.body ==>> ", req.body);
            //mais aussi l'IP et la date,
            const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            console.log("clientip ==> ", clientIp);

            const allWinners = await Winner.findAll();

            console.log("allWinners in spaceInvaderController ===> ", allWinners);


        } catch (error) {
            console.log("Erreur dans la méthode insert du spaceInvaderController : ", error);
            return res.status(500).end();
        }
    },

    delete: async (req, res) => {
        try {




        } catch (error) {
            console.log("Erreur dans la méthode delete du spaceInvaderController : ", error);
            return res.status(500).end();
        }
    },



}

module.exports = spaceInvaderController;