const router = require("express").Router()
const checkAuth0Jwt = require("../middleware/auth/checkAuth0Jwt")
const checkInternalToken = require("../middleware/auth/checkInternalToken")
const checkAuth0Permissions = require("../middleware/auth/checkAuth0Permissions")
const TokenService = require("../../services/TokenService")
const AdminService = require("../../services/AdminService")

router.get("/all-todos", checkAuth0Jwt, checkAuth0Permissions, checkInternalToken, async (req, res) => {
    const adminService = new AdminService()
    const response = await adminService.getAllTodos()
    res.json(response)
})

router.get("/decode-token", checkAuth0Jwt, checkAuth0Permissions, checkInternalToken, (req, res) => {
    const tokenService = new TokenService()
    const decoded_token = tokenService.decode_token(req.body.token)
    res.json(decoded_token)
})

module.exports = router