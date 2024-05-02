const express = require( 'express' );
const requireAuth = require( '../middleware/requireAuth');
const {createVocab, getVocab, deleteVocab, updateVocab, addWord, deleteWord} = require("../controllers/vocabController")
const router = express.Router();


router.use(requireAuth);

router.get('/', getVocab);
router.post('/', createVocab);
router.get('/', getVocab);
router.delete('/:id', deleteVocab);
router.put('/:id', updateVocab);
router.post("/addword/:id", addWord);
router.delete("/deleteword/:vocab_id/:word_id", deleteWord);

module.exports = router;