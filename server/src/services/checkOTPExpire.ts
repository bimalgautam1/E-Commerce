import sendResponse from "./sendResponse"
import { Response } from "express"



const checkOtpExpire = (res : Response ,otpGeneratedTime:string, thresholdTime:number)=>{
    const curerntTime = Date.now()

    if(curerntTime - parseInt(otpGeneratedTime) <= thresholdTime){
        //otp not expired
        sendResponse(res,200,"OTP is valid, now you can proceed to reset password")
    }
    else{
        //otp expired
        sendResponse(res, 403 , "OTP expired, Try again later💀")
        return
    }
}
export default checkOtpExpire