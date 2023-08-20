const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    database: 'api',
    host: 'localhost',
    password: 'password',
    port: 5432
})

const getUsers = (req, res) => {
    pool.query("select * from users ORDER BY id ASC", (err, results) => {
        if (err) {
            throw err
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const singleUser = (req, res) => {
    const userId = parseInt(req.params.id)
    pool.query(`select * from users where id=${userId}`, (err, results) => {
        if (err) {
            throw err
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const newUser = (req, res) => {
    const { name, email } = req.body
    
    pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email], (err, results) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({
                message: `New user added with ID: ${results.rows[0].id}`
            })
        }
    })
}

const updateUser = (req, res) => {
    const userId = parseInt(req.params.id) 
    const { name, email } = req.body

    pool.query("update users set name = $1, email = $2 where id = $3", [name, email, userId], (err, results) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({
                message: `User is updated with ID = ${userId}`
            })
        }
    })
}

const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id)

    pool.query("DELETE from users where id = $1", [userId], (err, results) => {
        if (err) {
            throw err
        } else {
            res.status(200).json({
                message: `User deleted with ID = ${userId}`
            })
        }
    })
}

module.exports = {
    getUsers,
    singleUser,
    newUser,
    updateUser,
    deleteUser
}

