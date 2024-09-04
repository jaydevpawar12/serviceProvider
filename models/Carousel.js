const mongoose = require('mongoose')

const carouselSchema = mongoose.Schema({

    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }

}, { timestamps: true })

module.exports = mongoose.model('carosel', carouselSchema)