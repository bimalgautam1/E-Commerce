import { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Products from "../database/models/productModel";
import Category from "../database/models/categoryModel";

// interface IProductRequest extends Request{
//     file:{
//         filename : string
//     }
// }

class ProductController{
    async createProduct(req:Request,res:Response):Promise<void>{
        const extendedReq = req //as unknown as IProductRequest;
        const {productName, productDescription,productPrice,productTotalStock,discount,categoryId}=req.body
        const filename = extendedReq.file?extendedReq.file.filename : "imagelink"
        if(!productName|| !productDescription||!productPrice||!productTotalStock||!categoryId){
            sendResponse(res,400,"Please provide productName,productDescription,productPrice,productTotalStock,discount,categoryId")
            return
        }
        await Products.create({
            productName, 
            productDescription,
            productPrice,
            productTotalStock,
            discount:discount || 0,
            categoryId,
            productImageUrl:filename
        })
        sendResponse(res,200,"Data successfully inserted")
    }
    async getAllProducts(req:Request,res:Response):Promise<void>{
        const datas = await Products.findAll({
            include :[
                {
                    model:Category
                }
            ]
        })
        if(datas.length===0){
            sendResponse(res,404,"No Products",)
            return
        }
        sendResponse(res,200,"Products Found",datas)
    }
    async getSingleProduct(req:Request,res:Response):Promise<void>{
        const {id } = req.params
        const datas = await Products.findAll({
            where :{
                id:id
            },
            include :[
                {
                    model:Category
                }
            ]
        })
        sendResponse(res,200,"Products Found",datas)
    }
    async deleteProduct(req:Request,res:Response):Promise<void>{
        const {id } = req.params
        const datas = await Products.findAll({
            where :{
                id:id
            }
        })
            if(datas.length === 0){
                sendResponse(res,404, "Product not found")
            }
            else{
                await Products.destroy({
                    where:{
                        id:id
                    }
                })
            }
        sendResponse(res,200,"Products deleted successfully",)
    }
    async updateProduct(req:Request,res:Response):Promise<void>{
        const {productName, productDescription,productPrice,productTotalStock,discount,categoryId}=req.body
        const updateData: Record<string, any> = {};
        const {id } = req.params
        const datas = await Products.findAll({
            where :{
                id:id
            }
        })
            if(datas.length === 0){
                sendResponse(res,404, "Product not found")
            }
            else{
                if (productName) updateData.productName = productName;
                if (productDescription) updateData.productDescription = productDescription;
                if (productPrice) updateData.productPrice = productPrice;
                if (productTotalStock) updateData.productTotalStock = productTotalStock;
                if (discount) updateData.discount = discount;

if (Object.keys(updateData).length > 0) { 
    await Products.update(updateData, { where: { id } });
} else {
    sendResponse(res, 400, "No valid fields provided for update");
    return;
}
                await Products.update({
                    productName : productName,
                    productDescription : productDescription,
                    productPrice : productPrice,
                    productTotalStock : productTotalStock,
                    discount : discount
                },{
                    where : {id}
                })
            }
        sendResponse(res,200,"Products Updated successfully",)
    }
    }

    export default new ProductController

