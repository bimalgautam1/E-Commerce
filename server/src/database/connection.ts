import { Model, Sequelize } from "sequelize-typescript";
import {config} from "dotenv"
import envConfig from "../config/config";
import User from "./models/userModel";
import Products from "./models/productModel";
import Category from "./models/categoryModel";

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

        await sequelize.sync({ force : false,alter: false }); // ✅ Ensures models sync to DB
        console.log("✅ Database synchronized.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
})();

//relationship
Products.belongsTo(Category)
Category.hasOne(Products)


export default sequelize 