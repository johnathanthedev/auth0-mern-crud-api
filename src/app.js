require('dotenv').config()
const app = require("express")()
const PORT = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())

app.use("/todos", require("./api/controllers/todos"))
app.use("/api", require("./api/controllers/api"))

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})