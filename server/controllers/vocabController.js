const Vocabulary = require("../models/vocabModel");
const User = require("..//models/userModel")

const createVocab = async (req, res)=>{
    const user_id = req.user._id

    const {name} = req.body
    
    const created_vocab = await Vocabulary.create({
        name,
        owner: user_id
    })

    await User.findByIdAndUpdate(user_id, { $push: { vocabularies: created_vocab._id } });

    res.status(201).send(created_vocab)
}

const getVocab = async (req, res)=>{
    const user = req.user._id
    const vocabs = await Vocabulary.find({owner:user})
    res.status(200).send(vocabs)
}

const deleteVocab = async (req, res)=>{
    const user = req.user._id
    const vocab = await Vocabulary.findById(req.params.id)

    if (vocab.owner.toString() !==user.toString()) {
        res.status(401)
        throw new Error("Unauthorized access")
    }
    await Vocabulary.findByIdAndRemove(req.params.id)
    res.status(204).end
}

const updateVocab = async (req, res)=>{
    const user = req.user._id
    const id = req.params.id

    const vocab = await Vocabulary.findById(id)
    
    if (vocab.owner.toString() !==user.toString()) {
        res.status(401)
        throw new Error("Unauthorized access")
    }

    const updated_vocab = await Vocabulary.findByIdAndUpdate(id, {name: req.body.name}, {new: true})
    res.status(200).send(updated_vocab)
}

const addWord = async (req, res) => {
    const user = req.user._id
    const vocab_id = req.params.id
    
    try {
        const { word, definition } = req.body;
        const vocab = await Vocabulary.findOne({ _id:vocab_id, owner: user });

        if (!vocab) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }

        vocab.words.push({ word, definition });
        await vocab.save();

        res.status(200).json({ message: "Word added successfully", vocabulary: vocab });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteWord = async (req, res) => {
    const user = req.user;
    const { vocab_id, word_id } = req.params;

    try {
        const vocab = await Vocabulary.findOne({ _id: vocab_id, owner: user._id });

        if (!vocab) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }

        // Remove the word from the words array
        vocab.words = vocab.words.filter(word => word._id.toString() !== word_id);
        await vocab.save();

        res.status(200).json({ message: "Word deleted successfully", vocabulary: vocab });
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
    addWord,
    deleteWord
}