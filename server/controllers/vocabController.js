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

const searchUserVocab = async (req, res) => {
    const user = req.user._id;
    const vocabName = req.query.name;

    try {
        let query = { owner: user };
        if (vocabName) {
            query.name = { $regex: new RegExp(vocabName, "i") }; // Case-insensitive search
        }

        const vocabs = await Vocabulary.find(query);
        res.status(200).send(vocabs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const searchWord = async (req, res) => {
    const user = req.user._id;
    const { query } = req.query;

    try {
        // Search for vocabularies
        const vocabularies = await Vocabulary.find({ owner: user, name: { $regex: new RegExp(query, "i") } });
        
        // Search for words
        const words = await Vocabulary.aggregate([
            { $match: { owner: user } },
            { $unwind: "$words" },
            {
                $match: {
                    "words.word": { $regex: new RegExp(query, "i") }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    words: { $push: "$words" }
                }
            }
        ]);

        res.status(200).json({ vocabularies, words });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteVocab = async (req, res)=>{
    const user = req.user._id
    const vocab = await Vocabulary.findById(req.params.id)

    if (vocab.owner.toString() !==user.toString()) {
        res.status(401)
        throw new Error("Unauthorized access")
    }
    await Vocabulary.findByIdAndDelete(req.params.id)
    
    await User.updateMany(
        { vocabularies: req.params.id },
        { $pull: { vocabularies: req.params.id } }
      );

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
    const user = req.user._id;
    const vocabId = req.params.id;
    
    try {
        const { word, definition } = req.body;
        const vocab = await Vocabulary.findOneAndUpdate(
            { _id: vocabId, owner: user },
            { $push: { words: { word, definition } } },
            { new: true }
        );

        if (!vocab) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }

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
    deleteWord,
    searchUserVocab,
    searchWord
}