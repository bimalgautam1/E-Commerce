import { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetail";
import { paymentMethod } from "../globals/types";
import Payment from "../database/models/paymentModel";
import axios from "axios";
import envConfig from "../config/config";
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
            const paymentData = await Payment.create({
                orderId : orderData.id,
                paymentMethod : paymentmethod
            })

        if(paymentmethod == paymentMethod.Khalti){
            const data = {
                return_url : "http://localhost:5137/",
                website_url : 'http://localhost:5137/',
                amount : totalAmount * 100,
                purchase_order_id : orderData.id,
                purchase_order_name : 'order_'+orderData.id
            }
            const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
                headers:{
                    Authorization:  envConfig.Live_secret_key
                }
            })      
            const khaltiResponse = response.data
            paymentData.pidx = khaltiResponse.pidx
            paymentData.save()

            res.status(200).json({
                message:"Ordered Successfully using khalti",
                url : khaltiResponse.payment_url
            })

        }
        sendResponse(res,200,"Ordered Successfully using COD")
        // else{

        // 
        // }
        
        

    }
}

export default OrderController