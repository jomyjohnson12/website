const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const routes = require('./routers')
const db = require('./helpers/connection')

app.use(express.json())

const PORT = 8000

app.use('/api',routes)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})