const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUser = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
      const userInfo = await User.findById(id);

      if (!userInfo) {
          return res.status(404).json({ message: "User not found" });
      }

      const updatedUserInfo = await User.findByIdAndUpdate(id, { 
        games: req.body.games,
        wins: req.body.wins,
        loses: req.body.loses 
      }, { new: true });
      res.status(200).json(updatedUserInfo);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signupUser, loginUser, getUser, updateUser }