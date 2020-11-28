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
});

module.exports = model('tags', tagsSchema);