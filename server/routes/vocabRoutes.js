const express = require( 'express' );
const requireAuth = require( '../middleware/requireAuth');
const {createVocab, getVocab, deleteVocab, updateVocab, addWord} = require("../controllers/vocabController")
const router = express.Router();

// Apply requireAuth middleware to all routes in this router
router.use(requireAuth);

// Define routes
router.get('/', getVocab);
router.post('/', createVocab);
router.get('/:id', getVocab);
router.delete('/:id', deleteVocab);
router.put('/:id', updateVocab);
router.post("/addword/:name/words", addWord);

// Export router
module.exports = router;