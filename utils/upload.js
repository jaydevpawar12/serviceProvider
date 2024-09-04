const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         const fn = Date.now() + path.extname(file.originalname);
//         cb(null, fn);
//     },
// });

const profileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname);
        cb(null, fn);
    },
});
const categoryStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname);
        cb(null, fn);
    },
});
const caroselUpload = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname);
        cb(null, fn);
    },
});

const storage = multer.diskStorage({

    filename: (req, file, cb) => {
        console.log(file.fieldname)
        // cb(null, "xxx.png")
        if (file.fieldname === "image") {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
        else if (file.fieldname === "video") {
            cb(null, "video-" + file.fieldname + Date.now() + path.extname(file.originalname));
        }
    },
})
exports.upload = multer({ storage }).fields([
    { name: 'image', maxCount: 2 },
    { name: 'video', maxCount: 1 }
])


exports.profileUpload = multer({ profileStorage }).single("image");
exports.categoryUpload = multer({ categoryStorage }).single("image");
exports.caroselUpload = multer({ caroselUpload }).single("image");