const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const db = require('./models')
const { User } = require('./db')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use("/api/auth", require("./auth/route"))
 
const { adminAuth, userAuth } = require('./middleware/auth');

dotenv.config()

db.sequelize.sync().then((req) => {
    const server = app.listen(process.env.PORT, () => {
        console.log(`Connect established at port ${process.env.PORT}`)
    })

    // Error handling
    process.on('unhandledRejection', err => {
        console.log(`An error occured: ${err.message}`)
        server.close( () => {
            process.exit(1)
        })
    })
})


app.get('/', async (req, res) => {
    res.render('home')
})
app.get('/register', (req, res) => res.render('register'))
app.get('/login', (req, res) => { res.render('login') })
app.get('/admin', adminAuth, (req, res) => res.render('dashboard'))
app.get('/edit/user/:id', adminAuth, (req, res) => {
    const userId = req.params.id
    const user = {
        id: userId
    }
    res.render('edit-user', { user })
})
app.get('/delete/user/:id', adminAuth, async (req, res) => {
    const userId = parseInt(req.params.id)
    await User.destroy({
        where: {
            id: userId
        }
    })
    res.redirect("/admin")
})
app.get('/basic', userAuth, (req, res) => res.render('user'))
app.get('/logout', (req, res) => { 
    res.cookie("uid", "", { maxAge: "1" })
    res.redirect("/")
})
