import { Sequelize } from "sequelize-typescript";
import {config} from "dotenv"
import envConfig from "../config/config";
import User from "./models/userModel";

config()
const sequelize = new Sequelize(envConfig.connection_string as string, {
    dialect: "postgres",
})

try { 
    sequelize.authenticate()
    .then(()=>{
        console.log("Connection has been established successfully.")
    })
    .catch(err=>{
        console.log(err)
    })
} catch (error) {
    console.log(error)
}

export default sequelize 