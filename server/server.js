require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Word =  require('./models/wordModel')
const userRoutes = require('./routes/userRoutes')
const vocabRoutes = require('./routes/vocabRoutes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



app.use('/api/user', userRoutes)
app.use('/api/vocab', vocabRoutes)


app.post('/api/word', async (req, res) => {
  try{
    const word=await Word.create(req.body);
    res.status(200).json(word);
  } catch(error){
    res.status(500).json({message:error.message})
  }

});
 

mongoose
  .connect(
    "mongodb+srv://Boxin:e3wqrd@vocabledata.hqzobhy.mongodb.net/Vocable?retryWrites=true&w=majority&appName=vocableData/"
  )
  .then(() => {
    console.log("Connected to database.");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(() => {
    console.log("Connection failed.");
  });
