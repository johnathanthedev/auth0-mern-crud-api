const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Todo", TodoSchema)