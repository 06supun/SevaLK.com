require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var serviceRoutes = require('./routes/services')
var userRoutes = require('./routes/users')
var chatRoutes = require('./routes/chat')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:3000'}))
app.listen(3500,()=>console.log('Server started at : 3500'))

app.use('/chat',chatRoutes)
app.use('/service',serviceRoutes)
app.use('/user',userRoutes)
app.use(express.static('public'))