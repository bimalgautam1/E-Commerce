import { Request, Response } from "express";
import IExtendedRequest from '../middleware/userMiddleware'
import sendResponse from "../services/sendResponse";
import Order from "../database/models/orderModel";
import Cart from "../database/models/cartModel";
import Products from "../database/models/productModel";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import User from "../database/models/userModel";


interface CartRequest extends Request{
    user?:User
}

class CartController{
    // add product to cart
    async addCart(req:CartRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const {productId, productQuantity} = req.body

        if(!productId || !productQuantity){
            sendResponse(res,400,"Provide product id and quantity")
            return
        }
        let cartData = await Cart.findOne({
            where:{userId, productQuantity}
        })

        if(!cartData){
            await Cart.create({
                userId,productId,productQuantity
            })
            sendResponse(res,200,"Items added to card successfully")
            return
        }
        cartData.productquantity+=productQuantity
        await cartData.save()
        sendResponse(res,200,"Cart updated")
    }
    //gets all the cart items of the user
    async getMyCartItems(req:CartRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const allCartItems = await Cart.findAll({
            where:{userId},
            include:[{
                model:Products,
                attributes:['id','productName','productPrice','productImageUrl']
            }]
        })
        if(allCartItems.length ==0 ){
            res.status(404).json({
                message:"No items found on the cart"
            })
            return
        }
        res.status(200).json({
            message:"Items found on the cart",
            data : allCartItems
        })
    }
    //deletes the cart items
    async deleteItemsOnCart(req:CartRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const {productId} = req.params

        //check if product is at cart or not
        const product = await Products.findByPk(productId)
        if(!product){
            sendResponse(res,404,"No products with that id")
            return
        }
        await Cart.destroy({
            where:{
                productId,userId
            }
        })
        sendResponse(res,200,'Product removed from cart')
        
    }
    //Can add cart quantity
    async updateCartItemQuantity(req:CartRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const{productId} = req.params
        const {productQuantity} = req.body

        if(!productQuantity){
            sendResponse(res,400,"Please provide product quantity")
            return
        }
        const cartItem = await Cart.findOne({
            where:{
                userId,productId
            }
        })
        if(!cartItem){
            sendResponse(res,404,"Item not found in the cart")
        } 
        else{ 
            cartItem.productquantity = productQuantity 
        }

    }
}

export default  new CartController