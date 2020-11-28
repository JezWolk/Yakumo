const { model, Schema } = require('mongoose');

const tagsSchema = new Schema({
    guild: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    aliases: {
        type: Array,
        required: false,
        default: [],
    },
    uses: {
        type: Number,
        required: true,
        default: 0,
    },
    created_at: {
        type: Date,
        required: true,
    },
    last_modified_by: {
        type: String,
        required: false,
    },
    last_modified_at: {
        type: Date,
        required: false,
    },
});

module.exports = model('tags', tagsSchema);