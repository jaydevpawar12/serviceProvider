const jwt = require("jsonwebtoken")

exports.adminProtected = (req, res, next) => {
    const admin = req.cookies.admin
    if (!admin) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })

}
exports.seriveProviderProtected = (req, res, next) => {
    const serviceProvider = req.cookies.serviceProvider
    if (!serviceProvider) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(serviceProvider, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })

}
exports.masterAdminProtected = (req, res, next) => {
    const masteradmin = req.cookies.masteradmin
    if (!masteradmin) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(masteradmin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })
}