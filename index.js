const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { adminProtected, masterAdminProtected } = require("./middleware/protected")
require("dotenv").config({})

const app = express()
// app.use(express.static("uploads"))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/admin", adminProtected, require("./routes/adminRoute"))
app.use("/api/service-provider", require("./routes/serviceProviderRoutes"))
app.use("/api/master-admin", masterAdminProtected, require("./routes/masterAdminRoute"))
app.use("/api/public", require("./routes/publicRoute"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found 404" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Server Error", error: err.message })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})

