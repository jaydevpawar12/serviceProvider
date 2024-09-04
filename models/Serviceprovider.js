const mongoose = require('mongoose')

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    jobProfile: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        default: "default.png",
    },
    video: {
        type: String,
    },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    otp: {
        type: String,
        default: null
    },
    otpExpire: {
        type: Date,
        default: null
    }

}, { timestamps: true })

module.exports = mongoose.model('serviceProvider', serviceProviderSchema)
