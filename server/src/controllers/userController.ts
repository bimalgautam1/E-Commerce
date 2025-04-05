import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../database/models/userModel";
import generateToken from "../services/generateToken";
import generateOtp from "../services/generateOpt";
import sendmail from "../services/sendMail";
import sendResponse from "../services/sendResponse";
import findData from "../services/findData";
import checkOtpExpire from "../services/checkOTPExpire";

class UserController{
    static async register(req:Request,res:Response){    
        //incoming user data receive 
        const {username,email,password,role} = req.body
        if(!username || !email || !password){
            sendResponse(res,400,"Please provide username,email,password")
            return
        }
        try {
            if(password.length<=7){
                sendResponse(res,400,"Password Length must be greater than 7")
                return
            } 
            //check for email if already registered
            const [checkEmail] = await User.findAll({
                where :{
                    email : email
                }
            })
            if(checkEmail){
                res.status(400).json({message:"Please try again later!!"})
            }
            // data --> users table ma insert garne 
            await User.create({
                username, 
                email, 
                password: bcrypt.hashSync(password, 14),
                role: role 
        
            })
        } catch (error) {
            res.status(500).json({
                message : "Error while login",
                error : error
            })
        }

        // await sequelize.query(`INSERT INTO users(id,username,email,password) VALUES (?,?,?,?)`, {
        //     replacements : ['b5a3f20d-6202-4159-abd9-0c33c6f70487', username,email,password], 
        // })
        sendResponse(res,200,"User registered successfully")
    }
    static async login(req:Request, res:Response){
        //accept incoming data --> email and password

        const {email,password} = req.body
        if(!email || !password){
            sendResponse(res,400,"Please provide email and password")
            return
        }

        //check if email is already sign or not
        const [user] = await User.findAll({
            where:{
                email:email
            }
        })
        if(!user){
            sendResponse(res,404,"No User with that email🥲")
            return
        }
        else{
            //check password
            const isEqual = bcrypt.compareSync(password, user.password)
            if(!isEqual){
                sendResponse(res,400,"Invalid Password")
                return
            }
            else{
                const token = generateToken(user.id)
                res.status(200).json({
                    message: "Login Successfully❤️",
                    token : token
                })
                return
            }
            
        }

        //check email first if exist or not, 
    }
    static async forgetPassword(req:Request, res:Response){
        const {email} = req.body

        if(!email){
            sendResponse(res,400,"Enter your email")
            return
        }
            const [user] = await User.findAll({
                where :{
                    email : email
                }
            })
            if(!user){
                sendResponse(res,404,"Email arenot registered")
                return
            }
            const otp = generateOtp()
            await sendmail({
                to : email,
                subject : "Reset your Password", 
                text : `You just requested to reset your password. So, here is your otp ${otp}` 
            })

            user.otp = otp.toString()
            user.otpGeneratedTime = Date.now().toString()
            await user.save()

            sendResponse(res,200,"OTP Has been sent")
            
    }
    static async verifyOtp(req:Request, res:Response){
        const {otp,email} = req.body

        if(!otp || !email){
            sendResponse(res,400,"Please provide email and otp")
            return
        }
        
        const user = await User.findAll({
            where :
            {
                email : email
            }
        })
        if(!user){
            sendResponse(res,404,"No user with that email")
            return
        }
        //otp verification\
        const [data] = await findData(User,email )
        if(!data){
            sendResponse(res,400,"Invalid OTP")
            return
        }
        const curerntTime = Date.now()
        const otpGeneratedTime = data.otpGeneratedTime
        checkOtpExpire(res,otpGeneratedTime,120000)
    }
    static async resetPassword(req : Request, res:Response){
        const {newPassword,confirmPassword,email,otp} = req.body

        if(!newPassword || !confirmPassword || !email || !otp){
            sendResponse(res,400, "Please provide newPassword,confirmPassword, email, otp")
            return
        }
        if(newPassword!==confirmPassword){
            sendResponse(res,400,"Password didnot match")
            return
        }
        const user = await findData(User,email)
        if(!user){
            sendResponse(res,400,"No email with that user")
            return
        }
        user.password = bcrypt.hashSync(newPassword,12)
        await user.save()
        sendResponse(res,200,"Password Updated successfully")

    }
    }

export default UserController
