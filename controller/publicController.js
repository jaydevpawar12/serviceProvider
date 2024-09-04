const asyncHandler = require("express-async-handler")
const Serviceprovider = require("../models/Serviceprovider")


exports.getAllServiceProvider = asyncHandler(async (req, res) => {

    const result = await Serviceprovider.find()
    res.json({ message: "Serviceprovider Activate Success", result })
})