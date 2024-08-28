const sequelize = require ("../utils/connection");
const {DataTypes} = require("sequelize");

const Cart = sequelize.define("cart", {
    quantity : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    //userId,
    //productId
});

module.exports = Cart;