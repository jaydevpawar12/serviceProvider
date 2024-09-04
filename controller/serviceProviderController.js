const Serviceprovider = require("../models/Serviceprovider")
const { profileUpload } = require("../utils/upload")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.getAllServiceProvider = asyncHandler(async (req, res) => {

    const result = await Serviceprovider.find()
    res.json({ message: "Serviceprovider Activate Success", result })
})

exports.updateProfile = asyncHandler(async (req, res) => {
    profileUpload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "Multer Error" + err.message })
        }
        if (req.file) {
            const newImage = await cloudinary.uploader.upload(req.file.path)
            await Serviceprovider.findByIdAndUpdate({ ...req.body, image: newImage.secure_url })
            res.json({ message: "service provider profile update success" })
        } else {
            await Serviceprovider.findByIdAndUpdate({ ...req.body })
            res.json({ message: "service provider profile update success" })
        }
    })
})

exports.deleteServiceProvider = asyncHandler(async (req, res) => {
    const { id } = req.params
    // const { isError, error } = checkEmpty({ id })
    // if (isError) {
    //     return res.status(400).json({ message: "All Feilds Required", error })
    // }
    await Serviceprovider.findByIdAndDelete(id)
    res.json({ message: "Serviceprovider Deleted  Success" })
})

