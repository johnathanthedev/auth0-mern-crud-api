const router = require("express").Router()
const checkAuth0Jwt = require("../middleware/auth/checkAuth0Jwt")
const checkInternalToken = require("../middleware/auth/checkInternalToken")
const TodoService = require("../../services/TodoService")

router.get("/", checkAuth0Jwt, checkInternalToken, async (req, res) => {
    const user_email = req.user_email
    const todoService = new TodoService()
    const response = await todoService.getTodos(user_email)
    res.json(response)
})

router.get("/:id", checkAuth0Jwt, checkInternalToken, async (req, res) => {
    const user_email = req.user_email
    const todo_id = req.params.id
    const todoService = new TodoService()
    const response = await todoService.getTodo(user_email, todo_id)
    res.json(response)
})

router.post("/", checkAuth0Jwt, checkInternalToken, async (req, res) => {
    const user_email = req.user_email
    const { name, description } = req.body
    const todoService = new TodoService()
    const response = await todoService.createTodo(name, description, user_email)
    res.json(response)
})

router.put("/:id", checkAuth0Jwt, checkInternalToken, async (req, res) => {
    const user_email = req.user_email
    const todo_id = req.params.id
    const { name, description } = req.body
    const todoService = new TodoService()
    const response = await todoService.updateTodo(todo_id, name, description, user_email)
    res.json(response)
})

router.delete("/:id", checkAuth0Jwt, checkInternalToken, async (req, res) => {
    const user_email = req.user_email
    const todo_id = req.params.id
    const todoService = new TodoService()
    const response = await todoService.deleteTodo(todo_id, user_email)
    res.json(response)
})

module.exports = router