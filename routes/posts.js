const router = require("express").Router();
const auth = require("./privateRoute")

router.get("/", auth, (req, res) => {
    res.send(req.user)
})




module.exports = router;
