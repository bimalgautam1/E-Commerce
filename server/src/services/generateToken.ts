import jwt from 'jsonwebtoken'
import  envConfig  from '../config/config'

const generateToken = (userId : string)=>{
    // token generate (jwt)
    const token = jwt.sign({userId : userId},envConfig.jwtSecretKey as string,{
        expiresIn : '10d'
    })
    return token 
}

export default generateToken