const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },
    caseCount: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = model('guilds', guildSchema);