const Category = require("./Category")
const Product = require("./Product")
const User = require("./User")
const Cart = require("./Cart")
const Purchase = require("./Purchase")
const ProductImg = require("./ProductImg")


Category.hasMany(Product)
Product.belongsTo(Category)

Cart.belongsTo(User)
User.hasMany(Cart)
Cart.belongsTo(Product)
Product.hasMany(Cart)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)
Purchase.belongsTo(User)
User.hasMany(Purchase)


ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)