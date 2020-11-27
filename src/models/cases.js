const { model, Schema } = require('mongoose');

const casesSchema = new Schema({
    guild: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    action: {
        type: String,
        required: true,
    },
    target_id: {
        type: String,
        required: true,
    },
    target_tag: {
        type: String,
        required: true,
    },
    mod_id: {
        type: String,
        required: true,
    },
    mod_tag: {
        type: String,
        required: true,  
    },
    log_id: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

module.exports = model('cases', casesSchema);