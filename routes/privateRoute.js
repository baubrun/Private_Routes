const jwt = require("jsonwebtoken");


const auth = (req, res, next) =>{
    const token = req.header("auth-token")
    if(!token) return res.status(401).send("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        return status(400).send("Unauthorized")
    }
}


module.exports = auth