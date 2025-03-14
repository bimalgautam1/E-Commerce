import { Request,Response,NextFunction } from "express";
import sendResponse from "../services/sendResponse";
import jwt  from "jsonwebtoken";
import envConfig from "../config/config";
import User from "../database/models/userModel";


enum Role{
    Admin = "admin",
    Customer = "customer"
}
class UserMiddleware{
    async isUserLoggedIn(req:Request,res:Response,next:NextFunction):Promise<void>{

        const token = req.headers.authorization

        if(!token){
            sendResponse(res,403,"Token must me provided")
            return;
        }
        jwt.verify(token,envConfig.jwt_secretkey, async(err,result:any)=>{
            if(err){
                sendResponse(res,403,"Invalid Token")
            }
            else{
                const userData = await User.findByPk(result.userId)
                //@ts-ignore
                req.user = userData
                next()
            }
        })
    }
    restrictTo(...roles:Role[]){
        return(req:Request,res:Response,next:NextFunction)=>{
            // let userRole = req.user.role
        }
    }

}

export default new UserMiddleware