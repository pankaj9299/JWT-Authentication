module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        password: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
            notEmpty: true,
            len: [8, 255] 
           } 
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return User
}