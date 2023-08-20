const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
    extended: true 
}))

app.get('/', db.getUsers)
app.get('/users/:id', db.singleUser)
app.post('/users', db.newUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => {
    console.log(`APP is connect using ${PORT}`)
})
