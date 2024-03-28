const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const mongoose = require('mongoose');
app.use(cors());


const uri = "mongodb+srv://Boxin:e3wqrd@vocabledata.hqzobhy.mongodb.net/?retryWrites=true&w=majority&appName=vocableData";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log('listening');
})