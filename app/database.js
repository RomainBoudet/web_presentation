
const chalk = require('chalk');

const { MongoClient } = require('mongodb');


// Connection URL
const url = process.env.MONGO_URL;
const client = new MongoClient(url);


//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TEST DE CONNEXION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      //console.log("Mongodb => test de connexion positif.")


      // Make the appropriate DB calls
       await listDatabases(client);

  } catch (e) {
      console.error("Erreur dans le connecteur Mongo :", e);
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

  const isDbFound = databasesList.databases.find(bdd => bdd.name === process.env.MONGO_DBNAME);

  if (isDbFound === undefined) {

    console.log(chalk.red.bold("La BDD spécifié n'a pas été trouvée !"))

  } else {
      console.log("BDD Mongo utilisée => ", isDbFound);
  }

};


// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database

// https://docs.mongodb.com/drivers/node/current/fundamentals/connection/

// https://www.mongodb.com/fr-fr/basics/create-database 
// https://www.mongodb.com/basics/crud#:~:text=The%20basic%20methods%20of%20interacting,the%20data%20in%20your%20databases

// https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/limit/

//! DOC de réf => https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne 
//! https://www.mongodb.com/developer/quickstart/node-crud-tutorial/#update



//! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIN DES TEST DE CONNEXION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


module.exports = client;


