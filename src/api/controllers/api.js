const router = require("express").Router()
const checkJwt = require("../middleware/auth/checkJwt")
const checkPermissions = require("../middleware/auth/checkPermissions")

router.get("/public", (req, res) => {
    res.json({
        message: "PUBLIC ENDPOINT"
    })
})

router.get("/private", checkJwt, (req, res) => {
    res.json("Hitting a private route")
})

router.get("/private-role",checkJwt, checkPermissions, (req, res) => {
    res.json("Poop hitting /api/private-role")
})

module.exports = router