const {
    MongoClient
} = require('mongodb');

const url = process.env.MONGO_URL;

console.log(url);

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";


    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB cluster
        await client.connect();


        // ne fonctionne pas ...
        const mongoCollection = await client.db(process.env.MONGO_DBNAME).collection(process.env.MONGO_DBCOLLECTION);
        const allWinners1 = await mongoCollection.findOne({});
        console.log('allWinners1 dans database  =>', allWinners1);


        //fonctionne !!
        const allWinners = await client.db("pokemon").collection("pokedex").findOne({});
        console.log('allWinners dans database  =>', allWinners);

        // Make the appropriate DB calls
        // await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database

// https://docs.mongodb.com/drivers/node/current/fundamentals/connection/