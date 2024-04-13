const Vocabulary = require("../models/vocabModel");

const createVocab = async (req, res)=>{
    const user_id = req.user._id

    const {name} = req.body
    
    const created_vocab = await Vocabulary.create({
        name,
        owner: user_id
    })

    res.status(201).send(created_vocab)
}

const getVocab = async (req, res)=>{
    const user = req.user
    const vocabs = await Vocabulary.find({owner:user._id})
    res.status(200).send(vocabs)
}

const deleteVocab = async (req, res)=>{
    const user = req.user
    const vocab = await Vocabulary.findById(req.params.id)

    if (vocab.owner.toString() !==user._id.toString()) {
        res.status(401)
        throw new Error("Unauthorized access")
    }
    await Vocabulary.findByIdAndRemove(req.params.id)
    res.status(204).end
}

const updateVocab = async (req, res)=>{
    const user = req.user
    const id = req.params.id

    const vocab = await Vocabulary.findByIdI(id)
    
    if (vocab.owner.toString() !==user._id.toString()) {
        res.status(401)
        throw new Error("Unauthorized access")
    }

    const updated_vocab = await Vocabulary.findByIdAndUpdate(id, {name: req.body.name}, {new: true})
    res.status(200).send(updated_vocab)
}

const addWord = async (req, res) => {
    try {
        const { name, word, definitions } = req.body;
        const vocab = await Vocabulary.findOne({ name, owner: req.user._id });

        if (!vocab) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }

        vocab.words.push({ word, definitions });
        await vocab.save();

        res.status(200).json({ message: "Word added successfully", vocabulary: vocab });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    createVocab,
    getVocab,
    updateVocab,
    deleteVocab,
    addWord
}