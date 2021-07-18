const Todo = require("../models/Todo")

class AdminService {
    getAllTodos = async () => {
        try {
            const todos = await Todo.find()
            return todos  
        } catch (error) {
            return error
        }
    }
}

module.exports = AdminService