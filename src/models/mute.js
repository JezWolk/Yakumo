const { Schema, model } = require('mongoose');

const muteModel = new Schema({
    userID: {
        required: true,
        type: String,
        unique: true,
    },
    guildID: {
        required: true,
        type: String,
    },
    expiryDate: {
        required: true,
        type: Date,
    },
});

module.exports = model('muted', muteModel);