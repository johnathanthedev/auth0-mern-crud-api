const Todo = require("../models/Todo")

class TodoService {
    getTodos = async (user_email) => {
        try {
            const todos = await Todo.find({ user_email }).sort({ date: -1 })
            const email_check = todos.some(todo => todo.user_email === user_email)
            if (todos.length) {
                if (!email_check) return { message: 'Not authorized' } 
            } 
            return todos  
        } catch (error) {
            return error
        }
    }

    getTodo = async (user_email, todo_id) => {
        try {
            const todo = await Todo.findById(todo_id)
            const email_check = todo.user_email === user_email
            if (!email_check) return { message: 'Not authorized' }
            return todo
        } catch (error) {
            return error
        } 
    }

    createTodo = async (todo_name, todo_description, user_email) => {
        try {
            const new_todo = new Todo({
                name: todo_name, 
                description: todo_description,
                user_email
            })
            const todo = await new_todo.save()
            return todo
        } catch (error) {
            return error
        }    
    }

    updateTodo = async (todo_id, todo_name, todo_description, req_email) => {
        const todo_fields = {}
        if (todo_id) todo_fields.id = todo_id
        if (todo_name) todo_fields.name = todo_name
        if (todo_description) todo_fields.description = todo_description

        try {
            let todo = await Todo.findById(todo_id)
            if (!todo) return { message: "Todo not found." }
            if (todo.user_email !== req_email) return { message: 'Not authorized' }
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

    deleteTodo = async (todo_id, req_email) => {
        try {
            let todo = await Todo.findById(todo_id)
            if (!todo) return { message: "Todo not found." }
            if (todo.user_email !== req_email) return { message: 'Not authorized' }
            await Todo.findByIdAndRemove(todo_id)
            return { message: "Todo removed" }
        } catch (error) {
            return error
        }
    }
}

module.exports = TodoService