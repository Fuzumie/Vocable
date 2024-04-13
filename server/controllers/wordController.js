const Word = require("../models/wordModel");

const getWords = async(req, res) =>{
    try{
        const words = await Word.find({});
        res.status(200).json(words);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getWords