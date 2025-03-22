import { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetail";

interface IProduct{
    productId : string,
    productQty: string
}

interface OrderRequest extends Request{
    user:{
        id:string
    }
}

class OrderController{
    async createOrder(req:OrderRequest,res:Response){
        const userId = req.user.id
        const {phoneNumber,shippingAddress,totalAmount,products} = req.body

        if(!phoneNumber || !shippingAddress || !totalAmount||products.lenght ==0){
            sendResponse(res,400,"Please provide phone number, shipping address, totalamount")
            return
        }

        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId : userId
        })

        products.forEach(async function(product:any){
            await OrderDetail.create({
                quantity : product.productQty,
                productId : product.productId,
                orderId : orderData.id
            })
        });
        

    }
}