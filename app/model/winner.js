const mongo = require('../database');
const { all } = require('../router');

class Winner {

    
    nom;
    prenom;
    ip;
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
            //reçoit un tableau d'objet 
            //console.log("allWinners in model => ", allWinners);

            if (!allWinners[0] || allWinners[0] === undefined) {
                return null;
            }


            //On retourn un tableau d'instance !
            return allWinners.map((item) => new Winner(item));

        } catch (error) {

            console.log("Erreur dans le model Winner, dans la méthode findAll :", error);
            return null;

        } finally {

            await mongo.close();

        }

    }

    /**
     * Méthode chargé d'aller chercher toutes les informations relatives à tous les winners en base de donnée
     * @returns - tous les winners présent en BDD
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
     static async findAllWithoutIpAndDate() {

        try {
            await mongo.connect();

            const query = {};
            const sort = { score:-1 };
            const projection = {_id:0, nom:1, prenom:2, score:3}; //https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/project/

            const allWinners = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).find(query).sort(sort).project(projection).toArray();
            //reçoit un tableau d'objet 
            //console.log("allWinners in model => ", allWinners);

            if (!allWinners[0] || allWinners[0] === undefined) {
                return null;
            }


            //On retourn un tableau d'instance !
            return allWinners.map((item) => new Winner(item));

        } catch (error) {

            console.log("Erreur dans le model Winner, dans la méthode findAllWithoutIpAndDate :", error);
            return null;

        } finally {

            await mongo.close();

        }

    }


    /**
     * Méthode chargé d'aller chercher toutes les informations relatives à un(e) winner en base de donnée
     * @returns - un winners présent en BDD
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
     static async findOne() {

        try {
            await mongo.connect();

            const oneWinner = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).findOne({});
            //console.log(' oneWinner dans le model  =>',  oneWinner);

            if (!oneWinner) {
                return null;
            } 

            // et on retourne l'instance !
            return new Winner(oneWinner);

        } catch (error) {

            console.log("Erreur dans le model Winner, dans la méthode findOne :", error);
            return null;

        } finally {

            await mongo.close();

        }

    }

    /**
     * Méthode chargé d'aller chercher toutes les informations relatives à un(e) winner en base de donnée
     * @returns - un winners présent en BDD
     * @async - une méthode asynchrone
     */

     async insert() {

        try {
            await mongo.connect();

            const oneWinner = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).insertOne(this);
            //console.log(' oneWinner dans le model  =>',  oneWinner);

            console.log("oneWinner dans le model ==> ", oneWinner);

            if (!oneWinner) {
                return null;
            } 

            return oneWinner;

        } catch (error) {

            console.log("Erreur dans le model Winner, dans la méthode insert :", error);
            return null;

        } finally {

            await mongo.close();

        }

    }



}

module.exports = Winner;