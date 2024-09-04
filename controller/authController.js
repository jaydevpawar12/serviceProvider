const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")
const Serviceprovider = require("../models/Serviceprovider")
const validator = require("validator")
const { checkEmpty } = require("../utils/handleEmpty")
const MasterAdmin = require("../models/MasterAdmin")
const { upload } = require("../utils/upload")

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// Master Admin

exports.registerMasterAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: `Provide Strong Password 1 Capital , 1 Special Chars and min. 8 Chars` })
    }

    const found = await MasterAdmin.findOne({ email })
    if (found) {
        return res.status(401).json({ message: "Email Already registered with us" })
    }
    const hash = await bcrypt.hash(password, 10)
    await MasterAdmin.create({ name, email, password: hash })
    res.json({ message: "Master Admin Register Success" })
})
exports.loginMasterAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }
    const found = await MasterAdmin.findOne({ email })
    if (!found) {
        return res.status(401).json({ message: "Email Not Registered with us" })
    }
    const verify = await bcrypt.compare(password, found.password)

    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userID: found._id }, process.env.JWT_KEY)

    res.cookie("masteradmin", token, { httpOnly: true })
    res.json({
        message: "Master Admin Login Success", result: {
            _id: found._id,
            name: found.name,
            email: found.email,
        }
    })
})
exports.logoutMasterAdmin = asyncHandler(async (req, res) => {
    res.clearCookie('masteradmin')
    res.json({ message: "Master Admin Logout Success" })
})

// Admin
exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: `Please Provide Strong Password` })
    }

    const found = await Admin.findOne({ email })
    if (found) {
        return res.status(401).json({ message: "Email Already registered with us" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash })
    res.json({ message: "Admin Register Success" })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: `Invalid Email` })
    }
    const found = await Admin.findOne({ email })
    if (!found) {
        return res.status(401).json({ message: "Eamil Not Registered with us" })
    }
    const verify = await bcrypt.compare(password, found.password)

    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }
    const token = jwt.sign({ userId: found._id }, process.env.JWT_KEY)

    res.cookie("admin", token, { httpOnly: true })

    res.json({
        message: "Admin Login Success", result: {
            _id: found._id,
            name: found.name,
            email: found.email,
        }
    })

})
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})

// Service Provider
exports.registerServiceProvider = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "error" })
        }
        const { name, email, password, mobile, category, jobProfile } = req.body
        console.log(req.body)
        // console.log(req.file)
        console.log(req.files)
        const { isError, error } = checkEmpty({ name, email, password, mobile, category, jobProfile })
        if (isError) {
            return res.status(400).json({ message: "All Feilds Required", error })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: `Invalid Email` })
        }
        if (!validator.isMobilePhone(mobile, ['en-IN'])) {
            return res.status(400).json({ error: `Invalid Mobile Number` })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: `Provide Strong Password 1 Capital , 1 Special Chars and min. 8 Chars` })
        }
        const found = await Serviceprovider.findOne({ $or: [{ email }, { mobile }] })

        if (found) {
            return res.status(401).json({ message: "Eamil or Mobile Already registered with us" })
        }
        // console.log(req.files.video);
        // console.log(req.files.image);
        const imageData = [], videoData = [];

        if (req.files['image']) {
            for (let i = 0; i < req.files['image'].length; i++) {
                const imageFile = req.files['image'][i];
                imageData.push(imageFile);
                // const result = await cloudinary.uploader.upload(imageFile.path);
                // console.log(imageFile);
                // filePromises.push(result);
            }
        }
        // const result = await cloudinary.uploader.

        if (req.files['video']) {
            for (let i = 0; i < req.files['video'].length; i++) {
                const videoFile = req.files['video'][i];
                videoData.push(videoFile);
                // const result = await cloudinary.uploader.upload(videoFile.path);
                // console.log(videoFile);
                // filePromises.push(result);
            }
        }
        const x = []
        // let y
        for (const item of imageData) {
            const result = await cloudinary.uploader.upload(item.path)
            x.push(result.secure_url)
        }
        if (videoData.length > 0) {
            for (const item of videoData) {
                cloudinary.uploader.upload_large(item.path, { resource_type: "video" }, async (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ message: "ERROR" })
                    }
                    const hash = await bcrypt.hash(password, 10)
                    await Serviceprovider.create({
                        ...req.body,
                        password: hash,
                        image: x,
                        video: result.secure_url
                    })
                    res.json({ message: "OK" })
                })
            }
        } else {
            const hash = await bcrypt.hash(password, 10)
            await Serviceprovider.create({
                ...req.body,
                password: hash
            })
            res.json({ message: "ok without video" })
        }

        // console.log(x);
        // console.log(videoData);

    })
})
exports.loginServiceProvider = asyncHandler(async (req, res) => {
    const { password, mobile } = req.body
    const { isError, error } = checkEmpty({ password, mobile })
    if (isError) {
        return res.status(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ error: `Invalid Mobile` })
    }
    const found = await Serviceprovider.findOne({ mobile })
    if (!found) {
        return res.status(401).json({ message: "Eamil Not Registered with us" })
    }
    const verify = await bcrypt.compare(password, found.password)

    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    if (!found.active) {
        return res.status(401).json({ message: "Account Blocked By Admin" })
    }
    if (!found.deleted) {
        return res.status(401).json({ message: "Contact Our Customer care mobile number" })
    }

    const OTP = mobile.slice(-4)
    await Serviceprovider.findByIdAndUpdate(found._id, { otp: OTP, otpExpire: new Date(Date.now() + (5 * 60 * 1000)) })
    // send email aur otp logic
    res.json({ message: "Service Provider Login Success" })



})
exports.verifyServiceProviderOtp = asyncHandler(async (req, res) => {
    const { otp, mobile } = req.body
    const { isError, error } = checkEmpty({ otp, mobile })
    if (isError) {
        return res.status(400).json({ message: "Provide OTP and Mobile number", error })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ error: `Invalid Mobile` })
    }
    const isFound = await Serviceprovider.findOne({ mobile })
    if (!isFound) {
        return res.status(401).json({ message: "mobile Not Registered with us" })
    }
    if (isFound.otpExpire < new Date(Date.now())) {
        await Serviceprovider.findByIdAndUpdate(isFound._id, { otp: "" })
        return res.status(400).json({ message: "OTP Expired. Login Again" })
    }
    if (isFound.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP" })
    }
    await Serviceprovider.findByIdAndUpdate(isFound._id, { otp: "" })

    const token = jwt.sign({ userId: isFound._id }, process.env.JWT_KEY)

    res.cookie("serviceProvider", token, { httpOnly: true })

    res.json({
        message: "Service Provider Login Success", result: {
            _id: isFound._id,
            name: isFound.name,
            mobile: isFound.mobile,
        }
    })

})
exports.logoutServiceProvider = asyncHandler(async (req, res) => {
    res.clearCookie("serviceProvider")
    res.json({ message: "serviceProvider Logout Success" })
})
