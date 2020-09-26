const express = require('express')
const cors = require('cors')
const routes  = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(routes)

const port = 3000
app.listen(port, console.log(`Server running on ${port}`))