const Todo = require("../models/Todo")

class TodoService {
    getTodos = async () => {
        try {
            const todos = await Todo.find()
            return todos  
        } catch (error) {
            return error
        }
    }

    createTodo = async (todo_name, todo_description) => {
        try {
            const new_todo = new Todo({
                name: todo_name, 
                description: todo_description
            })
            const todo = await new_todo.save()
            return todo
        } catch (error) {
            return error
        }    
    }

    updateTodo = async (todo_id, todo_name, todo_description) => {
        const todo_fields = {}
        if (todo_id) todo_fields.id = todo_id
        if (todo_name) todo_fields.name = todo_name
        if (todo_description) todo_fields.description = todo_description

        try {
            let todo = await Todo.findById(todo_id)
            !todo && res.status(404).json({
                message: "Todo not found."
            })
            todo = await Todo.findByIdAndUpdate(
                todo_id, 
                { $set: todo_fields },
                { new: true }
            )
            return todo
        } catch (error) {
            return error
        }
    }

    deleteTodo = async (todo_id) => {
        try {
            let todo = await Todo.findById(todo_id)
            !todo && res.status(404).json({
                message: "Todo not found."
            })
            await Todo.findByIdAndRemove(todo_id)
            const message = { message: "Todo removed" }
            return message
        } catch (error) {
            return error
        }
    }
}

module.exports = TodoService