const mongoose = require('mongoose');

const VocabSchema = mongoose.Schema({
    
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    words: [{
      word: { type: String, required: false },
      definition: { type: String, required: false }
    }]
});

const Vocabulary = mongoose.model('Vocabulary', VocabSchema);


module.exports = Vocabulary;
  
