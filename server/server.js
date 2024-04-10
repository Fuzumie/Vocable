const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Word =  require('./models/wordModel')
const userRoutes = require('./routes/user')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

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


  app.use('/api/user', userRoutes)


  app.post('/api/word', async (req, res) => {
  try{
    const word=await Word.create(req.body);
    res.status(200).json(word);
  } catch(error){
    res.status(500).json({message:error.message})
  }

});
 
  



app.post('/', async (req, res)=>{
    const{email, password}=req.body
    try{
      const check=await User.findOne({email:email})

      if(check){
        res.json("exist")
      }
      else{
        res.json("not")
      }
    }
    catch(e){
      res.json("not")
    }
})

app.post('/signup', async (req, res) => {
  const { email, password } = req.body

  const data = {
    email: email,
    password: password // Corrected the typo here
  }

  try {
    const check = await User.findOne({ email: email })

    if (check) {
      res.json("exist")
    } else {
      await User.create([data])
      res.json("not")
    }
  } catch (e) {
    res.json("error")
  }
})
