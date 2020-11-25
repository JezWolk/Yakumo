const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
    guild_id: {
        type: String,
        required: true,
        unique: true,
    },
    case_number: {
        type: Number,
        required: true,
        default: 0,
    },
    settings: {
        type: Object,
        required: true,
        default: {},
    },
});

module.exports = model('guilds', guildSchema);