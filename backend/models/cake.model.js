const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cakeSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: false },
    duration: { type: Number, required: true },
    imgURL: { type: String, required: true }
}, {
    timestamps: true,
});

const Cake = mongoose.model('Cake', cakeSchema);

module.exports = Cake;