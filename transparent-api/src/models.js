
const mongoose = require('mongoose');

const { MONGODB_STRING } = require("./config");

const USER_MODEL_NAME = "User";
const PET_MODEL_NAME = "Pet";

mongoose.connect(MONGODB_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  login: String,
  password: String
});

const User = mongoose.model(USER_MODEL_NAME,userSchema);

const petSchema = new mongoose.Schema({
    name: String,
    location: String,
    fee: Number,
    current_owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    current_adopter: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    created: { type: Date, default: Date.now },
});

const Pet = mongoose.model(PET_MODEL_NAME,petSchema);

const model = {
    User,
    Pet,
    created: { type: Date, default: Date.now },
};

module.exports = model;