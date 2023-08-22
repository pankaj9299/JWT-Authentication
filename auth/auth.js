const { User } = require('../db')
const bcrypt = require("bcrypt")
const moment = require('moment-timezone')
const jwt = require("jsonwebtoken")
const jwtSecret =
  "b044b80e7b5e18a73a3bb11122833ad7917da75e9cde8592898623b165fb335f3ed647"

exports.register = async (req, res, next) => {
  const { username, password, role } = req.body
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
        role 
      }).then((user) => {
        let userObj = {
          id: user.id,
          username: user.username,
          role: user.role,
        }

        // Get the current time in Asia/Kolkata timezone
        const expiresInHours = 3
        const maxAge = expiresInHours * 60 * 60
        const asiaKolkataTime = moment.tz('Asia/Kolkata')

        // Calculate the expiration time
        const expirationTime = moment(asiaKolkataTime).add(expiresInHours, 'hours')

        const token = jwt.sign(userObj, jwtSecret, {
          expiresIn: maxAge, // 3hrs in sec
        })

        res.cookie("uid", token, {
          expires: expirationTime.toDate(),
          httpOnly: true,
        })
        res.status(201).json({
          message: "User successfully created",
          user,
        })
      })
    })
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    })
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and Passwords are required",
    })
  }

  try {
    const user = await User.findOne({ 
      where:{
        username
      }
     })
    if (user === null) {
      res.status(401).json({
        message: "Login is not successfull",
        error: "User not found",
      })
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60
          let userObj = {
            id: user.id,
            username: user.username,
            role: user.role,
          }
          const token = jwt.sign(userObj, jwtSecret, {
            expiresIn: maxAge,
          })

          res.cookie("uid", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          })
          res.status(201).json({
            message: "Login Successfull",
            user,
            token,
          })
        } else {
          res.status(401).json({
            message: "Invalid Credentials",
          })
        }
      })
    }
  } catch (err) {
    res.status(400).json({
      message: "Error with login",
      error: err.message,
    })
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const token = req.cookies.uid
    const decodeStr = jwt.verify(token, jwtSecret)
    const user = await User.findOne({
      where: {
        id: decodeStr.id
      }
    })
    res.status(200).json({ data: decodeStr, user })
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired.", err })
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token.", err })
    } else {
      res.status(500).json({ message: "Internal Server Error", err })
    }
  }
}

exports.allUsers = async (req, res, next) => {
  try {
    const token = req.cookies.uid
    const decodeStr = jwt.verify(token, jwtSecret)
    const users = await User.findAll()
    res.status(200).json({ data: users })
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired.", err })
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token.", err })
    } else {
      res.status(500).json({ message: "Internal Server Errorr", err })
    }
  }
}

exports.findUser = async (req, res, next) => {
  try {
    const token = req.cookies.uid
    const decodeStr = jwt.verify(token, jwtSecret)
    const userID = req.params.id
    const user = await User.findByPk(userID)
    if(user === null) {
      res.status(404).json({ message: "User not found" })
    } else {
      res.status(200).json({ data: user })
    }
    
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired.", err })
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token.", err })
    } else {
      res.status(500).json({ message: "Internal Server Errorr", err })
    }
  }
}
