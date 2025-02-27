import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../database/models/userModel";

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
    static async login(req:Request,res:Response){
        // accept incoming data --> email, password
        const {email, password} = req.body // password - manish --> hash() --> $234234324fjlsdf
        if(!email || !password){
            res.status(400).json({
                message : "Please provide email, password"
            })
            return
        }
    }
}

export default UserController
