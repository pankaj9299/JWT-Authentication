const express = require('express')
const router = express.Router()
const { register, login, getUser, allUsers, findUser } = require('./auth')
const { adminAuth } = require('../middleware/auth');

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/user/:id").get(findUser)
router.route("/getUser").get(getUser)
router.route("/allUsers").get(allUsers)

// router.route("/update").put(adminAuth, update)
// router.route("/deleteUser").delete(adminAuth, deleteUser)

module.exports = router