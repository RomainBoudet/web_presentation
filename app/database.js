const { MongoClient } = require('mongodb');


// Connection URL

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

// Database Name


/* async function main() {
    // Use connect method to connect to the server
   await client.connect();
    console.log('Connecté au server Mongo !');

    const allWinners = await client.db("pokemon").collection("pokedex").findOne({});
    console.log('allWinners dans database  =>', allWinners);

    //si je veux utiliser plusieurs collection dans mon app, on export direct db. Pas le cas ici...
    //const db = await client.db(process.env.MONGO_DBNAME);

    // ici je choissi d'exporte directeement la collection et non la DB pour éviter le "db.collection("ma_collection).find()
    //const mongoCollection = await db.collection(process.env.MONGO_DBCOLLECTION);
    //console.log("mongoCollection.db dans le database ==> ", mongoCollection.db);

    //const allWinners2 = await mongoCollection.findOne({});
    //console.log('allWinners2 dans database  =>', allWinners2);
  
    // the following code examples can be pasted here...
  
    return 'Done.';
  }
  
   main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close()); */

    module.exports = client;


