const router = require("express").Router()
const checkAuth0Jwt = require("../middleware/auth/checkAuth0Jwt")
const TokenService = require("../../services/TokenService")

router.get("/get-token", checkAuth0Jwt, (req, res) => {
    const tokenService = new TokenService()
    const token = tokenService.get_token(req.body.user_email)
    res.json(token)
})

module.exports = router