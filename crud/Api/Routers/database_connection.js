const { MongoClient } = require('mongodb');// 
const url = 'mongodb://127.0.0.1:27017'; // Update the connection string
const database = 'data';
const client = new MongoClient(url);

async function dbConnect() {
  try {
    await client.connect();
    const db = client.db(database);
    return db.collection('student_emp');
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  // } finally {
  //   // Close the connection after retrieving data
  //   await client.close();
  // }
}
}

module.exports=dbConnect;


