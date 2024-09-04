
const Carousel = require("../models/Carousel")
const Cms = require("../models/Cms")
const asyncHandler = require("express-async-handler")

const { upload, caroselUpload, categoryUpload } = require("../utils/upload")
const { checkEmpty } = require("../utils/handleEmpty")

const Category = require("../models/Category")
const Jobprofile = require("../models/Jobprofile")
const Serviceprovider = require("../models/Serviceprovider")

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Category
exports.getAllCategory = asyncHandler(async (req, res) => {
    const result = await Category.find()
    res.json({ message: "Category Fetch Success", result })
})
exports.addCategory = asyncHandler(async (req, res) => {
    categoryUpload(req, res, async (err) => {
        const { name } = req.body
        const { isError, error } = checkEmpty({ name })
        if (isError) {
            return res.status(400).json({ message: "All Feilds Required", error })
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "upload error" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image Is Required" })
        }
        try {
            const x = await cloudinary.uploader.upload(req.file.path)
            console.log(x);
            const result = await Category.create({ ...req.body, image: x.secure_url })
            res.status(201).json({ message: "Category Added Successfully", result })
        } catch (error) {
            console.log(error)
        }

        // const x = await cloudinary.uploader.upload(req.file.path)
        // console.log(x);
        // const result = await Category.create({ ...req.body, image: x.secure_url })
        // res.status(201).json({ message: "Category Added Successfully", result })
    })
})
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    categoryUpload(req, res, async (err) => {
        if (req.file) {
            // New file uploaded
            // delete old file
            const result = await Category.findById(id)
            const str = result.image.split("/")
            const img = str[str.length - 1].split(".")[0]
            await cloudinary.uploader.destroy(img)

            const newImage = await cloudinary.uploader.upload(req.file.path)
            await Category.findByIdAndUpdate(id, { name: req.body.name, image: newImage.secure_url })
            res.status(200).json({ message: "Category Update Successfully" })

        } else {
            // NO file uploaded
            await Category.findByIdAndUpdate(id, { name: req.body.name })
            res.status(200).json({ message: "Category Update Successfully" })
        }

    })


})
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }

    const result = await Category.findById(req.params.id)
    const str = result.image.split("/")
    const img = str[str.length - 1].split(".")[0]
    await cloudinary.uploader.destroy(img)
    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: "Category Delete Success" })
})
exports.deactivateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    await Category.findByIdAndUpdate(id, { active: false })
    res.json({ message: "Category Deactivate Success" })
})
exports.activateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    await Category.findByIdAndUpdate(id, { active: true })
    res.json({ message: "Category Activate Success" })
})

// Job Profile
exports.getJobProfile = asyncHandler(async (req, res) => {
    const result = await Jobprofile.find()
    res.json({ message: "Job Profile Fetch Success", result })
})
exports.addJobProfile = asyncHandler(async (req, res) => {
    const { name } = req.body
    const { isError, error } = checkEmpty({ name })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    const result = await Jobprofile.create(req.body)
    res.json({ message: "Job Profile Added Successfully", result })

})
exports.updateJobProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    await Jobprofile.findByIdAndUpdate(id, req.body)
    res.json({ message: "Job Profile Updated Successfully" })
})
exports.deleteJobProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    await Jobprofile.findByIdAndDelete(id)
    res.json({ message: "Job Profile Delete Successfully" })
})
exports.deactivateJobProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }

    await Jobprofile.findByIdAndUpdate(id, { active: false })
    res.json({ message: "JobProfile Deactivate Success" })
})
exports.activateJobProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }

    await Jobprofile.findByIdAndUpdate(id, { active: true })
    res.json({ message: "JobProfile Activate Success" })
})

//service provider 
exports.deactivateServiceProvider = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }

    await Serviceprovider.findByIdAndUpdate(id, { active: false })
    res.json({ message: "Serviceprovider Deactivate Success" })
})
exports.activateServiceProvider = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }

    await Serviceprovider.findByIdAndUpdate(id, { active: true })
    res.json({ message: "Serviceprovider Activate Success" })
})
exports.getAllServiceProvider = asyncHandler(async (req, res) => {

    const result = await Serviceprovider.find()
    res.json({ message: "Serviceprovider Activate Success", result })
})

//cms
exports.getCms = asyncHandler(async (req, res) => {
    const result = await Cms.find()
    res.status(200).json({ message: "Cms Fetch Success", result })
})

exports.addCms = asyncHandler(async (req, res) => {

    const { mobile, address, email, socialMediaLinks } = req.body
    const { isError, error } = checkEmpty({ mobile, address, email, socialMediaLinks })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (err) {
        console.log(err);
        return res.status(400).json({ message: "upload error" })
    }
    if (!req.file) {
        return res.status(400).json({ message: "Image Is Required" })
    }

    const f = await cloudinary.uploader.upload(req.file.path)
    console.log(f);
    const result = await Cms.create(req.body)
    res.status(201).json({ message: "Cms Add Success", result })
})

exports.deleteCms = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Cms.findByIdAndDelete(id)
    if (!result) {
        return res.status(404).json({ message: "Cms Not Found" })
    }
    res.status(200).json({ message: "Cms Delete Success" })
})

//carousel
exports.getCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({
        message: "Carousel Fetch Successs",
        result
    })
})

exports.addCarousel = asyncHandler(async (req, res) => {
    caroselUpload(req, res, async err => {
        const { caption } = req.body
        const { isError, error } = checkEmpty({ caption })
        if (isError) {
            return res.status(400).json({ message: "All Feilds Required", error })
        }
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "upload error" })
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image Is Required" })
        }

        const z = await cloudinary.uploader.upload(req.file.path)
        console.log(x);
        const result = await Carousel.create({ ...req.body, image: z.secure_url })
        res.status(201).json({ message: "Category Added Successfully", result })
    })
})
exports.deleteCarousel = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Carousel.findByIdAndDelete(id)
    res.status(200).json({
        message: "Carousel Deleted Successs",
    })
})