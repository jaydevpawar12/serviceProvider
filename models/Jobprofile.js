const mongoose = require('mongoose')

const jobProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active: { type: Boolean, default: true },

}, { timestamps: true })

module.exports = mongoose.model('jobProfile', jobProfileSchema)