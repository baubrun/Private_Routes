const express = require("express")
const app = express()
const PORT = 4000
const authRoute = require("./routes/auth")
const mongoose = require("mongoose")
require("dotenv/config")
const postRoute = require("./routes/posts")


app.use(express.json())
app.use("/api/user", authRoute)
app.use("/api/posts", postRoute)



/*============
Mongoose
=============*/
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "Jwt-Auth"
}

mongoose.connect(process.env.MONGODB_URI, options)
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => {
    console.log("\nMongoose connected to DB.\n")
})



/*============
Server
=============*/


app.listen(PORT, () => console.log(`Server running on port ${PORT}!\n`))