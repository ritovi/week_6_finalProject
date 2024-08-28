const sequelize = require ("../utils/connection");
const {DataTypes} = require("sequelize");

const Purchase = sequelize.define("purchase", {
    quantity : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    //userId,
    //productId
});

module.exports = Purchase;