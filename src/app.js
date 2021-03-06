require('dotenv').config()
const express = require("express")
const app = require("express")()
const cors = require('cors')
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors())

connectDB()

app.use("/todos", require("./api/controllers/todos"))
app.use("/token-service", require("./api/controllers/token"))
app.use("/admin", require("./api/controllers/admin"))

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})