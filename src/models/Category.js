const sequelize = require("../utils/connection");
const {DataTypes} = require("sequelize");

const Category = sequelize.define("category", {
    name : {
        type: DataTypes.STRING,
        allowNull : false ,
    }
})

module.exports = Category;