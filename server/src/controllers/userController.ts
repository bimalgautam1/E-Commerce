import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../database/models/userModel";
import generateToken from "../services/generateToken";

class UserController{
    static async register(req:Request,res:Response){
        //incoming user data receive 
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password"
            })
            return
        }
        // data --> users table ma insert garne 
        await User.create({
            username, 
            email, 
            password: bcrypt.hashSync(password, 14) 
    
        })

        // await sequelize.query(`INSERT INTO users(id,username,email,password) VALUES (?,?,?,?)`, {
        //     replacements : ['b5a3f20d-6202-4159-abd9-0c33c6f70487', username,email,password], 
        // })

        res.status(201).json({
            message : "User registered successfully", 
    
        })
    }

    static async login(req:Request, res:Response){
        //accept incoming data --> email and password

        const {email,password} = req.body
        if(!email || !password){
            res.status(200).json({
                message: "Please provide email and password"
            })
            return
        }

        //check if email is already sign or not
        const [user] = await User.findAll({
            where:{
                email:email
            }
        })
        if(!user){
            res.status(404).json({
                message: "No User with that email🥲"
            })
        }
        else{
            //check password
            const isEqual = bcrypt.compareSync(password, user.password)
            if(!isEqual){
                res.status(400).json({
                    message : "Invalid Password"
                })
            }
            else{
                const token = generateToken(user.id)
                res.status(200).json({
                    message: "Login Successfully❤️",
                    token : token
                })
            }
            
        }

        //check email first if exist or not, 
    }

}

export default UserController
