import jwt from "jsonwebtoken"
import envConfig from "../config/config";

const generateToken = (userId:string)=>{
    try {
        //token generate
    const token = jwt.sign({userId:userId}, envConfig.jwt_secretkey as string,{
        expiresIn : "1h"    
    })
    return token
    } catch (error) {
        console.log(error)
    }
}

export default generateToken