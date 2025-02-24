import { config } from "dotenv"
config()
const envConfig ={
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING as string
}

export default envConfig