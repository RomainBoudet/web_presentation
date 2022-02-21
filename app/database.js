const { MongoClient } = require('mongodb');


// Connection URL

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

// Database Name

let mongoCollection;

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connecté au server Mongo !');

    //si je veux utiliser plusieurs collection dans mon app, on export direct db. Pas le cas ici...
    const db = client.db(process.env.MONGO_DBNAME);

    // ici je choissi d'exporte directeement la collection et non la DB pour éviter le "db.collection("ma_collection).find()
    mongoCollection = db.collection(process.env.MONGO_DBCOLLECTION);

    console.log("mongoCollection.db dans le database ==> ", mongoCollection.db);

    const allWinners = await mongoCollection.find({}).toArray();

    console.log('allWinners dans database  =>', allWinners);
  
    // the following code examples can be pasted here...
  
    return 'done.';
  }
  
   main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

    module.exports = mongoCollection;


