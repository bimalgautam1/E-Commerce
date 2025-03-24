import { config } from "dotenv"
config()
const envConfig = {
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING as string,
    jwt_secretkey: process.env.JWT_SECRET_KEY as string,
    jwtExpriesIn : process.env.JWT_EXPIRES_IN  as string,
    email_send : process.env.email_send as string,
    password_email : process.env.password_email_send as string,
    admin_email : process.env.ADMIN_EMAIL as string,
    admin_password : process.env.ADMIN_PASSWORD as string,
    admin_username : process.env.ADMIN_USERNAME as string,
    Live_secret_key : process.env.LIVE_SECRET_KEY as string
}
export default envConfig