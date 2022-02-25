const mongo = require('../database');
const {
    all
} = require('../router');

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

            const allWinners = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).aggregate([{
                $setWindowFields: {
                    //partitionBy:
                    sortBy: {
                        score: -1
                    },
                    output: {
                        rang: {
                            $denseRank: {}
                        }
                    }
                },

            }, 
            // si rang vaut 1 $eq ou $cond
            // alors j'override rang avec des valeur que je veux ...
            {
                $addFields: { rang:
                    {$cond: { if: { $eq: [ "$rang", 1 ] }, then: "🎊 1 🎊" , else: "$rang" }}
                }
              },
            ]).toArray();

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
     * Méthode chargé d'aller chercher certaines informations relatives à tous les winners en base de donnée
     * @returns - tous les winners présent en BDD
     * @static - une méthode static
     * @async - une méthode asynchrone
     */
    static async findAllWithoutIpAndDate() {

        try {
            await mongo.connect();

            /* const query = {};
            const sort = {
               score: -1
            };
            const projection = {
                _id: 0, // je ne veux pas l'id...
                rang: 1,
                nom: 1,
                prenom: 1,
                score: 1,
            };  
            const allWinners = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).find(query).sort(sort).project(projection).toArray();
            https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/project/
            */


            // https://docs.mongodb.com/manual/reference/operator/aggregation/rank/
            // On utilise aggregate pour faire une autre données => les rangs !
            const allWinners = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).aggregate([{
                $setWindowFields: {
                    //partitionBy:
                    sortBy: {
                        score: -1
                    },
                    output: {
                        rang: {
                            $denseRank: {}
                        }
                    }
                },

            }, 
            // si rang vaut 1 ($eq) alors j'applique la condition ($cond)
            // alors j'override rang avec des valeur que je veux ...
            {
                $addFields: { rang:
                    {$cond: { if: { $eq: [ "$ip", `${process.env.IPTAVERN}` ] }, then: {$concat:["✨ ",{$toString:"$rang"}, " ✨", " VIP"]}, else: "$rang" }}
                }
              },
              {
                $addFields: { rang:
                    {$cond: { if: { $eq: [ "$rang", "✨ 1 ✨ VIP" ] }, then: "🎊 1 🎊 VIP" , else: "$rang" }}
                }
              },
              {
                $addFields: { rang:
                    {$cond: { if: { $eq: [ "$rang", 1 ] }, then: "🎊 1 🎊" , else: "$rang" }}
                }
              },
            {
                // je filtre les données voulue !
                $project: {
                    _id: 0, // je ne veux pas l'id...
                    rang: 1,
                    nom: 1,
                    prenom: 1,
                    score: 1,
                    test:1,
                }
            }]).toArray();

            // (on aurrait ausssi put utiliser l'objet projection défini plus haut et faire ==> .aggregate().project(projection).toArray();)

            //reçoit un tableau d'objet 
            //console.log("allWinners in model, methode findAllWithoutIpAndDate => ", allWinners);

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
     * Méthode chargé d'aller chercher une information relative à un(e) winner en base de donnée
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
     * Méthode chargé d'aller insérer une donnée relatives à un(e) winner en base de donnée
     * @returns - un winners présent en BDD
     * @async - une méthode asynchrone
     */

    async insert() {

        try {
            await mongo.connect();

            const oneWinner = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).insertOne(this);
            //console.log(' oneWinner dans le model  =>',  oneWinner);


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

    /**
     * Méthode chargé d'aller mettre a jour une information relative à un(e) winner en base de donnée
     * @returns - un winners présent en BDD
     * @async - une méthode asynchrone
     */

    async update() {

        try {
            await mongo.connect();

            const oneWinner = await mongo.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION).updateOne(this.filter, this.updateobj);

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