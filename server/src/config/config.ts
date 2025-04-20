import {config} from 'dotenv'
config()


const envConfig = {
    port : process.env.PORT, 
    connectionString : process.env.CONNECTION_STRING as string, 
    jwtSecretKey : process.env.JWT_SECRET_KEY as string, 
    jwtExpiresIn : process.env.JWT_EXPIRES_IN, 
    email : process.env.email_send as string, 
    emailPassword : process.env.password_email_send as string, 
    adminEmail : process.env.ADMIN_EMAIL as string, 
    adminPassword : process.env.ADMIN_PASSWORD as string, 
    adminUsername : process.env.ADMIN_USERNAME as string

}
export default envConfig