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
const searchWordByContent = async (req, res) => {
    const { word } = req.query;

    try {
      const foundWord = await Word.findOne({ word });
      if (foundWord) {
        // Word exists in the database
        res.json({ exists: true });
      } else {
        // Word does not exist in the database
        res.json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking word:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
module.exports = {getWords, searchWordByContent}