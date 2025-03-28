import e, { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetail";
import { paymentMethod } from "../globals/types";
import Payment from "../database/models/paymentModel";
import {paymentStatus} from '../globals/types/index'
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
    static async verifyTransaction(req:OrderRequest,res:Response):Promise<void>{
        const {pidx} = req.body
        if(!pidx){
            sendResponse(res,400,"Provide pidx")
            return
        }
        const verifyPidx = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx:pidx},
            {
                headers:{"Authorization":envConfig.Live_secret_key
                }
            }
        )
        const PaymentStatus = verifyPidx.data.status
        console.log(verifyPidx);
        
        if(PaymentStatus=="Pending"){
            sendResponse(res,200,"Payment Pending")
        }
        else if(PaymentStatus=="Completed"){
            await Payment.update({paymentStatus:paymentStatus.Paid},{
                where:{pidx:pidx}
            })
            console.log(pidx);
            
            sendResponse(res,200,"Payment Successfull")
            return
        }
        sendResponse(res,400,"Something went wrong with paymert")
        

        // const pending = verifyPidx.
        // if(!verifyPidx){
        //     sendResponse(res,400,"Something went wrong")
        // }
        // sendResponse(res,200,"payment Successfull")
    }
}

export default OrderController