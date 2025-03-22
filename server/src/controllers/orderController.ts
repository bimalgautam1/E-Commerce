import { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetail";
import { paymentMethod } from "../globals/types";
import Payment from "../database/models/paymentModel";

interface IProduct{
    productId : string,
    productQty: string
}

interface OrderRequest extends Request{
    user?:{
        id:string
    }
}

class OrderController{
    static async createOrder(req:OrderRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const {phoneNumber,shippingAddress,totalAmount,paymentmethod} = req.body
        const products:IProduct[] = req.body.products
        if(!phoneNumber || !shippingAddress || !totalAmount||products.length ==0){
            sendResponse(res,400,"Please provide phone number, shipping address, totalamount")
            return
        }
        //order details
        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId : userId
        })
        //products section
        products.forEach(async function(product:any){
            await OrderDetail.create({
                quantity : product.productQty,
                productId : product.productId,
                orderId : orderData.id
            })
        });
        //Payments section
        if(paymentmethod.toString() === paymentMethod.COD.toString()){
            Payment.create({
                orderId : orderData.id,
                paymentMethod : paymentmethod
            })
            sendResponse(res,200,"Payment Successfull")
            return
        }
        // }else if(paymentmethod == paymentMethod.Khalti){

        // }
        // else{

        // 
        // }
        
        

    }
}

export default OrderController