const mongoose = require('mongoose');

const WordSchema = mongoose.Schema({
  word: { type: String, required: true },
  definition: { type: String, required: true }
});

const Word = mongoose.model('Word', WordSchema);


module.exports = Word;
  
