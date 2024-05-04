require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const vocabRoutes = require('./routes/vocabRoutes');
const wordRoutes = require('./routes/wordRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});



app.use('/api/user', userRoutes);
app.use('/api/vocab', vocabRoutes);
app.use('/api/getwords', wordRoutes);

 

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
