const { model, Schema } = require('mongoose');

const settingsModel = new Schema({
    guild_id: {
        type: String,
        required: true,
        unique: true,
    },
    settings: {
        type: Object,
        required: false,
        default: {},
    },
});

module.exports = model('settings', settingsModel);