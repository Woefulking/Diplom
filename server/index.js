require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const sequelize2 = require('./db2')
const models = require('./models/models')
const model2 = require('./models/model2')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 7000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await sequelize2.authenticate()
        await sequelize2.sync()
        app.listen(PORT, () => console.log(`Сервер работает на порте ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


