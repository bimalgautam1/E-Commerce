import { config } from "dotenv"
config()
const envConfig = {
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING as string,
    jwt_secretkey: process.env.JWT_SECRET_KEY as string,
    jwtExpriesIn : process.env.JWT_EXPIRES_IN  as string
}
export default envConfig