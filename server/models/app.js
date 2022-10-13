const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbSchema = new Schema ({
    pl: {
        type: String,
        required: true,
        default: '-'
    },
    en: {
        type: String,
        required: true,
        default: '-'
    },
    es: {
        type: String,
        required: true,
        default: '-'
    },
    category: {
        type: String,
        required: true,
        default: '-'
    },
}, { retainKeyOrder: true, minimize: false, timestamps: true});

const db = mongoose.model('langs', dbSchema);
module.exports = db