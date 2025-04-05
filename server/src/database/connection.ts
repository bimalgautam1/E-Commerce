import { ForeignKey, Model, Sequelize } from "sequelize-typescript";
import {config} from "dotenv"
import envConfig from "../config/config";
import User from "./models/userModel";
import Products from "./models/productModel";
import Category from "./models/categoryModel";
import Order from "./models/orderModel";
import Payment from "./models/paymentModel";
import OrderDetail from "./models/orderDetail";
import Cart  from "./models/cartModel";

config()
const sequelize = new Sequelize(envConfig.connection_string as string, {
    dialect: "postgres",
    models: [__dirname +'/models'],  // ✅ Register models
    logging: false,  // ✅ Disable logging unless debugging
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");

        await sequelize.sync({ force : false,alter: true }); // ✅ Ensures models sync to DB
        console.log("✅ Database synchronized.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
})();

//relationship
Products.belongsTo(Category,{foreignKey:"categoryId"})
Category.hasMany(Products,{foreignKey:"categoryId"})

Order.belongsTo(User, {foreignKey:"userId"})
User.hasMany(Order, {foreignKey:"userId"})

Payment.belongsTo(Order, { 
    foreignKey: "orderId",
    onDelete: "CASCADE"  // ✅ Ensures payment is deleted when order is deleted
});
Order.hasOne(Payment,{foreignKey:"orderId"})

OrderDetail.belongsTo(Order,{foreignKey:"orderId"})
Order.hasOne(OrderDetail,{foreignKey:"orderId"})

OrderDetail.belongsTo(Products,{foreignKey:"productId"})
Products.hasMany(OrderDetail,{foreignKey:"productId"})

Cart.belongsTo(Products, {foreignKey:"productId"})
Products.hasMany(Cart,{foreignKey:"productId"})

Cart.belongsTo(User,{foreignKey:"userId"})
User.hasOne(Cart,{foreignKey:"userId"})







export default sequelize 