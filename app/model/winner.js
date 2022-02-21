const collection = require('../database');

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
     * Méthode chargé d'aller chercher toutes les informations relatives à tous les winners en bade de donnée
     * @returns - tous les Adresses présent en BDD
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
    static async findAll() {

        try {
            
            console.log("collection ===> ", collection);

            const allWinners = await collection.find({}).toArray();

            console.log('allWinners dans le model  =>', allWinners);


            if (!allWinners[0]) {
                return null;
            }


            return allWinners;


        } catch (error) {

            console.log("Erreur dans le model Winner, dans la méthode findAll :", error);
        }


    }

}

module.exports = Winner;