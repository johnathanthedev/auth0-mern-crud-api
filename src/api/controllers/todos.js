const router = require("express").Router()
const checkJwt = require("../middleware/auth/checkJwt")
// const checkPermissions = require("../middleware/auth/checkPermissions")
const TodoService = require("../../services/TodoService")

router.get("/", checkJwt, async (req, res) => {
    const todoService = new TodoService()
    const response = await todoService.getTodos()
    res.json(response)
})

router.post("/", checkJwt, async (req,res) => {
    const { name, description } = req.body
    const todoService = new TodoService()
    const response = await todoService.createTodo(name, description)
    res.json(response)
})

router.put("/:id", checkJwt, async (req, res) => {
    const todo_id = req.params.id
    const { name, description } = req.body
    const todoService = new TodoService()
    const response = await todoService.updateTodo(todo_id, name, description)
    res.json(response)
})

router.delete("/:id", checkJwt, async (req, res) => {
    const todo_id = req.params.id
    const todoService = new TodoService()
    const response = await todoService.deleteTodo(todo_id)
    res.json(response)
})

module.exports = router