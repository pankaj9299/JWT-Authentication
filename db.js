const { Sequelize, DataTypes } = require("sequelize"); // Import Sequelize
const sequelize = new Sequelize("api", "me", "password", {
  dialect: "postgres", // Change this to your database dialect
  host: "localhost", // Change this to your database host
})

const user = require("./models/User")
const User = user(sequelize, Sequelize.DataTypes);

module.exports = {
    User
}
