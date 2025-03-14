import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../database/models/userModel";
import generateToken from "../services/generateToken";
import generateOtp from "../services/generateOpt";
import sendmail from "../services/sendMail";
import sendResponse from "../services/sendResponse";
import findData from "../services/findData";
import checkOtpExpire from "../services/checkOTPExpire";
import Category from "../database/models/categoryModel";

class CategoryController{
    categoryData = [
        {categoryName : "Electronics"},
        {categoryName : "Groceries"},
        {categoryName : "Foods"},
    ]

    async seedCategory():Promise<void>{
        const datas = await Category.findAll()
        if(datas.length===0){
            await Category.bulkCreate(this.categoryData)
            console.log("Categories seeded Successfully")
        }
    }
    async addCategory(req: Request,res:Response):Promise<void>{
        const {categoryName} = req.body
        if(!categoryName){
            res.status(400).json({message : "Please provide category name"})
            return
        }
        const checkCategory = await Category.findAll({
            where :{categoryName : categoryName}
        })
         try {
            if(checkCategory.length === 0){
                await Category.create({
                    categoryName
                })
                sendResponse(res,200,"Category Created Successfully")
                return
            }
            else{
                res.status(400).json({message : "Category alreay exist"})
            }
         } catch (error) {
            res.status(400).json({
                message :"Something went wrong while adding categories",
                error
                
            })
         }
    }
    async getCategories(req: Request,res:Response){
        const data = await Category.findAll()

        res.status(200).json({message :"Categories fetched",data})
    }
    async deleteCategories(req: Request,res:Response){
        const  {id} = req.params

        if(!id){
            res.status(400).json({
                message :"Porvide id to delete data"
            })
            return
        }
        const data = await Category.findAll({
            where : {id :id}
        })
        if(data.length === 0){
            res.status(400).json({message:"NO categories found"})
        }
        else{
            await Category.destroy({
                where : {id}
            })
            res.status(200).json({message : "Successfully deleted"}) 
        }
    }
    async updateCategories(req: Request,res:Response){
        const {id} = req.params
        const {categoryName } = req.body
        if(!categoryName || !id){
            res.status(400).json({message : "Provide your categoryname or id to update"})
            return
        }
        const data  = await Category.findAll({
            where : {id:id}
        })
        if(data.length===0){
            res.status(400).json({message: "Data not found"})
            return
        }
        await Category.update({
            categoryName : categoryName
        },{
            where : {id}
        })
        res.status(200).json({message :"Category Successfully Updated"})


    }
}

export default new CategoryController