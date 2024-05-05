const express = require( 'express' );
const requireAuth = require( '../middleware/requireAuth');
const {createVocab, getVocab, deleteVocab, updateVocab, addWord, deleteWord, searchWord, searchUserVocab} = require("../controllers/vocabController")
const router = express.Router();


router.use(requireAuth);

router.get('/', getVocab);
router.get('/getUserVocab', searchUserVocab);
router.post('/', createVocab);
router.get('/', getVocab);
router.get('/searchWord', searchWord);
router.delete('/:id', deleteVocab);
router.put('/:id', updateVocab);
router.post("/addword/:id", addWord);
router.delete("/deleteword/:vocab_id/:word_id", deleteWord);

module.exports = router;