const asyncHandler = require('express-async-handler')
const Serviceprovider = require('../models/Serviceprovider')
const { checkEmpty } = require('../utils/handleEmpty')

exports.getAllServiceProvider = asyncHandler(async (req, res) => {
    const result = await Serviceprovider.find()
    res.json({ message: 'Get All Service Provider Success', result })
})


exports.activateServiceProvider = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: 'All Fields Required', error })
    }
    await Serviceprovider.findByIdAndUpdate(id, { active: true })
    res.json({ message: 'Service Provider Activate Success' })
})

exports.deactivateServiceProvider = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: 'All Fields Required', error })
    }
    await Serviceprovider.findByIdAndUpdate(id, { active: false })
    res.json({ message: 'Service Provider Deactivate Success' })
})