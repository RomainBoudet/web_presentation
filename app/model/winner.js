const mongo = require('../database');

class Winner {

    id;
    ip;
    nom;
    prenom;
    score;
    createdDate;

    /**
     * @constructor
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }



    /**
     * Méthode chargé d'aller chercher toutes les informations relatives à tous les winners en base de donnée
     * @returns - tous les winners présent en BDD
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
    static async findAll() {

        try {
            await mongo.connect();

            const allWinners = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).find({}).toArray();
            //console.log('allWinners dans le model  =>', allWinners);

            //const oneWinner = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).findOne({});
            //console.log(' oneWinner dans le model  =>',  oneWinner);

            if (!allWinners) {
                return null;
            } 

            return allWinners;

        } catch (error) {

            console.log("Erreur dans le model Winner, dans la méthode findAll :", error);
            await mongo.close();
            return res.stattus(500).end();

        } finally {

            await mongo.close();

        }

    }

}

module.exports = Winner;