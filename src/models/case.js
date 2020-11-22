const { Schema, model } = require('mongoose');

const caseSchema = new Schema({
    guild_id: {
        type: String,
        required: true,
    },
    message_id: {
        type: String,
        required: true,
        unique: true,
    },
    case_id: {
        type: Number,
        requried: true,
        unique: true,
    },
    target_id: {
        type: String,
        required: true,
    },
    target_tag: {
        type: String,
        requried: true,
    },
    mod_id: {
        type: String,
        required: true,
    },
    mod_tag: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
    },
    duration: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

module.exports = model('case', caseSchema);